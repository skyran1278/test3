import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { UserDecorator } from 'src/common/user.decorator';
import { User } from 'src/user/user.entity';

import { Domain0012 } from './domain-0012.entity';
import { Domain0012Service } from './domain-0012.service';
import { CreateDomain0012Input } from './mutation/create-domain-0012.input';
import { CreateDomain0012Output } from './mutation/create-domain-0012.output';
import { RemoveDomain0012Input } from './mutation/remove-domain-0012.input';
import { RemoveDomain0012Output } from './mutation/remove-domain-0012.output';
import { UpdateDomain0012Input } from './mutation/update-domain-0012.input';
import { UpdateDomain0012Output } from './mutation/update-domain-0012.output';
import { Domain0012PageArgs } from './query/domain-0012-page.args';
import { Domain0012Page } from './query/domain-0012-page.type';

@Resolver(() => Domain0012)
export class Domain0012Resolver {
  constructor(private readonly domain0012Service: Domain0012Service) {}

  @Mutation(() => CreateDomain0012Output)
  async createDomain0012(
    @Args('input') input: CreateDomain0012Input,
    @UserDecorator() user: User,
  ): Promise<CreateDomain0012Output> {
    const domain0012 = await this.domain0012Service.saveOne(input, {
      user,
    });
    return { domain0012 };
  }

  @Query(() => Domain0012Page)
  domain0012Page(@Args() args: Domain0012PageArgs): Promise<Domain0012Page> {
    return this.domain0012Service.findPage(args);
  }

  @Query(() => Domain0012)
  domain0012(@Args('id', { type: () => ID }) id: string): Promise<Maybe<Domain0012>> {
    return this.domain0012Service.findOne({ where: { id } });
  }

  @Mutation(() => UpdateDomain0012Output)
  async updateDomain0012(
    @Args('input') input: UpdateDomain0012Input,
    @UserDecorator() user: User,
  ): Promise<UpdateDomain0012Output> {
    const domain0012 = await this.domain0012Service.saveOne(input, {
      user,
    });
    return { domain0012 };
  }

  @Mutation(() => RemoveDomain0012Output)
  async removeDomain0012(
    @Args('input') input: RemoveDomain0012Input,
    @UserDecorator() user: User,
  ): Promise<RemoveDomain0012Output> {
    const domain0012 = await this.domain0012Service.removeOne(input.id, {
      user,
    });
    return { domain0012 };
  }
}
