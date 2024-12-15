import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain22ByIdLoader } from './domain-22-by-id.loader';
import { Domain22 } from './domain-22.entity';
import { Domain22ById } from './query/domain-22-by-id.type';

@Resolver(() => Domain22ById)
export class Domain22ByIdResolver {
  constructor(private readonly loader: Domain22ByIdLoader) {}

  @ResolveField(() => Domain22, { nullable: true })
  async domain22(
    @Parent() { domain22Id, domain22 }: Domain22ById,
  ): Promise<Maybe<Domain22>> {
    if (domain22) return domain22;
    if (domain22Id) return this.loader.load(domain22Id);
    return null;
  }
}
