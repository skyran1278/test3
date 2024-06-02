import { applyDecorators } from '@nestjs/common';
import { Field, FieldOptions } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ObjectType, OneToOne, RelationOptions } from 'typeorm';

import { graphqlToTypeormNullable } from './graphql-to-typeorm-nullable';

type RelationAndFieldOptions = Omit<RelationOptions, 'nullable'> &
  Pick<FieldOptions, 'deprecationReason' | 'nullable'> & {
    /**
     * Description of the field.
     */
    comment?: string;
  };

export function OneToOneField<T>(
  typeFunctionOrTarget: (type?: unknown) => ObjectType<T>,
  options?: RelationAndFieldOptions,
): PropertyDecorator;
export function OneToOneField<T>(
  typeFunctionOrTarget: (type?: unknown) => ObjectType<T>,
  inverseSide?: (object: T) => unknown,
  options?: RelationAndFieldOptions,
): PropertyDecorator;
export function OneToOneField<T>(
  typeFunctionOrTarget: (type?: unknown) => ObjectType<T>,
  inverseSideOrOptions?: ((object: T) => unknown) | RelationAndFieldOptions,
  options?: RelationAndFieldOptions,
): PropertyDecorator {
  let inverseSideProperty: ((object: T) => unknown) | undefined;
  if (
    inverseSideOrOptions !== null &&
    typeof inverseSideOrOptions === 'object'
  ) {
    options = inverseSideOrOptions;
  } else {
    inverseSideProperty = inverseSideOrOptions;
  }

  return applyDecorators(
    Type(typeFunctionOrTarget),
    Field(typeFunctionOrTarget, {
      description: options?.comment,
      nullable: options?.nullable,
      deprecationReason: options?.deprecationReason,
    }),
    OneToOne(typeFunctionOrTarget, inverseSideProperty, {
      ...options,
      nullable: graphqlToTypeormNullable(options?.nullable),
    }),
  );
}
