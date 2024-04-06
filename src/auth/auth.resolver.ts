import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { NoAuthentication } from 'src/auth/no-authentication.decorator';
import { NoAuthorization } from 'src/auth/no-authorization.decorator';
import { UserDecorator } from 'src/auth/user.decorator';
import { User } from 'src/user/user.entity';
import { Transactional } from 'typeorm-transactional';

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
