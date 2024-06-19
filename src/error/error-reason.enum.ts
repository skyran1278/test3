import { registerEnumType } from '@nestjs/graphql';

export enum ErrorReasonEnum {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  PERMISSION_INTERPOLATE_ERROR = 'PERMISSION_INTERPOLATE_ERROR',
}

registerEnumType(ErrorReasonEnum, {
  name: 'ErrorReasonEnum',
});
