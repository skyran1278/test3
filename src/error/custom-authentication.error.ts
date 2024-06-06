import { HttpStatus } from '@nestjs/common';

import { CustomError } from './custom.error';

export class CustomAuthenticationError extends CustomError {
  constructor(message: string = 'Bearer Token is invalid or expired.') {
    super({ message, statusCode: HttpStatus.UNAUTHORIZED });
  }
}
