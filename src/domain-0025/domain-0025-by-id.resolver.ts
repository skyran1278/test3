import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain0025ByIdLoader } from './domain-0025-by-id.loader';
import { Domain0025 } from './domain-0025.entity';
import { Domain0025ById } from './query/domain-0025-by-id.type';

@Resolver(() => Domain0025ById)
export class Domain0025ByIdResolver {
  constructor(private readonly loader: Domain0025ByIdLoader) {}

  @ResolveField(() => Domain0025, { nullable: true })
  async domain0025(
    @Parent() { domain0025Id, domain0025 }: Domain0025ById,
  ): Promise<Maybe<Domain0025>> {
    if (domain0025) return domain0025;
    if (domain0025Id) return this.loader.load(domain0025Id);
    return null;
  }
}
