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
import { Domain25 } from '../domain-25/domain-25.entity';
import { Domain25Repository } from '../domain-25/domain-25.repository';
import { Domain24 } from './domain-24.entity';
import { Domain24Repository } from './domain-24.repository';
import { Domain24Service } from './domain-24.service';
import { CreateDomain24Input } from './mutation/create-domain-24.input';
import { CreateDomain24Output } from './mutation/create-domain-24.output';
import { RemoveDomain24Input } from './mutation/remove-domain-24.input';
import { RemoveDomain24Output } from './mutation/remove-domain-24.output';
import { UpdateDomain24Input } from './mutation/update-domain-24.input';
import { UpdateDomain24Output } from './mutation/update-domain-24.output';
import { Domain24PageArgs } from './query/domain-24-page.args';
import { Domain24Page } from './query/domain-24-page.type';

@Resolver(() => Domain24)
export class Domain24Resolver implements ResolverInterface<Domain24> {
  constructor(
    private readonly domain24Repository: Domain24Repository,
    private readonly domain24Service: Domain24Service,
    private readonly domain25Repository: Domain25Repository,
  ) {}

  @Transactional()
  @Mutation(() => CreateDomain24Output)
  async createDomain24(
    @Args('input') input: CreateDomain24Input,
  ): Promise<CreateDomain24Output> {
    const domain24 = await this.domain24Service.saveOne(input);
    return { domain24 };
  }

  @Transactional()
  @Query(() => Domain24Page)
  domain24Page(@Args() args: Domain24PageArgs): Promise<Domain24Page> {
    return this.domain24Service.findPage(args);
  }

  @Transactional()
  @Query(() => Domain24)
  async domain24(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Maybe<Domain24>> {
    return this.domain24Repository.findOne({ where: { id } });
  }

  @Transactional()
  @Mutation(() => UpdateDomain24Output)
  async updateDomain24(
    @Args('input') input: UpdateDomain24Input,
  ): Promise<UpdateDomain24Output> {
    const domain24 = await this.domain24Service.saveOne(input);
    return { domain24 };
  }

  @Transactional()
  @Mutation(() => RemoveDomain24Output)
  async removeDomain24(
    @Args('input') input: RemoveDomain24Input,
  ): Promise<RemoveDomain24Output> {
    const domain24 = await this.domain24Service.removeOne(input.id);
    return { domain24 };
  }

  @ResolveField(() => [Domain25])
  async domain25s(@Parent() { id, domain25s }: Domain24): Promise<Domain25[]> {
    if (domain25s) {
      return domain25s;
    }

    return this.domain25Repository.findBy({ domain24s: { id } });
  }
}
