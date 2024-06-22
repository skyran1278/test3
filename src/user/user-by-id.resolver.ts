import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { UserById } from './query/user-by-id.type';
import { UserByIdLoader } from './user-by-id.loader';
import { User } from './user.entity';

@Resolver(() => UserById)
export class UserByIdResolver {
  constructor(private readonly loader: UserByIdLoader) {}

  @ResolveField(() => User, { nullable: true })
  async user(@Parent() { userId, user }: UserById): Promise<Maybe<User>> {
    if (user) return user;
    if (userId) return this.loader.load(userId);
    return null;
  }
}
