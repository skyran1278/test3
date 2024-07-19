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
      const databaseParents = await this.repo.findBy({
        id: In(input.map(({ parentId }) => parentId)),
      });

      const parents = input.concat(databaseParents);

      // https://orkhan.gitbook.io/typeorm/docs/tree-entities#working-with-tree-entities
      // To bind tree entities to each other, it is required to set the parent in the child entity and then save them.
      input.forEach((e) => {
        if (e.parentId == null) return;

        const parent = parents.find(({ id }) => id === e.parentId);

        if (!parent) {
          throw new BadRequestException(
            `Parent with id ${e.parentId} does not exist`,
          );
        }

        e.parent = parent;
      });

      if (!canTopologicalSort(input)) return super.save(input);
      const parentGoFirst = topologicalSort(input);

      return super.save(parentGoFirst);
    }

    if (input.parentId != null && input.parent == null) {
      const parent = await this.repo.findOneBy({ id: input.parentId });

      if (!parent) {
        throw new BadRequestException(
          `Parent with id ${input.parentId} does not exist`,
        );
      }

      input.parent = parent;
    }

    return super.save(input);
  }
}
