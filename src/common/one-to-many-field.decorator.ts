import { applyDecorators } from '@nestjs/common';
import { Field, FieldOptions } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ObjectType, OneToMany, RelationOptions } from 'typeorm';

type RelationAndFieldOptions = Omit<RelationOptions, 'nullable'> &
  Pick<FieldOptions, 'deprecationReason' | 'nullable'> & {
    /**
     * Description of the field.
     */
    comment?: string;
  };

export function OneToManyField<T>(
  typeFunctionOrTarget: (type?: unknown) => ObjectType<T>,
  inverseSide: (object: T) => unknown,
  options?: RelationAndFieldOptions,
): PropertyDecorator {
  return applyDecorators(
    Type(typeFunctionOrTarget),
    Field(() => [typeFunctionOrTarget()], {
      description: options?.comment,
      nullable: options?.nullable,
      deprecationReason: options?.deprecationReason,
    }),
    OneToMany(typeFunctionOrTarget, inverseSide, {
      ...options,
      nullable: options?.nullable === true,
    }),
  );
}
