import { Field, ObjectType } from '@nestjs/graphql';

import { NodePage } from '../../common/node-page.type';
import { Domain09 } from '../domain-09.entity';

@ObjectType({
  implements: [NodePage],
})
export class Domain09Page implements NodePage<Domain09> {
  @Field(() => [Domain09], { description: 'Nodes in this page' })
  nodes!: Domain09[];
}
