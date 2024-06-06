import { HttpStatus } from '@nestjs/common';
import { ValidationError } from 'class-validator';

import { validatorPipe } from '../common/validator.pipe';
import { CustomError } from './custom.error';
import { ErrorReasonEnum } from './error-reason.enum';

export class ValidatorError extends CustomError {
  constructor(errors?: ValidationError[]) {
    const detail = validatorPipe.formatValidationErrors(errors);

    super({
      message: 'Class validator validation error.',
      statusCode: HttpStatus.BAD_REQUEST,
      reason: ErrorReasonEnum.VALIDATION_ERROR,
      detail,
    });
  }
}
