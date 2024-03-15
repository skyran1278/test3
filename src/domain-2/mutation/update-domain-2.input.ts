import { Field, ID, InputType, PartialType } from '@nestjs/graphql';

import { CreateDomain2Input } from './create-domain-2.input';

@InputType()
export class UpdateDomain2Input extends PartialType(CreateDomain2Input) {
  @Field(() => ID)
  id!: string;
}
