import { Field, ID, InputType, OmitType, PartialType } from '@nestjs/graphql';

import { CreateDomain03Input } from './create-domain-03.input';

@InputType()
export class UpdateDomain03Input extends OmitType(
  PartialType(CreateDomain03Input),
  [],
) {
  @Field(() => ID)
  id!: string;
}
