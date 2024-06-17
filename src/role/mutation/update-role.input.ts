import { Field, ID, InputType, OmitType, PartialType } from '@nestjs/graphql';

import { CreateRoleInput } from './create-role.input';

@InputType()
export class UpdateRoleInput extends OmitType(
  PartialType(CreateRoleInput),
  [],
) {
  @Field(() => ID)
  id!: string;
}
