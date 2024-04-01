import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import DataLoader from 'dataloader';
import { Maybe } from 'graphql/jsutils/Maybe';
import { In, Repository } from 'typeorm';

import { Domain0009 } from './domain-0009.entity';

@Injectable({ scope: Scope.REQUEST })
export class Domain0009IdLoader extends DataLoader<string, Maybe<Domain0009>> {
  constructor(
    @InjectRepository(Domain0009)
    private readonly repo: Repository<Domain0009>,
  ) {
    super(async (keys: readonly string[]): Promise<Maybe<Domain0009>[]> => {
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
