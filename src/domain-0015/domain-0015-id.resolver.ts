import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain0015IdLoader } from './domain-0015-id.loader';
import { Domain0015 } from './domain-0015.entity';
import { Domain0015Id } from './query/domain-0015-id.type';

@Resolver(() => Domain0015Id)
export class Domain0015IdResolver {
  constructor(private readonly loader: Domain0015IdLoader) {}

  @ResolveField(() => Domain0015, { nullable: true })
  async domain0015(
    @Parent() { domain0015Id, domain0015 }: Domain0015Id,
  ): Promise<Maybe<Domain0015>> {
    if (domain0015) return domain0015;
    if (domain0015Id) return this.loader.load(domain0015Id);
    return null;
  }
}
