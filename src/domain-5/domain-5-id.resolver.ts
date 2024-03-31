import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain5IdLoader } from './domain-5-id.loader';
import { Domain5 } from './domain-5.entity';
import { Domain5Id } from './query/domain-5-id.type';

@Resolver(() => Domain5Id)
export class Domain5IdResolver {
  constructor(private readonly loader: Domain5IdLoader) {}

  @ResolveField(() => Domain5, { nullable: true })
  async domain5(
    @Parent() { domain5Id, domain5 }: Domain5Id,
  ): Promise<Maybe<Domain5>> {
    if (domain5) return domain5;
    if (domain5Id) return this.loader.load(domain5Id);
    return null;
  }
}
