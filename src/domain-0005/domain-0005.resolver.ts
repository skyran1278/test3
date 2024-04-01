import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { UserDecorator } from 'src/common/user.decorator';
import { User } from 'src/user/user.entity';

import { Domain0005 } from './domain-0005.entity';
import { Domain0005Service } from './domain-0005.service';
import { CreateDomain0005Input } from './mutation/create-domain-0005.input';
import { CreateDomain0005Output } from './mutation/create-domain-0005.output';
import { RemoveDomain0005Input } from './mutation/remove-domain-0005.input';
import { RemoveDomain0005Output } from './mutation/remove-domain-0005.output';
import { UpdateDomain0005Input } from './mutation/update-domain-0005.input';
import { UpdateDomain0005Output } from './mutation/update-domain-0005.output';
import { Domain0005PageArgs } from './query/domain-0005-page.args';
import { Domain0005Page } from './query/domain-0005-page.type';

@Resolver(() => Domain0005)
export class Domain0005Resolver {
  constructor(private readonly domain0005Service: Domain0005Service) {}

  @Mutation(() => CreateDomain0005Output)
  async createDomain0005(
    @Args('input') input: CreateDomain0005Input,
    @UserDecorator() user: User,
  ): Promise<CreateDomain0005Output> {
    const domain0005 = await this.domain0005Service.createOne(input, {
      user,
    });
    return { domain0005 };
  }

  @Query(() => Domain0005Page)
  domain0005Page(@Args() args: Domain0005PageArgs): Promise<Domain0005Page> {
    return this.domain0005Service.findPage(args);
  }

  @Query(() => Domain0005)
  domain0005(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Maybe<Domain0005>> {
    return this.domain0005Service.findOne({ where: { id } });
  }

  @Mutation(() => UpdateDomain0005Output)
  async updateDomain0005(
    @Args('input') input: UpdateDomain0005Input,
    @UserDecorator() user: User,
  ): Promise<UpdateDomain0005Output> {
    const domain0005 = await this.domain0005Service.updateOne(input, {
      user,
    });
    return { domain0005 };
  }

  @Mutation(() => RemoveDomain0005Output)
  async removeDomain0005(
    @Args('input') input: RemoveDomain0005Input,
    @UserDecorator() user: User,
  ): Promise<RemoveDomain0005Output> {
    const domain0005 = await this.domain0005Service.removeOne(input.id, {
      user,
    });
    return { domain0005 };
  }
}
