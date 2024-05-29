import { Field, ObjectType } from '@nestjs/graphql';

import { NodePage } from '../../common/node-page.type';
import { Domain0008 } from '../domain-0008.entity';

@ObjectType({
  implements: [NodePage],
})
export class Domain0008Page implements NodePage<Domain0008> {
  @Field(() => [Domain0008], { description: 'Nodes in this page' })
  nodes!: Domain0008[];
}
