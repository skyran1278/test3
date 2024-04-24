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

import { Domain0006 } from '../domain-0006/domain-0006.entity';
import { Domain0006Service } from '../domain-0006/domain-0006.service';
import { Domain0006PageArgs } from '../domain-0006/dto/domain-0006-page.args';
import { Domain0006Page } from '../domain-0006/dto/domain-0006-page.type';
import { Domain0006WhereInput } from '../domain-0006/dto/domain-0006-where.input';
import { Domain0005 } from './domain-0005.entity';
import { Domain0005Service } from './domain-0005.service';
import { CreateDomain0005Input } from './dto/create-domain-0005.input';
import { CreateDomain0005Output } from './dto/create-domain-0005.output';
import { Domain0005PageArgs } from './dto/domain-0005-page.args';
import { Domain0005Page } from './dto/domain-0005-page.type';
import { RemoveDomain0005Input } from './dto/remove-domain-0005.input';
import { RemoveDomain0005Output } from './dto/remove-domain-0005.output';
import { SoftRemoveDomain0005Input } from './dto/soft-remove-domain-0005.input';
import { SoftRemoveDomain0005Output } from './dto/soft-remove-domain-0005.output';
import { UpdateDomain0005Input } from './dto/update-domain-0005.input';
import { UpdateDomain0005Output } from './dto/update-domain-0005.output';

@Resolver(() => Domain0005)
export class Domain0005Resolver {
  constructor(
    private readonly domain0005Service: Domain0005Service,
    private readonly domain0006Service: Domain0006Service,
  ) {}

  @Transactional()
  @Mutation(() => CreateDomain0005Output)
  async createDomain0005(
    @Args('input') input: CreateDomain0005Input,
  ): Promise<CreateDomain0005Output> {
    const domain0005 = await this.domain0005Service.saveOne(input);
    return { domain0005 };
  }

  @Transactional()
  @Query(() => Domain0005Page)
  domain0005Page(@Args() args: Domain0005PageArgs): Promise<Domain0005Page> {
    return this.domain0005Service.findPage(args);
  }

  @Transactional()
  @Query(() => Domain0005)
  domain0005(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Maybe<Domain0005>> {
    return this.domain0005Service.findOne({ where: { id } });
  }

  @Transactional()
  @Mutation(() => UpdateDomain0005Output)
  async updateDomain0005(
    @Args('input') input: UpdateDomain0005Input,
  ): Promise<UpdateDomain0005Output> {
    const domain0005 = await this.domain0005Service.saveOne(input);
    return { domain0005 };
  }

  @Transactional()
  @Mutation(() => RemoveDomain0005Output)
  async removeDomain0005(
    @Args('input') input: RemoveDomain0005Input,
  ): Promise<RemoveDomain0005Output> {
    const domain0005 = await this.domain0005Service.removeOne(input.id);
    return { domain0005 };
  }

  @Transactional()
  @Mutation(() => SoftRemoveDomain0005Output)
  async softRemoveDomain0005(
    @Args('input') input: SoftRemoveDomain0005Input,
  ): Promise<SoftRemoveDomain0005Output> {
    const domain0005 = await this.domain0005Service.softRemoveOne(input.id);
    return { domain0005 };
  }

  @ResolveField(() => Domain0006Page)
  async domain0006Page(
    @Parent() { id }: Domain0005,
    @Args() args: Domain0006PageArgs,
  ): Promise<Domain0006Page> {
    const inputWhereArray = args.where ?? [new Domain0006WhereInput()];
    const where = inputWhereArray.map((inputWhere) => {
      inputWhere.domain0005Id = id;
      return inputWhere;
    });

    return this.domain0006Service.findNodePage({
      ...args,
      where,
    });
  }

  @ResolveField(() => [Domain0006])
  async domain0006s(
    @Parent() { id, domain0006s }: Domain0005,
  ): Promise<Domain0006[]> {
    if (domain0006s) return domain0006s;

    return this.domain0006Service.findBy({
      domain0005Id: id,
    });
  }
}
