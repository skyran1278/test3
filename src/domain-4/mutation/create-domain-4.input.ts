import { InputType, OmitType } from '@nestjs/graphql';
import { ToCreateInputType } from 'src/common/to-create-input-type';

import { Domain4 } from '../domain-4.entity';

@InputType()
export class CreateDomain4Input extends OmitType(
  ToCreateInputType(Domain4),
  [],
) {}
