import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';
import { Maybe } from 'graphql/jsutils/Maybe';
import { In } from 'typeorm';

import { Domain10 } from './domain-10.entity';
import { Domain10Repository } from './domain-10.repository';

@Injectable({ scope: Scope.REQUEST })
export class Domain10sByDomain09IdLoader extends DataLoader<
  string,
  Maybe<Domain10[]>
> {
  constructor(private readonly repo: Domain10Repository) {
    super(async (keys: readonly string[]): Promise<Maybe<Domain10[]>[]> => {
      const daoArray = await this.repo.find({
        where: {
          domain09Id: In(keys),
        },
      });
      return keys.map((key) =>
        daoArray.filter((dao) => key === dao.domain09Id),
      );
    });
  }
}
