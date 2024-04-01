import { Field, ObjectType } from '@nestjs/graphql';
import { NodePage } from 'src/common/node-page.type';

import { Domain0004 } from '../domain-0004.entity';

@ObjectType({
  implements: [NodePage],
})
export class Domain0004Page implements NodePage<Domain0004> {
  @Field(() => [Domain0004], { description: 'Nodes in this page' })
  nodes!: Domain0004[];
}
