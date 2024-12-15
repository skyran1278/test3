import { Field, ObjectType } from '@nestjs/graphql';

import { NodePage } from '../../common/node-page.type';
import { Domain25 } from '../domain-25.entity';

@ObjectType({
  implements: [NodePage],
})
export class Domain25Page implements NodePage<Domain25> {
  @Field(() => [Domain25], { description: 'Nodes in this page' })
  nodes!: Domain25[];
}
