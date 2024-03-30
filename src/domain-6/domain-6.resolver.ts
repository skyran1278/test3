import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { UserDecorator } from 'src/common/user.decorator';
import { User } from 'src/user/user.entity';

import { Domain6 } from './domain-6.entity';
import { Domain6Service } from './domain-6.service';
import { CreateDomain6Input } from './mutation/create-domain-6.input';
import { CreateDomain6Output } from './mutation/create-domain-6.output';
import { RemoveDomain6Input } from './mutation/remove-domain-6.input';
import { RemoveDomain6Output } from './mutation/remove-domain-6.output';
import { UpdateDomain6Input } from './mutation/update-domain-6.input';
import { UpdateDomain6Output } from './mutation/update-domain-6.output';
import { Domain6PageArgs } from './query/domain-6-page.args';
import { Domain6Page } from './query/domain-6-page.type';

@Resolver(() => Domain6)
export class Domain6Resolver {
  constructor(private readonly domain6Service: Domain6Service) {}

  @Mutation(() => CreateDomain6Output)
  async createDomain6(
    @Args('input') input: CreateDomain6Input,
    @UserDecorator() user: User,
  ): Promise<CreateDomain6Output> {
    const domain6 = await this.domain6Service.createOne(input, {
      user,
    });
    return { domain6 };
  }

  @Query(() => Domain6Page)
  domain6Page(@Args() args: Domain6PageArgs): Promise<Domain6Page> {
    return this.domain6Service.findPage(args);
  }

  @Query(() => Domain6)
  domain6(@Args('id', { type: () => ID }) id: string): Promise<Maybe<Domain6>> {
    return this.domain6Service.findOne({ where: { id } });
  }

  @Mutation(() => UpdateDomain6Output)
  async updateDomain6(
    @Args('input') input: UpdateDomain6Input,
    @UserDecorator() user: User,
  ): Promise<UpdateDomain6Output> {
    const domain6 = await this.domain6Service.updateOne(input, {
      user,
    });
    return { domain6 };
  }

  @Mutation(() => RemoveDomain6Output)
  async removeDomain6(
    @Args('input') input: RemoveDomain6Input,
    @UserDecorator() user: User,
  ): Promise<RemoveDomain6Output> {
    const domain6 = await this.domain6Service.removeOne(input.id, {
      user,
    });
    return { domain6 };
  }
}
