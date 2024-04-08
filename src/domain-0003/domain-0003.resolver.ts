import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { Transactional } from 'typeorm-transactional';

import { Domain0003 } from './domain-0003.entity';
import { Domain0003Service } from './domain-0003.service';
import { CreateDomain0003Input } from './dto/create-domain-0003.input';
import { CreateDomain0003Output } from './dto/create-domain-0003.output';
import { Domain0003PageArgs } from './dto/domain-0003-page.args';
import { Domain0003Page } from './dto/domain-0003-page.type';
import { RemoveDomain0003Input } from './dto/remove-domain-0003.input';
import { RemoveDomain0003Output } from './dto/remove-domain-0003.output';
import { UpdateDomain0003Input } from './dto/update-domain-0003.input';
import { UpdateDomain0003Output } from './dto/update-domain-0003.output';

@Resolver(() => Domain0003)
export class Domain0003Resolver {
  constructor(private readonly domain0003Service: Domain0003Service) {}

  @Transactional()
  @Mutation(() => CreateDomain0003Output)
  async createDomain0003(
    @Args('input') input: CreateDomain0003Input,
  ): Promise<CreateDomain0003Output> {
    const domain0003 = await this.domain0003Service.saveOne(input);
    return { domain0003 };
  }

  @Transactional()
  @Query(() => Domain0003Page)
  domain0003Page(@Args() args: Domain0003PageArgs): Promise<Domain0003Page> {
    return this.domain0003Service.findPage(args);
  }

  @Transactional()
  @Query(() => Domain0003)
  domain0003(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Maybe<Domain0003>> {
    return this.domain0003Service.findOne({ where: { id } });
  }

  @Transactional()
  @Mutation(() => UpdateDomain0003Output)
  async updateDomain0003(
    @Args('input') input: UpdateDomain0003Input,
  ): Promise<UpdateDomain0003Output> {
    const domain0003 = await this.domain0003Service.saveOne(input);
    return { domain0003 };
  }

  @Transactional()
  @Mutation(() => RemoveDomain0003Output)
  async removeDomain0003(
    @Args('input') input: RemoveDomain0003Input,
  ): Promise<RemoveDomain0003Output> {
    const domain0003 = await this.domain0003Service.removeOne(input.id);
    return { domain0003 };
  }
}
