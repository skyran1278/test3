import { InputType, OmitType } from '@nestjs/graphql';

import { ToCreateInputType } from '../../common/to-create-input-type';
import { Domain21 } from '../domain-21.entity';

@InputType()
export class CreateDomain21Input extends OmitType(
  ToCreateInputType(Domain21),
  [],
) {}
