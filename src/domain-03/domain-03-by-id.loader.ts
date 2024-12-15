import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import DataLoader from 'dataloader';
import { Maybe } from 'graphql/jsutils/Maybe';
import { In, Repository } from 'typeorm';

import { Domain03 } from './domain-03.entity';

@Injectable({ scope: Scope.REQUEST })
export class Domain03ByIdLoader extends DataLoader<string, Maybe<Domain03>> {
  constructor(
    @InjectRepository(Domain03)
    private readonly repo: Repository<Domain03>,
  ) {
    super(async (keys: readonly string[]): Promise<Maybe<Domain03>[]> => {
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
