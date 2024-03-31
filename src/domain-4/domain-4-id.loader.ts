import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import DataLoader from 'dataloader';
import { Maybe } from 'graphql/jsutils/Maybe';
import { In, Repository } from 'typeorm';

import { Domain4 } from './domain-4.entity';

@Injectable({ scope: Scope.REQUEST })
export class Domain4IdLoader extends DataLoader<string, Maybe<Domain4>> {
  constructor(
    @InjectRepository(Domain4)
    private readonly repo: Repository<Domain4>,
  ) {
    super(async (keys: readonly string[]): Promise<Maybe<Domain4>[]> => {
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
