import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { Transactional } from 'typeorm-transactional';

import { CreateUserInput } from './mutation/create-user.input';
import { CreateUserOutput } from './mutation/create-user.output';
import { RemoveUserInput } from './mutation/remove-user.input';
import { RemoveUserOutput } from './mutation/remove-user.output';
import { UpdateUserInput } from './mutation/update-user.input';
import { UpdateUserOutput } from './mutation/update-user.output';
import { UserPageArgs } from './query/user-page.args';
import { UserPage } from './query/user-page.type';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userService: UserService,
  ) {}

  @Transactional()
  @Mutation(() => CreateUserOutput)
  async createUser(
    @Args('input') input: CreateUserInput,
  ): Promise<CreateUserOutput> {
    const user = await this.userService.saveOne(input);
    return { user };
  }

  @Transactional()
  @Query(() => UserPage)
  userPage(@Args() args: UserPageArgs): Promise<UserPage> {
    return this.userService.findPage(args);
  }

  @Transactional()
  @Query(() => User)
  user(@Args('id', { type: () => ID }) id: string): Promise<Maybe<User>> {
    return this.userRepository.findOne({ where: { id } });
  }

  @Transactional()
  @Mutation(() => UpdateUserOutput)
  async updateUser(
    @Args('input') input: UpdateUserInput,
  ): Promise<UpdateUserOutput> {
    const user = await this.userService.saveOne(input);
    return { user };
  }

  @Transactional()
  @Mutation(() => RemoveUserOutput)
  async removeUser(
    @Args('input') input: RemoveUserInput,
  ): Promise<RemoveUserOutput> {
    const user = await this.userService.removeOne(input.id);
    return { user };
  }
}
