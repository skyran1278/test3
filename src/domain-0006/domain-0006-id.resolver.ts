import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain0006IdLoader } from './domain-0006-id.loader';
import { Domain0006 } from './domain-0006.entity';
import { Domain0006Id } from './query/domain-0006-id.type';

@Resolver(() => Domain0006Id)
export class Domain0006IdResolver {
  constructor(private readonly loader: Domain0006IdLoader) {}

  @ResolveField(() => Domain0006, { nullable: true })
  async domain0006(
    @Parent() { domain0006Id, domain0006 }: Domain0006Id,
  ): Promise<Maybe<Domain0006>> {
    if (domain0006) return domain0006;
    if (domain0006Id) return this.loader.load(domain0006Id);
    return null;
  }
}
