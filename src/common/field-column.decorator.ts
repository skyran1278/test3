import { applyDecorators } from '@nestjs/common';
import { Field, ID, Int } from '@nestjs/graphql';
import { Transform, Type } from 'class-transformer';
import Decimal from 'decimal.js';
import { Column, ColumnOptions } from 'typeorm';

import DecimalScalar from './decimal.scalar';
import { DecimalTransformer } from './decimal.transformer';

export function FieldColumn(options: ColumnOptions) {
  if (options.type === 'decimal') {
    return applyDecorators(
      Type(() => String),
      Transform(({ value }) => (value ? new Decimal(value as string) : null), {
        toClassOnly: true,
      }),
      Field(() => DecimalScalar, {
        description: options.comment,
        nullable: options.nullable,
      }),
      Column({
        ...options,
        type: 'decimal',
        precision: 32,
        scale: 6,
        transformer: DecimalTransformer.transformer,
      }),
    );
  }

  if (options.type === 'uuid') {
    return applyDecorators(
      Field(() => ID, {
        description: options.comment,
        nullable: options.nullable,
      }),
      Column(options),
    );
  }

  if (options.type === 'date') {
    return applyDecorators(
      Field(() => Date, {
        description: options.comment,
        nullable: options.nullable,
      }),
      Column(options),
    );
  }

  if (options.type === 'varchar') {
    return applyDecorators(
      Field(() => String, {
        description: options.comment,
        nullable: options.nullable,
      }),
      Column(options),
    );
  }

  if (options.type === 'int') {
    return applyDecorators(
      Field(() => Int, {
        description: options.comment,
        nullable: options.nullable,
      }),
      Column(options),
    );
  }

  return applyDecorators(
    Field({
      description: options.comment,
      nullable: options.nullable,
    }),
    Column(options),
  );
}
