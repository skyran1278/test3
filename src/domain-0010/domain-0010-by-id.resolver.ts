import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain0010ByIdLoader } from './domain-0010-by-id.loader';
import { Domain0010 } from './domain-0010.entity';
import { Domain0010ById } from './dto/domain-0010-by-id.type';

@Resolver(() => Domain0010ById)
export class Domain0010ByIdResolver {
  constructor(private readonly loader: Domain0010ByIdLoader) {}

  @ResolveField(() => Domain0010, { nullable: true })
  async domain0010(
    @Parent() { domain0010Id, domain0010 }: Domain0010ById,
  ): Promise<Maybe<Domain0010>> {
    if (domain0010) return domain0010;
    if (domain0010Id) return this.loader.load(domain0010Id);
    return null;
  }
}
