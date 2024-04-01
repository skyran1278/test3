import { InputType, OmitType } from '@nestjs/graphql';
import { ToOrderInputType } from 'src/common/to-order-input-type';

import { Domain0006 } from '../domain-0006.entity';

@InputType()
export class Domain0006OrderInput extends OmitType(
  ToOrderInputType(Domain0006),
  [],
) {}
