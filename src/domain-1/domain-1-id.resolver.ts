import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain1IdLoader } from './domain-1-id.loader';
import { Domain1 } from './domain-1.entity';
import { Domain1Id } from './query/domain-1-id.type';

@Resolver(() => Domain1Id)
export class Domain1IdResolver {
  constructor(private readonly loader: Domain1IdLoader) {}

  @ResolveField(() => Domain1, { nullable: true })
  async domain1(
    @Parent() { domain1Id, domain1 }: Domain1Id,
  ): Promise<Maybe<Domain1>> {
    if (domain1) return domain1;
    if (domain1Id) return this.loader.load(domain1Id);
    return null;
  }
}
