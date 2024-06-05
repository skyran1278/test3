import { HttpException, HttpExceptionBody, HttpStatus } from '@nestjs/common';

import { ErrorReasonEnum } from './error-reason.enum';

export type CustomHttpExceptionBody = HttpExceptionBody & {
  reason?: ErrorReasonEnum;
  detail?: unknown;
};

export class ErrorInfo {
  readonly reason: ErrorReasonEnum;
  readonly metadata?: unknown;

  constructor(reason: ErrorReasonEnum, metadata?: unknown) {
    this.reason = reason;
    this.metadata = metadata;
  }
}

/**
 * @see https://github.com/nestjs/nest/blob/aa7538ffbe8608c41ece2a035b872e5032f57763/packages/common/exceptions/bad-request.exception.ts#L11
 * @see https://github.com/nestjs/nest/blob/aa7538ffbe8608c41ece2a035b872e5032f57763/packages/common/exceptions/http.exception.ts#L26
 * @param message Warning: Error messages are not part of the API surface. They are subject to changes without notice. Application code must not have a hard dependency on error messages.
 * @param httpErrorCode Individual APIs must avoid defining additional error codes, since developers are very unlikely to write logic to handle a large number of error codes. For reference, handling an average of three error codes per API call would mean most application logic would just be for error handling, which would not be a good developer experience.
 * @param reason The reason field is intended to be used by the API to communicate the high-level cause of the error. It is intended to be used by the API consumer to understand the error and act accordingly.
 * @param details Additional information about the error.
 * @param cause This helps in maintaining a chain of errors, providing more context about the error's origin.
 */
interface CustomErrorOptions {
  message: string;
  httpErrorCode: HttpStatus;
  reason?: ErrorReasonEnum;
  detail?: unknown;
  cause?: Error;
}

export class CustomError extends HttpException {
  constructor({
    message,
    httpErrorCode,
    reason,
    detail,
    cause,
  }: CustomErrorOptions) {
    const response: CustomHttpExceptionBody = {
      message,
      statusCode: httpErrorCode,
      reason,
      detail,
    };

    super(response, httpErrorCode, { cause });

    if (cause) {
      this.stack = cause.stack;
    }
  }
}
