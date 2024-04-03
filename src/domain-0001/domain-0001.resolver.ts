import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain0001 } from './domain-0001.entity';
import { Domain0001Service } from './domain-0001.service';
import { CreateDomain0001Input } from './mutation/create-domain-0001.input';
import { CreateDomain0001Output } from './mutation/create-domain-0001.output';
import { RemoveDomain0001Input } from './mutation/remove-domain-0001.input';
import { RemoveDomain0001Output } from './mutation/remove-domain-0001.output';
import { UpdateDomain0001Input } from './mutation/update-domain-0001.input';
import { UpdateDomain0001Output } from './mutation/update-domain-0001.output';
import { Domain0001PageArgs } from './query/domain-0001-page.args';
import { Domain0001Page } from './query/domain-0001-page.type';

@Resolver(() => Domain0001)
export class Domain0001Resolver {
  constructor(private readonly domain0001Service: Domain0001Service) {}

  @Mutation(() => CreateDomain0001Output)
  async createDomain0001(
    @Args('input') input: CreateDomain0001Input,
  ): Promise<CreateDomain0001Output> {
    const domain0001 = await this.domain0001Service.saveOne(input);
    return { domain0001 };
  }

  @Query(() => Domain0001Page)
  domain0001Page(@Args() args: Domain0001PageArgs): Promise<Domain0001Page> {
    return this.domain0001Service.findPage(args);
  }

  @Query(() => Domain0001)
  domain0001(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Maybe<Domain0001>> {
    return this.domain0001Service.findOne({ where: { id } });
  }

  @Mutation(() => UpdateDomain0001Output)
  async updateDomain0001(
    @Args('input') input: UpdateDomain0001Input,
  ): Promise<UpdateDomain0001Output> {
    const domain0001 = await this.domain0001Service.saveOne(input);
    return { domain0001 };
  }

  @Mutation(() => RemoveDomain0001Output)
  async removeDomain0001(
    @Args('input') input: RemoveDomain0001Input,
  ): Promise<RemoveDomain0001Output> {
    const domain0001 = await this.domain0001Service.removeOne(input.id);
    return { domain0001 };
  }
}
