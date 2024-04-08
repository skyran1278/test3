import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain0015ByIdLoader } from './domain-0015-by-id.loader';
import { Domain0015 } from './domain-0015.entity';
import { Domain0015ById } from './dto/domain-0015-by-id.type';

@Resolver(() => Domain0015ById)
export class Domain0015ByIdResolver {
  constructor(private readonly loader: Domain0015ByIdLoader) {}

  @ResolveField(() => Domain0015, { nullable: true })
  async domain0015(
    @Parent() { domain0015Id, domain0015 }: Domain0015ById,
  ): Promise<Maybe<Domain0015>> {
    if (domain0015) return domain0015;
    if (domain0015Id) return this.loader.load(domain0015Id);
    return null;
  }
}
