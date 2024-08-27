import { Field, ObjectType } from '@nestjs/graphql';

import { NodePage } from '../../common/node-page.type';
import { Domain0024 } from '../domain-0024.entity';

@ObjectType({
  implements: [NodePage],
})
export class Domain0024Page implements NodePage<Domain0024> {
  @Field(() => [Domain0024], { description: 'Nodes in this page' })
  nodes!: Domain0024[];
}
