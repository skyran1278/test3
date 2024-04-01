import { Field, ID, InputType, OmitType, PartialType } from '@nestjs/graphql';

import { CreateDomain0011Input } from './create-domain-0011.input';

@InputType()
export class UpdateDomain0011Input extends OmitType(
  PartialType(CreateDomain0011Input),
  [],
) {
  @Field(() => ID)
  id!: string;
}
