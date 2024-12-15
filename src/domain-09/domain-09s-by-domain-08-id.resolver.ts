import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain09 } from './domain-09.entity';
import { Domain09sByDomain08IdLoader } from './domain-09s-by-domain-08-id.loader';
import { Domain09sByDomain08Id } from './query/domain-09s-by-domain-08-id.type';

@Resolver(() => Domain09sByDomain08Id)
export class Domain09sByDomain08IdResolver {
  constructor(private readonly loader: Domain09sByDomain08IdLoader) {}

  @ResolveField(() => [Domain09], { nullable: true })
  async domain09s(
    @Parent() { id, domain09s }: Domain09sByDomain08Id,
  ): Promise<Maybe<Domain09[]>> {
    if (domain09s) return domain09s;
    return this.loader.load(id);
  }
}
