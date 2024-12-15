import { Field, ObjectType } from '@nestjs/graphql';

import { NodePage } from '../../common/node-page.type';
import { Domain08 } from '../domain-08.entity';

@ObjectType({
  implements: [NodePage],
})
export class Domain08Page implements NodePage<Domain08> {
  @Field(() => [Domain08], { description: 'Nodes in this page' })
  nodes!: Domain08[];
}
