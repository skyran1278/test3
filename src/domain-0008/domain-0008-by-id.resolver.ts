import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain0008ByIdLoader } from './domain-0008-by-id.loader';
import { Domain0008 } from './domain-0008.entity';
import { Domain0008ById } from './query/domain-0008-by-id.type';

@Resolver(() => Domain0008ById)
export class Domain0008ByIdResolver {
  constructor(private readonly loader: Domain0008ByIdLoader) {}

  @ResolveField(() => Domain0008, { nullable: true })
  async domain0008(
    @Parent() { domain0008Id, domain0008 }: Domain0008ById,
  ): Promise<Maybe<Domain0008>> {
    if (domain0008) return domain0008;
    if (domain0008Id) return this.loader.load(domain0008Id);
    return null;
  }
}
