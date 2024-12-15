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

import { Domain21ByIdLoader } from './domain-21-by-id.loader';
import { Domain21ChildrenLoader } from './domain-21-children.loader';
import { Domain21 } from './domain-21.entity';
import { Domain21Repository } from './domain-21.repository';
import { Domain21Service } from './domain-21.service';
import { CreateDomain21Input } from './mutation/create-domain-21.input';
import { CreateDomain21Output } from './mutation/create-domain-21.output';
import { CreateDomain21sInput } from './mutation/create-domain-21s.input';
import { CreateDomain21sOutput } from './mutation/create-domain-21s.output';
import { RemoveDomain21Input } from './mutation/remove-domain-21.input';
import { RemoveDomain21Output } from './mutation/remove-domain-21.output';
import { UpdateDomain21Input } from './mutation/update-domain-21.input';
import { UpdateDomain21Output } from './mutation/update-domain-21.output';
import { Domain21PageArgs } from './query/domain-21-page.args';
import { Domain21Page } from './query/domain-21-page.type';

@Resolver(() => Domain21)
export class Domain21Resolver {
  constructor(
    private readonly domain21Repository: Domain21Repository,
    private readonly domain21Service: Domain21Service,
    private readonly domain21ChildrenLoader: Domain21ChildrenLoader,
    private readonly domain21ByIdLoader: Domain21ByIdLoader,
  ) {}

  @Transactional()
  @Mutation(() => CreateDomain21sOutput)
  async createDomain21s(
    @Args('input') input: CreateDomain21sInput,
  ): Promise<CreateDomain21sOutput> {
    const domain21s = await this.domain21Service.saveMany(input);
    return { domain21s };
  }

  @Transactional()
  @Mutation(() => CreateDomain21Output)
  async createDomain21(
    @Args('input') input: CreateDomain21Input,
  ): Promise<CreateDomain21Output> {
    const domain21 = await this.domain21Service.saveOne(input);
    return { domain21 };
  }

  @Transactional()
  @Query(() => Domain21Page)
  domain21Page(@Args() args: Domain21PageArgs): Promise<Domain21Page> {
    return this.domain21Service.findPage(args);
  }

  @Transactional()
  @Query(() => Domain21)
  domain21(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Maybe<Domain21>> {
    return this.domain21Repository.findOne({ where: { id } });
  }

  @Transactional()
  @Mutation(() => UpdateDomain21Output)
  async updateDomain21(
    @Args('input') input: UpdateDomain21Input,
  ): Promise<UpdateDomain21Output> {
    const domain21 = await this.domain21Service.saveOne(input);
    return { domain21 };
  }

  @Transactional()
  @Mutation(() => RemoveDomain21Output)
  async removeDomain21(
    @Args('input') input: RemoveDomain21Input,
  ): Promise<RemoveDomain21Output> {
    const domain21 = await this.domain21Service.removeOne(input.id);
    return { domain21 };
  }

  @ResolveField(() => [Domain21], { nullable: true })
  async children(@Parent() domain21: Domain21): Promise<Maybe<Domain21[]>> {
    if (domain21.children != null && domain21.children.length > 0) {
      return domain21.children;
    }

    return this.domain21ChildrenLoader.load(domain21);
  }

  @ResolveField(() => Domain21, { nullable: true })
  async parent(
    @Parent() { parent, parentId }: Domain21,
  ): Promise<Maybe<Domain21>> {
    if (parent) return parent;
    if (parentId) return this.domain21ByIdLoader.load(parentId);
    return null;
  }
}
