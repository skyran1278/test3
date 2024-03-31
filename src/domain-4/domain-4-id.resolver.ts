import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain4IdLoader } from './domain-4-id.loader';
import { Domain4 } from './domain-4.entity';
import { Domain4Id } from './query/domain-4-id.type';

@Resolver(() => Domain4Id)
export class Domain4IdResolver {
  constructor(private readonly loader: Domain4IdLoader) {}

  @ResolveField(() => Domain4, { nullable: true })
  async domain4(
    @Parent() { domain4Id, domain4 }: Domain4Id,
  ): Promise<Maybe<Domain4>> {
    if (domain4) return domain4;
    if (domain4Id) return this.loader.load(domain4Id);
    return null;
  }
}
