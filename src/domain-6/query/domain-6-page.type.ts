import { Field, ObjectType } from '@nestjs/graphql';
import { NodePage } from 'src/common/node-page.type';

import { Domain6 } from '../domain-6.entity';

@ObjectType({
  implements: [NodePage],
})
export class Domain6Page implements NodePage<Domain6> {
  @Field(() => [Domain6], { description: 'Nodes in this page' })
  nodes!: Domain6[];
}
