import { applyDecorators } from '@nestjs/common';
import { Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ManyToOne, ObjectType, RelationOptions } from 'typeorm';

interface RelationOptionsWithComment extends RelationOptions {
  comment?: string;
}

export function FieldManyToOne<T>(
  typeFunctionOrTarget: (type?: unknown) => ObjectType<T>,
  options?: RelationOptionsWithComment,
): PropertyDecorator;
export function FieldManyToOne<T>(
  typeFunctionOrTarget: (type?: unknown) => ObjectType<T>,
  inverseSide?: (object: T) => unknown,
  options?: RelationOptionsWithComment,
): PropertyDecorator;
export function FieldManyToOne<T>(
  typeFunctionOrTarget: (type?: unknown) => ObjectType<T>,
  inverseSideOrOptions?: ((object: T) => unknown) | RelationOptionsWithComment,
  options?: RelationOptionsWithComment,
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
    }),
    ManyToOne(typeFunctionOrTarget, inverseSideProperty, options),
  );
}
