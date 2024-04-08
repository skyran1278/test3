import { Field, ObjectType } from '@nestjs/graphql';
import { NodePage } from 'src/common/node-page.type';

import { Domain0010 } from '../domain-0010.entity';

@ObjectType({
  implements: [NodePage],
})
export class Domain0010Page implements NodePage<Domain0010> {
  @Field(() => [Domain0010], { description: 'Nodes in this page' })
  nodes!: Domain0010[];
}
