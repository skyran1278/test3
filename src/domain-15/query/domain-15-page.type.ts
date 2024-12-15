import { Field, ObjectType } from '@nestjs/graphql';

import { NodePage } from '../../common/node-page.type';
import { Domain15 } from '../domain-15.entity';

@ObjectType({
  implements: [NodePage],
})
export class Domain15Page implements NodePage<Domain15> {
  @Field(() => [Domain15], { description: 'Nodes in this page' })
  nodes!: Domain15[];
}
