import { Field, ObjectType } from '@nestjs/graphql';
import { NodePage } from 'src/common/node-page.type';

import { Domain0005 } from '../domain-0005.entity';

@ObjectType({
  implements: [NodePage],
})
export class Domain0005Page implements NodePage<Domain0005> {
  @Field(() => [Domain0005], { description: 'Nodes in this page' })
  nodes!: Domain0005[];
}
