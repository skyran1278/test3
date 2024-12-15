import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain08ByIdLoader } from './domain-08-by-id.loader';
import { Domain08 } from './domain-08.entity';
import { Domain08ById } from './query/domain-08-by-id.type';

@Resolver(() => Domain08ById)
export class Domain08ByIdResolver {
  constructor(private readonly loader: Domain08ByIdLoader) {}

  @ResolveField(() => Domain08, { nullable: true })
  async domain08(
    @Parent() { domain08Id, domain08 }: Domain08ById,
  ): Promise<Maybe<Domain08>> {
    if (domain08) return domain08;
    if (domain08Id) return this.loader.load(domain08Id);
    return null;
  }
}
