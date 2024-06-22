import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import DataLoader from 'dataloader';
import { Maybe } from 'graphql/jsutils/Maybe';
import { In, Repository } from 'typeorm';

import { Role } from './role.entity';

@Injectable({ scope: Scope.REQUEST })
export class RoleByIdLoader extends DataLoader<string, Maybe<Role>> {
  constructor(
    @InjectRepository(Role)
    private readonly repo: Repository<Role>,
  ) {
    super(async (keys: readonly string[]): Promise<Maybe<Role>[]> => {
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
