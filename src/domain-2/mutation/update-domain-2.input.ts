import { Field, ID, InputType, OmitType, PartialType } from '@nestjs/graphql';

import { TypeField } from 'src/common/type-field.decorator';
import { UpdateDomain3Input } from 'src/domain-3/mutation/update-domain-3.input';
import { CreateDomain2Input } from './create-domain-2.input';

@InputType()
export class UpdateDomain2Input extends OmitType(
  PartialType(CreateDomain2Input),
  ['domain3s'],
) {
  @Field(() => ID)
  id!: string;

  @TypeField(() => [UpdateDomain3Input], { description: 'domain3s' })
  domain3s?: UpdateDomain3Input[];
}
