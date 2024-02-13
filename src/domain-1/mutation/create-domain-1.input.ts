import { InputType } from '@nestjs/graphql';
import { ToCreateInputType } from 'src/common/graphql/to-create-input-type';

import { Domain1 } from '../domain-1.entity';

@InputType()
export class CreateDomain1Input extends ToCreateInputType(Domain1) {}
