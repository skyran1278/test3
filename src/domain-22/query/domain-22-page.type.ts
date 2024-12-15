import { Field, ObjectType } from '@nestjs/graphql';

import { NodePage } from '../../common/node-page.type';
import { Domain22 } from '../domain-22.entity';

@ObjectType({
  implements: [NodePage],
})
export class Domain22Page implements NodePage<Domain22> {
  @Field(() => [Domain22], { description: 'Nodes in this page' })
  nodes!: Domain22[];
}
