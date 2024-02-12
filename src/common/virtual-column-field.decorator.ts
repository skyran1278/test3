import { applyDecorators } from '@nestjs/common';
import { FieldOptions } from '@nestjs/graphql';
import { Transform, Type } from 'class-transformer';
import Decimal from 'decimal.js';
import { VirtualColumn } from 'typeorm';
import { VirtualColumnOptions } from 'typeorm/decorator/options/VirtualColumnOptions';

import { getFieldDecorator } from './column-field.decorator';
import { DecimalTransformer } from './decimal/decimal.transformer';

type VirtualColumnAndFieldOptions = Omit<VirtualColumnOptions, 'nullable'> &
  Pick<FieldOptions, 'deprecationReason' | 'nullable'>;

export function VirtualColumnField(options: VirtualColumnAndFieldOptions) {
  return applyDecorators(
    ...getClassTransformerDecorators(options),
    getFieldDecorator(options),
    getVirtualColumnDecorator(options),
  );
}

function getClassTransformerDecorators(options: VirtualColumnAndFieldOptions) {
  const decorators: Array<
    ClassDecorator | MethodDecorator | PropertyDecorator
  > = [];

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

function getVirtualColumnDecorator(options: VirtualColumnAndFieldOptions) {
  if (options.type === 'decimal') {
    return VirtualColumn({
      type: 'decimal',
      transformer: DecimalTransformer.transformer,
      ...options,
    });
  }
  return VirtualColumn(options);
}
