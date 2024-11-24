import { BadRequestException, Logger } from '@nestjs/common';
import { DeepPartial, FindOptionsWhere, In } from 'typeorm';

import { BaseRepository } from './base.repository';
import { canTopologicalSort, topologicalSort } from './topological-sort';
import { TreeBaseInterface } from './tree-base.interface';

export abstract class TreeBaseRepository<
  Entity extends TreeBaseInterface,
> extends BaseRepository<Entity> {
  readonly logger = new Logger(this.constructor.name);

  async save(entity: DeepPartial<Entity>): Promise<Entity>;
  async save(entities: DeepPartial<Entity>[]): Promise<Entity[]>;
  async save(
    input: DeepPartial<Entity> | DeepPartial<Entity>[],
  ): Promise<Entity | Entity[]> {
    if (Array.isArray(input)) {
      return this.saveMultipleEntities(input);
    } else {
      return this.saveSingleEntity(input);
    }
  }

  /**
   * ### Closure Table
   * Unlike Materialized Path, entities in a Closure Table can be saved as an array. However, in this implementation, we choose to save each entity individually for Materialized Path consistency.
   * @see https://typeorm.io/tree-entities#closure-table
   *
   * ### Materialized Path (aka Path Enumeration)
   * Materialized Path requires entities to be saved one at a time to maintain the correctness of the path structure.
   * @see https://typeorm.io/tree-entities#materialized-path-aka-path-enumeration
   *
   * @param entities - An array of partial entity objects to be saved.
   * @returns A promise that resolves to an array of fully saved entities.
   */
  private async saveMultipleEntities(
    entities: DeepPartial<Entity>[],
  ): Promise<Entity[]> {
    const databaseParents = await super.find({
      where: {
        id: In(entities.map(({ parentId }) => parentId)),
      } as FindOptionsWhere<Entity>,
      withDeleted: true,
    });

    const allEntities = entities.concat(databaseParents);

    this.bindParentEntities(entities, allEntities);

    if (canTopologicalSort(entities)) {
      entities = topologicalSort(entities);
    }

    for (const entity of entities) {
      await super.save(entity);
    }

    return entities as Entity[];
  }

  /**
   * To bind tree entities to each other, it is required to set the parent in the child entity and then save them.
   *
   * @see https://orkhan.gitbook.io/typeorm/docs/tree-entities#working-with-tree-entities
   * @param entity - The entity to be saved.
   * @returns A promise that resolves to the saved entity.
   * @throws BadRequestException if the parent entity does not exist.
   */
  private async saveSingleEntity(entity: DeepPartial<Entity>): Promise<Entity> {
    if (entity.parent != null && entity.parentId == null) {
      entity.parentId = entity.parent.id;
    }

    if (entity.parentId != null && entity.parent == null) {
      const parent = await super.findOne({
        where: {
          id: entity.parentId,
        } as FindOptionsWhere<Entity>,
        withDeleted: true,
      });

      if (!parent) {
        throw new BadRequestException(
          `Parent with id ${entity.parentId} does not exist`,
        );
      }

      entity.parent = parent;
    }

    return super.save(entity);
  }

  /**
   * To bind tree entities to each other, it is required to set the parent in the child entity and then save them.
   *
   * @see https://orkhan.gitbook.io/typeorm/docs/tree-entities#working-with-tree-entities
   * @param entities
   * @param allEntities
   */
  private bindParentEntities(
    entities: DeepPartial<Entity>[],
    allEntities: DeepPartial<Entity>[],
  ): void {
    entities.forEach((entity) => {
      if (entity.parent != null && entity.parentId == null) {
        entity.parentId = entity.parent.id;
      }

      if (entity.parentId != null && entity.parent == null) {
        const parent = allEntities.find(({ id }) => id === entity.parentId);

        if (!parent) {
          throw new BadRequestException(
            `Parent with id ${entity.parentId} does not exist`,
          );
        }

        entity.parent = parent;
      }
    });
  }
}
