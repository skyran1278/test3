import { InputType, OmitType } from '@nestjs/graphql';

import { ToOrderInputType } from '../../common/to-order-input-type';
import { Permission } from '../permission.entity';

@InputType()
export class PermissionOrderInput extends OmitType(
  ToOrderInputType(Permission),
  [],
) {}
