import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import DataLoader from 'dataloader';
import { Maybe } from 'graphql/jsutils/Maybe';
import { In, Repository } from 'typeorm';

import { Domain09 } from './domain-09.entity';

@Injectable({ scope: Scope.REQUEST })
export class Domain09ByIdLoader extends DataLoader<string, Maybe<Domain09>> {
  constructor(
    @InjectRepository(Domain09)
    private readonly repo: Repository<Domain09>,
  ) {
    super(async (keys: readonly string[]): Promise<Maybe<Domain09>[]> => {
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
