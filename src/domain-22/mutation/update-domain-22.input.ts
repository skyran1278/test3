import { Field, ID, InputType, OmitType, PartialType } from '@nestjs/graphql';

import { CreateDomain22Input } from './create-domain-22.input';

@InputType()
export class UpdateDomain22Input extends OmitType(
  PartialType(CreateDomain22Input),
  [],
) {
  @Field(() => ID)
  id!: string;
}
