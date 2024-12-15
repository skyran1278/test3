import { InputType, OmitType } from '@nestjs/graphql';

import { ToCreateInputType } from '../../common/to-create-input-type';
import { TypeField } from '../../common/type-field.decorator';
import { CreateDomain09Input } from '../../domain-09/mutation/create-domain-09.input';
import { Domain08 } from '../domain-08.entity';

@InputType()
export class CreateDomain08Input extends OmitType(
  ToCreateInputType(Domain08),
  [],
) {
  @TypeField(() => [CreateDomain09Input], {
    description: 'domain09s',
  })
  domain09s?: CreateDomain09Input[];
}
