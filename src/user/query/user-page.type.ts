import { Field, ObjectType } from '@nestjs/graphql';
import { NodePage } from 'src/common/graphql/node-page.type';

import { User } from '../user.entity';

@ObjectType({
  implements: [NodePage],
})
export class UserPage implements NodePage<User> {
  @Field(() => [User], { description: 'Nodes in this page' })
  nodes!: User[];
}
