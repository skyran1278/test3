import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain01ByIdLoader } from './domain-01-by-id.loader';
import { Domain01 } from './domain-01.entity';
import { Domain01ById } from './query/domain-01-by-id.type';

@Resolver(() => Domain01ById)
export class Domain01ByIdResolver {
  constructor(private readonly loader: Domain01ByIdLoader) {}

  @ResolveField(() => Domain01, { nullable: true })
  async domain01(
    @Parent() { domain01Id, domain01 }: Domain01ById,
  ): Promise<Maybe<Domain01>> {
    if (domain01) return domain01;
    if (domain01Id) return this.loader.load(domain01Id);
    return null;
  }
}
