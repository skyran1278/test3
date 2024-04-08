import { Field, ID, InputType, OmitType, PartialType } from '@nestjs/graphql';

import { CreateDomain0015Input } from './create-domain-0015.input';

@InputType()
export class UpdateDomain0015Input extends OmitType(
  PartialType(CreateDomain0015Input),
  [],
) {
  @Field(() => ID)
  id!: string;
}
