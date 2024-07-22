import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, In, Repository } from 'typeorm';

import { BaseRepository } from '../common/base.repository';
import { Domain0021 } from './domain-0021.entity';
import { canTopologicalSort, topologicalSort } from './topological-sort';

@Injectable()
export class Domain0021Repository extends BaseRepository<Domain0021> {
  constructor(
    @InjectRepository(Domain0021)
    readonly repo: Repository<Domain0021>,
  ) {
    super(repo);
  }

  async save(entity: DeepPartial<Domain0021>): Promise<Domain0021>;
  async save(entities: DeepPartial<Domain0021>[]): Promise<Domain0021[]>;
  async save(
    input: DeepPartial<Domain0021> | DeepPartial<Domain0021>[],
  ): Promise<Domain0021 | Domain0021[]> {
    if (Array.isArray(input)) {
      return this.saveMultipleEntities(input);
    } else {
      return this.saveSingleEntity(input);
    }
  }

  private async saveMultipleEntities(
    entities: DeepPartial<Domain0021>[],
  ): Promise<Domain0021[]> {
    const databaseParents = await this.repo.findBy({
      id: In(entities.map(({ parentId }) => parentId)),
    });

    const allEntities = entities.concat(databaseParents);

    this.bindParentEntities(entities, allEntities);

    if (!canTopologicalSort(entities)) {
      return super.save(entities);
    }

    const sortedEntities = topologicalSort(entities);
    return super.save(sortedEntities);
  }

  private async saveSingleEntity(
    entity: DeepPartial<Domain0021>,
  ): Promise<Domain0021> {
    if (entity.parent != null && entity.parentId == null) {
      entity.parentId = entity.parent.id;
    }

    if (entity.parentId != null && entity.parent == null) {
      const parent = await this.repo.findOneBy({ id: entity.parentId });

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
    entities: DeepPartial<Domain0021>[],
    allEntities: DeepPartial<Domain0021>[],
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
