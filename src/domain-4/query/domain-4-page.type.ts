import { Field, ObjectType } from '@nestjs/graphql';
import { NodePage } from 'src/common/node-page.type';

import { Domain4 } from '../domain-4.entity';

@ObjectType({
  implements: [NodePage],
})
export class Domain4Page implements NodePage<Domain4> {
  @Field(() => [Domain4], { description: 'Nodes in this page' })
  nodes!: Domain4[];
}
