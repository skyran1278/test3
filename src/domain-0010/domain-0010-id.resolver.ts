import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain0010IdLoader } from './domain-0010-id.loader';
import { Domain0010 } from './domain-0010.entity';
import { Domain0010Id } from './query/domain-0010-id.type';

@Resolver(() => Domain0010Id)
export class Domain0010IdResolver {
  constructor(private readonly loader: Domain0010IdLoader) {}

  @ResolveField(() => Domain0010, { nullable: true })
  async domain0010(
    @Parent() { domain0010Id, domain0010 }: Domain0010Id,
  ): Promise<Maybe<Domain0010>> {
    if (domain0010) return domain0010;
    if (domain0010Id) return this.loader.load(domain0010Id);
    return null;
  }
}
