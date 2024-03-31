import { Field, ObjectType } from '@nestjs/graphql';
import { NodePage } from 'src/common/node-page.type';

import { Domain5 } from '../domain-5.entity';

@ObjectType({
  implements: [NodePage],
})
export class Domain5Page implements NodePage<Domain5> {
  @Field(() => [Domain5], { description: 'Nodes in this page' })
  nodes!: Domain5[];
}
