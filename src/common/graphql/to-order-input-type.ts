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

import { MetaEntity } from '../dao/meta.entity';
import { NodeOrderEnum } from './node-order.enum';
import { NodeOrderInput } from './node-order.input';
import { OmitObjectType } from './omit-object-type';

export function ToOrderInputType<T extends MetaEntity>(
  classRef: Type<T>,
  decorator: ClassDecoratorFactory = InputType,
) {
  const omitObjectTypeClassRef = OmitObjectType(classRef);
  const keys = ['id', 'createdUserId', 'updatedUserId', 'deletedUserId'];
  const { fields } = getFieldsAndDecoratorForType(omitObjectTypeClassRef);

  const isInheritedPredicate = (propertyKey: string) =>
    !keys.includes(propertyKey);

  @decorator({ isAbstract: true })
  abstract class OrderInputType extends NodeOrderInput {
    constructor() {
      super();
      inheritPropertyInitializers(
        this,
        omitObjectTypeClassRef,
        isInheritedPredicate,
      );
    }
  }

  inheritValidationMetadata(
    omitObjectTypeClassRef,
    OrderInputType,
    isInheritedPredicate,
  );
  inheritTransformationMetadata(
    omitObjectTypeClassRef,
    OrderInputType,
    isInheritedPredicate,
  );

  function applyFields(items: PropertyMetadata[]) {
    items
      .filter((item) => !keys.includes(item.name))
      .forEach((item) => {
        if (isFunction(item.typeFn)) {
          // Execute type function eagerly to update the type options object (before "clone" operation)
          // when the passed function (e.g., @Field(() => Type)) lazily returns an array.
          item.typeFn();
        }

        Field(() => NodeOrderEnum, {
          description: item.description,
          deprecationReason: item.deprecationReason,
          nullable: true,
        })(OrderInputType.prototype, item.name);
        applyFieldDecorators(OrderInputType, item);
      });
  }
  applyFields(fields);

  // Register a refresh hook to update the fields when the serialized metadata
  // is loaded from file.
  MetadataLoader.addRefreshHook(() => {
    const { fields: items } = getFieldsAndDecoratorForType(
      omitObjectTypeClassRef,
      {
        overrideFields: true,
      },
    );
    applyFields(items);
  });

  return OrderInputType;
}
