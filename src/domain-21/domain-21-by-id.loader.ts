import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import DataLoader from 'dataloader';
import { Maybe } from 'graphql/jsutils/Maybe';
import { In, Repository } from 'typeorm';

import { Domain21 } from './domain-21.entity';

@Injectable({ scope: Scope.REQUEST })
export class Domain21ByIdLoader extends DataLoader<string, Maybe<Domain21>> {
  constructor(
    @InjectRepository(Domain21)
    private readonly repo: Repository<Domain21>,
  ) {
    super(async (keys: readonly string[]): Promise<Maybe<Domain21>[]> => {
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
