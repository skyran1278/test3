import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import DataLoader from 'dataloader';
import { Maybe } from 'graphql/jsutils/Maybe';
import { In, Repository } from 'typeorm';

import { Domain0015 } from './domain-0015.entity';

@Injectable({ scope: Scope.REQUEST })
export class Domain0015ByIdLoader extends DataLoader<
  string,
  Maybe<Domain0015>
> {
  constructor(
    @InjectRepository(Domain0015)
    private readonly repo: Repository<Domain0015>,
  ) {
    super(async (keys: readonly string[]): Promise<Maybe<Domain0015>[]> => {
      const daoArray = await this.repo.find({
        where: {
          id: In(keys),
        },
      });
      const daoMap = new Map(daoArray.map((dao) => [dao.id, dao]));
      return keys.map((key) => daoMap.get(key));
    });
  }
}
