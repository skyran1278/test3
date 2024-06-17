import { Field, ObjectType } from '@nestjs/graphql';

import { NodePage } from '../../common/node-page.type';
import { Role } from '../role.entity';

@ObjectType({
  implements: [NodePage],
})
export class RolePage implements NodePage<Role> {
  @Field(() => [Role], { description: 'Nodes in this page' })
  nodes!: Role[];
}
