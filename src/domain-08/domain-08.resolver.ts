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
import { Domain09 } from '../domain-09/domain-09.entity';
import { Domain09Repository } from '../domain-09/domain-09.repository';
import { Domain08 } from './domain-08.entity';
import { Domain08Repository } from './domain-08.repository';
import { Domain08Service } from './domain-08.service';
import { CreateDomain08Input } from './mutation/create-domain-08.input';
import { CreateDomain08Output } from './mutation/create-domain-08.output';
import { RemoveDomain08Input } from './mutation/remove-domain-08.input';
import { RemoveDomain08Output } from './mutation/remove-domain-08.output';
import { UpdateDomain08Input } from './mutation/update-domain-08.input';
import { UpdateDomain08Output } from './mutation/update-domain-08.output';
import { UpdateDomain08sInput } from './mutation/update-domain-08s.input';
import { UpdateDomain08sOutput } from './mutation/update-domain-08s.output';
import { Domain08PageArgs } from './query/domain-08-page.args';
import { Domain08Page } from './query/domain-08-page.type';

@Resolver(() => Domain08)
export class Domain08Resolver implements ResolverInterface<Domain08> {
  constructor(
    private readonly domain08Repository: Domain08Repository,
    private readonly domain08Service: Domain08Service,
    private readonly domain09Repository: Domain09Repository,
  ) {}

  @Transactional()
  @Mutation(() => CreateDomain08Output)
  async createDomain08(
    @Args('input') input: CreateDomain08Input,
  ): Promise<CreateDomain08Output> {
    const domain08 = await this.domain08Service.saveOne(input);
    return { domain08 };
  }

  @Transactional()
  @Query(() => Domain08Page)
  domain08Page(@Args() args: Domain08PageArgs): Promise<Domain08Page> {
    return this.domain08Service.findPage(args);
  }

  @Transactional()
  @Query(() => Domain08)
  domain08(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Maybe<Domain08>> {
    return this.domain08Repository.findOne({ where: { id } });
  }

  @Transactional()
  @Mutation(() => UpdateDomain08Output)
  async updateDomain08(
    @Args('input') input: UpdateDomain08Input,
  ): Promise<UpdateDomain08Output> {
    const domain08 = await this.domain08Service.saveOne(input);
    return { domain08 };
  }

  @Transactional()
  @Mutation(() => UpdateDomain08sOutput)
  async updateDomain08s(
    @Args('input') input: UpdateDomain08sInput,
  ): Promise<UpdateDomain08sOutput> {
    const domain08s = await this.domain08Service.updateMany(input);
    return { domain08s };
  }

  @Transactional()
  @Mutation(() => RemoveDomain08Output)
  async removeDomain08(
    @Args('input') input: RemoveDomain08Input,
  ): Promise<RemoveDomain08Output> {
    const domain08 = await this.domain08Service.removeOne(input.id);
    return { domain08 };
  }

  @ResolveField(() => [Domain09])
  async domain09s(@Parent() { id, domain09s }: Domain08): Promise<Domain09[]> {
    if (domain09s) return domain09s;
    return this.domain09Repository.findBy({
      domain08Id: id,
    });
  }
}
