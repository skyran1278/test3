import { Field, ObjectType } from '@nestjs/graphql';
import { NodePage } from 'src/common/node-page.type';

import { Domain3 } from '../domain-3.entity';

@ObjectType({
  implements: [NodePage],
})
export class Domain3Page implements NodePage<Domain3> {
  @Field(() => [Domain3], { description: 'Nodes in this page' })
  nodes!: Domain3[];
}
