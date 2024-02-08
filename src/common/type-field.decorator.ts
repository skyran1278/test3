import { applyDecorators } from '@nestjs/common';
import {
  Field,
  FieldOptions,
  GqlTypeReference,
  ReturnTypeFunc,
  ReturnTypeFuncValue,
} from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

type FieldOptionsExtractor<T> = T extends [GqlTypeReference<infer P>]
  ? FieldOptions<P[]>
  : T extends GqlTypeReference<infer P>
  ? FieldOptions<P>
  : never;

export function TypeField<T extends ReturnTypeFuncValue>(
  returnTypeFunction: ReturnTypeFunc<T>,
  options?: FieldOptionsExtractor<T>,
): PropertyDecorator & MethodDecorator {
  const returnTypeFunc = returnTypeFunction();
  const typeFunction =
    returnTypeFunc instanceof Array ? returnTypeFunc[0] : returnTypeFunc;
  if (typeFunction instanceof Function) {
    return applyDecorators(
      ValidateNested(),
      Type(() => typeFunction),
      Field(returnTypeFunction, options),
    );
  }
  return applyDecorators(Field(returnTypeFunction, options));
}
