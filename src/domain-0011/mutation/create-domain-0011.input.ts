import { InputType, OmitType } from '@nestjs/graphql';
import { ToCreateInputType } from 'src/common/to-create-input-type';

import { Domain0011 } from '../domain-0011.entity';

@InputType()
export class CreateDomain0011Input extends OmitType(
  ToCreateInputType(Domain0011),
  [],
) {}
