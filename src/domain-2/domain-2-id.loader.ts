import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import DataLoader from 'dataloader';
import { Maybe } from 'graphql/jsutils/Maybe';
import { In, Repository } from 'typeorm';

import { Domain2 } from './domain-2.entity';

@Injectable({ scope: Scope.REQUEST })
export class Domain2IdLoader extends DataLoader<string, Maybe<Domain2>> {
  constructor(
    @InjectRepository(Domain2)
    private readonly repo: Repository<Domain2>,
  ) {
    super(async (keys: readonly string[]): Promise<Maybe<Domain2>[]> => {
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
