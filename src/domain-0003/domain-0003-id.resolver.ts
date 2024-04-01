import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain0003IdLoader } from './domain-0003-id.loader';
import { Domain0003 } from './domain-0003.entity';
import { Domain0003Id } from './query/domain-0003-id.type';

@Resolver(() => Domain0003Id)
export class Domain0003IdResolver {
  constructor(private readonly loader: Domain0003IdLoader) {}

  @ResolveField(() => Domain0003, { nullable: true })
  async domain0003(
    @Parent() { domain0003Id, domain0003 }: Domain0003Id,
  ): Promise<Maybe<Domain0003>> {
    if (domain0003) return domain0003;
    if (domain0003Id) return this.loader.load(domain0003Id);
    return null;
  }
}
