import assert from 'assert';

import { applyDecorators } from '@nestjs/common';
import {
  Field,
  FieldOptions,
  GqlTypeReference,
  ReturnTypeFunc,
  ReturnTypeFuncValue,
} from '@nestjs/graphql';
import { Transform, Type } from 'class-transformer';
import { ValidateNested, isNumberString } from 'class-validator';
import Decimal from 'decimal.js';

import DecimalScalar from './decimal.scalar';

type FieldOptionsExtractor<T> = T extends [GqlTypeReference<infer P>]
  ? FieldOptions<P[]>
  : T extends GqlTypeReference<infer P>
    ? FieldOptions<P>
    : never;

export function TypeField<T extends ReturnTypeFuncValue>(
  returnTypeFunction: ReturnTypeFunc<T>,
  options?: FieldOptionsExtractor<T>,
): PropertyDecorator & MethodDecorator {
  const returnTypeReference = returnTypeFunction();
  const isArray = returnTypeReference instanceof Array;
  const typeReference = isArray ? returnTypeReference[0] : returnTypeReference;

  const typeDecorators = [];

  // if circular dependency, typeFunction is undefined
  if (typeReference instanceof Function || typeReference === undefined) {
    typeDecorators.push(
      isArray ? ValidateNested({ each: true }) : ValidateNested(),
    );
    typeDecorators.push(
      Type(() => {
        const returnTypeRef = returnTypeFunction();
        const typeRef =
          returnTypeRef instanceof Array ? returnTypeRef[0] : returnTypeRef;
        assert(typeRef instanceof Function);
        return typeRef;
      }),
    );

    // transform null to undefined because typeorm does not support null
    typeDecorators.push(
      Transform(
        ({ value }: { value: typeof typeReference }) =>
          value == null ? undefined : value,
        { toClassOnly: true },
      ),
    );
  } else if (typeReference === DecimalScalar) {
    typeDecorators.push(
      Type(() => String),
      Transform(
        ({ value }: { value: string }) =>
          isNumberString(value) ? new Decimal(value) : value,
        {
          toClassOnly: true,
        },
      ),
    );
  }

  return applyDecorators(...typeDecorators, Field(returnTypeFunction, options));
}
