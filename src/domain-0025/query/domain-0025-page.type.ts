import { Field, ObjectType } from '@nestjs/graphql';

import { NodePage } from '../../common/node-page.type';
import { Domain0025 } from '../domain-0025.entity';

@ObjectType({
  implements: [NodePage],
})
export class Domain0025Page implements NodePage<Domain0025> {
  @Field(() => [Domain0025], { description: 'Nodes in this page' })
  nodes!: Domain0025[];
}
