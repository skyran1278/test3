import { InputType } from '@nestjs/graphql';

import { TypeField } from '../../common/type-field.decorator';
import { CreateDomain0022sDomain0022Input } from './create-domain-0022s-domain-0022.input';

@InputType()
export class CreateDomain0022sInput {
  @TypeField(() => [CreateDomain0022sDomain0022Input])
  domain0022s!: CreateDomain0022sDomain0022Input[];
}
