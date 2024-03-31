import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UserDecorator } from 'src/common/user.decorator';
import { User } from 'src/user/user.entity';

import { Domain3 } from 'src/domain-3/domain-3.entity';
import { Domain3Service } from 'src/domain-3/domain-3.service';
import { Domain2 } from './domain-2.entity';
import { Domain2Service } from './domain-2.service';
import { CreateDomain2Input } from './mutation/create-domain-2.input';
import { CreateDomain2Output } from './mutation/create-domain-2.output';
import { UpdateDomain2Input } from './mutation/update-domain-2.input';
import { UpdateDomain2Output } from './mutation/update-domain-2.output';
import { UpdateDomain2sInput } from './mutation/update-domain-2s.input';
import { UpdateDomain2sOutput } from './mutation/update-domain-2s.output';

@Resolver(() => Domain2)
export class Domain2Resolver {
  constructor(
    private readonly domain2Service: Domain2Service,
    private readonly domain3Service: Domain3Service,
  ) {}

  @Mutation(() => CreateDomain2Output)
  async createDomain2(
    @Args('input') input: CreateDomain2Input,
    @UserDecorator() user: User,
  ): Promise<CreateDomain2Output> {
    const domain2 = await this.domain2Service.createOne(input, {
      user,
    });
    return { domain2 };
  }

  // @Query(() => Domain2Page)
  // domain2Page(@Args() args: Domain2PageArgs): Promise<Domain2Page> {
  //   return this.domain2Service.findPage(args);
  // }

  // @Query(() => Domain2)
  // domain2(@Args('id', { type: () => ID }) id: string): Promise<Maybe<Domain2>> {
  //   return this.domain2Service.findOne({ where: { id } });
  // }

  @Mutation(() => UpdateDomain2Output)
  async updateDomain2(
    @Args('input') input: UpdateDomain2Input,
    @UserDecorator() user: User,
  ): Promise<UpdateDomain2Output> {
    const domain2 = await this.domain2Service.updateOne(input, {
      user,
    });
    return { domain2 };
  }

  @Mutation(() => UpdateDomain2sOutput)
  async updateDomain2s(
    @Args('input') input: UpdateDomain2sInput,
    @UserDecorator() user: User,
  ): Promise<UpdateDomain2sOutput> {
    const domain2s = await this.domain2Service.updateMany(input, {
      user,
    });
    return { domain2s };
  }

  // @Mutation(() => RemoveDomain2Output)
  // async removeDomain2(
  //   @Args('input') input: RemoveDomain2Input,
  //   @UserDecorator() user: User,
  // ): Promise<RemoveDomain2Output> {
  //   const domain2 = await this.domain2Service.removeOne(input.id, {
  //     user,
  //   });
  //   return { domain2 };
  // }

  @ResolveField(() => [Domain3])
  async domain3s(@Parent() { id, domain3s }: Domain2): Promise<Domain3[]> {
    if (domain3s) return domain3s;

    return this.domain3Service.findBy({
      domain2Id: id,
    });
  }
}
