import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { ResolverInterface } from '../common/resolver.interface';
import { Domain10 } from '../domain-10/domain-10.entity';
import { Domain10Repository } from '../domain-10/domain-10.repository';
import { Domain09 } from './domain-09.entity';

@Resolver(() => Domain09)
export class Domain09Resolver implements ResolverInterface<Domain09> {
  constructor(private readonly domain10Repository: Domain10Repository) {}

  // @Transactional()
  // @Mutation(() => CreateDomain09Output)
  // async createDomain09(
  //   @Args('input') input: CreateDomain09Input,
  // ): Promise<CreateDomain09Output> {
  //   const domain09 = await this.domain09Service.saveOne(input);
  //   return { domain09 };
  // }

  // @Query(() => Domain09Page)
  // domain09Page(@Args() args: Domain09PageArgs): Promise<Domain09Page> {
  //   return this.domain09Service.findPage(args);
  // }

  // @Query(() => Domain09)
  // domain09(@Args('id', { type: () => ID }) id: string): Promise<Maybe<Domain09>> {
  //   return this.domain09Service.findOne({ where: { id } });
  // }

  // @Transactional()
  // @Mutation(() => UpdateDomain09Output)
  // async updateDomain09(
  //   @Args('input') input: UpdateDomain09Input,
  // ): Promise<UpdateDomain09Output> {
  //   const domain09 = await this.domain09Service.saveOne(input);
  //   return { domain09 };
  // }

  // @Transactional()
  // @Mutation(() => UpdateDomain09sOutput)
  // async updateDomain09s(
  //   @Args('input') input: UpdateDomain09sInput,
  // ): Promise<UpdateDomain09sOutput> {
  //   const domain09s = await this.domain09Service.updateMany(input);
  //   return { domain09s };
  // }

  // @Mutation(() => RemoveDomain09Output)
  // async removeDomain09(
  //   @Args('input') input: RemoveDomain09Input,
  //
  // ): Promise<RemoveDomain09Output> {
  //   const domain09 = await this.domain09Service.removeOne(input.id, {
  //     user,
  //   });
  //   return { domain09 };
  // }

  @ResolveField(() => [Domain10])
  async domain10s(@Parent() { id, domain10s }: Domain09): Promise<Domain10[]> {
    if (domain10s) return domain10s;

    return this.domain10Repository.findBy({
      domain09Id: id,
    });
  }
}
