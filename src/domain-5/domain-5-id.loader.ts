import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import DataLoader from 'dataloader';
import { Maybe } from 'graphql/jsutils/Maybe';
import { In, Repository } from 'typeorm';

import { Domain5 } from './domain-5.entity';

@Injectable({ scope: Scope.REQUEST })
export class Domain5IdLoader extends DataLoader<string, Maybe<Domain5>> {
  constructor(
    @InjectRepository(Domain5)
    private readonly repo: Repository<Domain5>,
  ) {
    super(async (keys: readonly string[]): Promise<Maybe<Domain5>[]> => {
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
