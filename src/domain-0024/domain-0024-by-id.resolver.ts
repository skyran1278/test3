import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain0024ByIdLoader } from './domain-0024-by-id.loader';
import { Domain0024 } from './domain-0024.entity';
import { Domain0024ById } from './query/domain-0024-by-id.type';

@Resolver(() => Domain0024ById)
export class Domain0024ByIdResolver {
  constructor(private readonly loader: Domain0024ByIdLoader) {}

  @ResolveField(() => Domain0024, { nullable: true })
  async domain0024(
    @Parent() { domain0024Id, domain0024 }: Domain0024ById,
  ): Promise<Maybe<Domain0024>> {
    if (domain0024) return domain0024;
    if (domain0024Id) return this.loader.load(domain0024Id);
    return null;
  }
}
