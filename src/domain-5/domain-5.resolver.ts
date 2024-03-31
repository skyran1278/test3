import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { UserDecorator } from 'src/common/user.decorator';
import { User } from 'src/user/user.entity';

import { Domain5 } from './domain-5.entity';
import { Domain5Service } from './domain-5.service';
import { CreateDomain5Input } from './mutation/create-domain-5.input';
import { CreateDomain5Output } from './mutation/create-domain-5.output';
import { RemoveDomain5Input } from './mutation/remove-domain-5.input';
import { RemoveDomain5Output } from './mutation/remove-domain-5.output';
import { UpdateDomain5Input } from './mutation/update-domain-5.input';
import { UpdateDomain5Output } from './mutation/update-domain-5.output';
import { Domain5PageArgs } from './query/domain-5-page.args';
import { Domain5Page } from './query/domain-5-page.type';

@Resolver(() => Domain5)
export class Domain5Resolver {
  constructor(private readonly domain5Service: Domain5Service) {}

  @Mutation(() => CreateDomain5Output)
  async createDomain5(
    @Args('input') input: CreateDomain5Input,
    @UserDecorator() user: User,
  ): Promise<CreateDomain5Output> {
    const domain5 = await this.domain5Service.createOne(input, {
      user,
    });
    return { domain5 };
  }

  @Query(() => Domain5Page)
  domain5Page(@Args() args: Domain5PageArgs): Promise<Domain5Page> {
    return this.domain5Service.findPage(args);
  }

  @Query(() => Domain5)
  domain5(@Args('id', { type: () => ID }) id: string): Promise<Maybe<Domain5>> {
    return this.domain5Service.findOne({ where: { id } });
  }

  @Mutation(() => UpdateDomain5Output)
  async updateDomain5(
    @Args('input') input: UpdateDomain5Input,
    @UserDecorator() user: User,
  ): Promise<UpdateDomain5Output> {
    const domain5 = await this.domain5Service.updateOne(input, {
      user,
    });
    return { domain5 };
  }

  @Mutation(() => RemoveDomain5Output)
  async removeDomain5(
    @Args('input') input: RemoveDomain5Input,
    @UserDecorator() user: User,
  ): Promise<RemoveDomain5Output> {
    const domain5 = await this.domain5Service.removeOne(input.id, {
      user,
    });
    return { domain5 };
  }
}
