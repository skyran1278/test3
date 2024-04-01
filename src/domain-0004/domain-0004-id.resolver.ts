import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain0004IdLoader } from './domain-0004-id.loader';
import { Domain0004 } from './domain-0004.entity';
import { Domain0004Id } from './query/domain-0004-id.type';

@Resolver(() => Domain0004Id)
export class Domain0004IdResolver {
  constructor(private readonly loader: Domain0004IdLoader) {}

  @ResolveField(() => Domain0004, { nullable: true })
  async domain0004(
    @Parent() { domain0004Id, domain0004 }: Domain0004Id,
  ): Promise<Maybe<Domain0004>> {
    if (domain0004) return domain0004;
    if (domain0004Id) return this.loader.load(domain0004Id);
    return null;
  }
}
