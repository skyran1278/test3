import { InputType, OmitType } from '@nestjs/graphql';
import { ToOrderInputType } from 'src/common/to-order-input-type';

import { Domain2 } from '../domain-2.entity';

@InputType()
export class Domain2OrderInput extends OmitType(
  ToOrderInputType(Domain2),
  [],
) {}
