import { InputType, OmitType } from '@nestjs/graphql';

import { ToCreateInputType } from '../../common/to-create-input-type';
import { TypeField } from '../../common/type-field.decorator';
import { CreateDomain0009Input } from '../../domain-0009/mutation/create-domain-0009.input';
import { Domain0008 } from '../domain-0008.entity';

@InputType()
export class CreateDomain0008Input extends OmitType(
  ToCreateInputType(Domain0008),
  [],
) {
  @TypeField(() => [CreateDomain0009Input], {
    description: 'domain0009s',
  })
  domain0009s?: CreateDomain0009Input[];
}
