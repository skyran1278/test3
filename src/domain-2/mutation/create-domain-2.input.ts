import { InputType, OmitType } from '@nestjs/graphql';
import { ToCreateInputType } from 'src/common/to-create-input-type';
import { TypeField } from 'src/common/type-field.decorator';
import { CreateDomain3Input } from 'src/domain-3/mutation/create-domain-3.input';

import { Domain2 } from '../domain-2.entity';

@InputType()
export class CreateDomain2Input extends OmitType(
  ToCreateInputType(Domain2),
  [],
) {
  @TypeField(() => [CreateDomain3Input], { description: 'domain3s' })
  domain3s?: CreateDomain3Input[];
}
