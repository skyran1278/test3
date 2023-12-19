import { Injectable, Logger } from '@nestjs/common';
import { Maybe } from 'graphql/jsutils/Maybe';
import {
  DeepPartial,
  FindOptionsOrder,
  FindOptionsRelations,
  FindOptionsWhere,
  IsNull,
  ObjectLiteral,
  Repository,
} from 'typeorm';

import { MetaEntity } from './meta.entity';
import { NodePage } from './query/node-page.type';

export type NullableProperty<Property> = Property extends Record<
  string,
  unknown
>
  ? Nullable<Property>
  : Property | null;

export type Nullable<T> = {
  [P in keyof T]?: NullableProperty<T[P]>;
};

interface NodePageInput<Entity extends ObjectLiteral> {
  take?: Maybe<number>;
  skip?: Maybe<number>;
  order?: Nullable<FindOptionsOrder<Entity>>;
  where?:
    | Nullable<FindOptionsWhere<Entity>>[]
    | Nullable<FindOptionsWhere<Entity>>;
}

@Injectable()
export class RepoProxy<Entity extends MetaEntity> {
  private readonly logger = new Logger(this.constructor.name);

  async save(
    repo: Repository<Entity>,
    entity: DeepPartial<Entity>,
  ): Promise<Entity>;
  async save(
    repo: Repository<Entity>,
    entities: DeepPartial<Entity>[],
  ): Promise<Entity[]>;
  async save(
    repo: Repository<Entity>,
    input: DeepPartial<Entity> | DeepPartial<Entity>[],
  ): Promise<Entity | Entity[]> {
    this.logger.debug({
      [`create ${repo.metadata.targetName}`]: { input },
    });

    if (Array.isArray(input)) {
      const dao = input.every((item) => item instanceof MetaEntity)
        ? input
        : repo.create(input);
      return repo.save(dao);
    }

    const dao = input instanceof MetaEntity ? input : repo.create(input);
    return repo.save(dao);
  }

  // async updateOne(
  //   manager: EntityManager,
  //   entity: EntitySchema<Entity>,
  //   id: string,
  //   input: DeepPartial<Entity>,
  //   user: UserType,
  // ): Promise<Entity> {
  //   const entity = await repo.preload({
  //     ...input,
  //     id,
  //   });
  //   if (!entity) {
  //     throw new DaoIdNotFoundError(Agent, id);
  //   }
  //   entity.updatedBy = user.id;

  //   return repo.save(entity);
  // }

  async findNodePage(
    repo: Repository<Entity>,
    options?: NodePageInput<Entity>,
  ): Promise<NodePage<Entity>> {
    // transform null properties to undefined
    const take = options?.take ?? undefined;
    const skip = options?.skip ?? undefined;
    const order = options?.order ? this.omitNullFields(options.order) : {};
    const where = options?.where ? this.transformNullFields(options.where) : [];

    const relations2 = this.getRelationsByWhereAndOrder(
      Array.isArray(where) ? [...where, order] : [where, order],
    );

    // convert where to relations
    const whereToRelations = options?.where;
    const relations = this.extractRelations(
      whereToRelations as Record<string, unknown>,
    );

    this.logger.debug({
      [`page ${repo.metadata.targetName}`]: {
        take,
        skip,
        order,
        where,
        relations,
        relations2,
      },
    });

    const [nodes, total] = await repo.findAndCount({
      skip,
      /** @see https://github.com/typeorm/typeorm/issues/4883 */
      take: take === 0 ? 0.1 : take,
      order,
      where,
      relations: relations as FindOptionsRelations<Entity>,
    });

    return { take, skip, nodes, total };
  }

  private isPlainObject(obj: unknown): obj is Record<string, unknown> {
    return (
      typeof obj === 'object' && obj !== null && obj.constructor === Object
    );
  }

