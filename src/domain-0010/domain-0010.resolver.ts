import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { Transactional } from 'typeorm-transactional';

import { Domain0010 } from './domain-0010.entity';
import { Domain0010Repository } from './domain-0010.repository';
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
  constructor(
    private readonly domain0010Repository: Domain0010Repository,
    private readonly domain0010Service: Domain0010Service,
  ) {}

  @Transactional()
  @Mutation(() => CreateDomain0010Output)
  async createDomain0010(
    @Args('input') input: CreateDomain0010Input,
  ): Promise<CreateDomain0010Output> {
    const domain0010 = await this.domain0010Service.saveOne(input);
    return { domain0010 };
  }

  @Transactional()
  @Query(() => Domain0010Page)
  domain0010Page(@Args() args: Domain0010PageArgs): Promise<Domain0010Page> {
    return this.domain0010Service.findPage(args);
  }

  @Transactional()
  @Query(() => Domain0010)
  domain0010(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Maybe<Domain0010>> {
    return this.domain0010Repository.findOne({ where: { id } });
  }

  @Transactional()
  @Mutation(() => UpdateDomain0010Output)
  async updateDomain0010(
    @Args('input') input: UpdateDomain0010Input,
  ): Promise<UpdateDomain0010Output> {
    const domain0010 = await this.domain0010Service.saveOne(input);
    return { domain0010 };
  }

  @Transactional()
  @Mutation(() => RemoveDomain0010Output)
  async removeDomain0010(
    @Args('input') input: RemoveDomain0010Input,
  ): Promise<RemoveDomain0010Output> {
    const domain0010 = await this.domain0010Service.removeOne(input.id);
    return { domain0010 };
  }
}
