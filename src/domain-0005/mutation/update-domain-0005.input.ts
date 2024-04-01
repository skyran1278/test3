import { Field, ID, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { TypeField } from 'src/common/type-field.decorator';
import { UpdateDomain0006Input } from 'src/domain-0006/mutation/update-domain-0006.input';

import { CreateDomain0005Input } from './create-domain-0005.input';

@InputType()
export class UpdateDomain0005Input extends OmitType(
  PartialType(CreateDomain0005Input),
  ['domain0006s'],
) {
  @Field(() => ID)
  id!: string;

  @TypeField(() => [UpdateDomain0006Input], {
    description: 'domain0006s',
  })
  domain0006s!: UpdateDomain0006Input[];
}
