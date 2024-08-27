import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import DataLoader from 'dataloader';
import { Maybe } from 'graphql/jsutils/Maybe';
import { In, Repository } from 'typeorm';

import { Domain0024 } from './domain-0024.entity';

@Injectable({ scope: Scope.REQUEST })
export class Domain0024ByIdLoader extends DataLoader<
  string,
  Maybe<Domain0024>
> {
  constructor(
    @InjectRepository(Domain0024)
    private readonly repo: Repository<Domain0024>,
  ) {
    super(async (keys: readonly string[]): Promise<Maybe<Domain0024>[]> => {
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
