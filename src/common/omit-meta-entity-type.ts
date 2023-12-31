import { Type } from '@nestjs/common';
import {
  ArgsType,
  InputType,
  InterfaceType,
  ObjectType,
  OmitType,
} from '@nestjs/graphql';

import { MetaEntity } from './meta.entity';

export type ClassDecoratorFactory =
  | typeof ArgsType
  | typeof ObjectType
  | typeof InterfaceType
  | typeof InputType;

/**
 * Omit meta entity type, such as id, createdAt, updatedAt, deletedAt, createUser, updateUser, deleteUser
 * proxy pattern https://refactoring.guru/design-patterns/proxy
 * @param classRef
 * @param keys
 * @param decorator
 * @returns
 */
export const OmitMetaEntityType = <T extends MetaEntity, K extends keyof T>(
  classRef: Type<T>,
  keys: readonly K[],
  decorator: ClassDecoratorFactory | undefined = InputType,
) => {
  const appendMetaEntityKeys = [
    'id',
    'createdAt',
    'updatedAt',
    'deletedAt',
    'createUserId',
    'createUser',
    'updateUserId',
    'updateUser',
    'deleteUserId',
    'deleteUser',
    ...keys,
  ] as const;

  return OmitType(classRef, appendMetaEntityKeys, decorator);
};
