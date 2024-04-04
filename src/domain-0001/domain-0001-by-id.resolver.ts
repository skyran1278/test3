import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain0001ByIdLoader } from './domain-0001-by-id.loader';
import { Domain0001 } from './domain-0001.entity';
import { Domain0001ById } from './query/domain-0001-by-id.type';

@Resolver(() => Domain0001ById)
export class Domain0001ByIdResolver {
  constructor(private readonly loader: Domain0001ByIdLoader) {}

  @ResolveField(() => Domain0001, { nullable: true })
  async domain0001(
    @Parent() { domain0001Id, domain0001 }: Domain0001ById,
  ): Promise<Maybe<Domain0001>> {
    if (domain0001) return domain0001;
    if (domain0001Id) return this.loader.load(domain0001Id);
    return null;
  }
}
