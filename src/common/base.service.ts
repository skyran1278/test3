import { Logger } from '@nestjs/common';
import { Maybe } from 'graphql/jsutils/Maybe';
import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  FindOperator,
  FindOptionsOrder,
  FindOptionsRelations,
  FindOptionsWhere,
  In,
  IsNull,
  ObjectLiteral,
  Repository,
} from 'typeorm';

import { groupBy } from 'lodash';
import { MetaEntity } from './meta.entity';
import { NodePage } from './node-page.type';
import { Nullable } from './nullable.interface';
import { ServiceOptions } from './service-options.interface';

interface NodePageInput<Entity extends ObjectLiteral> {
  take?: Maybe<number>;
  skip?: Maybe<number>;
  order?: Nullable<FindOptionsOrder<Entity>>;
  where?:
    | Maybe<Nullable<FindOptionsWhere<Entity>>[]>
    | Maybe<Nullable<FindOptionsWhere<Entity>>>;
}

export abstract class BaseService<Entity extends MetaEntity> {
  readonly logger = new Logger(this.constructor.name);

  constructor(private readonly repository: Repository<Entity>) {}

  hasId(entity: Entity): boolean {
    return this.repository.hasId(entity);
  }

  /**
   * prevent repeat create entity, if entity is already exist, return it
   * because of typeorm's promise issue, repeat create entity will cause promise value gone
   * @param input
   * @returns
   */
  create(entityLikeArray: DeepPartial<Entity>[]): Entity[];
  create(entityLike: DeepPartial<Entity>): Entity;
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

  /**
   * Assigns createdUserId and updatedUserId to the given entity.
   * Recursively updates nested MetaEntity instances.
   *
   * @param metaEntities The MetaEntity instance to update.
   * @param user The user object containing the user ID.
   */
  private async setUserId(
    metaEntities: MetaEntity[],
    options: Required<ServiceOptions>,
  ) {
    const entityMap = groupBy(
      this.flatNestedEntities(metaEntities),
      'constructor.name',
    );

    for (const [constructor, entities] of Object.entries(entityMap)) {
      const repo = options.manager.getRepository<MetaEntity>(constructor);

      // Load the main set of entities based on their IDs
      const existEntities = await repo.find({
        where: { id: In(entities.map((e) => e.id)) },
      });

      const existEntityMap = new Map(existEntities.map((e) => [e.id, e]));

      for (const entity of entities) {
        const existEntity = existEntityMap.get(entity.id);
        if (existEntity) {
          entity.createdUserId = existEntity.createdUserId;
        }
        entity.createdUserId ||= options.user.id;
        entity.updatedUserId = options.user.id;
      }
    }
  }

  /**
   * Persists the provided entity or entities into the database.
   * @param input Entity or entities to be saved.
   * @param options Configuration options for the save operation.
   * @returns The saved entity or entities.
   */
  async save(
    entity: DeepPartial<Entity>,
    options: Required<ServiceOptions>,
  ): Promise<Entity>;
  async save(
    entities: DeepPartial<Entity>[],
    options: Required<ServiceOptions>,
  ): Promise<Entity[]>;
  async save(
    input: DeepPartial<Entity> | DeepPartial<Entity>[],
    options: Required<ServiceOptions>,
  ): Promise<Entity | Entity[]> {
    const repo = this.getRepo(options);

    this.logger.verbose({
      [`save ${repo.metadata.targetName}`]: input,
    });

    const inputArray = Array.isArray(input) ? input : [input];
    if (inputArray.length === 0) {
      return [];
    }
    const entities = this.create(inputArray);

    await this.setUserId(entities, options);
    await repo.save(entities);

    if (Array.isArray(input)) {
      return entities;
    }
    return entities[0];
  }

  findOne(
    options: FindOneOptions<Entity>,
    serviceOptions?: Pick<ServiceOptions, 'manager'>,
  ): Promise<Entity | null> {
    const repo = this.getRepo(serviceOptions);
    return repo.findOne(options);
  }

  findOneBy(
    where: FindOptionsWhere<Entity>[] | FindOptionsWhere<Entity>,
    serviceOptions?: Pick<ServiceOptions, 'manager'>,
  ): Promise<Entity | null> {
    const repo = this.getRepo(serviceOptions);
    return repo.findOneBy(where);
  }

  findOneOrFail(
    options: FindOneOptions<Entity>,
    serviceOptions?: Pick<ServiceOptions, 'manager'>,
  ): Promise<Entity> {
    const repo = this.getRepo(serviceOptions);
    return repo.findOneOrFail(options);
  }

  findOneByOrFail(
    where: FindOptionsWhere<Entity>[] | FindOptionsWhere<Entity>,
    serviceOptions?: Pick<ServiceOptions, 'manager'>,
  ): Promise<Entity> {
    const repo = this.getRepo(serviceOptions);
    return repo.findOneByOrFail(where);
  }

  async find(
    options: FindManyOptions<Entity>,
    serviceOptions?: Pick<ServiceOptions, 'manager'>,
  ): Promise<Entity[]> {
    const repo = this.getRepo(serviceOptions);
    return repo.find(options);
  }

  async findBy(
    where: FindOptionsWhere<Entity>[] | FindOptionsWhere<Entity>,
    serviceOptions?: Pick<ServiceOptions, 'manager'>,
  ): Promise<Entity[]> {
    const repo = this.getRepo(serviceOptions);
    return repo.findBy(where);
  }

  softRemove(entities: Entity[], options: ServiceOptions): Promise<Entity[]>;
  softRemove(entity: Entity, options: ServiceOptions): Promise<Entity>;
  softRemove(
    input: Entity | Entity[],
    options: ServiceOptions,
  ): Promise<Entity | Entity[]> {
    this.logger.verbose({
      [`softRemove ${this.repository.metadata.targetName}`]: input,
    });

    const repo = this.getRepo(options);
    if (Array.isArray(input)) {
      return repo.softRemove(input);
    }
    return repo.softRemove(input);
  }

  remove(
    entities: Entity[],
    options: Pick<ServiceOptions, 'manager'>,
  ): Promise<Entity[]>;
  remove(
    entity: Entity,
    options: Pick<ServiceOptions, 'manager'>,
  ): Promise<Entity>;
  remove(
    input: Entity | Entity[],
    options: Pick<ServiceOptions, 'manager'>,
  ): Promise<Entity | Entity[]> {
    this.logger.verbose({
      [`remove ${this.repository.metadata.targetName}`]: input,
    });

    const repo = this.getRepo(options);
    if (Array.isArray(input)) {
      return repo.remove(input);
    }
    return repo.remove(input);
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
    options?: NodePageInput<Entity>,
    serviceOptions?: Partial<ServiceOptions>,
  ): Promise<NodePage<Entity>> {
    const repo = this.getRepo(serviceOptions);

    // transform null properties to undefined
    const take = options?.take ?? undefined;
    const skip = options?.skip ?? undefined;
    const order = options?.order ? this.omitNullFields(options.order) : {};
    const where = options?.where ? this.transformNullFields(options.where) : [];

    const relations = this.getRelationsByWhereAndOrder(
      Array.isArray(where) ? [...where, order] : [where, order],
    );

    this.logger.verbose({
      [`page ${repo.metadata.targetName}`]: {
        take,
        skip,
        order,
        whereInput: options?.where,
        where,
        relations,
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

  private getRepo(options?: Partial<ServiceOptions>) {
    const repo = options?.manager
      ? options.manager.getRepository(this.repository.target)
      : this.repository;
    return repo;
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
