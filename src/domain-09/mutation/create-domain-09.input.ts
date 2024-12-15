import { InputType, OmitType } from '@nestjs/graphql';

import { ToCreateInputType } from '../../common/to-create-input-type';
import { TypeField } from '../../common/type-field.decorator';
import { CreateDomain10Input } from '../../domain-10/mutation/create-domain-10.input';
import { Domain09 } from '../domain-09.entity';

@InputType()
export class CreateDomain09Input extends OmitType(ToCreateInputType(Domain09), [
  'domain08Id',
]) {
  @TypeField(() => [CreateDomain10Input], { description: 'domain10s' })
  domain10s?: CreateDomain10Input[];
}
