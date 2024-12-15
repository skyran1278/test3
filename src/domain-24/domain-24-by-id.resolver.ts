import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain24ByIdLoader } from './domain-24-by-id.loader';
import { Domain24 } from './domain-24.entity';
import { Domain24ById } from './query/domain-24-by-id.type';

@Resolver(() => Domain24ById)
export class Domain24ByIdResolver {
  constructor(private readonly loader: Domain24ByIdLoader) {}

  @ResolveField(() => Domain24, { nullable: true })
  async domain24(
    @Parent() { domain24Id, domain24 }: Domain24ById,
  ): Promise<Maybe<Domain24>> {
    if (domain24) return domain24;
    if (domain24Id) return this.loader.load(domain24Id);
    return null;
  }
}
