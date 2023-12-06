import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain1 } from './domain1.entity';
import { Domain1Service } from './domain1.service';
import { CreateDomain1Input } from './mutation/create-domain1.input';
import { CreateDomain1Output } from './mutation/create-domain1.output';
import { RemoveDomain1Output } from './mutation/remove-domain1.output';
import { UpdateDomain1Input } from './mutation/update-domain1.input';
import { UpdateDomain1Output } from './mutation/update-domain1.output';

@Resolver(() => Domain1)
export class Domain1Resolver {
  constructor(private readonly domain1Service: Domain1Service) {}

  @Mutation(() => CreateDomain1Output)
  async createDomain1(
    @Args('createDomain1Input') createDomain1Input: CreateDomain1Input,
  ): Promise<CreateDomain1Output> {
    const domain1 = await this.domain1Service.create(createDomain1Input);
    return { domain1 };
  }

  @Query(() => [Domain1])
  domain1s(): Promise<Domain1[]> {
    return this.domain1Service.findAll();
  }

  @Query(() => Domain1)
  domain1(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Maybe<Domain1>> {
    return this.domain1Service.findOne(id);
  }

  @Mutation(() => UpdateDomain1Output)
  async updateDomain1(
    @Args('updateDomain1Input') updateDomain1Input: UpdateDomain1Input,
  ): Promise<UpdateDomain1Output> {
    const domain1 = await this.domain1Service.update(
      updateDomain1Input.id,
      updateDomain1Input,
    );
    return { domain1 };
  }

  @Mutation(() => RemoveDomain1Output)
  async removeDomain1(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<RemoveDomain1Output> {
    const domain1 = await this.domain1Service.remove(id);
    return { domain1 };
  }
}
