import { InputType } from '@nestjs/graphql';
import { OrderInput } from 'src/common/order-input';

import { User } from '../user.entity';

@InputType()
export class UserOrderInput extends OrderInput(User) {}
