import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import DataLoader from 'dataloader';
import { Maybe } from 'graphql/jsutils/Maybe';
import { In, Repository } from 'typeorm';

import { Domain0004 } from './domain-0004.entity';

@Injectable({ scope: Scope.REQUEST })
export class Domain0004IdLoader extends DataLoader<string, Maybe<Domain0004>> {
  constructor(
    @InjectRepository(Domain0004)
    private readonly repo: Repository<Domain0004>,
  ) {
    super(async (keys: readonly string[]): Promise<Maybe<Domain0004>[]> => {
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
