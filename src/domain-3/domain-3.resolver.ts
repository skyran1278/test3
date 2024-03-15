import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { UserDecorator } from 'src/common/user.decorator';
import { User } from 'src/user/user.entity';

import { Domain3 } from './domain-3.entity';
import { Domain3Service } from './domain-3.service';
import { CreateDomain3Input } from './mutation/create-domain-3.input';
import { CreateDomain3Output } from './mutation/create-domain-3.output';
import { RemoveDomain3Input } from './mutation/remove-domain-3.input';
import { RemoveDomain3Output } from './mutation/remove-domain-3.output';
import { UpdateDomain3Input } from './mutation/update-domain-3.input';
import { UpdateDomain3Output } from './mutation/update-domain-3.output';
import { Domain3PageArgs } from './query/domain-3-page.args';
import { Domain3Page } from './query/domain-3-page.type';

@Resolver(() => Domain3)
export class Domain3Resolver {
  constructor(private readonly domain3Service: Domain3Service) {}

  @Mutation(() => CreateDomain3Output)
  async createDomain3(
    @Args('input') input: CreateDomain3Input,
    @UserDecorator() user: User,
  ): Promise<CreateDomain3Output> {
    const domain3 = await this.domain3Service.createOne(input, {
      user,
    });
    return { domain3 };
  }

  @Query(() => Domain3Page)
  domain3Page(@Args() args: Domain3PageArgs): Promise<Domain3Page> {
    return this.domain3Service.findPage(args);
  }

  @Query(() => Domain3)
  domain3(@Args('id', { type: () => ID }) id: string): Promise<Maybe<Domain3>> {
    return this.domain3Service.findOne({ where: { id } });
  }

  @Mutation(() => UpdateDomain3Output)
  async updateDomain3(
    @Args('input') input: UpdateDomain3Input,
    @UserDecorator() user: User,
  ): Promise<UpdateDomain3Output> {
    const domain3 = await this.domain3Service.updateOne(input, {
      user,
    });
    return { domain3 };
  }

  @Mutation(() => RemoveDomain3Output)
  async removeDomain3(
    @Args('input') input: RemoveDomain3Input,
    @UserDecorator() user: User,
  ): Promise<RemoveDomain3Output> {
    const domain3 = await this.domain3Service.removeOne(input.id, {
      user,
    });
    return { domain3 };
  }
}
