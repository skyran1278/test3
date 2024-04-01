import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain0001IdLoader } from './domain-0001-id.loader';
import { Domain0001 } from './domain-0001.entity';
import { Domain0001Id } from './query/domain-0001-id.type';

@Resolver(() => Domain0001Id)
export class Domain0001IdResolver {
  constructor(private readonly loader: Domain0001IdLoader) {}

  @ResolveField(() => Domain0001, { nullable: true })
  async domain0001(
    @Parent() { domain0001Id, domain0001 }: Domain0001Id,
  ): Promise<Maybe<Domain0001>> {
    if (domain0001) return domain0001;
    if (domain0001Id) return this.loader.load(domain0001Id);
    return null;
  }
}
