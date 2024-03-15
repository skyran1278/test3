import { InputType, OmitType } from '@nestjs/graphql';
import { ToOrderInputType } from 'src/common/graphql/to-order-input-type';

import { Domain1 } from '../domain-1.entity';

@InputType()
export class Domain1OrderInput extends OmitType(
  ToOrderInputType(Domain1),
  [],
) {}
