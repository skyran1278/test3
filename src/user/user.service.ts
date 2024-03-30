import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { ServiceOptions } from 'src/common/service-options.interface';
import { EntityManager, Repository } from 'typeorm';

import { User } from './user.entity';
import { CreateUserInput } from './mutation/create-user.input';
import { UpdateUserInput } from './mutation/update-user.input';
import { UserPageArgs } from './query/user-page.args';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    private readonly manager: EntityManager,
    @InjectRepository(User)
    readonly repo: Repository<User>,
  ) {
    super(repo);
  }

  async createOne(
    input: CreateUserInput | User,
    options: ServiceOptions,
  ): Promise<User> {
    const transaction = async (manager: EntityManager) => {
      return this.save(input, { manager, user: options.user });
    };

    return options.manager
      ? transaction(options.manager)
      : this.manager.transaction('READ COMMITTED', transaction);
  }

  findPage(args: UserPageArgs, options?: ServiceOptions) {
    return this.findNodePage(args, options);
  }

  async updateOne(input: UpdateUserInput, options: ServiceOptions) {
    const transaction = async (manager: EntityManager) => {
      const existUser = await this.findOneOrFail(
        {
          where: { id: input.id },
        },
        { manager },
      );

      return this.save(
        {
          ...existUser,
          ...input,
        },
        { manager, user: options.user },
      );
    };

    return options.manager
      ? transaction(options.manager)
      : this.manager.transaction('READ COMMITTED', transaction);
  }

  async removeOne(id: string, options: ServiceOptions) {
    const transaction = async (manager: EntityManager) => {
      const user = await this.findOneByOrFail({ id });

      return this.softRemove(user, { manager, user: options?.user });
    };

    return options.manager
      ? transaction(options.manager)
      : this.manager.transaction('READ COMMITTED', transaction);
  }
}
