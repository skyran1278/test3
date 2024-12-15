import { Field, ID, InputType, OmitType } from '@nestjs/graphql';

import { ToCreateInputType } from '../../common/to-create-input-type';
import { Domain21 } from '../domain-21.entity';

@InputType()
export class CreateDomain21sDomain21Input extends OmitType(
  ToCreateInputType(Domain21),
  [],
) {
  @Field(() => ID)
  id!: string;
}
