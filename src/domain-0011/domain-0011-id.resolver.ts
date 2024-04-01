import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain0011IdLoader } from './domain-0011-id.loader';
import { Domain0011 } from './domain-0011.entity';
import { Domain0011Id } from './query/domain-0011-id.type';

@Resolver(() => Domain0011Id)
export class Domain0011IdResolver {
  constructor(private readonly loader: Domain0011IdLoader) {}

  @ResolveField(() => Domain0011, { nullable: true })
  async domain0011(
    @Parent() { domain0011Id, domain0011 }: Domain0011Id,
  ): Promise<Maybe<Domain0011>> {
    if (domain0011) return domain0011;
    if (domain0011Id) return this.loader.load(domain0011Id);
    return null;
  }
}
