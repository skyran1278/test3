import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';
import { Maybe } from 'graphql/jsutils/Maybe';
import { In } from 'typeorm';

import { Domain01 } from './domain-01.entity';
import { Domain01Repository } from './domain-01.repository';

@Injectable({ scope: Scope.REQUEST })
export class Domain01ByIdLoader extends DataLoader<string, Maybe<Domain01>> {
  constructor(private readonly repo: Domain01Repository) {
    super(async (keys: readonly string[]): Promise<Maybe<Domain01>[]> => {
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
