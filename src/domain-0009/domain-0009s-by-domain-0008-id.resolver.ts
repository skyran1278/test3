import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain0009 } from './domain-0009.entity';
import { Domain0009sByDomain0008IdLoader } from './domain-0009s-by-domain-0008-id.loader';
import { Domain0009sByDomain0008Id } from './query/domain-0009s-by-domain-0008-id.type';

@Resolver(() => Domain0009sByDomain0008Id)
export class Domain0009sByDomain0008IdResolver {
  constructor(private readonly loader: Domain0009sByDomain0008IdLoader) {}

  @ResolveField(() => [Domain0009], { nullable: true })
  async domain0009s(
    @Parent() { id, domain0009s }: Domain0009sByDomain0008Id,
  ): Promise<Maybe<Domain0009[]>> {
    if (domain0009s) return domain0009s;
    return this.loader.load(id);
  }
}
