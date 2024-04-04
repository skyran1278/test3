import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain0005ByIdLoader } from './domain-0005-by-id.loader';
import { Domain0005 } from './domain-0005.entity';
import { Domain0005ById } from './query/domain-0005-by-id.type';

@Resolver(() => Domain0005ById)
export class Domain0005ByIdResolver {
  constructor(private readonly loader: Domain0005ByIdLoader) {}

  @ResolveField(() => Domain0005, { nullable: true })
  async domain0005(
    @Parent() { domain0005Id, domain0005 }: Domain0005ById,
  ): Promise<Maybe<Domain0005>> {
    if (domain0005) return domain0005;
    if (domain0005Id) return this.loader.load(domain0005Id);
    return null;
  }
}
