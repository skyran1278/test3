import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import DataLoader from 'dataloader';
import { Maybe } from 'graphql/jsutils/Maybe';
import { In, Repository } from 'typeorm';

import { Domain0005 } from './domain-0005.entity';

@Injectable({ scope: Scope.REQUEST })
export class Domain0005ByIdLoader extends DataLoader<
  string,
  Maybe<Domain0005>
> {
  constructor(
    @InjectRepository(Domain0005)
    private readonly repo: Repository<Domain0005>,
  ) {
    super(async (keys: readonly string[]): Promise<Maybe<Domain0005>[]> => {
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