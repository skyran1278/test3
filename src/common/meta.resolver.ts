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
    @Parent() { createUserId }: MetaEntity,
  ): Promise<Maybe<User>> {
    if (!createUserId) return;
    return this.userService.findOne({ where: { id: createUserId } });
  }

  @ResolveField(() => User, { nullable: true })
  async updateUser(
    @Parent() { updateUserId }: MetaEntity,
  ): Promise<Maybe<User>> {
    if (!updateUserId) return;
    return this.userService.findOne({ where: { id: updateUserId } });
  }

  @ResolveField(() => User, { nullable: true })
  async deleteUser(
    @Parent() { deleteUserId }: MetaEntity,
  ): Promise<Maybe<User>> {
    if (!deleteUserId) return;
    return this.userService.findOne({ where: { id: deleteUserId } });
  }
}
