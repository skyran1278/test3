import { Field, ObjectType } from '@nestjs/graphql';

import { Permission } from '../permission.entity';

@ObjectType()
export class RemovePermissionOutput {
  @Field(() => Permission)
  permission!: Permission;
}
