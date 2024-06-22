import { InputType, OmitType } from '@nestjs/graphql';

import { ToCreateInputType } from '../../common/to-create-input-type';
import { TypeField } from '../../common/type-field.decorator';
import { CreateDomain0010Input } from '../../domain-0010/mutation/create-domain-0010.input';
import { Domain0009 } from '../domain-0009.entity';

@InputType()
export class CreateDomain0009Input extends OmitType(
  ToCreateInputType(Domain0009),
  ['domain0008Id'],
) {
  @TypeField(() => [CreateDomain0010Input], { description: 'domain0010s' })
  domain0010s?: CreateDomain0010Input[];
}
