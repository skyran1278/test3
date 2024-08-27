import { applyDecorators } from '@nestjs/common';
import { Field, FieldOptions } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ManyToMany, ObjectType, RelationOptions } from 'typeorm';

import { graphqlToTypeormNullable } from './graphql-to-typeorm-nullable';

type RelationAndFieldOptions = Omit<RelationOptions, 'nullable'> &
  Pick<FieldOptions, 'deprecationReason' | 'nullable'> & {
    /**
     * Description of the field.
     */
    comment?: string;
  };
/**
 * Many-to-many is a type of relationship when Entity1 can have multiple instances of Entity2, and Entity2 can have
 * multiple instances of Entity1. To achieve it, this type of relation creates a junction table, where it storage
 * entity1 and entity2 ids. This is owner side of the relationship.
 */
export function ManyToManyField<T>(
  typeFunctionOrTarget: (type?: unknown) => ObjectType<T>,
  options?: RelationAndFieldOptions,
): PropertyDecorator;

/**
 * Many-to-many is a type of relationship when Entity1 can have multiple instances of Entity2, and Entity2 can have
 * multiple instances of Entity1. To achieve it, this type of relation creates a junction table, where it storage
 * entity1 and entity2 ids. This is owner side of the relationship.
 */
export function ManyToManyField<T>(
  typeFunctionOrTarget: (type?: unknown) => ObjectType<T>,
  inverseSide?: (object: T) => unknown,
  options?: RelationAndFieldOptions,
): PropertyDecorator;

/**
 * Many-to-many is a type of relationship when Entity1 can have multiple instances of Entity2, and Entity2 can have
 * multiple instances of Entity1. To achieve it, this type of relation creates a junction table, where it storage
 * entity1 and entity2 ids. This is owner side of the relationship.
 */
export function ManyToManyField<T>(
  typeFunctionOrTarget: (type?: unknown) => ObjectType<T>,
  inverseSideOrOptions?: ((object: T) => unknown) | RelationAndFieldOptions,
  options?: RelationAndFieldOptions,
): PropertyDecorator {
  // normalize parameters
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
    Field(() => [typeFunctionOrTarget()], {
      description: options?.comment,
      nullable: options?.nullable,
      deprecationReason: options?.deprecationReason,
    }),
    ManyToMany(typeFunctionOrTarget, inverseSideProperty, {
      ...options,
      nullable: graphqlToTypeormNullable(options?.nullable),
    }),
  );
}
