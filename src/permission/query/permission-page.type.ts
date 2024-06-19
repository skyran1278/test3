import { Field, ObjectType } from '@nestjs/graphql';

import { NodePage } from '../../common/node-page.type';
import { Permission } from '../permission.entity';

@ObjectType({
  implements: [NodePage],
})
export class PermissionPage implements NodePage<Permission> {
  @Field(() => [Permission], { description: 'Nodes in this page' })
  nodes!: Permission[];
}
