import { Field, ObjectType } from '@nestjs/graphql';
import { NodePage } from 'src/common/node-page.type';

import { Domain0015 } from '../domain-0015.entity';

@ObjectType({
  implements: [NodePage],
})
export class Domain0015Page implements NodePage<Domain0015> {
  @Field(() => [Domain0015], { description: 'Nodes in this page' })
  nodes!: Domain0015[];
}
