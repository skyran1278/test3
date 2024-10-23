import {
  InternalServerErrorException,
  NotImplementedException,
  applyDecorators,
} from '@nestjs/common';
import {
  Field,
  FieldOptions,
  ID,
  Int,
  ReturnTypeFunc,
  ReturnTypeFuncValue,
} from '@nestjs/graphql';
import { Transform, Type } from 'class-transformer';
import { isNumberString } from 'class-validator';
import Decimal from 'decimal.js';
import { DateResolver, JSONObjectResolver } from 'graphql-scalars';
import { Column, ColumnOptions } from 'typeorm';

import DecimalScalar from './decimal.scalar';
import { DecimalTransformer } from './decimal.transformer';
import { graphqlToTypeormNullable } from './graphql-to-typeorm-nullable';

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

  // Due to a type issue in @nestjs/graphql 12.1.1, we need to handle nullable separately
  if (options.nullable === true) {
    return Field(getReturnTypeFunc(options), {
      description: options.comment,
      nullable: true,
      deprecationReason: options.deprecationReason,
      defaultValue,
    });
  }

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
      if (!EnumClass)
        throw new InternalServerErrorException(
          'Argument `options.enum` is required when options.type is enum.',
        );
      returnTypeFunc = () => EnumClass;
      break;
    }
    case 'date': {
      returnTypeFunc = () => DateResolver;
      break;
    }
    case 'timestamp':
    case 'timestamp with time zone':
    case 'timestamp without time zone': {
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
      throw new NotImplementedException(
        `Type \`${options?.type?.toString()}\` is not support.`,
      );
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
  if (options.type === 'decimal') {
    decorators.push(
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

  return decorators;
}

function getColumnDecorator(options: ColumnAndFieldOptions) {
  const columnOptions: ColumnOptions = {
    ...options,
    nullable: graphqlToTypeormNullable(options.nullable),
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
