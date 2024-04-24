import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { Transactional } from 'typeorm-transactional';

import { NoAuthentication } from '../auth/no-authentication.decorator';
import { NoAuthorization } from '../auth/no-authorization.decorator';
import { UserDecorator } from '../auth/user.decorator';
import { User } from '../user/user.entity';
import { AuthService } from './auth.service';
import { SignInInput } from './mutation/sign-in.input';
import { SignInOutput } from './mutation/sign-in.output';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

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
