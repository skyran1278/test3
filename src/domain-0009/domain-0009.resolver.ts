import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { Domain0010 } from '../domain-0010/domain-0010.entity';
import { Domain0010Repository } from '../domain-0010/domain-0010.repository';
import { Domain0009 } from './domain-0009.entity';

@Resolver(() => Domain0009)
export class Domain0009Resolver {
  constructor(private readonly domain0010Repository: Domain0010Repository) {}

  // @Transactional()
  // @Mutation(() => CreateDomain0009Output)
  // async createDomain0009(
  //   @Args('input') input: CreateDomain0009Input,
  // ): Promise<CreateDomain0009Output> {
  //   const domain0009 = await this.domain0009Service.saveOne(input);
  //   return { domain0009 };
  // }

  // @Query(() => Domain0009Page)
  // domain0009Page(@Args() args: Domain0009PageArgs): Promise<Domain0009Page> {
  //   return this.domain0009Service.findPage(args);
  // }

  // @Query(() => Domain0009)
  // domain0009(@Args('id', { type: () => ID }) id: string): Promise<Maybe<Domain0009>> {
  //   return this.domain0009Service.findOne({ where: { id } });
  // }

  // @Transactional()
  // @Mutation(() => UpdateDomain0009Output)
  // async updateDomain0009(
  //   @Args('input') input: UpdateDomain0009Input,
  // ): Promise<UpdateDomain0009Output> {
  //   const domain0009 = await this.domain0009Service.saveOne(input);
  //   return { domain0009 };
  // }

  // @Transactional()
  // @Mutation(() => UpdateDomain0009sOutput)
  // async updateDomain0009s(
  //   @Args('input') input: UpdateDomain0009sInput,
  // ): Promise<UpdateDomain0009sOutput> {
  //   const domain0009s = await this.domain0009Service.updateMany(input);
  //   return { domain0009s };
  // }

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

    return this.domain0010Repository.findBy({
      domain0009Id: id,
    });
  }
}
