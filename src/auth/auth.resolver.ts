import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { NoAuthorization } from 'src/common/security/no-authorization.decorator';
import { UserDecorator } from 'src/common/security/user.decorator';
import { User } from 'src/user/user.entity';

import { AuthService } from './auth.service';
import { SignInInput } from './mutation/sign-in.input';
import { SignInOutput } from './mutation/sign-in.output';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => SignInOutput)
  async signIn(
    @Args('input') input: SignInInput,
    @UserDecorator() user: User,
  ): Promise<SignInOutput> {
    return this.authService.signIn(input, {
      user,
    });
  }

  @NoAuthorization()
  @Query(() => User, { nullable: true })
  me(@UserDecorator() user: User): Maybe<User> {
    return user;
  }
}
