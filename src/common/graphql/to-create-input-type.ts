import { Type } from '@nestjs/common';
import { InputType, OmitType } from '@nestjs/graphql';
import { ClassDecoratorFactory } from '@nestjs/graphql/dist/interfaces/class-decorator-factory.interface';

import { MetaEntity } from '../dao/meta.entity';
import { OmitObjectType } from './omit-object-type';

/**
 * Omit meta entity type, such as id, createdAt, updatedAt, deletedAt, createUser, updateUser, deleteUser
 * proxy pattern https://refactoring.guru/design-patterns/proxy
 * @param classRef
 * @param decorator
 * @returns
 */
export const ToCreateInputType = <T extends MetaEntity>(
  classRef: Type<T>,
  decorator: ClassDecoratorFactory | undefined = InputType,
) => {
  const omitMetaEntityFields = [
    'id',
    'createdAt',
    'updatedAt',
    'deletedAt',
    'createdUserId',
    'updatedUserId',
    'deletedUserId',
  ] as const;

  return OmitObjectType(
    OmitType(classRef, omitMetaEntityFields, decorator),
    decorator,
  );
};
