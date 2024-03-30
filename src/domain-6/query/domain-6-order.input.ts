import { InputType, OmitType } from '@nestjs/graphql';
import { ToOrderInputType } from 'src/common/to-order-input-type';

import { Domain6 } from '../domain-6.entity';

@InputType()
export class Domain6OrderInput extends OmitType(
  ToOrderInputType(Domain6),
  [],
) {}
