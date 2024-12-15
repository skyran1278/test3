import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import DataLoader from 'dataloader';
import { Maybe } from 'graphql/jsutils/Maybe';
import { In, Repository } from 'typeorm';

import { Domain10 } from './domain-10.entity';

@Injectable({ scope: Scope.REQUEST })
export class Domain10ByIdLoader extends DataLoader<string, Maybe<Domain10>> {
  constructor(
    @InjectRepository(Domain10)
    private readonly repo: Repository<Domain10>,
  ) {
    super(async (keys: readonly string[]): Promise<Maybe<Domain10>[]> => {
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
