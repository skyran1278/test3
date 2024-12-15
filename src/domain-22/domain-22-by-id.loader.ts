import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import DataLoader from 'dataloader';
import { Maybe } from 'graphql/jsutils/Maybe';
import { In, Repository } from 'typeorm';

import { Domain22 } from './domain-22.entity';

@Injectable({ scope: Scope.REQUEST })
export class Domain22ByIdLoader extends DataLoader<string, Maybe<Domain22>> {
  constructor(
    @InjectRepository(Domain22)
    private readonly repo: Repository<Domain22>,
  ) {
    super(async (keys: readonly string[]): Promise<Maybe<Domain22>[]> => {
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
