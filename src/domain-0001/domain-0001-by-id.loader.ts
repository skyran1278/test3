import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import DataLoader from 'dataloader';
import { Maybe } from 'graphql/jsutils/Maybe';
import { In, Repository } from 'typeorm';

import { Domain0001 } from './domain-0001.entity';

@Injectable({ scope: Scope.REQUEST })
export class Domain0001ByIdLoader extends DataLoader<
  string,
  Maybe<Domain0001>
> {
  constructor(
    @InjectRepository(Domain0001)
    private readonly repo: Repository<Domain0001>,
  ) {
    super(async (keys: readonly string[]): Promise<Maybe<Domain0001>[]> => {
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
