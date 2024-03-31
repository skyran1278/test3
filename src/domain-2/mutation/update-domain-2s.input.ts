import { InputType } from '@nestjs/graphql';
import { TypeField } from 'src/common/type-field.decorator';

import { UpdateDomain2Input } from './update-domain-2.input';

@InputType()
export class UpdateDomain2sInput {
  @TypeField(() => [UpdateDomain2Input], { description: 'domain2s' })
  domain2s!: UpdateDomain2Input[];
}
