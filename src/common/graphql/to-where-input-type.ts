import { Type } from '@nestjs/common';
import { InputType, OmitType, PartialType } from '@nestjs/graphql';
import { ClassDecoratorFactory } from '@nestjs/graphql/dist/interfaces/class-decorator-factory.interface';

export const ToWhereInputType = <T, K extends keyof T>(
  classRef: Type<T>,
  keys: readonly K[],
  decorator: ClassDecoratorFactory | undefined = InputType,
) => {
  return PartialType(OmitType(classRef, keys, decorator));
};
