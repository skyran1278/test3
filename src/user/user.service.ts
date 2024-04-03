import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';

import { CreateUserInput } from './mutation/create-user.input';
import { UpdateUserInput } from './mutation/update-user.input';
import { UserPageArgs } from './query/user-page.args';
import { User } from './user.entity';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @InjectRepository(User)
    readonly repo: Repository<User>,
  ) {
    super(repo);
  }

  @Transactional()
  async saveOne(input: CreateUserInput | UpdateUserInput): Promise<User> {
    return this.save(input);
  }

  @Transactional()
  findPage(args: UserPageArgs) {
    return this.findNodePage(args);
  }

  @Transactional()
  async removeOne(id: string) {
    const user = await this.findOneByOrFail({ id });

    return this.softRemove(user);
  }
}
