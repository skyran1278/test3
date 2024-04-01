import { Field, ID, InputType, OmitType, PartialType } from '@nestjs/graphql';

import { CreateDomain0010Input } from './create-domain-0010.input';

@InputType()
export class UpdateDomain0010Input extends OmitType(
  PartialType(CreateDomain0010Input),
  [],
) {
  @Field(() => ID)
  id!: string;
}
