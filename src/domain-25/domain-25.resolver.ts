import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { Transactional } from 'typeorm-transactional';

import { Domain25 } from './domain-25.entity';
import { Domain25Repository } from './domain-25.repository';
import { Domain25Service } from './domain-25.service';
import { CreateDomain25Input } from './mutation/create-domain-25.input';
import { CreateDomain25Output } from './mutation/create-domain-25.output';
import { RemoveDomain25Input } from './mutation/remove-domain-25.input';
import { RemoveDomain25Output } from './mutation/remove-domain-25.output';
import { UpdateDomain25Input } from './mutation/update-domain-25.input';
import { UpdateDomain25Output } from './mutation/update-domain-25.output';
import { Domain25PageArgs } from './query/domain-25-page.args';
import { Domain25Page } from './query/domain-25-page.type';

@Resolver(() => Domain25)
export class Domain25Resolver {
  constructor(
    private readonly domain25Repository: Domain25Repository,
    private readonly domain25Service: Domain25Service,
  ) {}

  @Transactional()
  @Mutation(() => CreateDomain25Output)
  async createDomain25(
    @Args('input') input: CreateDomain25Input,
  ): Promise<CreateDomain25Output> {
    const domain25 = await this.domain25Service.saveOne(input);
    return { domain25 };
  }

  @Transactional()
  @Query(() => Domain25Page)
  domain25Page(@Args() args: Domain25PageArgs): Promise<Domain25Page> {
    return this.domain25Service.findPage(args);
  }

  @Transactional()
  @Query(() => Domain25)
  domain25(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Maybe<Domain25>> {
    return this.domain25Repository.findOne({ where: { id } });
  }

  @Transactional()
  @Mutation(() => UpdateDomain25Output)
  async updateDomain25(
    @Args('input') input: UpdateDomain25Input,
  ): Promise<UpdateDomain25Output> {
    const domain25 = await this.domain25Service.saveOne(input);
    return { domain25 };
  }

  @Transactional()
  @Mutation(() => RemoveDomain25Output)
  async removeDomain25(
    @Args('input') input: RemoveDomain25Input,
  ): Promise<RemoveDomain25Output> {
    const domain25 = await this.domain25Service.removeOne(input.id);
    return { domain25 };
  }
}
