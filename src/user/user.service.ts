import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { ServiceMetadata } from 'src/common/interface/service-metadata.interface';
import { NodeIdNotFoundError } from 'src/common/node-id-not-found.error';
import { EntityManager, FindOneOptions, Repository } from 'typeorm';

import { CreateUserInput } from './mutation/create-user.input';
import { UpdateUserInput } from './mutation/update-user.input';
import { UserPageArgs } from './query/user-page.args';
import { User } from './user.entity';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    private readonly manager: EntityManager,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {
    super(userRepo);
  }

  async createOne(
    input: CreateUserInput | User,
    metadata?: ServiceMetadata,
  ): Promise<User> {
    const create = async (manager: EntityManager) => {
      const dao = input instanceof User ? input : this.create(input);
      if (metadata?.user) {
        dao.createUserId = metadata.user.id;
        dao.updateUserId = metadata.user.id;
      }
      return this.save(dao, { manager });
    };

    if (metadata?.manager) {
      return create(metadata.manager);
    }

    return this.manager.transaction('READ COMMITTED', create);
  }

  findOne(
    options: FindOneOptions<User>,
    metadata?: ServiceMetadata,
  ): Promise<User | null> {
    const userRepo = metadata?.manager
      ? metadata.manager.getRepository(User)
      : this.userRepo;
    return userRepo.findOne(options);
  }

  findPage(args: UserPageArgs, metadata?: ServiceMetadata) {
    return this.findNodePage(args, metadata);
  }

  async updateOne(input: UpdateUserInput, metadata: ServiceMetadata) {
    const update = async (manager: EntityManager) => {
      const userRepo = manager.getRepository(User);
      const existUser = await userRepo.findOne({
        where: { id: input.id },
      });
      if (!existUser) {
        throw new NodeIdNotFoundError(User, input.id);
      }

      return this.save(
        {
          ...existUser,
          ...input,
          updateUserId: metadata.user.id,
        },
        { manager },
      );
    };

    if (metadata?.manager) {
      return update(metadata.manager);
    }

    return this.manager.transaction('READ COMMITTED', update);
  }

  async removeOne(id: string, metadata: ServiceMetadata) {
    const remove = async (manager: EntityManager) => {
      const userRepo = manager.getRepository(User);

      const user = await userRepo.findOneBy({ id });
      if (!user) {
        throw new NodeIdNotFoundError(User, id);
      }

      return userRepo.softRemove(user);
    };

    if (metadata?.manager) {
      return remove(metadata.manager);
    }

    return this.manager.transaction('READ COMMITTED', remove);
  }
}
