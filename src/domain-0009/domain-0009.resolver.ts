import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Domain0010 } from 'src/domain-0010/domain-0010.entity';
import { Domain0010Service } from 'src/domain-0010/domain-0010.service';
import { Transactional } from 'typeorm-transactional';

import { Domain0009 } from './domain-0009.entity';
import { Domain0009Service } from './domain-0009.service';
import { CreateDomain0009Input } from './dto/create-domain-0009.input';
import { CreateDomain0009Output } from './dto/create-domain-0009.output';
import { UpdateDomain0009Input } from './dto/update-domain-0009.input';
import { UpdateDomain0009Output } from './dto/update-domain-0009.output';
import { UpdateDomain0009sInput } from './dto/update-domain-0009s.input';
import { UpdateDomain0009sOutput } from './dto/update-domain-0009s.output';

@Resolver(() => Domain0009)
export class Domain0009Resolver {
  constructor(
    private readonly domain0009Service: Domain0009Service,
    private readonly domain0010Service: Domain0010Service,
  ) {}

  @Transactional()
  @Mutation(() => CreateDomain0009Output)
  async createDomain0009(
    @Args('input') input: CreateDomain0009Input,
  ): Promise<CreateDomain0009Output> {
    const domain0009 = await this.domain0009Service.saveOne(input);
    return { domain0009 };
  }

  // @Query(() => Domain0009Page)
  // domain0009Page(@Args() args: Domain0009PageArgs): Promise<Domain0009Page> {
  //   return this.domain0009Service.findPage(args);
  // }

  // @Query(() => Domain0009)
  // domain0009(@Args('id', { type: () => ID }) id: string): Promise<Maybe<Domain0009>> {
  //   return this.domain0009Service.findOne({ where: { id } });
  // }

  @Transactional()
  @Mutation(() => UpdateDomain0009Output)
  async updateDomain0009(
    @Args('input') input: UpdateDomain0009Input,
  ): Promise<UpdateDomain0009Output> {
    const domain0009 = await this.domain0009Service.saveOne(input);
    return { domain0009 };
  }

  @Transactional()
  @Mutation(() => UpdateDomain0009sOutput)
  async updateDomain0009s(
    @Args('input') input: UpdateDomain0009sInput,
  ): Promise<UpdateDomain0009sOutput> {
    const domain0009s = await this.domain0009Service.updateMany(input);
    return { domain0009s };
  }

  // @Mutation(() => RemoveDomain0009Output)
  // async removeDomain0009(
  //   @Args('input') input: RemoveDomain0009Input,
  //
  // ): Promise<RemoveDomain0009Output> {
  //   const domain0009 = await this.domain0009Service.removeOne(input.id, {
  //     user,
  //   });
  //   return { domain0009 };
  // }

  @ResolveField(() => [Domain0010])
  async domain0010s(
    @Parent() { id, domain0010s }: Domain0009,
  ): Promise<Domain0010[]> {
    if (domain0010s) return domain0010s;

    return this.domain0010Service.findBy({
      domain0009Id: id,
    });
  }
}
