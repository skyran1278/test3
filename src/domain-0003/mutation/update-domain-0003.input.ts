import { Field, ID, InputType, OmitType, PartialType } from '@nestjs/graphql';

import { CreateDomain0003Input } from './create-domain-0003.input';

@InputType()
export class UpdateDomain0003Input extends OmitType(
  PartialType(CreateDomain0003Input),
  [],
) {
  @Field(() => ID)
  id!: string;
}
