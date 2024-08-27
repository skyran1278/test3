import { InputType, OmitType } from '@nestjs/graphql';

import { ToCreateInputType } from '../../common/to-create-input-type';
import { Domain0025 } from '../domain-0025.entity';

@InputType()
export class CreateDomain0025Input extends OmitType(
  ToCreateInputType(Domain0025),
  [],
) {}
