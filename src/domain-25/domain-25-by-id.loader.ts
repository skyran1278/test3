import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import DataLoader from 'dataloader';
import { Maybe } from 'graphql/jsutils/Maybe';
import { In, Repository } from 'typeorm';

import { Domain25 } from './domain-25.entity';

@Injectable({ scope: Scope.REQUEST })
export class Domain25ByIdLoader extends DataLoader<string, Maybe<Domain25>> {
  constructor(
    @InjectRepository(Domain25)
    private readonly repo: Repository<Domain25>,
  ) {
    super(async (keys: readonly string[]): Promise<Maybe<Domain25>[]> => {
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
