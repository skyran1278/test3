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

export function ToOrderInputType<T extends MetaEntity>(
  classRef: Type<T>,
  decorator: ClassDecoratorFactory = InputType,
) {
  const keys = ['id', 'createdUserId', 'updatedUserId', 'deletedUserId'];
  const { fields, decoratorFactory } = getFieldsAndDecoratorForType(classRef);

  const isInheritedPredicate = (propertyKey: string) =>
    !keys.includes(propertyKey);
  // eslint-disable-next-line @typescript-eslint/no-extraneous-class
  abstract class OrderInputType extends NodeOrderInput {
    constructor() {
      super();
      inheritPropertyInitializers(this, classRef, isInheritedPredicate);
    }
  }
  decoratorFactory({ isAbstract: true })(OrderInputType);
  if (decorator) {
    decorator({ isAbstract: true })(OrderInputType);
  } else {
    decoratorFactory({ isAbstract: true })(OrderInputType);
  }

  inheritValidationMetadata(classRef, OrderInputType, isInheritedPredicate);
  inheritTransformationMetadata(classRef, OrderInputType, isInheritedPredicate);

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
    const { fields: items } = getFieldsAndDecoratorForType(classRef, {
      overrideFields: true,
    });
    applyFields(items);
  });

  return OrderInputType;
}
