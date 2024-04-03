import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain0006 } from './domain-0006.entity';
import { Domain0006Service } from './domain-0006.service';
import { CreateDomain0006Input } from './mutation/create-domain-0006.input';
import { CreateDomain0006Output } from './mutation/create-domain-0006.output';
import { RemoveDomain0006Input } from './mutation/remove-domain-0006.input';
import { RemoveDomain0006Output } from './mutation/remove-domain-0006.output';
import { UpdateDomain0006Input } from './mutation/update-domain-0006.input';
import { UpdateDomain0006Output } from './mutation/update-domain-0006.output';
import { Domain0006PageArgs } from './query/domain-0006-page.args';
import { Domain0006Page } from './query/domain-0006-page.type';

@Resolver(() => Domain0006)
export class Domain0006Resolver {
  constructor(private readonly domain0006Service: Domain0006Service) {}

  @Mutation(() => CreateDomain0006Output)
  async createDomain0006(
    @Args('input') input: CreateDomain0006Input,
  ): Promise<CreateDomain0006Output> {
    const domain0006 = await this.domain0006Service.saveOne(input);
    return { domain0006 };
  }

  @Query(() => Domain0006Page)
  domain0006Page(@Args() args: Domain0006PageArgs): Promise<Domain0006Page> {
    return this.domain0006Service.findPage(args);
  }

  @Query(() => Domain0006)
  domain0006(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Maybe<Domain0006>> {
    return this.domain0006Service.findOne({ where: { id } });
  }

  @Mutation(() => UpdateDomain0006Output)
  async updateDomain0006(
    @Args('input') input: UpdateDomain0006Input,
  ): Promise<UpdateDomain0006Output> {
    const domain0006 = await this.domain0006Service.saveOne(input);
    return { domain0006 };
  }

  @Mutation(() => RemoveDomain0006Output)
  async removeDomain0006(
    @Args('input') input: RemoveDomain0006Input,
  ): Promise<RemoveDomain0006Output> {
    const domain0006 = await this.domain0006Service.removeOne(input.id);
    return { domain0006 };
  }
}
