import { Field, ID, InputType, OmitType } from '@nestjs/graphql';

import { ToCreateInputType } from '../../common/to-create-input-type';
import { Domain0021 } from '../domain-0021.entity';

@InputType()
export class CreateDomain0021sDomain0021Input extends OmitType(
  ToCreateInputType(Domain0021),
  [],
) {
  @Field(() => ID)
  id!: string;
}
