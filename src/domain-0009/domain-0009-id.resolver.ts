import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain0009IdLoader } from './domain-0009-id.loader';
import { Domain0009 } from './domain-0009.entity';
import { Domain0009Id } from './query/domain-0009-id.type';

@Resolver(() => Domain0009Id)
export class Domain0009IdResolver {
  constructor(private readonly loader: Domain0009IdLoader) {}

  @ResolveField(() => Domain0009, { nullable: true })
  async domain0009(
    @Parent() { domain0009Id, domain0009 }: Domain0009Id,
  ): Promise<Maybe<Domain0009>> {
    if (domain0009) return domain0009;
    if (domain0009Id) return this.loader.load(domain0009Id);
    return null;
  }
}
