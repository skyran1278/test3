import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { UserDecorator } from 'src/common/user.decorator';
import { User } from 'src/user/user.entity';

import { Domain2 } from './domain-2.entity';
import { Domain2Service } from './domain-2.service';
import { CreateDomain2Input } from './mutation/create-domain-2.input';
import { CreateDomain2Output } from './mutation/create-domain-2.output';
import { RemoveDomain2Input } from './mutation/remove-domain-2.input';
import { RemoveDomain2Output } from './mutation/remove-domain-2.output';
import { UpdateDomain2Input } from './mutation/update-domain-2.input';
import { UpdateDomain2Output } from './mutation/update-domain-2.output';
import { Domain2PageArgs } from './query/domain-2-page.args';
import { Domain2Page } from './query/domain-2-page.type';

@Resolver(() => Domain2)
export class Domain2Resolver {
  constructor(private readonly domain2Service: Domain2Service) {}

  @Mutation(() => CreateDomain2Output)
  async createDomain2(
    @Args('input') input: CreateDomain2Input,
    @UserDecorator() user: User,
  ): Promise<CreateDomain2Output> {
    const domain2 = await this.domain2Service.createOne(input, {
      user,
    });
    return { domain2 };
  }

  @Query(() => Domain2Page)
  domain2Page(@Args() args: Domain2PageArgs): Promise<Domain2Page> {
    return this.domain2Service.findPage(args);
  }

  @Query(() => Domain2)
  domain2(@Args('id', { type: () => ID }) id: string): Promise<Maybe<Domain2>> {
    return this.domain2Service.findOne({ where: { id } });
  }

  @Mutation(() => UpdateDomain2Output)
  async updateDomain2(
    @Args('input') input: UpdateDomain2Input,
    @UserDecorator() user: User,
  ): Promise<UpdateDomain2Output> {
    const domain2 = await this.domain2Service.updateOne(input, {
      user,
    });
    return { domain2 };
  }

  @Mutation(() => RemoveDomain2Output)
  async removeDomain2(
    @Args('input') input: RemoveDomain2Input,
    @UserDecorator() user: User,
  ): Promise<RemoveDomain2Output> {
    const domain2 = await this.domain2Service.removeOne(input.id, {
      user,
    });
    return { domain2 };
  }
}
