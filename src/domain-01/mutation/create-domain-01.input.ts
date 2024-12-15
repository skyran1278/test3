import { InputType, OmitType } from '@nestjs/graphql';

import { ToCreateInputType } from '../../common/to-create-input-type';
import { Domain01 } from '../domain-01.entity';

@InputType()
export class CreateDomain01Input extends OmitType(
  ToCreateInputType(Domain01),
  [],
) {}
