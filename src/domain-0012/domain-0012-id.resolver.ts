import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain0012IdLoader } from './domain-0012-id.loader';
import { Domain0012 } from './domain-0012.entity';
import { Domain0012Id } from './query/domain-0012-id.type';

@Resolver(() => Domain0012Id)
export class Domain0012IdResolver {
  constructor(private readonly loader: Domain0012IdLoader) {}

  @ResolveField(() => Domain0012, { nullable: true })
  async domain0012(
    @Parent() { domain0012Id, domain0012 }: Domain0012Id,
  ): Promise<Maybe<Domain0012>> {
    if (domain0012) return domain0012;
    if (domain0012Id) return this.loader.load(domain0012Id);
    return null;
  }
}
