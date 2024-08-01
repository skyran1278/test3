import assert from 'assert';

import { MongoQuery } from '@casl/ability';
import { Logger } from '@nestjs/common';
import { Maybe } from 'graphql/jsutils/Maybe';
import {
  DeepPartial,
  FindOperator,
  FindOptionsOrder,
  FindOptionsRelations,
  FindOptionsWhere,
  In,
  IsNull,
  LessThan,
  LessThanOrEqual,
  MoreThan,
  MoreThanOrEqual,
  Not,
  ObjectLiteral,
  Repository,
  TreeRepository,
} from 'typeorm';

import { alsService } from '../als/als.service';
import { PermissionActionEnum } from '../permission/permission-action.enum';
import { MetaEntity } from './meta.entity';
import { NodePage } from './node-page.type';
import { DeepNullable } from './nullable.interface';

type WhereInput<Entity extends ObjectLiteral> = DeepNullable<
  FindOptionsWhere<Entity>
> & {
  toFindOptionsWhere: () => DeepNullable<FindOptionsWhere<Entity>>;
};

interface NodePageInput<Entity extends ObjectLiteral> {
  take?: Maybe<number>;
  skip?: Maybe<number>;
  order?: DeepNullable<FindOptionsOrder<Entity>>;
  where?: Maybe<WhereInput<Entity>[]> | Maybe<WhereInput<Entity>>;
}

interface PermissionWhereClause<Entity extends ObjectLiteral> {
  where: FindOptionsWhere<Entity>[];
  isForbidden: boolean;
}

export abstract class BaseRepository<
  Entity extends MetaEntity,
> extends TreeRepository<Entity> {
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

  /**
   * Finds and returns a paginated list of nodes based on the provided options.
   * @param options - The options for pagination and filtering.
   * @returns A promise that resolves to a `NodePage` object containing the paginated nodes.
   */
  async findNodePage(
    options?: NodePageInput<Entity>,
  ): Promise<NodePage<Entity>> {
    // transform null properties to undefined
    const take = options?.take ?? undefined;
    const skip = options?.skip ?? undefined;
    const order = options?.order ? this.omitNullFields(options.order) : {};

    const { where, isForbidden } = this.includePermissionWhereClause(
      options?.where,
    );

    if (isForbidden) {
      this.logger.verbose(
        `No rules found for the \`${this.metadata.targetName}\` entity, returning an empty page.`,
      );
      return { take, skip, nodes: [], total: 0 };
    }

    const relations = this.getRelationsByWhereAndOrder([
      ...where,
      order,
    ]) as FindOptionsRelations<Entity>;

    this.logger.verbose({
      [`${this.metadata.targetName}Page`]: {
        take,
        skip,
        order,
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
      relations,
    });

    return { take, skip, nodes, total };
  }

  private includePermissionWhereClause(
    whereInput: NodePageInput<Entity>['where'],
  ): PermissionWhereClause<Entity> {
    const inputWhereArray = Array.isArray(whereInput)
      ? whereInput
      : whereInput
        ? [whereInput]
        : [];

    const toFindOptionsWhereArray = inputWhereArray.map((inputWhere) =>
      inputWhere.toFindOptionsWhere(),
    );
    const whereArray = this.transformNullFields(toFindOptionsWhereArray);

    const ruleWhereArray = this.getPermissionRuleWhereArray();

    const isForbidden = ruleWhereArray.length === 0;

    const mergedRuleWhereArray =
      whereArray.length === 0
        ? ruleWhereArray
        : whereArray.flatMap((where) =>
            ruleWhereArray.map((rule) => ({
              ...where,
              ...rule,
            })),
          );

    this.logger.verbose({
      [`${this.metadata.targetName}Page['transformWhere']`]: {
        whereInput,
        toFindOptionsWhereArray,
        whereArray,
        mergedRuleWhereArray,
      },
    });

    return { where: mergedRuleWhereArray, isForbidden };
  }

  private getPermissionRuleWhereArray(): FindOptionsWhere<Entity>[] {
    const rules = alsService.getOrFail('rules');

    const narrowDownRules = rules
      .filter(
        (rule) =>
          rule.subject === this.metadata.targetName || rule.subject === 'all',
      )
      .filter(
        (rule) =>
          rule.action === PermissionActionEnum.READ ||
          rule.action === PermissionActionEnum.MANAGE,
      );

    return narrowDownRules.map((rule) => {
      return this.mongoQueryLanguageToTypeORMFindOptionsWhere(rule.conditions);
    });
  }

  /**
   * Transforms the given Mongo query language conditions to TypeORM FindOptionsWhere.
   *
   * Only supports $in, $ne, $gt, $gte, $lt, and $lte operators.
   * Only supports one-level nested objects.
   * Note: Using nested objects may cause performance issues while querying.
   *
   * @param conditions Mongo query language conditions.
   * @returns TypeORM FindOptionsWhere conditions.
   */
  private mongoQueryLanguageToTypeORMFindOptionsWhere(
    conditions: MongoQuery | undefined,
  ): FindOptionsWhere<Entity> {
    if (!conditions) return {};

    type Where = FindOptionsWhere<Entity>;
    const where: Where = {};

    for (const [key, value] of Object.entries(conditions)) {
      let whereValue = value;

      if (this.isPlainObject(value)) {
        switch (true) {
          case '$in' in value:
            assert(Array.isArray(value.$in), 'Value of $in should be an array');
            whereValue = In(value.$in);
            break;
          case '$ne' in value:
            whereValue = Not(value.$ne);
            break;
          case '$gt' in value:
            whereValue = MoreThan(value.$gt);
            break;
          case '$gte' in value:
            whereValue = MoreThanOrEqual(value.$gte);
            break;
          case '$lt' in value:
            whereValue = LessThan(value.$lt);
            break;
          case '$lte' in value:
            whereValue = LessThanOrEqual(value.$lte);
            break;
          default:
            throw new Error(
              `Unsupported operator in query language: ${JSON.stringify(value)}`,
            );
        }
      }

      where[key as keyof Where] = whereValue as Where[keyof Where];
    }

    return where;
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
    nullableRecord: DeepNullable<T>,
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
    nullableWhere: DeepNullable<T>[],
  ): T[];
  private transformNullFields<T extends Record<string, unknown>>(
    nullableWhere: DeepNullable<T>,
  ): T;
  private transformNullFields<T extends Record<string, unknown>>(
    nullableWhere: DeepNullable<T>[] | DeepNullable<T>,
  ): T[] | T {
    if (Array.isArray(nullableWhere)) {
      return nullableWhere.map((item) => this.nullToIsNull(item));
    } else {
      return this.nullToIsNull(nullableWhere);
    }
  }

  private nullToIsNull<T extends Record<string, unknown>>(
    nullableRecord: DeepNullable<T>,
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