  private omitNullFields<T extends Record<string, unknown>>(
    nullableRecord: Nullable<T>,
  ): Partial<T> {
    const result: Partial<T> = {};

    Object.keys(nullableRecord).forEach((key) => {
      const value = nullableRecord[key];

      if (value !== null) {
        if (this.isPlainObject(value)) {
          // Recursively omit null fields in nested plain objects
          result[key as keyof T] = this.omitNullFields(value) as T[keyof T];
        } else {
          // Directly assign non-null values (including Date objects and other non-plain objects)
          result[key as keyof T] = value as T[keyof T];
        }
      }
    });

    return result;
  }

  private transformNullFields<T extends Record<string, unknown>>(
    nullableWhere: Nullable<T>[] | Nullable<T>,
  ): T[] | T {
    if (Array.isArray(nullableWhere)) {
      return nullableWhere.map((item) => this.nullToIsNull(item));
    } else {
      return this.nullToIsNull(nullableWhere);
    }
  }

  private nullToIsNull<T extends Record<string, unknown>>(
    nullableRecord: Nullable<T>,
  ): T {
    const result: T = {} as T;

    Object.keys(nullableRecord).forEach((key: keyof T) => {
      const value = nullableRecord[key];

      if (value === null) {
        result[key] = IsNull() as T[keyof T];
      } else if (Array.isArray(value)) {
        result[key] = this.transformNullFields(value) as T[keyof T];
      } else if (this.isPlainObject(value)) {
        result[key] = this.nullToIsNull(value) as T[keyof T];
      } else {
        result[key] = value as T[keyof T];
      }
    });

    return result;
  }

  private getRelationsByWhereAndOrder(
    records: Record<string, unknown>[],
  ): Record<string, unknown> {
    const relations: Record<string, unknown> = {};

    for (const record of records) {
      const recordRelations = this.toTruthyObject(record);
      if (this.isPlainObject(recordRelations)) {
        this.unionRelations(relations, recordRelations);
      }
    }

    return relations;
  }

  private unionRelations(
    relations: Record<string, unknown>,
    recordRelations: Record<string, unknown>,
  ) {
    Object.keys(recordRelations).forEach((key) => {
      const value = relations[key];
      const recordValue = recordRelations[key];
      if (this.isPlainObject(value) && this.isPlainObject(recordValue)) {
        this.unionRelations(value, recordValue);
      } else if (this.isPlainObject(recordValue)) {
        relations[key] = recordValue;
      } else if (this.isPlainObject(value)) {
        relations[key] = value;
      } else {
        relations[key] = true;
      }
    });
  }

  private toTruthyObject(
    record: Record<string, unknown>,
  ): Record<string, unknown> | boolean {
    const truthyObject: Record<string, unknown> = {};

    let hasPlainObject = false;
    let hasValue = false;

    Object.keys(record).forEach((key) => {
      const value = record[key];
      if (this.isPlainObject(value)) {
        const shouldJoin = this.toTruthyObject(value);
        if (shouldJoin) {
          truthyObject[key] = shouldJoin;
          hasPlainObject = true;
        }
      } else if (value !== undefined) {
        hasValue = true;
      }
    });

    if (hasPlainObject) {
      return truthyObject;
    }
    return hasValue;
  }

  private extractRelations(
    where: Record<string, unknown>,
  ): Record<string, unknown> {
    let relations: Record<string, unknown> = {};

    const checkAndExtract = (
      obj: Record<string, unknown>,
    ): boolean | Record<string, unknown> => {
      let hasValue = false;
      const tempObj: Record<string, unknown> = {};

      for (const key in obj) {
        const value = obj[key];

        if (value !== undefined && value !== null) {
          if (this.isPlainObject(value)) {
            const isChildHasValue = checkAndExtract(value);

            if (isChildHasValue && typeof isChildHasValue === 'object') {
              tempObj[key] = isChildHasValue;
            } else if (isChildHasValue && typeof isChildHasValue !== 'object') {
              tempObj[key] = true;
            }
          } else {
            hasValue = true;
          }
        } else {
          hasValue = false;
        }
      }

      relations = { ...tempObj };
      return hasValue || tempObj;
    };

    checkAndExtract(where);

    return relations;
  }
}
