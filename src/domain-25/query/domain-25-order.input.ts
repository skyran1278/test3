import { InputType, OmitType } from '@nestjs/graphql';

import { ToOrderInputType } from '../../common/to-order-input-type';
import { Domain25 } from '../domain-25.entity';

@InputType()
export class Domain25OrderInput extends OmitType(
  ToOrderInputType(Domain25),
  [],
) {}
