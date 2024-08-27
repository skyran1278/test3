import { InputType, OmitType } from '@nestjs/graphql';

import { ToOrderInputType } from '../../common/to-order-input-type';
import { Domain0024 } from '../domain-0024.entity';

@InputType()
export class Domain0024OrderInput extends OmitType(
  ToOrderInputType(Domain0024),
  [],
) {}
