import { Field, ID, InputType, OmitType, PartialType } from '@nestjs/graphql';

import { CreateUserInput } from './create-user.input';

@InputType()
export class UpdateUserInput extends OmitType(
  PartialType(CreateUserInput),
  [],
) {
  @Field(() => ID)
  id!: string;
}
