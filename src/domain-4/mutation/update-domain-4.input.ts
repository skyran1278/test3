import { Field, ID, InputType, OmitType, PartialType } from '@nestjs/graphql';

import { CreateDomain4Input } from './create-domain-4.input';

@InputType()
export class UpdateDomain4Input extends OmitType(
  PartialType(CreateDomain4Input),
  [],
) {
  @Field(() => ID)
  id!: string;
}
