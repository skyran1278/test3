import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import DataLoader from 'dataloader';
import { Maybe } from 'graphql/jsutils/Maybe';
import { In, Repository } from 'typeorm';

import { Domain6 } from './domain-6.entity';

@Injectable({ scope: Scope.REQUEST })
export class Domain6IdLoader extends DataLoader<string, Maybe<Domain6>> {
  constructor(
    @InjectRepository(Domain6)
    private readonly repo: Repository<Domain6>,
  ) {
    super(async (keys: readonly string[]): Promise<Maybe<Domain6>[]> => {
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
