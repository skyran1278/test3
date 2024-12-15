import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import DataLoader from 'dataloader';
import { Maybe } from 'graphql/jsutils/Maybe';
import { In, Repository } from 'typeorm';

import { Domain08 } from './domain-08.entity';

@Injectable({ scope: Scope.REQUEST })
export class Domain08ByIdLoader extends DataLoader<string, Maybe<Domain08>> {
  constructor(
    @InjectRepository(Domain08)
    private readonly repo: Repository<Domain08>,
  ) {
    super(async (keys: readonly string[]): Promise<Maybe<Domain08>[]> => {
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
