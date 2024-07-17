import { InputType } from '@nestjs/graphql';

import { TypeField } from '../../common/type-field.decorator';
import { CreateDomain0021sDomain0021Input } from './create-domain-0021s-domain-0021.input';

@InputType()
export class CreateDomain0021sInput {
  @TypeField(() => [CreateDomain0021sDomain0021Input])
  domain0021s!: CreateDomain0021sDomain0021Input[];
}
