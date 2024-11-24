import { Field, ID, InputType, OmitType, PartialType } from '@nestjs/graphql';

import { CreateDomain0022Input } from './create-domain-0022.input';

@InputType()
export class UpdateDomain0022Input extends OmitType(
  PartialType(CreateDomain0022Input),
  [],
) {
  @Field(() => ID)
  id!: string;
}
