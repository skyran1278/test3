import { Field, ObjectType } from '@nestjs/graphql';

import { NodePage } from '../../common/node-page.type';
import { Domain0022 } from '../domain-0022.entity';

@ObjectType({
  implements: [NodePage],
})
export class Domain0022Page implements NodePage<Domain0022> {
  @Field(() => [Domain0022], { description: 'Nodes in this page' })
  nodes!: Domain0022[];
}
