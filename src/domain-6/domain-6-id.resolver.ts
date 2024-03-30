import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain6IdLoader } from './domain-6-id.loader';
import { Domain6 } from './domain-6.entity';
import { Domain6Id } from './query/domain-6-id.type';

@Resolver(() => Domain6Id)
export class Domain6IdResolver {
  constructor(private readonly loader: Domain6IdLoader) {}

  @ResolveField(() => Domain6, { nullable: true })
  async domain6(
    @Parent() { domain6Id, domain6 }: Domain6Id,
  ): Promise<Maybe<Domain6>> {
    if (domain6) return domain6;
    if (domain6Id) return this.loader.load(domain6Id);
    return null;
  }
}
