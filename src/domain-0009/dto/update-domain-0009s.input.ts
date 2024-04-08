import { InputType } from '@nestjs/graphql';
import { TypeField } from 'src/common/type-field.decorator';

import { UpdateDomain0009Input } from './update-domain-0009.input';

@InputType()
export class UpdateDomain0009sInput {
  @TypeField(() => [UpdateDomain0009Input], { description: 'domain0009s' })
  domain0009s!: UpdateDomain0009Input[];
}
