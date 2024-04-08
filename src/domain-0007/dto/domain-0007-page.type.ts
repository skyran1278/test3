import { Field, ObjectType } from '@nestjs/graphql';
import { NodePage } from 'src/common/node-page.type';

import { Domain0007 } from '../domain-0007.entity';

@ObjectType({
  implements: [NodePage],
})
export class Domain0007Page implements NodePage<Domain0007> {
  @Field(() => [Domain0007], { description: 'Nodes in this page' })
  nodes!: Domain0007[];
}
