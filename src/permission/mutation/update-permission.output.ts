import { Field, ObjectType } from '@nestjs/graphql';

import { Permission } from '../permission.entity';

@ObjectType()
export class UpdatePermissionOutput {
  @Field(() => Permission)
  permission!: Permission;
}
