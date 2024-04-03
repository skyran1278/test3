import { Logger } from '@nestjs/common';
import { Maybe } from 'graphql/jsutils/Maybe';
import {
  DeepPartial,
  FindOperator,
  FindOptionsOrder,
  FindOptionsRelations,
  FindOptionsWhere,
  IsNull,
  ObjectLiteral,
  Repository,
} from 'typeorm';

import { MetaEntity } from './meta.entity';
import { NodePage } from './node-page.type';
import { Nullable } from './nullable.interface';

interface NodePageInput<Entity extends ObjectLiteral> {
  take?: Maybe<number>;
  skip?: Maybe<number>;
  order?: Nullable<FindOptionsOrder<Entity>>;
  where?:
    | Maybe<Nullable<FindOptionsWhere<Entity>>[]>
    | Maybe<Nullable<FindOptionsWhere<Entity>>>;
}

export abstract class BaseService<
  Entity extends MetaEntity,
> extends Repository<Entity> {
  readonly logger = new Logger(this.constructor.name);

  constructor(private readonly repository: Repository<Entity>) {
    super(repository.target, repository.manager);
  }

  /**
   * prevent repeat create entity, if entity is already exist, return it
   * because of typeorm's promise issue, repeat create entity will cause promise value gone
   * @param input
   * @returns
   */
  create(entityLikeArray: DeepPartial<Entity>[]): Entity[];
  create(entityLike?: DeepPartial<Entity>): Entity;
  create(
    input?: DeepPartial<Entity> | DeepPartial<Entity>[],
  ): Entity | Entity[] {
    if (!input) {
      return this.repository.create();
    }
    if (Array.isArray(input)) {
      return input.every((item) => item instanceof MetaEntity)
        ? (input as Entity[])
        : this.repository.create(input);
    }
    return input instanceof MetaEntity ? input : this.repository.create(input);
  }

  /**
   * Recursively loads all related entities for the given MetaEntity instances.
   * @param entities
   * @returns
   */
  private flatNestedEntities(entities: MetaEntity[]): MetaEntity[] {
    return entities.flatMap((entity) => {
      // Extract and flatten all nested MetaEntity instances from the current entity
      const nestedEntities = Object.values(entity)
        .flatMap(
          (value) => (Array.isArray(value) ? value : [value]) as unknown[],
        )
        .filter((item): item is MetaEntity => item instanceof MetaEntity);

      // Recursively flatten nested entities and include the current level entities
      return [entity, ...this.flatNestedEntities(nestedEntities)];
    });
  }

  // /**
  //  * Assigns createdUserId and updatedUserId to the given entity.
  //  * Recursively updates nested MetaEntity instances.
  //  *
  //  * @param metaEntities The MetaEntity instance to update.
  //  * @param user The user object containing the user ID.
  //  */
  // private async setUserId(
  //   metaEntities: MetaEntity[],
  // ) {
  //   const entityMap = groupBy(
  //     this.flatNestedEntities(metaEntities),
  //     'constructor.name',
  //   );

  //   for (const [constructor, entities] of Object.entries(entityMap)) {
  //     const repo = this.manager.getRepository<MetaEntity>(constructor);

  //     // Load the main set of entities based on their IDs
  //     let existEntityMap = new Map<string, MetaEntity>();
  //     const entityIds = entities.map((e) => e.id).filter((id) => id != null);
  //     if (entityIds.length > 0) {
  //       const existEntities = await repo.find({
  //         where: { id: In(entityIds) },
  //       });

  //       existEntityMap = new Map(existEntities.map((e) => [e.id, e]));
  //     }

  //     for (const entity of entities) {
  //       const existEntity = existEntityMap.get(entity.id);
  //       if (existEntity) {
  //         entity.createdUserId = existEntity.createdUserId;
  //       }
  //       entity.createdUserId ||= options.user.id;
  //       entity.updatedUserId = options.user.id;
  //     }
  //   }
  // }

  /**
   * Persists the provided entity or entities into the database.
   * @param input Entity or entities to be saved.
   * @param options Configuration options for the save operation.
   * @returns The saved entity or entities.
   */
  async save(entity: DeepPartial<Entity>): Promise<Entity>;
  async save(entities: DeepPartial<Entity>[]): Promise<Entity[]>;
  async save(
    input: DeepPartial<Entity> | DeepPartial<Entity>[],
  ): Promise<Entity | Entity[]> {
    this.logger.verbose({
      save: this.metadata.targetName,
      input,
    });

    if (Array.isArray(input)) {
      const entities = this.create(input);
      return this.repository.save(entities);
    }

    const entity = this.create(input);
    return this.repository.save(entity);
  }

  async findNodePage(
    options?: NodePageInput<Entity>,
  ): Promise<NodePage<Entity>> {
    // transform null properties to undefined
    const take = options?.take ?? undefined;
    const skip = options?.skip ?? undefined;
    const order = options?.order ? this.omitNullFields(options.order) : {};
    const where = options?.where ? this.transformNullFields(options.where) : [];

    const relations = this.getRelationsByWhereAndOrder(
      Array.isArray(where) ? [...where, order] : [where, order],
    );

    this.logger.verbose({
      [`page ${this.metadata.targetName}`]: {
        take,
        skip,
        order,
        whereInput: options?.where,
        where,
        relations,
      },
    });

    const [nodes, total] = await this.findAndCount({
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

  private notFindOperatorObject(obj: unknown): obj is Record<string, unknown> {
    return (
      typeof obj === 'object' && obj !== null && !(obj instanceof FindOperator)
    );
  }

  private omitNullFields<T extends Record<string, unknown>>(
    nullableRecord: Nullable<T>,
  ): Partial<T> {
    const result: Partial<T> = {};

    Object.keys(nullableRecord).forEach((key) => {
      const value = nullableRecord[key];

      if (value !== null) {
        if (this.notFindOperatorObject(value)) {
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
      } else if (this.notFindOperatorObject(value)) {
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
      if (this.notFindOperatorObject(value)) {
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
}
