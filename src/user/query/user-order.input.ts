import { InputType } from '@nestjs/graphql';
import { NodeOrderInput } from 'src/common/query/node-order.input';

@InputType()
export class UserOrderInput extends NodeOrderInput {}
