import { Type } from '@nestjs/common';
import { isFunction } from '@nestjs/common/utils/shared.utils';
import { Field, InputType, PartialType } from '@nestjs/graphql';
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
import { JSONObjectResolver } from 'graphql-scalars';
import { Maybe } from 'graphql/jsutils/Maybe';

import DecimalScalar from '../decimal/decimal.scalar';
import { PickBasicType, PickBasicTypeProperty } from './pick-basic-type';

export type OmitDecimalProperty<T> = {
  [P in keyof T as T[P] extends
    | Decimal
    | Array<unknown>
    | Maybe<Decimal>
    | undefined
    ? never
    : P]: T[P];
};

export const ToWhereInputType = <T>(
  classRef: Type<T>,
  decorator: ClassDecoratorFactory | undefined = InputType,
): Type<OmitDecimalProperty<PickBasicTypeProperty<T>>> => {
  const basicTypeClassRef = PickBasicType(
    PartialType(classRef, decorator),
    decorator,
  );

  const { fields } = getFieldsAndDecoratorForType(basicTypeClassRef);

  @decorator({ isAbstract: true })
  abstract class OmitObjectTypeClass {
    constructor() {
      inheritPropertyInitializers(this, basicTypeClassRef);
    }
  }

  inheritValidationMetadata(basicTypeClassRef, OmitObjectTypeClass);
  inheritTransformationMetadata(basicTypeClassRef, OmitObjectTypeClass);

  function applyFields(items: PropertyMetadata[]) {
    items
      .filter((item) => {
        if (isFunction(item.typeFn)) {
          const typeFn = item.typeFn();
          if (
            item.options.isArray ||
            typeFn === DecimalScalar ||
            typeFn === JSONObjectResolver
          ) {
            return false;
          }
        }
        return true;
      })
      .forEach((item) => {
        if (isFunction(item.typeFn)) {
          // Execute type function eagerly to update the type options object (before "clone" operation)
          // when the passed function (e.g., @Field(() => Type)) lazily returns an array.
          item.typeFn();
        }

        Field(item.typeFn, { ...item.options })(
          OmitObjectTypeClass.prototype,
          item.name,
        );
        applyFieldDecorators(OmitObjectTypeClass, item);
      });
  }
  applyFields(fields);

  // Register a refresh hook to update the fields when the serialized metadata
  // is loaded from file.
  MetadataLoader.addRefreshHook(() => {
    const { fields: items } = getFieldsAndDecoratorForType(basicTypeClassRef, {
      overrideFields: true,
    });
    applyFields(items);
  });

  return OmitObjectTypeClass as Type<
    OmitDecimalProperty<PickBasicTypeProperty<T>>
  >;
};
