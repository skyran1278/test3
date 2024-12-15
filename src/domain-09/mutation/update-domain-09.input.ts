import { Field, ID, InputType, OmitType, PartialType } from '@nestjs/graphql';

import { TypeField } from '../../common/type-field.decorator';
import { UpdateDomain10Input } from '../../domain-10/mutation/update-domain-10.input';
import { CreateDomain09Input } from './create-domain-09.input';

@InputType()
export class UpdateDomain09Input extends OmitType(
  PartialType(CreateDomain09Input),
  [],
) {
  @Field(() => ID)
  id!: string;

  @TypeField(() => [UpdateDomain10Input], {
    description: 'domain10s',
    nullable: true,
  })
  domain10s?: UpdateDomain10Input[];
}
