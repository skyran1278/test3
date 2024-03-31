import { InputType, OmitType } from '@nestjs/graphql';
import { ToOrderInputType } from 'src/common/to-order-input-type';

import { Domain4 } from '../domain-4.entity';

@InputType()
export class Domain4OrderInput extends OmitType(
  ToOrderInputType(Domain4),
  [],
) {}
