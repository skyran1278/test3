import { Field, ObjectType } from '@nestjs/graphql';
import { NodePage } from 'src/common/node-page.type';

import { Domain0006 } from '../domain-0006.entity';

@ObjectType({
  implements: [NodePage],
})
export class Domain0006Page implements NodePage<Domain0006> {
  @Field(() => [Domain0006], { description: 'Nodes in this page' })
  nodes!: Domain0006[];
}
