import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain0002IdLoader } from './domain-0002-id.loader';
import { Domain0002 } from './domain-0002.entity';
import { Domain0002Id } from './query/domain-0002-id.type';

@Resolver(() => Domain0002Id)
export class Domain0002IdResolver {
  constructor(private readonly loader: Domain0002IdLoader) {}

  @ResolveField(() => Domain0002, { nullable: true })
  async domain0002(
    @Parent() { domain0002Id, domain0002 }: Domain0002Id,
  ): Promise<Maybe<Domain0002>> {
    if (domain0002) return domain0002;
    if (domain0002Id) return this.loader.load(domain0002Id);
    return null;
  }
}
