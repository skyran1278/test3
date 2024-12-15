import { InputType, OmitType } from '@nestjs/graphql';

import { ToOrderInputType } from '../../common/to-order-input-type';
import { Domain22 } from '../domain-22.entity';

@InputType()
export class Domain22OrderInput extends OmitType(
  ToOrderInputType(Domain22),
  [],
) {}
