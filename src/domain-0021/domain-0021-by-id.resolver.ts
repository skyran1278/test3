import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain0021ByIdLoader } from './domain-0021-by-id.loader';
import { Domain0021 } from './domain-0021.entity';
import { Domain0021ById } from './query/domain-0021-by-id.type';

@Resolver(() => Domain0021ById)
export class Domain0021ByIdResolver {
  constructor(private readonly loader: Domain0021ByIdLoader) {}

  @ResolveField(() => Domain0021, { nullable: true })
  async domain0021(
    @Parent() { domain0021Id, domain0021 }: Domain0021ById,
  ): Promise<Maybe<Domain0021>> {
    if (domain0021) return domain0021;
    if (domain0021Id) return this.loader.load(domain0021Id);
    return null;
  }
}
