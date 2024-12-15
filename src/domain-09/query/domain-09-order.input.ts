import { InputType, OmitType } from '@nestjs/graphql';

import { ToOrderInputType } from '../../common/to-order-input-type';
import { Domain09 } from '../domain-09.entity';

@InputType()
export class Domain09OrderInput extends OmitType(
  ToOrderInputType(Domain09),
  [],
) {}
