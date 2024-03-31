import { Field, ID, InputType, OmitType, PartialType } from '@nestjs/graphql';

import { TypeField } from 'src/common/type-field.decorator';
import { UpdateDomain5Input } from 'src/domain-5/mutation/update-domain-5.input';
import { CreateDomain4Input } from './create-domain-4.input';

@InputType()
export class UpdateDomain4Input extends OmitType(
  PartialType(CreateDomain4Input),
  ['domain5s'],
) {
  @Field(() => ID)
  id!: string;

  @TypeField(() => [UpdateDomain5Input], {
    description: 'domain5s',
  })
  domain5s!: UpdateDomain5Input[];
}
