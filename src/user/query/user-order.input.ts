import { InputType, OmitType } from '@nestjs/graphql';
import { ToOrderInputType } from 'src/common/to-order-input-type';

import { User } from '../user.entity';

@InputType()
export class UserOrderInput extends OmitType(
  ToOrderInputType(User),
  [],
) {}
