import { InputType, OmitType } from '@nestjs/graphql';
import { ToCreateInputType } from 'src/common/to-create-input-type';

import { TypeField } from 'src/common/type-field.decorator';
import { CreateDomain5Input } from 'src/domain-5/mutation/create-domain-5.input';
import { Domain4 } from '../domain-4.entity';

@InputType()
export class CreateDomain4Input extends OmitType(
  ToCreateInputType(Domain4),
  [],
) {
  @TypeField(() => [CreateDomain5Input], { description: 'domain5s' })
  domain5s!: CreateDomain5Input[];
}
