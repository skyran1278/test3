import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import DataLoader from 'dataloader';
import { Maybe } from 'graphql/jsutils/Maybe';
import { In, Repository } from 'typeorm';

import { Domain0022 } from './domain-0022.entity';

@Injectable({ scope: Scope.REQUEST })
export class Domain0022ByIdLoader extends DataLoader<
  string,
  Maybe<Domain0022>
> {
  constructor(
    @InjectRepository(Domain0022)
    private readonly repo: Repository<Domain0022>,
  ) {
    super(async (keys: readonly string[]): Promise<Maybe<Domain0022>[]> => {
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
