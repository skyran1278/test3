import { createParamDecorator } from '@nestjs/common';

import { alsService } from '../als/als.service';

export const UserDecorator = createParamDecorator(() => {
  return alsService.get('user');
});
