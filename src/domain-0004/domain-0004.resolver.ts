import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { UserDecorator } from 'src/common/user.decorator';
import { User } from 'src/user/user.entity';

import { Domain0004 } from './domain-0004.entity';
import { Domain0004Service } from './domain-0004.service';
import { CreateDomain0004Input } from './mutation/create-domain-0004.input';
import { CreateDomain0004Output } from './mutation/create-domain-0004.output';
import { RemoveDomain0004Input } from './mutation/remove-domain-0004.input';
import { RemoveDomain0004Output } from './mutation/remove-domain-0004.output';
import { UpdateDomain0004Input } from './mutation/update-domain-0004.input';
import { UpdateDomain0004Output } from './mutation/update-domain-0004.output';
import { Domain0004PageArgs } from './query/domain-0004-page.args';
import { Domain0004Page } from './query/domain-0004-page.type';

@Resolver(() => Domain0004)
export class Domain0004Resolver {
  constructor(private readonly domain0004Service: Domain0004Service) {}

  @Mutation(() => CreateDomain0004Output)
  async createDomain0004(
    @Args('input') input: CreateDomain0004Input,
    @UserDecorator() user: User,
  ): Promise<CreateDomain0004Output> {
    const domain0004 = await this.domain0004Service.createOne(input, {
      user,
    });
    return { domain0004 };
  }

  @Query(() => Domain0004Page)
  domain0004Page(@Args() args: Domain0004PageArgs): Promise<Domain0004Page> {
    return this.domain0004Service.findPage(args);
  }

  @Query(() => Domain0004)
  domain0004(@Args('id', { type: () => ID }) id: string): Promise<Maybe<Domain0004>> {
    return this.domain0004Service.findOne({ where: { id } });
  }

  @Mutation(() => UpdateDomain0004Output)
  async updateDomain0004(
    @Args('input') input: UpdateDomain0004Input,
    @UserDecorator() user: User,
  ): Promise<UpdateDomain0004Output> {
    const domain0004 = await this.domain0004Service.updateOne(input, {
      user,
    });
    return { domain0004 };
  }

  @Mutation(() => RemoveDomain0004Output)
  async removeDomain0004(
    @Args('input') input: RemoveDomain0004Input,
    @UserDecorator() user: User,
  ): Promise<RemoveDomain0004Output> {
    const domain0004 = await this.domain0004Service.removeOne(input.id, {
      user,
    });
    return { domain0004 };
  }
}
