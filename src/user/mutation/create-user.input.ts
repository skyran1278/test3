import { InputType } from '@nestjs/graphql';
import { ToCreateInputType } from 'src/common/graphql/to-create-input-type';

import { User } from '../user.entity';

@InputType()
export class CreateUserInput extends ToCreateInputType(User) {}
