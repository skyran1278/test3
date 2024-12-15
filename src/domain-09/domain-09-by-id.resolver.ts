import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain09ByIdLoader } from './domain-09-by-id.loader';
import { Domain09 } from './domain-09.entity';
import { Domain09ById } from './query/domain-09-by-id.type';

@Resolver(() => Domain09ById)
export class Domain09ByIdResolver {
  constructor(private readonly loader: Domain09ByIdLoader) {}

  @ResolveField(() => Domain09, { nullable: true })
  async domain09(
    @Parent() { domain09Id, domain09 }: Domain09ById,
  ): Promise<Maybe<Domain09>> {
    if (domain09) return domain09;
    if (domain09Id) return this.loader.load(domain09Id);
    return null;
  }
}
