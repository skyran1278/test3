import assert from 'assert';

import { applyDecorators } from '@nestjs/common';
import {
  Field,
  FieldOptions,
  ID,
  Int,
  ReturnTypeFunc,
  ReturnTypeFuncValue,
} from '@nestjs/graphql';
import { Transform, Type } from 'class-transformer';
import { IsOptional } from 'class-validator';
import Decimal from 'decimal.js';
import { DateResolver, JSONObjectResolver } from 'graphql-scalars';
import { Column, ColumnOptions } from 'typeorm';

import DecimalScalar from './decimal.scalar';
import { DecimalTransformer } from './decimal.transformer';

type ColumnAndFieldOptions = Omit<ColumnOptions, 'nullable'> &
  Pick<FieldOptions, 'deprecationReason' | 'nullable'>;

export function ColumnField(options: ColumnAndFieldOptions) {
  return applyDecorators(
    ...getClassValidatorDecorators(options),
    getFieldDecorator(options),
    getColumnDecorator(options),
  );
}

export function getFieldDecorator(options: ColumnAndFieldOptions) {
  const defaultValue = getDefaultValue(options);

  return Field(getReturnTypeFunc(options), {
    description: options.comment,
    nullable: options.nullable,
    deprecationReason: options.deprecationReason,
    defaultValue,
  });
}

function getDefaultValue(options: ColumnAndFieldOptions): unknown {
  if (options.default != null && options.type === 'decimal') {
    return new Decimal(options.default as string | number | Decimal);
  }
  return options.default;
}

function getReturnTypeFunc(
  options: ColumnAndFieldOptions,
): ReturnTypeFunc<ReturnTypeFuncValue> {
  let returnTypeFunc: ReturnTypeFunc<ReturnTypeFuncValue> | undefined;
  switch (options.type) {
    case 'varchar': {
      returnTypeFunc = () => String;
      break;
    }
    case 'uuid': {
      returnTypeFunc = () => ID;
      break;
    }
    case 'int': {
      returnTypeFunc = () => Int;
      break;
    }
    case 'decimal': {
      returnTypeFunc = () => DecimalScalar;
      break;
    }
    case 'enum': {
      const EnumClass = options.enum;
      assert(EnumClass, 'enumClass is required');
      returnTypeFunc = () => EnumClass;
      break;
    }
    case 'date': {
      returnTypeFunc = () => DateResolver;
      break;
    }
    case 'timestamp' ||
      'timestamp with time zone' ||
      'timestamp without time zone': {
      returnTypeFunc = () => Date;
      break;
    }
    case 'boolean': {
      returnTypeFunc = () => Boolean;
      break;
    }
    case 'json':
    case 'jsonb': {
      returnTypeFunc = () => JSONObjectResolver;
      break;
    }

    default:
      throw new Error(`type ${options?.type?.toString()} not support`);
  }

  if (options.array) {
    return () => [returnTypeFunc?.()];
  }
  return returnTypeFunc;
}

function getClassValidatorDecorators(options: ColumnAndFieldOptions) {
  const decorators: Array<
    ClassDecorator | MethodDecorator | PropertyDecorator
  > = [];
  if (options.nullable) decorators.push(IsOptional());

  if (options.type === 'decimal') {
    decorators.push(
      Type(() => String),
      Transform(({ value }) => (value ? new Decimal(value as string) : null), {
        toClassOnly: true,
      }),
    );
  }

  return decorators;
}

function getColumnDecorator(options: ColumnAndFieldOptions) {
  const columnOptions: ColumnOptions = {
    ...options,
    nullable: options.nullable === true,
  };

  if (options.type === 'decimal') {
    Object.assign(columnOptions, {
      type: 'decimal',
      precision: 32,
      scale: 6,
      transformer: DecimalTransformer.transformer,
    });
  }

  return Column(columnOptions);
}
