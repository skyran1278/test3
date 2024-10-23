import { BadRequestException, Logger } from '@nestjs/common';
import { DeepPartial, FindOptionsWhere, In } from 'typeorm';

import { BaseRepository } from './base.repository';
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
   * Save multiple entities one by one to ensure the correctness of the mpath query.
   *
   * @param inputEntities - An array of entities to be saved.
   * @returns A promise that resolves to an array of saved entities.
   */
  private async saveMultipleEntities(
    inputEntities: DeepPartial<Entity>[],
  ): Promise<Entity[]> {
    const databaseParents = await super.find({
      where: {
        id: In(inputEntities.map(({ parentId }) => parentId)),
      } as FindOptionsWhere<Entity>,
      withDeleted: true,
    });

    const allEntities = inputEntities.concat(databaseParents);

    this.bindParentEntities(inputEntities, allEntities);

    const entities: Entity[] = [];
    for (const entity of inputEntities) {
      entities.push(await super.save(entity));
    }

    return entities;
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
