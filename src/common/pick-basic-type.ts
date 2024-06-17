import { Type } from '@nestjs/common';
import { isFunction, isPlainObject } from '@nestjs/common/utils/shared.utils';
import { Field } from '@nestjs/graphql';
import { ClassDecoratorFactory } from '@nestjs/graphql/dist/interfaces/class-decorator-factory.interface';
import { MetadataLoader } from '@nestjs/graphql/dist/plugin/metadata-loader';
import { PropertyMetadata } from '@nestjs/graphql/dist/schema-builder/metadata';
import { getFieldsAndDecoratorForType } from '@nestjs/graphql/dist/schema-builder/utils/get-fields-and-decorator.util';
import { applyFieldDecorators } from '@nestjs/graphql/dist/type-helpers/type-helpers.utils';
import {
  inheritPropertyInitializers,
  inheritTransformationMetadata,
  inheritValidationMetadata,
} from '@nestjs/mapped-types';
import Decimal from 'decimal.js';
import { GraphQLScalarType } from 'graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { MetaEntity } from './meta.entity';

export type PickBasicTypeProperty<T> = {
  [P in keyof T as T[P] extends
    | number
    | string
    | Date
    | Buffer
    | Decimal
    | Record<string | number | symbol, unknown>
    | Array<
        | string
        | number
        | boolean
        | Date
        | Buffer
        | Decimal
        | Record<string | number | symbol, unknown>
      >
    | Maybe<
        | string
        | number
        | boolean
        | Date
        | Buffer
        | Decimal
        | Record<string | number | symbol, unknown>
      >
    | undefined
    ? P
    : never]: T[P];
};

export type OmitObjectTypeProperty2<T> = {
  [P in keyof T as T[P] extends
    | MetaEntity
    | undefined
    | Promise<MetaEntity>
    | Array<MetaEntity>
    ? never
    : P]: T[P];
};

export function PickBasicType<T>(
  classRef: Type<T>,
  decorator: ClassDecoratorFactory,
): Type<PickBasicTypeProperty<T>> {
  const { fields } = getFieldsAndDecoratorForType(classRef);

  @decorator({ isAbstract: true })
  abstract class PickBasicTypeClass {
    constructor() {
      inheritPropertyInitializers(this, classRef);
    }
  }

  inheritValidationMetadata(classRef, PickBasicTypeClass);
  inheritTransformationMetadata(classRef, PickBasicTypeClass);

  function applyFields(items: PropertyMetadata[]) {
    items.forEach((item) => {
      // Execute type function eagerly to update the type options object (before "clone" operation)
      // when the passed function (e.g., @Field(() => Type)) lazily returns an array.
      const typeFnResult = isFunction(item.typeFn) ? item.typeFn() : null;

      const isBasicType =
        typeFnResult === Boolean ||
        typeFnResult === String ||
        typeFnResult === Date ||
        typeFnResult instanceof GraphQLScalarType || // ID, Int, Float, DecimalScalar, DateResolver
        isPlainObject(typeFnResult) || // enum
        typeFnResult === null; // not function

      if (!isBasicType) return;

      Field(item.typeFn, { ...item.options })(
        PickBasicTypeClass.prototype,
        item.name,
      );
      applyFieldDecorators(PickBasicTypeClass, item);
    });
  }
  applyFields(fields);

  // Register a refresh hook to update the fields when the serialized metadata
  // is loaded from file.
  MetadataLoader.addRefreshHook(() => {
    const { fields: items } = getFieldsAndDecoratorForType(classRef, {
      overrideFields: true,
    });
    applyFields(items);
  });

  return PickBasicTypeClass as Type<PickBasicTypeProperty<T>>;
}
