import { Field, ObjectType } from '@nestjs/graphql';
import { NodePage } from 'src/common/node-page.type';

import { Domain0003 } from '../domain-0003.entity';

@ObjectType({
  implements: [NodePage],
})
export class Domain0003Page implements NodePage<Domain0003> {
  @Field(() => [Domain0003], { description: 'Nodes in this page' })
  nodes!: Domain0003[];
}
