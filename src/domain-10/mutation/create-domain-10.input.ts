import { InputType, OmitType } from '@nestjs/graphql';

import { ToCreateInputType } from '../../common/to-create-input-type';
import { Domain10 } from '../domain-10.entity';

@InputType()
export class CreateDomain10Input extends OmitType(ToCreateInputType(Domain10), [
  'domain09Id',
]) {}
