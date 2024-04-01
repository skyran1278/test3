import { InputType, OmitType } from '@nestjs/graphql';
import { ToCreateInputType } from 'src/common/to-create-input-type';

import { TypeField } from 'src/common/type-field.decorator';
import { CreateDomain0005Input } from 'src/domain-0005/mutation/create-domain-0005.input';
import { Domain0004 } from '../domain-0004.entity';

@InputType()
export class CreateDomain0004Input extends OmitType(
  ToCreateInputType(Domain0004),
  [],
) {
  @TypeField(() => [CreateDomain0005Input], { description: 'domain0005s' })
  domain0005s!: CreateDomain0005Input[];
}
