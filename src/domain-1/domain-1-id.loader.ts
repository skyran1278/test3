import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import DataLoader from 'dataloader';
import { Maybe } from 'graphql/jsutils/Maybe';
import { In, Repository } from 'typeorm';

import { Domain1 } from './domain-1.entity';

@Injectable({ scope: Scope.REQUEST })
export class Domain1IdLoader extends DataLoader<string, Maybe<Domain1>> {
  constructor(
    @InjectRepository(Domain1)
    private readonly repo: Repository<Domain1>,
  ) {
    super(async (keys: readonly string[]): Promise<Maybe<Domain1>[]> => {
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
