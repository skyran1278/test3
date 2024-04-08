import { InputType, OmitType } from '@nestjs/graphql';
import { ToCreateInputType } from 'src/common/to-create-input-type';

import { Domain0001 } from '../domain-0001.entity';

@InputType()
export class CreateDomain0001Input extends OmitType(
  ToCreateInputType(Domain0001),
  [],
) {}
