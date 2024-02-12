import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

import { MetaEntity } from './meta.entity';

@Resolver(() => MetaEntity)
export class MetaEntityResolver {
  constructor(private readonly userService: UserService) {}

  @ResolveField(() => User, { nullable: true })
  async createUser(
    @Parent() { createdUserId }: MetaEntity,
  ): Promise<Maybe<User>> {
    if (!createdUserId) return;
    return this.userService.findOne({ where: { id: createdUserId } });
  }

  @ResolveField(() => User, { nullable: true })
  async updateUser(
    @Parent() { updatedUserId }: MetaEntity,
  ): Promise<Maybe<User>> {
    if (!updatedUserId) return;
    return this.userService.findOne({ where: { id: updatedUserId } });
  }

  @ResolveField(() => User, { nullable: true })
  async deleteUser(
    @Parent() { deletedUserId }: MetaEntity,
  ): Promise<Maybe<User>> {
    if (!deletedUserId) return;
    return this.userService.findOne({ where: { id: deletedUserId } });
  }
}
