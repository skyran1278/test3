import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { Transactional } from 'typeorm-transactional';

import { Domain03 } from './domain-03.entity';
import { Domain03Repository } from './domain-03.repository';
import { Domain03Service } from './domain-03.service';
import { CreateDomain03Input } from './mutation/create-domain-03.input';
import { CreateDomain03Output } from './mutation/create-domain-03.output';
import { RemoveDomain03Input } from './mutation/remove-domain-03.input';
import { RemoveDomain03Output } from './mutation/remove-domain-03.output';
import { UpdateDomain03Input } from './mutation/update-domain-03.input';
import { UpdateDomain03Output } from './mutation/update-domain-03.output';
import { Domain03PageArgs } from './query/domain-03-page.args';
import { Domain03Page } from './query/domain-03-page.type';

@Resolver(() => Domain03)
export class Domain03Resolver {
  constructor(
    private readonly domain03Repository: Domain03Repository,
    private readonly domain03Service: Domain03Service,
  ) {}

  @Transactional()
  @Mutation(() => CreateDomain03Output)
  async createDomain03(
    @Args('input') input: CreateDomain03Input,
  ): Promise<CreateDomain03Output> {
    const domain03 = await this.domain03Service.saveOne(input);
    return { domain03 };
  }

  @Transactional()
  @Query(() => Domain03Page)
  domain03Page(@Args() args: Domain03PageArgs): Promise<Domain03Page> {
    return this.domain03Service.findPage(args);
  }

  @Transactional()
  @Query(() => Domain03)
  domain03(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Maybe<Domain03>> {
    return this.domain03Repository.findOne({ where: { id } });
  }

  @Transactional()
  @Mutation(() => UpdateDomain03Output)
  async updateDomain03(
    @Args('input') input: UpdateDomain03Input,
  ): Promise<UpdateDomain03Output> {
    const domain03 = await this.domain03Service.saveOne(input);
    return { domain03 };
  }

  @Transactional()
  @Mutation(() => RemoveDomain03Output)
  async removeDomain03(
    @Args('input') input: RemoveDomain03Input,
  ): Promise<RemoveDomain03Output> {
    const domain03 = await this.domain03Service.removeOne(input.id);
    return { domain03 };
  }
}
