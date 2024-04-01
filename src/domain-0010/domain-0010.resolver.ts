import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { UserDecorator } from 'src/common/user.decorator';
import { User } from 'src/user/user.entity';

import { Domain0010 } from './domain-0010.entity';
import { Domain0010Service } from './domain-0010.service';
import { CreateDomain0010Input } from './mutation/create-domain-0010.input';
import { CreateDomain0010Output } from './mutation/create-domain-0010.output';
import { RemoveDomain0010Input } from './mutation/remove-domain-0010.input';
import { RemoveDomain0010Output } from './mutation/remove-domain-0010.output';
import { UpdateDomain0010Input } from './mutation/update-domain-0010.input';
import { UpdateDomain0010Output } from './mutation/update-domain-0010.output';
import { Domain0010PageArgs } from './query/domain-0010-page.args';
import { Domain0010Page } from './query/domain-0010-page.type';

@Resolver(() => Domain0010)
export class Domain0010Resolver {
  constructor(private readonly domain0010Service: Domain0010Service) {}

  @Mutation(() => CreateDomain0010Output)
  async createDomain0010(
    @Args('input') input: CreateDomain0010Input,
    @UserDecorator() user: User,
  ): Promise<CreateDomain0010Output> {
    const domain0010 = await this.domain0010Service.createOne(input, {
      user,
    });
    return { domain0010 };
  }

  @Query(() => Domain0010Page)
  domain0010Page(@Args() args: Domain0010PageArgs): Promise<Domain0010Page> {
    return this.domain0010Service.findPage(args);
  }

  @Query(() => Domain0010)
  domain0010(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Maybe<Domain0010>> {
    return this.domain0010Service.findOne({ where: { id } });
  }

  @Mutation(() => UpdateDomain0010Output)
  async updateDomain0010(
    @Args('input') input: UpdateDomain0010Input,
    @UserDecorator() user: User,
  ): Promise<UpdateDomain0010Output> {
    const domain0010 = await this.domain0010Service.updateOne(input, {
      user,
    });
    return { domain0010 };
  }

  @Mutation(() => RemoveDomain0010Output)
  async removeDomain0010(
    @Args('input') input: RemoveDomain0010Input,
    @UserDecorator() user: User,
  ): Promise<RemoveDomain0010Output> {
    const domain0010 = await this.domain0010Service.removeOne(input.id, {
      user,
    });
    return { domain0010 };
  }
}
