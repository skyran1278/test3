import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain0022ByIdLoader } from './domain-0022-by-id.loader';
import { Domain0022 } from './domain-0022.entity';
import { Domain0022ById } from './query/domain-0022-by-id.type';

@Resolver(() => Domain0022ById)
export class Domain0022ByIdResolver {
  constructor(private readonly loader: Domain0022ByIdLoader) {}

  @ResolveField(() => Domain0022, { nullable: true })
  async domain0022(
    @Parent() { domain0022Id, domain0022 }: Domain0022ById,
  ): Promise<Maybe<Domain0022>> {
    if (domain0022) return domain0022;
    if (domain0022Id) return this.loader.load(domain0022Id);
    return null;
  }
}
