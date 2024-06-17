import { InputType, OmitType } from '@nestjs/graphql';

import { ToOrderInputType } from '../../common/to-order-input-type';
import { Role } from '../role.entity';

@InputType()
export class RoleOrderInput extends OmitType(
  ToOrderInputType(Role),
  [],
) {}
