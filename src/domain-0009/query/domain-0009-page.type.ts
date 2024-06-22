import { Field, ObjectType } from '@nestjs/graphql';

import { NodePage } from '../../common/node-page.type';
import { Domain0009 } from '../domain-0009.entity';

@ObjectType({
  implements: [NodePage],
})
export class Domain0009Page implements NodePage<Domain0009> {
  @Field(() => [Domain0009], { description: 'Nodes in this page' })
  nodes!: Domain0009[];
}
