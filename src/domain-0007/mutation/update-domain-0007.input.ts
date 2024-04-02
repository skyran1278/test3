import { Field, ID, InputType, OmitType, PartialType } from '@nestjs/graphql';

import { CreateDomain0007Input } from './create-domain-0007.input';

@InputType()
export class UpdateDomain0007Input extends OmitType(
  PartialType(CreateDomain0007Input),
  [],
) {
  @Field(() => ID)
  id!: string;
}
