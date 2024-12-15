import { Field, ID, InputType, OmitType, PartialType } from '@nestjs/graphql';

import { CreateDomain25Input } from './create-domain-25.input';

@InputType()
export class UpdateDomain25Input extends OmitType(
  PartialType(CreateDomain25Input),
  [],
) {
  @Field(() => ID)
  id!: string;
}
