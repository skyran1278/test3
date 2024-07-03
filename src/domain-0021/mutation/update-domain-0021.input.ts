import { Field, ID, InputType, OmitType, PartialType } from '@nestjs/graphql';

import { CreateDomain0021Input } from './create-domain-0021.input';

@InputType()
export class UpdateDomain0021Input extends OmitType(
  PartialType(CreateDomain0021Input),
  [],
) {
  @Field(() => ID)
  id!: string;
}
