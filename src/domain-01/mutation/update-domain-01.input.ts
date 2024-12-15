import { Field, ID, InputType, OmitType, PartialType } from '@nestjs/graphql';

import { CreateDomain01Input } from './create-domain-01.input';

@InputType()
export class UpdateDomain01Input extends OmitType(
  PartialType(CreateDomain01Input),
  [],
) {
  @Field(() => ID)
  id!: string;
}
