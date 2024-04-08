import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain0007ByIdLoader } from './domain-0007-by-id.loader';
import { Domain0007 } from './domain-0007.entity';
import { Domain0007ById } from './dto/domain-0007-by-id.type';

@Resolver(() => Domain0007ById)
export class Domain0007ByIdResolver {
  constructor(private readonly loader: Domain0007ByIdLoader) {}

  @ResolveField(() => Domain0007, { nullable: true })
  async domain0007(
    @Parent() { domain0007Id, domain0007 }: Domain0007ById,
  ): Promise<Maybe<Domain0007>> {
    if (domain0007) return domain0007;
    if (domain0007Id) return this.loader.load(domain0007Id);
    return null;
  }
}
