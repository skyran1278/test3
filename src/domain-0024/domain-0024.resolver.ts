import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { Transactional } from 'typeorm-transactional';

import { ResolverInterface } from '../common/resolver.interface';
import { Domain0025 } from '../domain-0025/domain-0025.entity';
import { Domain0025Repository } from '../domain-0025/domain-0025.repository';
import { Domain0024 } from './domain-0024.entity';
import { Domain0024Repository } from './domain-0024.repository';
import { Domain0024Service } from './domain-0024.service';
import { CreateDomain0024Input } from './mutation/create-domain-0024.input';
import { CreateDomain0024Output } from './mutation/create-domain-0024.output';
import { RemoveDomain0024Input } from './mutation/remove-domain-0024.input';
import { RemoveDomain0024Output } from './mutation/remove-domain-0024.output';
import { UpdateDomain0024Input } from './mutation/update-domain-0024.input';
import { UpdateDomain0024Output } from './mutation/update-domain-0024.output';
import { Domain0024PageArgs } from './query/domain-0024-page.args';
import { Domain0024Page } from './query/domain-0024-page.type';

@Resolver(() => Domain0024)
export class Domain0024Resolver implements ResolverInterface<Domain0024> {
  constructor(
    private readonly domain0024Repository: Domain0024Repository,
    private readonly domain0024Service: Domain0024Service,
    private readonly domain0025Repository: Domain0025Repository,
  ) {}

  @Transactional()
  @Mutation(() => CreateDomain0024Output)
  async createDomain0024(
    @Args('input') input: CreateDomain0024Input,
  ): Promise<CreateDomain0024Output> {
    const domain0024 = await this.domain0024Service.saveOne(input);
    return { domain0024 };
  }

  @Transactional()
  @Query(() => Domain0024Page)
  domain0024Page(@Args() args: Domain0024PageArgs): Promise<Domain0024Page> {
    return this.domain0024Service.findPage(args);
  }

  @Transactional()
  @Query(() => Domain0024)
  async domain0024(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Maybe<Domain0024>> {
    return this.domain0024Repository.findOne({ where: { id } });
  }

  @Transactional()
  @Mutation(() => UpdateDomain0024Output)
  async updateDomain0024(
    @Args('input') input: UpdateDomain0024Input,
  ): Promise<UpdateDomain0024Output> {
    const domain0024 = await this.domain0024Service.saveOne(input);
    return { domain0024 };
  }

  @Transactional()
  @Mutation(() => RemoveDomain0024Output)
  async removeDomain0024(
    @Args('input') input: RemoveDomain0024Input,
  ): Promise<RemoveDomain0024Output> {
    const domain0024 = await this.domain0024Service.removeOne(input.id);
    return { domain0024 };
  }

  @ResolveField(() => [Domain0025])
  async domain0025s(
    @Parent() { id, domain0025s }: Domain0024,
  ): Promise<Domain0025[]> {
    if (domain0025s) {
      return domain0025s;
    }

    return this.domain0025Repository.findBy({ domain0024s: { id } });
  }
}
