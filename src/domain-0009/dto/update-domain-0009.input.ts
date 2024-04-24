import { Field, ID, InputType, OmitType, PartialType } from '@nestjs/graphql';

import { TypeField } from '../../common/type-field.decorator';
import { UpdateDomain0010Input } from '../../domain-0010/dto/update-domain-0010.input';
import { CreateDomain0009Input } from './create-domain-0009.input';

@InputType()
export class UpdateDomain0009Input extends OmitType(
  PartialType(CreateDomain0009Input),
  ['domain0010s'],
) {
  @Field(() => ID)
  id!: string;

  @TypeField(() => [UpdateDomain0010Input], {
    description: 'domain0010s',
    nullable: true,
  })
  domain0010s?: UpdateDomain0010Input[];
}
