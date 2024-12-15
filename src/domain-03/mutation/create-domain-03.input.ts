import { InputType, OmitType } from '@nestjs/graphql';

import { ToCreateInputType } from '../../common/to-create-input-type';
import { Domain03 } from '../domain-03.entity';

@InputType()
export class CreateDomain03Input extends OmitType(ToCreateInputType(Domain03), [
  'domain0309',
]) {}
