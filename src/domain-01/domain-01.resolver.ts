import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { Transactional } from 'typeorm-transactional';

import { Domain01 } from './domain-01.entity';
import { Domain01Repository } from './domain-01.repository';
import { Domain01Service } from './domain-01.service';
import { CreateDomain01Input } from './mutation/create-domain-01.input';
import { CreateDomain01Output } from './mutation/create-domain-01.output';
import { RemoveDomain01Input } from './mutation/remove-domain-01.input';
import { RemoveDomain01Output } from './mutation/remove-domain-01.output';
import { UpdateDomain01Input } from './mutation/update-domain-01.input';
import { UpdateDomain01Output } from './mutation/update-domain-01.output';
import { Domain01PageArgs } from './query/domain-01-page.args';
import { Domain01Page } from './query/domain-01-page.type';
import { Domain01Args } from './query/domain-01.args';

@Resolver(() => Domain01)
export class Domain01Resolver {
  constructor(
    private readonly domain01Repository: Domain01Repository,
    private readonly domain01Service: Domain01Service,
  ) {}

  @Transactional()
  @Mutation(() => CreateDomain01Output)
  async createDomain01(
    @Args('input') input: CreateDomain01Input,
  ): Promise<CreateDomain01Output> {
    const domain01 = await this.domain01Service.saveOne(input);
    return { domain01 };
  }

  @Transactional()
  @Query(() => Domain01Page)
  domain01Page(@Args() args: Domain01PageArgs): Promise<Domain01Page> {
    return this.domain01Service.findPage(args);
  }

  @Transactional()
  @Query(() => Domain01, { nullable: true })
  domain01(@Args() args: Domain01Args): Promise<Maybe<Domain01>> {
    return this.domain01Repository.findOne({
      where: args.where.map((item) => item?.toFindOptionsWhere()),
    });
  }

  @Transactional()
  @Mutation(() => UpdateDomain01Output)
  async updateDomain01(
    @Args('input') input: UpdateDomain01Input,
  ): Promise<UpdateDomain01Output> {
    const domain01 = await this.domain01Service.saveOne(input);
    return { domain01 };
  }

  @Transactional()
  @Mutation(() => RemoveDomain01Output)
  async removeDomain01(
    @Args('input') input: RemoveDomain01Input,
  ): Promise<RemoveDomain01Output> {
    const domain01 = await this.domain01Service.removeOne(input.id);
    return { domain01 };
  }
}
