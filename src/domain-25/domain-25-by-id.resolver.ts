import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain25ByIdLoader } from './domain-25-by-id.loader';
import { Domain25 } from './domain-25.entity';
import { Domain25ById } from './query/domain-25-by-id.type';

@Resolver(() => Domain25ById)
export class Domain25ByIdResolver {
  constructor(private readonly loader: Domain25ByIdLoader) {}

  @ResolveField(() => Domain25, { nullable: true })
  async domain25(
    @Parent() { domain25Id, domain25 }: Domain25ById,
  ): Promise<Maybe<Domain25>> {
    if (domain25) return domain25;
    if (domain25Id) return this.loader.load(domain25Id);
    return null;
  }
}
