import { InputType, OmitType } from '@nestjs/graphql';
import { ToCreateInputType } from 'src/common/to-create-input-type';

import { Domain1 } from '../domain-1.entity';

@InputType()
export class CreateDomain1Input extends OmitType(
  ToCreateInputType(Domain1),
  [],
) {}
