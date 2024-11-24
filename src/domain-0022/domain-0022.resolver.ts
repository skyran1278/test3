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

import { Domain0022ByIdLoader } from './domain-0022-by-id.loader';
import { Domain0022ChildrenLoader } from './domain-0022-children.loader';
import { Domain0022 } from './domain-0022.entity';
import { Domain0022Repository } from './domain-0022.repository';
import { Domain0022Service } from './domain-0022.service';
import { CreateDomain0022Input } from './mutation/create-domain-0022.input';
import { CreateDomain0022Output } from './mutation/create-domain-0022.output';
import { CreateDomain0022sInput } from './mutation/create-domain-0022s.input';
import { CreateDomain0022sOutput } from './mutation/create-domain-0022s.output';
import { RemoveDomain0022Input } from './mutation/remove-domain-0022.input';
import { RemoveDomain0022Output } from './mutation/remove-domain-0022.output';
import { UpdateDomain0022Input } from './mutation/update-domain-0022.input';
import { UpdateDomain0022Output } from './mutation/update-domain-0022.output';
import { Domain0022PageArgs } from './query/domain-0022-page.args';
import { Domain0022Page } from './query/domain-0022-page.type';

@Resolver(() => Domain0022)
export class Domain0022Resolver {
  constructor(
    private readonly domain0022Repository: Domain0022Repository,
    private readonly domain0022Service: Domain0022Service,
    private readonly domain0022ChildrenLoader: Domain0022ChildrenLoader,
    private readonly domain0022ByIdLoader: Domain0022ByIdLoader,
  ) {}

  @Transactional()
  @Mutation(() => CreateDomain0022sOutput)
  async createDomain0022s(
    @Args('input') input: CreateDomain0022sInput,
  ): Promise<CreateDomain0022sOutput> {
    const domain0022s = await this.domain0022Service.saveMany(input);
    return { domain0022s };
  }

  @Transactional()
  @Mutation(() => CreateDomain0022Output)
  async createDomain0022(
    @Args('input') input: CreateDomain0022Input,
  ): Promise<CreateDomain0022Output> {
    const domain0022 = await this.domain0022Service.saveOne(input);
    return { domain0022 };
  }

  @Transactional()
  @Query(() => Domain0022Page)
  domain0022Page(@Args() args: Domain0022PageArgs): Promise<Domain0022Page> {
    return this.domain0022Service.findPage(args);
  }

  @Transactional()
  @Query(() => Domain0022)
  domain0022(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Maybe<Domain0022>> {
    return this.domain0022Repository.findOne({ where: { id } });
  }

  @Transactional()
  @Mutation(() => UpdateDomain0022Output)
  async updateDomain0022(
    @Args('input') input: UpdateDomain0022Input,
  ): Promise<UpdateDomain0022Output> {
    const domain0022 = await this.domain0022Service.saveOne(input);
    return { domain0022 };
  }

  @Transactional()
  @Mutation(() => RemoveDomain0022Output)
  async removeDomain0022(
    @Args('input') input: RemoveDomain0022Input,
  ): Promise<RemoveDomain0022Output> {
    const domain0022 = await this.domain0022Service.removeOne(input.id);
    return { domain0022 };
  }

  @ResolveField(() => [Domain0022], { nullable: true })
  async children(
    @Parent() domain0022: Domain0022,
  ): Promise<Maybe<Domain0022[]>> {
    if (domain0022.children != null && domain0022.children.length > 0) {
      return domain0022.children;
    }

    return this.domain0022ChildrenLoader.load(domain0022);
  }

  @ResolveField(() => Domain0022, { nullable: true })
  async parent(
    @Parent() { parent, parentId }: Domain0022,
  ): Promise<Maybe<Domain0022>> {
    if (parent) return parent;
    if (parentId) return this.domain0022ByIdLoader.load(parentId);
    return null;
  }
}
