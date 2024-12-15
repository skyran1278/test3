import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain21ByIdLoader } from './domain-21-by-id.loader';
import { Domain21 } from './domain-21.entity';
import { Domain21ById } from './query/domain-21-by-id.type';

@Resolver(() => Domain21ById)
export class Domain21ByIdResolver {
  constructor(private readonly loader: Domain21ByIdLoader) {}

  @ResolveField(() => Domain21, { nullable: true })
  async domain21(
    @Parent() { domain21Id, domain21 }: Domain21ById,
  ): Promise<Maybe<Domain21>> {
    if (domain21) return domain21;
    if (domain21Id) return this.loader.load(domain21Id);
    return null;
  }
}
