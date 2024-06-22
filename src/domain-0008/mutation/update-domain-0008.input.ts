import { Field, ID, InputType, OmitType, PartialType } from '@nestjs/graphql';

import { TypeField } from '../../common/type-field.decorator';
import { UpdateDomain0009Input } from '../../domain-0009/mutation/update-domain-0009.input';
import { CreateDomain0008Input } from './create-domain-0008.input';

@InputType()
export class UpdateDomain0008Input extends OmitType(
  PartialType(CreateDomain0008Input),
  [],
) {
  @Field(() => ID)
  id!: string;

  @TypeField(() => [UpdateDomain0009Input], {
    description: 'domain0009s',
    nullable: true,
  })
  domain0009s?: UpdateDomain0009Input[];
}
