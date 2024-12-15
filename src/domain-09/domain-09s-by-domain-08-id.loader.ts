import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';
import { Maybe } from 'graphql/jsutils/Maybe';
import { In } from 'typeorm';

import { Domain09 } from './domain-09.entity';
import { Domain09Repository } from './domain-09.repository';

@Injectable({ scope: Scope.REQUEST })
export class Domain09sByDomain08IdLoader extends DataLoader<
  string,
  Maybe<Domain09[]>
> {
  constructor(private readonly repo: Domain09Repository) {
    super(async (keys: readonly string[]): Promise<Maybe<Domain09[]>[]> => {
      const daoArray = await this.repo.find({
        where: {
          domain08Id: In(keys),
        },
      });
      return keys.map((key) =>
        daoArray.filter((dao) => key === dao.domain08Id),
      );
    });
  }
}
