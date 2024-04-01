import { Field, ID, InputType, OmitType, PartialType } from '@nestjs/graphql';

import { CreateDomain0012Input } from './create-domain-0012.input';

@InputType()
export class UpdateDomain0012Input extends OmitType(
  PartialType(CreateDomain0012Input),
  [],
) {
  @Field(() => ID)
  id!: string;
}
