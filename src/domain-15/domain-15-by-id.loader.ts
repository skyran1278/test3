import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import DataLoader from 'dataloader';
import { Maybe } from 'graphql/jsutils/Maybe';
import { In, Repository } from 'typeorm';

import { Domain15 } from './domain-15.entity';

@Injectable({ scope: Scope.REQUEST })
export class Domain15ByIdLoader extends DataLoader<string, Maybe<Domain15>> {
  constructor(
    @InjectRepository(Domain15)
    private readonly repo: Repository<Domain15>,
  ) {
    super(async (keys: readonly string[]): Promise<Maybe<Domain15>[]> => {
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
