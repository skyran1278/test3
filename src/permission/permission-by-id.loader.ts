import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import DataLoader from 'dataloader';
import { Maybe } from 'graphql/jsutils/Maybe';
import { In, Repository } from 'typeorm';

import { Permission } from './permission.entity';

@Injectable({ scope: Scope.REQUEST })
export class PermissionByIdLoader extends DataLoader<
  string,
  Maybe<Permission>
> {
  constructor(
    @InjectRepository(Permission)
    private readonly repo: Repository<Permission>,
  ) {
    super(async (keys: readonly string[]): Promise<Maybe<Permission>[]> => {
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
