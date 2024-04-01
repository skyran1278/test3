import { Field, ObjectType } from '@nestjs/graphql';
import { NodePage } from 'src/common/node-page.type';

import { Domain0011 } from '../domain-0011.entity';

@ObjectType({
  implements: [NodePage],
})
export class Domain0011Page implements NodePage<Domain0011> {
  @Field(() => [Domain0011], { description: 'Nodes in this page' })
  nodes!: Domain0011[];
}
