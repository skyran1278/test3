import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain0003ByIdLoader } from './domain-0003-by-id.loader';
import { Domain0003 } from './domain-0003.entity';
import { Domain0003ById } from './dto/domain-0003-by-id.type';

@Resolver(() => Domain0003ById)
export class Domain0003ByIdResolver {
  constructor(private readonly loader: Domain0003ByIdLoader) {}

  @ResolveField(() => Domain0003, { nullable: true })
  async domain0003(
    @Parent() { domain0003Id, domain0003 }: Domain0003ById,
  ): Promise<Maybe<Domain0003>> {
    if (domain0003) return domain0003;
    if (domain0003Id) return this.loader.load(domain0003Id);
    return null;
  }
}
