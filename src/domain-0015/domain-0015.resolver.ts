import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Transactional } from 'typeorm-transactional';

import { Domain0015 } from './domain-0015.entity';
import { Domain0015Service } from './domain-0015.service';
import { CreateDomain0015Input } from './dto/create-domain-0015.input';
import { CreateDomain0015Output } from './dto/create-domain-0015.output';

@Resolver(() => Domain0015)
export class Domain0015Resolver {
  constructor(private readonly domain0015Service: Domain0015Service) {}

  @Transactional()
  @Mutation(() => CreateDomain0015Output)
  async createDomain0015(
    @Args('input') input: CreateDomain0015Input,
  ): Promise<CreateDomain0015Output> {
    const domain0015 = await this.domain0015Service.saveOne(input);
    return { domain0015 };
  }

  @Transactional()
  @Mutation(() => CreateDomain0015Output)
  async testQueueEventsRaceCondition(
    @Args('input') input: CreateDomain0015Input,
  ): Promise<CreateDomain0015Output> {
    const domain0015 =
      await this.domain0015Service.testQueueEventsRaceCondition(input);
    return { domain0015 };
  }

  // @Query(() => Domain0015Page)
  // domain0015Page(@Args() args: Domain0015PageArgs): Promise<Domain0015Page> {
  //   return this.domain0015Service.findPage(args);
  // }

  // @Query(() => Domain0015)
  // domain0015(@Args('id', { type: () => ID }) id: string): Promise<Maybe<Domain0015>> {
  //   return this.domain0015Service.findOne({ where: { id } });
  // }

  // @Mutation(() => UpdateDomain0015Output)
  // async updateDomain0015(
  //   @Args('input') input: UpdateDomain0015Input,
  //
  // ): Promise<UpdateDomain0015Output> {
  //   const domain0015 = await this.domain0015Service.saveOne(input, {
  //     user,
  //   });
  //   return { domain0015 };
  // }

  // @Mutation(() => RemoveDomain0015Output)
  // async removeDomain0015(
  //   @Args('input') input: RemoveDomain0015Input,
  //
  // ): Promise<RemoveDomain0015Output> {
  //   const domain0015 = await this.domain0015Service.removeOne(input.id, {
  //     user,
  //   });
  //   return { domain0015 };
  // }
}
