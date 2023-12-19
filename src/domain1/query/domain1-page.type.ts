import { Field, ObjectType } from '@nestjs/graphql';
import { NodePage } from 'src/common/query/node-page.type';

import { Domain1 } from '../domain1.entity';

@ObjectType({
  implements: [NodePage],
})
export class Domain1Page implements NodePage<Domain1> {
  @Field(() => [Domain1], { description: 'Nodes in this page' })
  nodes!: Domain1[];
}
