import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';

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

  save(entity: DeepPartial<Domain0021>): Promise<Domain0021>;
  save(entities: DeepPartial<Domain0021>[]): Promise<Domain0021[]>;
  save(
    input: DeepPartial<Domain0021> | DeepPartial<Domain0021>[],
  ): Promise<Domain0021 | Domain0021[]> {
    if (Array.isArray(input)) {
      if (!canTopologicalSort(input)) return super.save(input);

      // https://orkhan.gitbook.io/typeorm/docs/tree-entities#working-with-tree-entities
      // To bind tree entities to each other, it is required to set the parent in the child entity and then save them.
      input.forEach((e) => {
        const parent = input.find(({ id }) => id === e.parentId);
        if (parent) e.parent = parent;
      });

      const parentGoFirst = topologicalSort(input);
      return super.save(parentGoFirst);
    }

    return super.save(input);
  }
}
