import { BadRequestException, Logger } from '@nestjs/common';
import { DeepPartial, FindOptionsWhere, In, TreeRepository } from 'typeorm';

import { BaseRepository } from './base.repository';
import { canTopologicalSort, topologicalSort } from './topological-sort';
import { TreeEntity } from './tree.entity';

export abstract class TreeBaseRepository<
  Entity extends TreeEntity,
> extends BaseRepository<Entity> {
  readonly logger = new Logger(this.constructor.name);

  constructor(private readonly treeRepository: TreeRepository<Entity>) {
    super(treeRepository);
  }

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

  private async saveMultipleEntities(
    entities: DeepPartial<Entity>[],
  ): Promise<Entity[]> {
    const databaseParents = await this.treeRepository.findBy({
      id: In(entities.map(({ parentId }) => parentId)),
    } as FindOptionsWhere<Entity>);

    const allEntities = entities.concat(databaseParents);

    this.bindParentEntities(entities, allEntities);

    if (!canTopologicalSort(entities)) {
      return super.save(entities);
    }

    const sortedEntities = topologicalSort(entities);
    return super.save(sortedEntities);
  }

  private async saveSingleEntity(entity: DeepPartial<Entity>): Promise<Entity> {
    if (entity.parent != null && entity.parentId == null) {
      entity.parentId = entity.parent.id;
    }

    if (entity.parentId != null && entity.parent == null) {
      const parent = await this.treeRepository.findOneBy({
        id: entity.parentId,
      } as FindOptionsWhere<Entity>);

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
