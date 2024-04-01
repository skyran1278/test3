import {
    Args,
    Mutation,
    Parent,
    ResolveField,
    Resolver,
} from '@nestjs/graphql';
import { UserDecorator } from 'src/common/user.decorator';
import { User } from 'src/user/user.entity';

import { Domain0003 } from 'src/domain-0003/domain-0003.entity';
import { Domain0003Service } from 'src/domain-0003/domain-0003.service';
import { Domain0002 } from './domain-0002.entity';
import { Domain0002Service } from './domain-0002.service';
import { CreateDomain0002Input } from './mutation/create-domain-0002.input';
import { CreateDomain0002Output } from './mutation/create-domain-0002.output';
import { UpdateDomain0002Input } from './mutation/update-domain-0002.input';
import { UpdateDomain0002Output } from './mutation/update-domain-0002.output';
import { UpdateDomain0002sInput } from './mutation/update-domain-0002s.input';
import { UpdateDomain0002sOutput } from './mutation/update-domain-0002s.output';

@Resolver(() => Domain0002)
export class Domain0002Resolver {
  constructor(
    private readonly domain0002Service: Domain0002Service,
    private readonly domain0003Service: Domain0003Service,
  ) {}

  @Mutation(() => CreateDomain0002Output)
  async createDomain0002(
    @Args('input') input: CreateDomain0002Input,
    @UserDecorator() user: User,
  ): Promise<CreateDomain0002Output> {
    const domain0002 = await this.domain0002Service.createOne(input, {
      user,
    });
    return { domain0002 };
  }

  // @Query(() => Domain0002Page)
  // domain0002Page(@Args() args: Domain0002PageArgs): Promise<Domain0002Page> {
  //   return this.domain0002Service.findPage(args);
  // }

  // @Query(() => Domain0002)
  // domain0002(@Args('id', { type: () => ID }) id: string): Promise<Maybe<Domain0002>> {
  //   return this.domain0002Service.findOne({ where: { id } });
  // }

  @Mutation(() => UpdateDomain0002Output)
  async updateDomain0002(
    @Args('input') input: UpdateDomain0002Input,
    @UserDecorator() user: User,
  ): Promise<UpdateDomain0002Output> {
    const domain0002 = await this.domain0002Service.updateOne(input, {
      user,
    });
    return { domain0002 };
  }

  @Mutation(() => UpdateDomain0002sOutput)
  async updateDomain0002s(
    @Args('input') input: UpdateDomain0002sInput,
    @UserDecorator() user: User,
  ): Promise<UpdateDomain0002sOutput> {
    const domain0002s = await this.domain0002Service.updateMany(input, {
      user,
    });
    return { domain0002s };
  }

  // @Mutation(() => RemoveDomain0002Output)
  // async removeDomain0002(
  //   @Args('input') input: RemoveDomain0002Input,
  //   @UserDecorator() user: User,
  // ): Promise<RemoveDomain0002Output> {
  //   const domain0002 = await this.domain0002Service.removeOne(input.id, {
  //     user,
  //   });
  //   return { domain0002 };
  // }

  @ResolveField(() => [Domain0003])
  async domain0003s(@Parent() { id, domain0003s }: Domain0002): Promise<Domain0003[]> {
    if (domain0003s) return domain0003s;

    return this.domain0003Service.findBy({
      domain0002Id: id,
    });
  }
}
