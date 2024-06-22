import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';
import { Maybe } from 'graphql/jsutils/Maybe';
import { In } from 'typeorm';

import { Domain0009 } from './domain-0009.entity';
import { Domain0009Repository } from './domain-0009.repository';

@Injectable({ scope: Scope.REQUEST })
export class Domain0009sByDomain0008IdLoader extends DataLoader<
  string,
  Maybe<Domain0009[]>
> {
  constructor(private readonly repo: Domain0009Repository) {
    super(async (keys: readonly string[]): Promise<Maybe<Domain0009[]>[]> => {
      const daoArray = await this.repo.find({
        where: {
          domain0008Id: In(keys),
        },
      });
      return keys.map((key) =>
        daoArray.filter((dao) => key === dao.domain0008Id),
      );
    });
  }
}
