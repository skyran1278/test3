import { Field, ID, InputType, OmitType, PartialType } from '@nestjs/graphql';

import { CreateDomain24Input } from './create-domain-24.input';

@InputType()
export class UpdateDomain24Input extends OmitType(
  PartialType(CreateDomain24Input),
  [],
) {
  @Field(() => ID)
  id!: string;
}
