import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { UserDecorator } from 'src/common/user.decorator';
import { User } from 'src/user/user.entity';

import { Domain0011 } from './domain-0011.entity';
import { Domain0011Service } from './domain-0011.service';
import { CreateDomain0011Input } from './mutation/create-domain-0011.input';
import { CreateDomain0011Output } from './mutation/create-domain-0011.output';
import { RemoveDomain0011Input } from './mutation/remove-domain-0011.input';
import { RemoveDomain0011Output } from './mutation/remove-domain-0011.output';
import { UpdateDomain0011Input } from './mutation/update-domain-0011.input';
import { UpdateDomain0011Output } from './mutation/update-domain-0011.output';
import { Domain0011PageArgs } from './query/domain-0011-page.args';
import { Domain0011Page } from './query/domain-0011-page.type';

@Resolver(() => Domain0011)
export class Domain0011Resolver {
  constructor(private readonly domain0011Service: Domain0011Service) {}

  @Mutation(() => CreateDomain0011Output)
  async createDomain0011(
    @Args('input') input: CreateDomain0011Input,
    @UserDecorator() user: User,
  ): Promise<CreateDomain0011Output> {
    const domain0011 = await this.domain0011Service.saveOne(input, {
      user,
    });
    return { domain0011 };
  }

  @Query(() => Domain0011Page)
  domain0011Page(@Args() args: Domain0011PageArgs): Promise<Domain0011Page> {
    return this.domain0011Service.findPage(args);
  }

  @Query(() => Domain0011)
  domain0011(@Args('id', { type: () => ID }) id: string): Promise<Maybe<Domain0011>> {
    return this.domain0011Service.findOne({ where: { id } });
  }

  @Mutation(() => UpdateDomain0011Output)
  async updateDomain0011(
    @Args('input') input: UpdateDomain0011Input,
    @UserDecorator() user: User,
  ): Promise<UpdateDomain0011Output> {
    const domain0011 = await this.domain0011Service.saveOne(input, {
      user,
    });
    return { domain0011 };
  }

  @Mutation(() => RemoveDomain0011Output)
  async removeDomain0011(
    @Args('input') input: RemoveDomain0011Input,
    @UserDecorator() user: User,
  ): Promise<RemoveDomain0011Output> {
    const domain0011 = await this.domain0011Service.removeOne(input.id, {
      user,
    });
    return { domain0011 };
  }
}
