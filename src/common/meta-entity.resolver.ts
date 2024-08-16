import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { UserByIdLoader } from '../user/user-by-id.loader';
import { User } from '../user/user.entity';
import { MetaEntity } from './meta.entity';

@Resolver(() => MetaEntity)
export class MetaEntityResolver {
  constructor(private readonly userByIdLoader: UserByIdLoader) {}

  @ResolveField(() => User, { nullable: true })
  async createdUser(
    @Parent() { createdUser, createdUserId }: MetaEntity,
  ): Promise<Maybe<User>> {
    if (createdUser) return createdUser;
    if (createdUserId) return this.userByIdLoader.load(createdUserId);
    return null;
  }

  @ResolveField(() => User, { nullable: true })
  async updatedUser(
    @Parent() { updatedUser, updatedUserId }: MetaEntity,
  ): Promise<Maybe<User>> {
    if (updatedUser) return updatedUser;
    if (updatedUserId) return this.userByIdLoader.load(updatedUserId);
    return null;
  }

  @ResolveField(() => User, { nullable: true })
  async deletedUser(
    @Parent() { deletedUser, deletedUserId }: MetaEntity,
  ): Promise<Maybe<User>> {
    if (deletedUser) return deletedUser;
    if (deletedUserId) return this.userByIdLoader.load(deletedUserId);
    return null;
  }
}
