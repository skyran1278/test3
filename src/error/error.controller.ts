import { Controller, Get } from '@nestjs/common';

import { NoAuthentication } from '../auth/no-authentication.decorator';
import { CustomAuthenticationError } from './custom-authentication.error';

/**
 * Error controller for testing error handling
 */
@Controller('error')
export class ErrorController {
  @NoAuthentication()
  @Get('custom-authentication-error')
  customAuthenticationError() {
    throw new CustomAuthenticationError();
  }
}
