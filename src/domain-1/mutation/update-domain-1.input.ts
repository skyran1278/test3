import { Field, ID, InputType, OmitType, PartialType } from '@nestjs/graphql';

import { CreateDomain1Input } from './create-domain-1.input';

@InputType()
export class UpdateDomain1Input extends OmitType(
  PartialType(CreateDomain1Input),
  [],
) {
  @Field(() => ID)
  id!: string;
}
