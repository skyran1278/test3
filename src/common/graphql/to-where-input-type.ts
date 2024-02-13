import { Type } from '@nestjs/common';
import { InputType, PartialType } from '@nestjs/graphql';
import { ClassDecoratorFactory } from '@nestjs/graphql/dist/interfaces/class-decorator-factory.interface';

import { OmitObjectType } from './omit-object-type';

export const ToWhereInputType = <T>(
  classRef: Type<T>,
  decorator: ClassDecoratorFactory | undefined = InputType,
) => {
  return OmitObjectType(PartialType(classRef, decorator));
};
