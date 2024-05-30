import { ValidationError, ValidationPipe } from '@nestjs/common';

import { ValidatorError } from '../error/validator.error';

class ValidatorPipe extends ValidationPipe {
  constructor() {
    super({
      transform: true,
      exceptionFactory: (errors) => {
        const disableErrorMessages = process.env.NODE_ENV === 'production';
        if (disableErrorMessages) {
          return new ValidatorError();
        }
        return new ValidatorError(errors);
      },
    });
  }

  public formatValidationErrors(errors?: ValidationError[]): string[] {
    if (!errors) return [];
    return this.flattenValidationErrors(errors);
  }
}

export const validatorPipe = new ValidatorPipe();