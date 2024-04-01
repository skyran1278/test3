import { InputType, OmitType } from '@nestjs/graphql';
import { ToCreateInputType } from 'src/common/to-create-input-type';
import { TypeField } from 'src/common/type-field.decorator';
import { CreateDomain0003Input } from 'src/domain-0003/mutation/create-domain-0003.input';

import { Domain0002 } from '../domain-0002.entity';

@InputType()
export class CreateDomain0002Input extends OmitType(
  ToCreateInputType(Domain0002),
  [],
) {
  @TypeField(() => [CreateDomain0003Input], { description: 'domain0003s' })
  domain0003s?: CreateDomain0003Input[];
}
