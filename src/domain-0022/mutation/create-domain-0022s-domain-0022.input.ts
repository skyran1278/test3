import { Field, ID, InputType, OmitType } from '@nestjs/graphql';

import { ToCreateInputType } from '../../common/to-create-input-type';
import { Domain0022 } from '../domain-0022.entity';

@InputType()
export class CreateDomain0022sDomain0022Input extends OmitType(
  ToCreateInputType(Domain0022),
  [],
) {
  @Field(() => ID)
  id!: string;
}
