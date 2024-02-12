import { InputType } from '@nestjs/graphql';
import { OrderInput } from 'src/common/order-input';

import { Domain1 } from '../domain-1.entity';

@InputType()
export class Domain1OrderInput extends OrderInput(Domain1) {}
