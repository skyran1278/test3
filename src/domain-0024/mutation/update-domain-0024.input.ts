import { Field, ID, InputType, OmitType, PartialType } from '@nestjs/graphql';

import { CreateDomain0024Input } from './create-domain-0024.input';

@InputType()
export class UpdateDomain0024Input extends OmitType(
  PartialType(CreateDomain0024Input),
  [],
) {
  @Field(() => ID)
  id!: string;
}
