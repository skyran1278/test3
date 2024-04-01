import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { UserDecorator } from 'src/common/user.decorator';
import { User } from 'src/user/user.entity';

import { Domain0003 } from './domain-0003.entity';
import { Domain0003Service } from './domain-0003.service';
import { CreateDomain0003Input } from './mutation/create-domain-0003.input';
import { CreateDomain0003Output } from './mutation/create-domain-0003.output';
import { RemoveDomain0003Input } from './mutation/remove-domain-0003.input';
import { RemoveDomain0003Output } from './mutation/remove-domain-0003.output';
import { UpdateDomain0003Input } from './mutation/update-domain-0003.input';
import { UpdateDomain0003Output } from './mutation/update-domain-0003.output';
import { Domain0003PageArgs } from './query/domain-0003-page.args';
import { Domain0003Page } from './query/domain-0003-page.type';

@Resolver(() => Domain0003)
export class Domain0003Resolver {
  constructor(private readonly domain0003Service: Domain0003Service) {}

  @Mutation(() => CreateDomain0003Output)
  async createDomain0003(
    @Args('input') input: CreateDomain0003Input,
    @UserDecorator() user: User,
  ): Promise<CreateDomain0003Output> {
    const domain0003 = await this.domain0003Service.createOne(input, {
      user,
    });
    return { domain0003 };
  }

  @Query(() => Domain0003Page)
  domain0003Page(@Args() args: Domain0003PageArgs): Promise<Domain0003Page> {
    return this.domain0003Service.findPage(args);
  }

  @Query(() => Domain0003)
  domain0003(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Maybe<Domain0003>> {
    return this.domain0003Service.findOne({ where: { id } });
  }

  @Mutation(() => UpdateDomain0003Output)
  async updateDomain0003(
    @Args('input') input: UpdateDomain0003Input,
    @UserDecorator() user: User,
  ): Promise<UpdateDomain0003Output> {
    const domain0003 = await this.domain0003Service.updateOne(input, {
      user,
    });
    return { domain0003 };
  }

  @Mutation(() => RemoveDomain0003Output)
  async removeDomain0003(
    @Args('input') input: RemoveDomain0003Input,
    @UserDecorator() user: User,
  ): Promise<RemoveDomain0003Output> {
    const domain0003 = await this.domain0003Service.removeOne(input.id, {
      user,
    });
    return { domain0003 };
  }
}
