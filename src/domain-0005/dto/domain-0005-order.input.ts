import { InputType, OmitType } from '@nestjs/graphql';

import { ToOrderInputType } from '../../common/to-order-input-type';
import { Domain0005 } from '../domain-0005.entity';

@InputType()
export class Domain0005OrderInput extends OmitType(
  ToOrderInputType(Domain0005),
  [],
) {}
