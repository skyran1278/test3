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
import { Domain0009 } from '../domain-0009/domain-0009.entity';
import { Domain0009Repository } from '../domain-0009/domain-0009.repository';
import { Domain0008 } from './domain-0008.entity';
import { Domain0008Repository } from './domain-0008.repository';
import { Domain0008Service } from './domain-0008.service';
import { CreateDomain0008Input } from './mutation/create-domain-0008.input';
import { CreateDomain0008Output } from './mutation/create-domain-0008.output';
import { RemoveDomain0008Input } from './mutation/remove-domain-0008.input';
import { RemoveDomain0008Output } from './mutation/remove-domain-0008.output';
import { UpdateDomain0008Input } from './mutation/update-domain-0008.input';
import { UpdateDomain0008Output } from './mutation/update-domain-0008.output';
import { UpdateDomain0008sInput } from './mutation/update-domain-0008s.input';
import { UpdateDomain0008sOutput } from './mutation/update-domain-0008s.output';
import { Domain0008PageArgs } from './query/domain-0008-page.args';
import { Domain0008Page } from './query/domain-0008-page.type';

@Resolver(() => Domain0008)
export class Domain0008Resolver implements ResolverInterface<Domain0008> {
  constructor(
    private readonly domain0008Repository: Domain0008Repository,
    private readonly domain0008Service: Domain0008Service,
    private readonly domain0009Repository: Domain0009Repository,
  ) {}

  @Transactional()
  @Mutation(() => CreateDomain0008Output)
  async createDomain0008(
    @Args('input') input: CreateDomain0008Input,
  ): Promise<CreateDomain0008Output> {
    const domain0008 = await this.domain0008Service.saveOne(input);
    return { domain0008 };
  }

  @Transactional()
  @Query(() => Domain0008Page)
  domain0008Page(@Args() args: Domain0008PageArgs): Promise<Domain0008Page> {
    return this.domain0008Service.findPage(args);
  }

  @Transactional()
  @Query(() => Domain0008)
  domain0008(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Maybe<Domain0008>> {
    return this.domain0008Repository.findOne({ where: { id } });
  }

  @Transactional()
  @Mutation(() => UpdateDomain0008Output)
  async updateDomain0008(
    @Args('input') input: UpdateDomain0008Input,
  ): Promise<UpdateDomain0008Output> {
    const domain0008 = await this.domain0008Service.saveOne(input);
    return { domain0008 };
  }

  @Transactional()
  @Mutation(() => UpdateDomain0008sOutput)
  async updateDomain0008s(
    @Args('input') input: UpdateDomain0008sInput,
  ): Promise<UpdateDomain0008sOutput> {
    const domain0008s = await this.domain0008Service.updateMany(input);
    return { domain0008s };
  }

  @Transactional()
  @Mutation(() => RemoveDomain0008Output)
  async removeDomain0008(
    @Args('input') input: RemoveDomain0008Input,
  ): Promise<RemoveDomain0008Output> {
    const domain0008 = await this.domain0008Service.removeOne(input.id);
    return { domain0008 };
  }

  @ResolveField(() => [Domain0009])
  async domain0009s(
    @Parent() { id, domain0009s }: Domain0008,
  ): Promise<Domain0009[]> {
    if (domain0009s) return domain0009s;
    return this.domain0009Repository.findBy({
      domain0008Id: id,
    });
  }
}
