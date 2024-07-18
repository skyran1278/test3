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

import { Domain0021ChildrenLoader } from './domain-0021-children.loader';
import { Domain0021 } from './domain-0021.entity';
import { Domain0021Repository } from './domain-0021.repository';
import { Domain0021Service } from './domain-0021.service';
import { CreateDomain0021Input } from './mutation/create-domain-0021.input';
import { CreateDomain0021Output } from './mutation/create-domain-0021.output';
import { CreateDomain0021sInput } from './mutation/create-domain-0021s.input';
import { CreateDomain0021sOutput } from './mutation/create-domain-0021s.output';
import { RemoveDomain0021Input } from './mutation/remove-domain-0021.input';
import { RemoveDomain0021Output } from './mutation/remove-domain-0021.output';
import { UpdateDomain0021Input } from './mutation/update-domain-0021.input';
import { UpdateDomain0021Output } from './mutation/update-domain-0021.output';
import { Domain0021PageArgs } from './query/domain-0021-page.args';
import { Domain0021Page } from './query/domain-0021-page.type';

@Resolver(() => Domain0021)
export class Domain0021Resolver {
  constructor(
    private readonly domain0021Repository: Domain0021Repository,
    private readonly domain0021Service: Domain0021Service,
    private readonly domain0021ChildrenLoader: Domain0021ChildrenLoader,
  ) {}

  @Transactional()
  @Mutation(() => CreateDomain0021sOutput)
  async createDomain0021s(
    @Args('input') input: CreateDomain0021sInput,
  ): Promise<CreateDomain0021sOutput> {
    const domain0021s = await this.domain0021Service.saveMany(input);
    return { domain0021s };
  }

  @Transactional()
  @Mutation(() => CreateDomain0021Output)
  async createDomain0021(
    @Args('input') input: CreateDomain0021Input,
  ): Promise<CreateDomain0021Output> {
    const domain0021 = await this.domain0021Service.saveOne(input);
    return { domain0021 };
  }

  @Transactional()
  @Query(() => Domain0021Page)
  domain0021Page(@Args() args: Domain0021PageArgs): Promise<Domain0021Page> {
    return this.domain0021Service.findPage(args);
  }

  @Transactional()
  @Query(() => Domain0021)
  domain0021(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Maybe<Domain0021>> {
    return this.domain0021Repository.findOne({ where: { id } });
  }

  @Transactional()
  @Mutation(() => UpdateDomain0021Output)
  async updateDomain0021(
    @Args('input') input: UpdateDomain0021Input,
  ): Promise<UpdateDomain0021Output> {
    const domain0021 = await this.domain0021Service.saveOne(input);
    return { domain0021 };
  }

  @Transactional()
  @Mutation(() => RemoveDomain0021Output)
  async removeDomain0021(
    @Args('input') input: RemoveDomain0021Input,
  ): Promise<RemoveDomain0021Output> {
    const domain0021 = await this.domain0021Service.removeOne(input.id);
    return { domain0021 };
  }

  @ResolveField(() => [Domain0021], { nullable: true })
  async children(
    @Parent() domain0021: Domain0021,
  ): Promise<Maybe<Domain0021[]>> {
    if (domain0021.children != null && domain0021.children.length > 0) {
      return domain0021.children;
    }

    return this.domain0021ChildrenLoader.load(domain0021);
  }
}
