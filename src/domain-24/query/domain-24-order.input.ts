import { InputType, OmitType } from '@nestjs/graphql';

import { ToOrderInputType } from '../../common/to-order-input-type';
import { Domain24 } from '../domain-24.entity';

@InputType()
export class Domain24OrderInput extends OmitType(
  ToOrderInputType(Domain24),
  [],
) {}
