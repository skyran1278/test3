import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';
import { Maybe } from 'graphql/jsutils/Maybe';
import { In } from 'typeorm';

import { Domain0001 } from './domain-0001.entity';
import { Domain0001Repository } from './domain-0001.repository';

@Injectable({ scope: Scope.REQUEST })
export class Domain0001ByIdLoader extends DataLoader<
  string,
  Maybe<Domain0001>
> {
  constructor(private readonly repo: Domain0001Repository) {
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
