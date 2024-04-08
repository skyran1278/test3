import { Field, ObjectType } from '@nestjs/graphql';
import { NodePage } from 'src/common/node-page.type';

import { Domain0001 } from '../domain-0001.entity';

@ObjectType({
  implements: [NodePage],
})
export class Domain0001Page implements NodePage<Domain0001> {
  @Field(() => [Domain0001], { description: 'Nodes in this page' })
  nodes!: Domain0001[];
}
