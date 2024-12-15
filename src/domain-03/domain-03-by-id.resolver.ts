import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain03ByIdLoader } from './domain-03-by-id.loader';
import { Domain03 } from './domain-03.entity';
import { Domain03ById } from './query/domain-03-by-id.type';

@Resolver(() => Domain03ById)
export class Domain03ByIdResolver {
  constructor(private readonly loader: Domain03ByIdLoader) {}

  @ResolveField(() => Domain03, { nullable: true })
  async domain03(
    @Parent() { domain03Id, domain03 }: Domain03ById,
  ): Promise<Maybe<Domain03>> {
    if (domain03) return domain03;
    if (domain03Id) return this.loader.load(domain03Id);
    return null;
  }
}
