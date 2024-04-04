import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { UserId } from './query/user-id.type';
import { UserIdLoader } from './user-id.loader';
import { User } from './user.entity';

@Resolver(() => UserId)
export class UserIdResolver {
  constructor(private readonly loader: UserIdLoader) {}

  @ResolveField(() => User, { nullable: true })
  async user(@Parent() { userId, user }: UserId): Promise<Maybe<User>> {
    if (user) return user;
    if (userId) return this.loader.load(userId);
    return null;
  }
}
