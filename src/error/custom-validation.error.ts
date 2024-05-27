import { HttpStatus } from '@nestjs/common';
import { ValidationError } from 'class-validator';

import { CustomError } from './custom.error';
import { ErrorReasonEnum } from './error-reason.enum';

export class CustomValidationError extends CustomError {
  constructor(errors?: readonly ValidationError[]) {
    const detail = errors
      ?.filter((item) => !!item.constraints)
      .flatMap(
        (error) => error.constraints && Object.values(error.constraints),
      );

    super({
      message: 'Class validator validation error.',
      httpErrorCode: HttpStatus.BAD_REQUEST,
      reason: ErrorReasonEnum.VALIDATION_ERROR,
      detail,
    });
  }
}
