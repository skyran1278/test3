import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { Transactional } from 'typeorm-transactional';

import { Domain0025 } from './domain-0025.entity';
import { Domain0025Repository } from './domain-0025.repository';
import { Domain0025Service } from './domain-0025.service';
import { CreateDomain0025Input } from './mutation/create-domain-0025.input';
import { CreateDomain0025Output } from './mutation/create-domain-0025.output';
import { RemoveDomain0025Input } from './mutation/remove-domain-0025.input';
import { RemoveDomain0025Output } from './mutation/remove-domain-0025.output';
import { UpdateDomain0025Input } from './mutation/update-domain-0025.input';
import { UpdateDomain0025Output } from './mutation/update-domain-0025.output';
import { Domain0025PageArgs } from './query/domain-0025-page.args';
import { Domain0025Page } from './query/domain-0025-page.type';

@Resolver(() => Domain0025)
export class Domain0025Resolver {
  constructor(
    private readonly domain0025Repository: Domain0025Repository,
    private readonly domain0025Service: Domain0025Service,
  ) {}

  @Transactional()
  @Mutation(() => CreateDomain0025Output)
  async createDomain0025(
    @Args('input') input: CreateDomain0025Input,
  ): Promise<CreateDomain0025Output> {
    const domain0025 = await this.domain0025Service.saveOne(input);
    return { domain0025 };
  }

  @Transactional()
  @Query(() => Domain0025Page)
  domain0025Page(@Args() args: Domain0025PageArgs): Promise<Domain0025Page> {
    return this.domain0025Service.findPage(args);
  }

  @Transactional()
  @Query(() => Domain0025)
  domain0025(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Maybe<Domain0025>> {
    return this.domain0025Repository.findOne({ where: { id } });
  }

  @Transactional()
  @Mutation(() => UpdateDomain0025Output)
  async updateDomain0025(
    @Args('input') input: UpdateDomain0025Input,
  ): Promise<UpdateDomain0025Output> {
    const domain0025 = await this.domain0025Service.saveOne(input);
    return { domain0025 };
  }

  @Transactional()
  @Mutation(() => RemoveDomain0025Output)
  async removeDomain0025(
    @Args('input') input: RemoveDomain0025Input,
  ): Promise<RemoveDomain0025Output> {
    const domain0025 = await this.domain0025Service.removeOne(input.id);
    return { domain0025 };
  }
}
