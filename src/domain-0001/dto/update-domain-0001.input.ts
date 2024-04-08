import { Field, ID, InputType, OmitType, PartialType } from '@nestjs/graphql';

import { CreateDomain0001Input } from './create-domain-0001.input';

@InputType()
export class UpdateDomain0001Input extends OmitType(
  PartialType(CreateDomain0001Input),
  [],
) {
  @Field(() => ID)
  id!: string;
}
