import { Field, ObjectType } from '@nestjs/graphql';

import { NodePage } from '../../common/node-page.type';
import { Domain0021 } from '../domain-0021.entity';

@ObjectType({
  implements: [NodePage],
})
export class Domain0021Page implements NodePage<Domain0021> {
  @Field(() => [Domain0021], { description: 'Nodes in this page' })
  nodes!: Domain0021[];
}
