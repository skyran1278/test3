import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { UserDecorator } from 'src/common/user.decorator';
import { User } from 'src/user/user.entity';

import { Domain4 } from './domain-4.entity';
import { Domain4Service } from './domain-4.service';
import { CreateDomain4Input } from './mutation/create-domain-4.input';
import { CreateDomain4Output } from './mutation/create-domain-4.output';
import { RemoveDomain4Input } from './mutation/remove-domain-4.input';
import { RemoveDomain4Output } from './mutation/remove-domain-4.output';
import { UpdateDomain4Input } from './mutation/update-domain-4.input';
import { UpdateDomain4Output } from './mutation/update-domain-4.output';
import { Domain4PageArgs } from './query/domain-4-page.args';
import { Domain4Page } from './query/domain-4-page.type';

@Resolver(() => Domain4)
export class Domain4Resolver {
  constructor(private readonly domain4Service: Domain4Service) {}

  @Mutation(() => CreateDomain4Output)
  async createDomain4(
    @Args('input') input: CreateDomain4Input,
    @UserDecorator() user: User,
  ): Promise<CreateDomain4Output> {
    const domain4 = await this.domain4Service.createOne(input, {
      user,
    });
    return { domain4 };
  }

  @Query(() => Domain4Page)
  domain4Page(@Args() args: Domain4PageArgs): Promise<Domain4Page> {
    return this.domain4Service.findPage(args);
  }

  @Query(() => Domain4)
  domain4(@Args('id', { type: () => ID }) id: string): Promise<Maybe<Domain4>> {
    return this.domain4Service.findOne({ where: { id } });
  }

  @Mutation(() => UpdateDomain4Output)
  async updateDomain4(
    @Args('input') input: UpdateDomain4Input,
    @UserDecorator() user: User,
  ): Promise<UpdateDomain4Output> {
    const domain4 = await this.domain4Service.updateOne(input, {
      user,
    });
    return { domain4 };
  }

  @Mutation(() => RemoveDomain4Output)
  async removeDomain4(
    @Args('input') input: RemoveDomain4Input,
    @UserDecorator() user: User,
  ): Promise<RemoveDomain4Output> {
    const domain4 = await this.domain4Service.removeOne(input.id, {
      user,
    });
    return { domain4 };
  }
}
