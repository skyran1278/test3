import { InputType } from '@nestjs/graphql';

import { TypeField } from '../../common/type-field.decorator';
import { CreateDomain21sDomain21Input } from './create-domain-21s-domain-21.input';

@InputType()
export class CreateDomain21sInput {
  @TypeField(() => [CreateDomain21sDomain21Input])
  domain21s!: CreateDomain21sDomain21Input[];
}
