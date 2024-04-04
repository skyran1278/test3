import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { Transactional } from 'typeorm-transactional';

import { Domain0007 } from './domain-0007.entity';
import { Domain0007Service } from './domain-0007.service';
import { CreateDomain0007Input } from './mutation/create-domain-0007.input';
import { CreateDomain0007Output } from './mutation/create-domain-0007.output';
import { RemoveDomain0007Input } from './mutation/remove-domain-0007.input';
import { RemoveDomain0007Output } from './mutation/remove-domain-0007.output';
import { UpdateDomain0007Input } from './mutation/update-domain-0007.input';
import { UpdateDomain0007Output } from './mutation/update-domain-0007.output';
import { Domain0007PageArgs } from './query/domain-0007-page.args';
import { Domain0007Page } from './query/domain-0007-page.type';

@Resolver(() => Domain0007)
export class Domain0007Resolver {
  constructor(private readonly domain0007Service: Domain0007Service) {}

  @Transactional()
  @Mutation(() => CreateDomain0007Output)
  async createDomain0007(
    @Args('input') input: CreateDomain0007Input,
  ): Promise<CreateDomain0007Output> {
    const domain0007 = await this.domain0007Service.saveOne(input);
    return { domain0007 };
  }

  @Transactional()
  @Query(() => Domain0007Page)
  domain0007Page(@Args() args: Domain0007PageArgs): Promise<Domain0007Page> {
    return this.domain0007Service.findPage(args);
  }

  @Transactional()
  @Query(() => Domain0007)
  domain0007(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Maybe<Domain0007>> {
    return this.domain0007Service.findOne({ where: { id } });
  }

  @Transactional()
  @Mutation(() => UpdateDomain0007Output)
  async updateDomain0007(
    @Args('input') input: UpdateDomain0007Input,
  ): Promise<UpdateDomain0007Output> {
    const domain0007 = await this.domain0007Service.saveOne(input);
    return { domain0007 };
  }

  @Transactional()
  @Mutation(() => RemoveDomain0007Output)
  async removeDomain0007(
    @Args('input') input: RemoveDomain0007Input,
  ): Promise<RemoveDomain0007Output> {
    const domain0007 = await this.domain0007Service.removeOne(input.id);
    return { domain0007 };
  }
}
