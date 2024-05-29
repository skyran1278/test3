import { InputType } from '@nestjs/graphql';

import { TypeField } from '../../common/type-field.decorator';
import { UpdateDomain0008Input } from './update-domain-0008.input';

@InputType()
export class UpdateDomain0008sInput {
  @TypeField(() => [UpdateDomain0008Input], { description: 'domain0008s' })
  domain0008s!: UpdateDomain0008Input[];
}
