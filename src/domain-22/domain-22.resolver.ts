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

import { Domain22ByIdLoader } from './domain-22-by-id.loader';
import { Domain22ChildrenLoader } from './domain-22-children.loader';
import { Domain22 } from './domain-22.entity';
import { Domain22Repository } from './domain-22.repository';
import { Domain22Service } from './domain-22.service';
import { CreateDomain22Input } from './mutation/create-domain-22.input';
import { CreateDomain22Output } from './mutation/create-domain-22.output';
import { CreateDomain22sInput } from './mutation/create-domain-22s.input';
import { CreateDomain22sOutput } from './mutation/create-domain-22s.output';
import { RemoveDomain22Input } from './mutation/remove-domain-22.input';
import { RemoveDomain22Output } from './mutation/remove-domain-22.output';
import { UpdateDomain22Input } from './mutation/update-domain-22.input';
import { UpdateDomain22Output } from './mutation/update-domain-22.output';
import { Domain22PageArgs } from './query/domain-22-page.args';
import { Domain22Page } from './query/domain-22-page.type';

@Resolver(() => Domain22)
export class Domain22Resolver {
  constructor(
    private readonly domain22Repository: Domain22Repository,
    private readonly domain22Service: Domain22Service,
    private readonly domain22ChildrenLoader: Domain22ChildrenLoader,
    private readonly domain22ByIdLoader: Domain22ByIdLoader,
  ) {}

  @Transactional()
  @Mutation(() => CreateDomain22sOutput)
  async createDomain22s(
    @Args('input') input: CreateDomain22sInput,
  ): Promise<CreateDomain22sOutput> {
    const domain22s = await this.domain22Service.saveMany(input);
    return { domain22s };
  }

  @Transactional()
  @Mutation(() => CreateDomain22Output)
  async createDomain22(
    @Args('input') input: CreateDomain22Input,
  ): Promise<CreateDomain22Output> {
    const domain22 = await this.domain22Service.saveOne(input);
    return { domain22 };
  }

  @Transactional()
  @Query(() => Domain22Page)
  domain22Page(@Args() args: Domain22PageArgs): Promise<Domain22Page> {
    return this.domain22Service.findPage(args);
  }

  @Transactional()
  @Query(() => Domain22)
  domain22(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Maybe<Domain22>> {
    return this.domain22Repository.findOne({ where: { id } });
  }

  @Transactional()
  @Mutation(() => UpdateDomain22Output)
  async updateDomain22(
    @Args('input') input: UpdateDomain22Input,
  ): Promise<UpdateDomain22Output> {
    const domain22 = await this.domain22Service.saveOne(input);
    return { domain22 };
  }

  @Transactional()
  @Mutation(() => RemoveDomain22Output)
  async removeDomain22(
    @Args('input') input: RemoveDomain22Input,
  ): Promise<RemoveDomain22Output> {
    const domain22 = await this.domain22Service.removeOne(input.id);
    return { domain22 };
  }

  @ResolveField(() => [Domain22], { nullable: true })
  async children(@Parent() domain22: Domain22): Promise<Maybe<Domain22[]>> {
    if (domain22.children != null && domain22.children.length > 0) {
      return domain22.children;
    }

    return this.domain22ChildrenLoader.load(domain22);
  }

  @ResolveField(() => Domain22, { nullable: true })
  async parent(
    @Parent() { parent, parentId }: Domain22,
  ): Promise<Maybe<Domain22>> {
    if (parent) return parent;
    if (parentId) return this.domain22ByIdLoader.load(parentId);
    return null;
  }
}
