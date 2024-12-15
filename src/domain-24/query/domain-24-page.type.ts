import { Field, ObjectType } from '@nestjs/graphql';

import { NodePage } from '../../common/node-page.type';
import { Domain24 } from '../domain-24.entity';

@ObjectType({
  implements: [NodePage],
})
export class Domain24Page implements NodePage<Domain24> {
  @Field(() => [Domain24], { description: 'Nodes in this page' })
  nodes!: Domain24[];
}
