import { InputType } from '@nestjs/graphql';

import { TypeField } from '../../common/type-field.decorator';
import { UpdateDomain08Input } from './update-domain-08.input';

@InputType()
export class UpdateDomain08sInput {
  @TypeField(() => [UpdateDomain08Input], { description: 'domain08s' })
  domain08s!: UpdateDomain08Input[];
}
