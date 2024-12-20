import { Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';

import { CreateUserInput } from './mutation/create-user.input';
import { UpdateUserInput } from './mutation/update-user.input';
import { UserPageArgs } from './query/user-page.args';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly repo: UserRepository) {}

  @Transactional()
  async saveOne(input: CreateUserInput | UpdateUserInput): Promise<User> {
    const user = this.repo.create(input);
    await this.repo.save(user);

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
