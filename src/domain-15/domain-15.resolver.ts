import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Transactional } from 'typeorm-transactional';

import { Domain15 } from './domain-15.entity';
import { Domain15Service } from './domain-15.service';
import { CreateDomain15Input } from './mutation/create-domain-15.input';
import { CreateDomain15Output } from './mutation/create-domain-15.output';

@Resolver(() => Domain15)
export class Domain15Resolver {
  constructor(private readonly domain15Service: Domain15Service) {}

  @Transactional()
  @Mutation(() => CreateDomain15Output)
  async createDomain15(
    @Args('input') input: CreateDomain15Input,
  ): Promise<CreateDomain15Output> {
    const domain15 = await this.domain15Service.saveOne(input);
    return { domain15 };
  }

  @Transactional()
  @Mutation(() => CreateDomain15Output)
  async testQueueEventsRaceCondition(
    @Args('input') input: CreateDomain15Input,
  ): Promise<CreateDomain15Output> {
    const domain15 =
      await this.domain15Service.testQueueEventsRaceCondition(input);
    return { domain15 };
  }
}
