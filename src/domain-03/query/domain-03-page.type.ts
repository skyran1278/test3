import { Field, ObjectType } from '@nestjs/graphql';

import { NodePage } from '../../common/node-page.type';
import { Domain03 } from '../domain-03.entity';

@ObjectType({
  implements: [NodePage],
})
export class Domain03Page implements NodePage<Domain03> {
  @Field(() => [Domain03], { description: 'Nodes in this page' })
  nodes!: Domain03[];
}
