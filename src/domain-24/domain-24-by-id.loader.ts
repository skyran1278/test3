import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import DataLoader from 'dataloader';
import { Maybe } from 'graphql/jsutils/Maybe';
import { In, Repository } from 'typeorm';

import { Domain24 } from './domain-24.entity';

@Injectable({ scope: Scope.REQUEST })
export class Domain24ByIdLoader extends DataLoader<string, Maybe<Domain24>> {
  constructor(
    @InjectRepository(Domain24)
    private readonly repo: Repository<Domain24>,
  ) {
    super(async (keys: readonly string[]): Promise<Maybe<Domain24>[]> => {
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
