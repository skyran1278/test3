import { Field, ID, InterfaceType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Permission } from '../permission.entity';

@InterfaceType()
export abstract class PermissionById {
  @Field(() => ID, { nullable: true })
  permissionId?: Maybe<string>;

  @Field(() => Permission, { nullable: true })
  permission?: Maybe<Permission>;
}
