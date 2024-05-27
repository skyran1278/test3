import { registerEnumType } from '@nestjs/graphql';

export enum ErrorReasonEnum {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
}

registerEnumType(ErrorReasonEnum, {
  name: 'ErrorReasonEnum',
});
