import { InputType, OmitType } from '@nestjs/graphql';

import { ToOrderInputType } from '../../common/to-order-input-type';
import { Domain03 } from '../domain-03.entity';

@InputType()
export class Domain03OrderInput extends OmitType(
  ToOrderInputType(Domain03),
  [],
) {}
