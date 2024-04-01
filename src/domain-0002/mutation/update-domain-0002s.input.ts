import { InputType } from '@nestjs/graphql';
import { TypeField } from 'src/common/type-field.decorator';

import { UpdateDomain0002Input } from './update-domain-0002.input';

@InputType()
export class UpdateDomain0002sInput {
  @TypeField(() => [UpdateDomain0002Input], { description: 'domain0002s' })
  domain0002s!: UpdateDomain0002Input[];
}
