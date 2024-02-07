import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { UserDecorator } from 'src/common/security/user.decorator';
import { User } from 'src/user/user.entity';

import { Domain1 } from './domain-1.entity';
import { Domain1Service } from './domain-1.service';
import { CreateDomain1Input } from './mutation/create-domain-1.input';
import { CreateDomain1Output } from './mutation/create-domain-1.output';
import { RemoveDomain1Input } from './mutation/remove-domain-1.input';
import { RemoveDomain1Output } from './mutation/remove-domain-1.output';
import { UpdateDomain1Input } from './mutation/update-domain-1.input';
import { UpdateDomain1Output } from './mutation/update-domain-1.output';
import { Domain1PageArgs } from './query/domain-1-page.args';
import { Domain1Page } from './query/domain-1-page.type';

@Resolver(() => Domain1)
export class Domain1Resolver {
  constructor(private readonly domain1Service: Domain1Service) {}

  @Mutation(() => CreateDomain1Output)
  async createDomain1(
    @Args('input') input: CreateDomain1Input,
    @UserDecorator() user: User,
  ): Promise<CreateDomain1Output> {
    const domain1 = await this.domain1Service.createOne(input, {
      user,
    });
    return { domain1 };
  }

  @Query(() => Domain1Page)
  domain1Page(@Args() args: Domain1PageArgs): Promise<Domain1Page> {
    return this.domain1Service.findPage(args);
  }

  @Query(() => Domain1)
  domain1(@Args('id', { type: () => ID }) id: string): Promise<Maybe<Domain1>> {
    return this.domain1Service.findOne({ where: { id } });
  }

  @Mutation(() => UpdateDomain1Output)
  async updateDomain1(
    @Args('input') input: UpdateDomain1Input,
    @UserDecorator() user: User,
  ): Promise<UpdateDomain1Output> {
    const domain1 = await this.domain1Service.updateOne(input, {
      user,
    });
    return { domain1 };
  }

  @Mutation(() => RemoveDomain1Output)
  async removeDomain1(
    @Args('input') input: RemoveDomain1Input,
    @UserDecorator() user: User,
  ): Promise<RemoveDomain1Output> {
    const domain1 = await this.domain1Service.removeOne(input.id, {
      user,
    });
    return { domain1 };
  }
}
