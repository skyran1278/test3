import { InputType, OmitType } from '@nestjs/graphql';
import { ToOrderInputType } from 'src/common/to-order-input-type';

import { Domain3 } from '../domain-3.entity';

@InputType()
export class Domain3OrderInput extends OmitType(
  ToOrderInputType(Domain3),
  [],
) {}
