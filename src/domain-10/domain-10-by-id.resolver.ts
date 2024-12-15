import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain10ByIdLoader } from './domain-10-by-id.loader';
import { Domain10 } from './domain-10.entity';
import { Domain10ById } from './query/domain-10-by-id.type';

@Resolver(() => Domain10ById)
export class Domain10ByIdResolver {
  constructor(private readonly loader: Domain10ByIdLoader) {}

  @ResolveField(() => Domain10, { nullable: true })
  async domain10(
    @Parent() { domain10Id, domain10 }: Domain10ById,
  ): Promise<Maybe<Domain10>> {
    if (domain10) return domain10;
    if (domain10Id) return this.loader.load(domain10Id);
    return null;
  }
}
