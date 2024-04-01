import { Field, ID, InputType, OmitType, PartialType } from '@nestjs/graphql';

import { TypeField } from 'src/common/type-field.decorator';
import { UpdateDomain0003Input } from 'src/domain-0003/mutation/update-domain-0003.input';
import { CreateDomain0002Input } from './create-domain-0002.input';

@InputType()
export class UpdateDomain0002Input extends OmitType(
  PartialType(CreateDomain0002Input),
  ['domain0003s'],
) {
  @Field(() => ID)
  id!: string;

  @TypeField(() => [UpdateDomain0003Input], {
    description: 'domain0003s',
    nullable: true,
  })
  domain0003s?: UpdateDomain0003Input[];
}
