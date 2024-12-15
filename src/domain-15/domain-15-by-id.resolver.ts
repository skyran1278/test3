import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain15ByIdLoader } from './domain-15-by-id.loader';
import { Domain15 } from './domain-15.entity';
import { Domain15ById } from './query/domain-15-by-id.type';

@Resolver(() => Domain15ById)
export class Domain15ByIdResolver {
  constructor(private readonly loader: Domain15ByIdLoader) {}

  @ResolveField(() => Domain15, { nullable: true })
  async domain15(
    @Parent() { domain15Id, domain15 }: Domain15ById,
  ): Promise<Maybe<Domain15>> {
    if (domain15) return domain15;
    if (domain15Id) return this.loader.load(domain15Id);
    return null;
  }
}
