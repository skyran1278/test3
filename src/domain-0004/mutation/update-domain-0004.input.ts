import { Field, ID, InputType, OmitType, PartialType } from '@nestjs/graphql';

import { TypeField } from 'src/common/type-field.decorator';
import { UpdateDomain0005Input } from 'src/domain-0005/mutation/update-domain-0005.input';
import { CreateDomain0004Input } from './create-domain-0004.input';

@InputType()
export class UpdateDomain0004Input extends OmitType(
  PartialType(CreateDomain0004Input),
  ['domain0005s'],
) {
  @Field(() => ID)
  id!: string;

  @TypeField(() => [UpdateDomain0005Input], {
    description: 'domain0005s',
  })
  domain0005s!: UpdateDomain0005Input[];
}
