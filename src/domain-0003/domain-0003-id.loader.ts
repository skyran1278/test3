import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import DataLoader from 'dataloader';
import { Maybe } from 'graphql/jsutils/Maybe';
import { In, Repository } from 'typeorm';

import { Domain0003 } from './domain-0003.entity';

@Injectable({ scope: Scope.REQUEST })
export class Domain0003IdLoader extends DataLoader<string, Maybe<Domain0003>> {
  constructor(
    @InjectRepository(Domain0003)
    private readonly repo: Repository<Domain0003>,
  ) {
    super(async (keys: readonly string[]): Promise<Maybe<Domain0003>[]> => {
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
