import { InputType, OmitType } from '@nestjs/graphql';
import { ToCreateInputType } from 'src/common/to-create-input-type';

import { Domain0012 } from '../domain-0012.entity';

@InputType()
export class CreateDomain0012Input extends OmitType(
  ToCreateInputType(Domain0012),
  [],
) {}
