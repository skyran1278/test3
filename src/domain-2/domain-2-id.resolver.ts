import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain2IdLoader } from './domain-2-id.loader';
import { Domain2 } from './domain-2.entity';
import { Domain2Id } from './query/domain-2-id.type';

@Resolver(() => Domain2Id)
export class Domain2IdResolver {
  constructor(private readonly loader: Domain2IdLoader) {}

  @ResolveField(() => Domain2, { nullable: true })
  async domain2(
    @Parent() { domain2Id, domain2 }: Domain2Id,
  ): Promise<Maybe<Domain2>> {
    if (domain2) return domain2;
    if (domain2Id) return this.loader.load(domain2Id);
    return null;
  }
}
