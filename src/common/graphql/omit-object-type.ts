import { Type } from '@nestjs/common';
import { isFunction } from '@nestjs/common/utils/shared.utils';
import { Field, InputType } from '@nestjs/graphql';
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

export function OmitObjectType<T>(
  classRef: Type<T>,
  decorator: ClassDecoratorFactory = InputType,
) {
  const { fields, decoratorFactory } = getFieldsAndDecoratorForType(classRef);

  // eslint-disable-next-line @typescript-eslint/no-extraneous-class
  class OmitObjectTypeClass {
    constructor() {
      inheritPropertyInitializers(this, classRef);
    }
  }
  decoratorFactory({ isAbstract: true })(OmitObjectTypeClass);
  if (decorator) {
    decorator({ isAbstract: true })(OmitObjectTypeClass);
  } else {
    decoratorFactory({ isAbstract: true })(OmitObjectTypeClass);
  }

  inheritValidationMetadata(classRef, OmitObjectTypeClass);
  inheritTransformationMetadata(classRef, OmitObjectTypeClass);

  function applyFields(items: PropertyMetadata[]) {
    items
      .filter((item) => {
        if (isFunction(item.typeFn) && item.typeFn() instanceof Function)
          return false;
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
    const { fields: items } = getFieldsAndDecoratorForType(classRef, {
      overrideFields: true,
    });
    applyFields(items);
  });

  return OmitObjectTypeClass;
}
