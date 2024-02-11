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
  const returnTypeInstance = returnTypeFunction();
  const isArray = returnTypeInstance instanceof Array;
  const typeFunction = isArray ? returnTypeInstance[0] : returnTypeInstance;

  const typeDecorators = [];

  if (typeFunction instanceof Function) {
    typeDecorators.push(
      isArray ? ValidateNested({ each: true }) : ValidateNested(),
    );
    typeDecorators.push(Type(() => typeFunction));
  }

  return applyDecorators(...typeDecorators, Field(returnTypeFunction, options));
}
