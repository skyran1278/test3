import { Field, ObjectType } from '@nestjs/graphql';

import { Permission } from '../permission.entity';

@ObjectType()
export class CreatePermissionOutput {
  @Field(() => Permission)
  permission!: Permission;
}
