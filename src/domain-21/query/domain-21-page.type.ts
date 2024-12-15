import { Field, ObjectType } from '@nestjs/graphql';

import { NodePage } from '../../common/node-page.type';
import { Domain21 } from '../domain-21.entity';

@ObjectType({
  implements: [NodePage],
})
export class Domain21Page implements NodePage<Domain21> {
  @Field(() => [Domain21], { description: 'Nodes in this page' })
  nodes!: Domain21[];
}
