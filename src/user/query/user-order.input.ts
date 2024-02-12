import { InputType } from '@nestjs/graphql';
import { ToOrderInputType } from 'src/common/graphql/to-order-input-type';

import { User } from '../user.entity';

@InputType()
export class UserOrderInput extends ToOrderInputType(User) {}
