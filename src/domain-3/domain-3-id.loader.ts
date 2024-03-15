import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import DataLoader from 'dataloader';
import { Maybe } from 'graphql/jsutils/Maybe';
import { In, Repository } from 'typeorm';

import { Domain3 } from './domain-3.entity';

@Injectable({ scope: Scope.REQUEST })
export class Domain3IdLoader extends DataLoader<string, Maybe<Domain3>> {
  constructor(
    @InjectRepository(Domain3)
    private readonly repo: Repository<Domain3>,
  ) {
    super(async (keys: readonly string[]): Promise<Maybe<Domain3>[]> => {
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
