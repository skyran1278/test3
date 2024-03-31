import { InputType, OmitType } from '@nestjs/graphql';
import { ToOrderInputType } from 'src/common/to-order-input-type';

import { Domain5 } from '../domain-5.entity';

@InputType()
export class Domain5OrderInput extends OmitType(
  ToOrderInputType(Domain5),
  [],
) {}
