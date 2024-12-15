import { Field, ObjectType } from '@nestjs/graphql';

import { NodePage } from '../../common/node-page.type';
import { Domain01 } from '../domain-01.entity';

@ObjectType({
  implements: [NodePage],
})
export class Domain01Page implements NodePage<Domain01> {
  @Field(() => [Domain01], { description: 'Nodes in this page' })
  nodes!: Domain01[];
}
