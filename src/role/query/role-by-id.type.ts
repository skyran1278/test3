import { Field, ID, InterfaceType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Role } from '../role.entity';

@InterfaceType()
export abstract class RoleById {
  @Field(() => ID, { nullable: true })
  roleId?: Maybe<string>;

  @Field(() => Role, { nullable: true })
  role?: Maybe<Role>;
}
