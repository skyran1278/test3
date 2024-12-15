import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { Transactional } from 'typeorm-transactional';

import { Domain10 } from './domain-10.entity';
import { Domain10Repository } from './domain-10.repository';
import { Domain10Service } from './domain-10.service';
import { CreateDomain10Input } from './mutation/create-domain-10.input';
import { CreateDomain10Output } from './mutation/create-domain-10.output';
import { RemoveDomain10Input } from './mutation/remove-domain-10.input';
import { RemoveDomain10Output } from './mutation/remove-domain-10.output';
import { UpdateDomain10Input } from './mutation/update-domain-10.input';
import { UpdateDomain10Output } from './mutation/update-domain-10.output';
import { Domain10PageArgs } from './query/domain-10-page.args';
import { Domain10Page } from './query/domain-10-page.type';

@Resolver(() => Domain10)
export class Domain10Resolver {
  constructor(
    private readonly domain10Repository: Domain10Repository,
    private readonly domain10Service: Domain10Service,
  ) {}

  @Transactional()
  @Mutation(() => CreateDomain10Output)
  async createDomain10(
    @Args('input') input: CreateDomain10Input,
  ): Promise<CreateDomain10Output> {
    const domain10 = await this.domain10Service.saveOne(input);
    return { domain10 };
  }

  @Transactional()
  @Query(() => Domain10Page)
  domain10Page(@Args() args: Domain10PageArgs): Promise<Domain10Page> {
    return this.domain10Service.findPage(args);
  }

  @Transactional()
  @Query(() => Domain10)
  domain10(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Maybe<Domain10>> {
    return this.domain10Repository.findOne({ where: { id } });
  }

  @Transactional()
  @Mutation(() => UpdateDomain10Output)
  async updateDomain10(
    @Args('input') input: UpdateDomain10Input,
  ): Promise<UpdateDomain10Output> {
    const domain10 = await this.domain10Service.saveOne(input);
    return { domain10 };
  }

  @Transactional()
  @Mutation(() => RemoveDomain10Output)
  async removeDomain10(
    @Args('input') input: RemoveDomain10Input,
  ): Promise<RemoveDomain10Output> {
    const domain10 = await this.domain10Service.removeOne(input.id);
    return { domain10 };
  }
}
