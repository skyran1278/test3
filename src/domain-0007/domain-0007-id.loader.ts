import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import DataLoader from 'dataloader';
import { Maybe } from 'graphql/jsutils/Maybe';
import { In, Repository } from 'typeorm';

import { Domain0007 } from './domain-0007.entity';

@Injectable({ scope: Scope.REQUEST })
export class Domain0007IdLoader extends DataLoader<string, Maybe<Domain0007>> {
  constructor(
    @InjectRepository(Domain0007)
    private readonly repo: Repository<Domain0007>,
  ) {
    super(async (keys: readonly string[]): Promise<Maybe<Domain0007>[]> => {
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
