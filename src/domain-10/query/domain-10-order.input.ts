import { InputType, OmitType } from '@nestjs/graphql';

import { ToOrderInputType } from '../../common/to-order-input-type';
import { Domain10 } from '../domain-10.entity';

@InputType()
export class Domain10OrderInput extends OmitType(
  ToOrderInputType(Domain10),
  [],
) {}
