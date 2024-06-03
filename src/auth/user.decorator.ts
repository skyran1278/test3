import { createParamDecorator } from '@nestjs/common';

import { als } from '../als/als.service';

export const UserDecorator = createParamDecorator(() => {
  return als.get('user');
});
