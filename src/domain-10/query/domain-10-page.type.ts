import { Field, ObjectType } from '@nestjs/graphql';

import { NodePage } from '../../common/node-page.type';
import { Domain10 } from '../domain-10.entity';

@ObjectType({
  implements: [NodePage],
})
export class Domain10Page implements NodePage<Domain10> {
  @Field(() => [Domain10], { description: 'Nodes in this page' })
  nodes!: Domain10[];
}
