import { Field, ObjectType } from '@nestjs/graphql';
import { NodePage } from 'src/common/node-page.type';

import { Domain0002 } from '../domain-0002.entity';

@ObjectType({
  implements: [NodePage],
})
export class Domain0002Page implements NodePage<Domain0002> {
  @Field(() => [Domain0002], { description: 'Nodes in this page' })
  nodes!: Domain0002[];
}
