import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { Transactional } from 'typeorm-transactional';

import { NoAuthentication } from '../security/no-authentication.decorator';
import { NoAuthorization } from '../security/no-authorization.decorator';
import { UserDecorator } from '../security/user.decorator';
import { User } from '../user/user.entity';
import { SignInInput } from './mutation/sign-in.input';
import { SignInOutput } from './mutation/sign-in.output';
import { SecurityService } from './security.service';

@Resolver(() => User)
export class SecurityResolver {
  constructor(private readonly authService: SecurityService) {}

  @NoAuthentication()
  @Transactional()
  @Mutation(() => SignInOutput)
  async signIn(@Args('input') input: SignInInput): Promise<SignInOutput> {
    return this.authService.signIn(input);
  }

  @NoAuthorization()
  @Transactional()
  @Query(() => User, { nullable: true })
  me(@UserDecorator() user: User): Maybe<User> {
    return user;
  }
}
