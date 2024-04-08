import { InputType, OmitType } from '@nestjs/graphql';
import { ToCreateInputType } from 'src/common/to-create-input-type';
import { TypeField } from 'src/common/type-field.decorator';
import { CreateDomain0006Input } from 'src/domain-0006/dto/create-domain-0006.input';

import { Domain0005 } from '../domain-0005.entity';

@InputType()
export class CreateDomain0005Input extends OmitType(
  ToCreateInputType(Domain0005),
  [],
) {
  @TypeField(() => [CreateDomain0006Input], { description: 'domain0006s' })
  domain0006s!: CreateDomain0006Input[];
}
