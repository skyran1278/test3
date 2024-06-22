import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Transactional } from 'typeorm-transactional';

import { Domain0015 } from './domain-0015.entity';
import { Domain0015Service } from './domain-0015.service';
import { CreateDomain0015Input } from './mutation/create-domain-0015.input';
import { CreateDomain0015Output } from './mutation/create-domain-0015.output';

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
}
