import { InputType, OmitType } from '@nestjs/graphql';
import { ToCreateInputType } from 'src/common/to-create-input-type';

import { Domain6 } from '../domain-6.entity';

@InputType()
export class CreateDomain6Input extends OmitType(
  ToCreateInputType(Domain6),
  [],
) {}
