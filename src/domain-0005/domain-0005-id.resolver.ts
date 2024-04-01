import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain0005IdLoader } from './domain-0005-id.loader';
import { Domain0005 } from './domain-0005.entity';
import { Domain0005Id } from './query/domain-0005-id.type';

@Resolver(() => Domain0005Id)
export class Domain0005IdResolver {
  constructor(private readonly loader: Domain0005IdLoader) {}

  @ResolveField(() => Domain0005, { nullable: true })
  async domain0005(
    @Parent() { domain0005Id, domain0005 }: Domain0005Id,
  ): Promise<Maybe<Domain0005>> {
    if (domain0005) return domain0005;
    if (domain0005Id) return this.loader.load(domain0005Id);
    return null;
  }
}
