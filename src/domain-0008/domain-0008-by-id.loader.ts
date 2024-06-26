import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import DataLoader from 'dataloader';
import { Maybe } from 'graphql/jsutils/Maybe';
import { In, Repository } from 'typeorm';

import { Domain0008 } from './domain-0008.entity';

@Injectable({ scope: Scope.REQUEST })
export class Domain0008ByIdLoader extends DataLoader<
  string,
  Maybe<Domain0008>
> {
  constructor(
    @InjectRepository(Domain0008)
    private readonly repo: Repository<Domain0008>,
  ) {
    super(async (keys: readonly string[]): Promise<Maybe<Domain0008>[]> => {
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
