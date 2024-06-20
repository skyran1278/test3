import { Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';

import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { CreateUserInput } from './mutation/create-user.input';
import { UpdateUserInput } from './mutation/update-user.input';
import { UserPageArgs } from './query/user-page.args';

@Injectable()
export class UserService {
  constructor(private readonly repo: UserRepository) {}

  @Transactional()
  async saveOne(
    input: CreateUserInput | UpdateUserInput,
  ): Promise<User> {
    const user = await this.repo.save(input);

    return user;
  }

  @Transactional()
  findPage(args: UserPageArgs) {
    return this.repo.findNodePage(args);
  }

  @Transactional()
  async removeOne(id: string) {
    const user = await this.repo.findOneByOrFail({ id });

    return this.repo.softRemove(user);
  }
}
