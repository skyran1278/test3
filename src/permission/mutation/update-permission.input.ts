import { Field, ID, InputType, OmitType, PartialType } from '@nestjs/graphql';

import { CreatePermissionInput } from './create-permission.input';

@InputType()
export class UpdatePermissionInput extends OmitType(
  PartialType(CreatePermissionInput),
  [],
) {
  @Field(() => ID)
  id!: string;
}
