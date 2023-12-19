import { Field, ObjectType } from '@nestjs/graphql';
import { NodePage } from 'src/common/query/node-page.type';

import { Domain2 } from '../domain2.entity';

@ObjectType({
  implements: [NodePage],
})
export class Domain2Page implements NodePage<Domain2> {
  @Field(() => [Domain2], { description: 'Nodes in this page' })
  nodes!: Domain2[];
}
