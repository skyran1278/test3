import { Field, ID, InputType, OmitType, PartialType } from '@nestjs/graphql';

import { CreateDomain10Input } from './create-domain-10.input';

@InputType()
export class UpdateDomain10Input extends OmitType(
  PartialType(CreateDomain10Input),
  [],
) {
  @Field(() => ID)
  id!: string;
}
