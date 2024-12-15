import { Field, ID, InputType, OmitType, PartialType } from '@nestjs/graphql';

import { TypeField } from '../../common/type-field.decorator';
import { UpdateDomain09Input } from '../../domain-09/mutation/update-domain-09.input';
import { CreateDomain08Input } from './create-domain-08.input';

@InputType()
export class UpdateDomain08Input extends OmitType(
  PartialType(CreateDomain08Input),
  [],
) {
  @Field(() => ID)
  id!: string;

  @TypeField(() => [UpdateDomain09Input], {
    description: 'domain09s',
    nullable: true,
  })
  domain09s?: UpdateDomain09Input[];
}
