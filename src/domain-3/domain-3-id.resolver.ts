import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain3IdLoader } from './domain-3-id.loader';
import { Domain3 } from './domain-3.entity';
import { Domain3Id } from './query/domain-3-id.type';

@Resolver(() => Domain3Id)
export class Domain3IdResolver {
  constructor(private readonly loader: Domain3IdLoader) {}

  @ResolveField(() => Domain3, { nullable: true })
  async domain3(
    @Parent() { domain3Id, domain3 }: Domain3Id,
  ): Promise<Maybe<Domain3>> {
    if (domain3) return domain3;
    if (domain3Id) return this.loader.load(domain3Id);
    return null;
  }
}
