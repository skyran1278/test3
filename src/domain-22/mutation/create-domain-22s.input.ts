import { InputType } from '@nestjs/graphql';

import { TypeField } from '../../common/type-field.decorator';
import { CreateDomain22sDomain22Input } from './create-domain-22s-domain-22.input';

@InputType()
export class CreateDomain22sInput {
  @TypeField(() => [CreateDomain22sDomain22Input])
  domain22s!: CreateDomain22sDomain22Input[];
}
