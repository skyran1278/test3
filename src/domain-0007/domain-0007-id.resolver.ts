import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain0007IdLoader } from './domain-0007-id.loader';
import { Domain0007 } from './domain-0007.entity';
import { Domain0007Id } from './query/domain-0007-id.type';

@Resolver(() => Domain0007Id)
export class Domain0007IdResolver {
  constructor(private readonly loader: Domain0007IdLoader) {}

  @ResolveField(() => Domain0007, { nullable: true })
  async domain0007(
    @Parent() { domain0007Id, domain0007 }: Domain0007Id,
  ): Promise<Maybe<Domain0007>> {
    if (domain0007) return domain0007;
    if (domain0007Id) return this.loader.load(domain0007Id);
    return null;
  }
}
