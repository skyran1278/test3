import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain10 } from './domain-10.entity';
import { Domain10sByDomain09IdLoader } from './domain-10s-by-domain-09-id.loader';
import { Domain10sByDomain09Id } from './query/domain-10s-by-domain-09-id.type';

@Resolver(() => Domain10sByDomain09Id)
export class Domain10sByDomain09IdResolver {
  constructor(private readonly loader: Domain10sByDomain09IdLoader) {}

  @ResolveField(() => [Domain10], { nullable: true })
  async domain10s(
    @Parent() { id, domain10s }: Domain10sByDomain09Id,
  ): Promise<Maybe<Domain10[]>> {
    if (domain10s) return domain10s;
    return this.loader.load(id);
  }
}
