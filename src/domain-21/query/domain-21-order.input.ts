import { InputType, OmitType } from '@nestjs/graphql';

import { ToOrderInputType } from '../../common/to-order-input-type';
import { Domain21 } from '../domain-21.entity';

@InputType()
export class Domain21OrderInput extends OmitType(
  ToOrderInputType(Domain21),
  [],
) {}
