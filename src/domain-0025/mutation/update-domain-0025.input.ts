import { Field, ID, InputType, OmitType, PartialType } from '@nestjs/graphql';

import { CreateDomain0025Input } from './create-domain-0025.input';

@InputType()
export class UpdateDomain0025Input extends OmitType(
  PartialType(CreateDomain0025Input),
  [],
) {
  @Field(() => ID)
  id!: string;
}
