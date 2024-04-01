import { Field, ObjectType } from '@nestjs/graphql';
import { NodePage } from 'src/common/node-page.type';

import { Domain0012 } from '../domain-0012.entity';

@ObjectType({
  implements: [NodePage],
})
export class Domain0012Page implements NodePage<Domain0012> {
  @Field(() => [Domain0012], { description: 'Nodes in this page' })
  nodes!: Domain0012[];
}
