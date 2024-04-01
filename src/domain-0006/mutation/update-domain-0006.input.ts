import { Field, ID, InputType, OmitType, PartialType } from '@nestjs/graphql';

import { CreateDomain0006Input } from './create-domain-0006.input';

@InputType()
export class UpdateDomain0006Input extends OmitType(
  PartialType(CreateDomain0006Input),
  [],
) {
  @Field(() => ID)
  id!: string;
}
