import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import DataLoader from 'dataloader';
import { Maybe } from 'graphql/jsutils/Maybe';
import { In, Repository } from 'typeorm';

import { User } from './user.entity';

@Injectable({ scope: Scope.REQUEST })
export class UserByIdLoader extends DataLoader<string, Maybe<User>> {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {
    super(async (ids: readonly string[]): Promise<Maybe<User>[]> => {
      const users = await this.userRepo.find({
        where: {
          id: In(ids),
        },
      });
      const userMap = new Map(users.map((user) => [user.id, user]));
      return ids.map((key) => userMap.get(key));
    });
  }
}
