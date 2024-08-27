import { InputType, OmitType } from '@nestjs/graphql';

import { ToOrderInputType } from '../../common/to-order-input-type';
import { Domain0025 } from '../domain-0025.entity';

@InputType()
export class Domain0025OrderInput extends OmitType(
  ToOrderInputType(Domain0025),
  [],
) {}
