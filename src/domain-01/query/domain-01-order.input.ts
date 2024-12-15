import { InputType, OmitType } from '@nestjs/graphql';

import { ToOrderInputType } from '../../common/to-order-input-type';
import { Domain01 } from '../domain-01.entity';

@InputType()
export class Domain01OrderInput extends OmitType(
  ToOrderInputType(Domain01),
  [],
) {}
