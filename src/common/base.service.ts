import { Logger } from '@nestjs/common';
import { Maybe } from 'graphql/jsutils/Maybe';
import { User } from 'src/user/user.entity';
import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  FindOperator,
  FindOptionsOrder,
  FindOptionsRelations,
  FindOptionsWhere,
  IsNull,
  ObjectLiteral,
  Repository,
} from 'typeorm';

import { Nullable } from './interface/nullable.interface';
import { IServiceMetadata } from './interface/service-metadata.interface';
import { MetaEntity } from './meta.entity';
import { NodePage } from './query/node-page.type';

interface NodePageInput<Entity extends ObjectLiteral> {
  take?: Maybe<number>;
  skip?: Maybe<number>;
  order?: Nullable<FindOptionsOrder<Entity>>;
  where?:
    | Nullable<FindOptionsWhere<Entity>>[]
    | Nullable<FindOptionsWhere<Entity>>;
}

export abstract class BaseService<Entity extends MetaEntity> {
  private readonly logger = new Logger(this.constructor.name);

  constructor(private readonly repository: Repository<Entity>) {}

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

  async save(
    entity: DeepPartial<Entity>,
    metadata?: Partial<IServiceMetadata>,
  ): Promise<Entity>;
  async save(
    entities: DeepPartial<Entity>[],
    metadata?: Partial<IServiceMetadata>,
  ): Promise<Entity[]>;
  async save(
    input: DeepPartial<Entity> | DeepPartial<Entity>[],
    metadata?: Partial<IServiceMetadata>,
  ): Promise<Entity | Entity[]> {
    const repo = this.getRepo(metadata);

    this.logger.debug({
      [`create ${repo.metadata.targetName}`]: { input },
    });

    if (Array.isArray(input)) {
      const dao = this.create(input);
      return repo.save(dao);
    }

    const dao = this.create(input);
    return repo.save(dao);
  }

  findOne(
    options: FindOneOptions<Entity>,
    metadata?: IServiceMetadata,
  ): Promise<Entity | null> {
    const repo = this.getRepo(metadata);
    return repo.findOne(options);
  }

  findOneOrFail(
    options: FindOneOptions<Entity>,
    metadata?: IServiceMetadata,
  ): Promise<Entity> {
    const repo = this.getRepo(metadata);
    return repo.findOneOrFail(options);
  }

  findOneByOrFail(
    where: FindOptionsWhere<Entity>[] | FindOptionsWhere<Entity>,
    metadata?: IServiceMetadata,
  ): Promise<Entity> {
    const repo = this.getRepo(metadata);
    return repo.findOneByOrFail(where);
  }

  async find(
    options: FindManyOptions<Entity>,
    metadata?: IServiceMetadata,
  ): Promise<Entity[]> {
    const repo = this.getRepo(metadata);
    return repo.find(options);
  }

  softRemove(
    entities: Entity[],
    metadata?: IServiceMetadata,
  ): Promise<Entity[]>;
  softRemove(entity: Entity, metadata?: IServiceMetadata): Promise<Entity>;
  softRemove(
    input: Entity | Entity[],
    metadata?: IServiceMetadata,
  ): Promise<Entity | Entity[]> {
    this.logger.debug({
      [`softRemove ${this.repository.metadata.targetName}`]: input,
    });

    const repo = this.getRepo(metadata);
    if (Array.isArray(input)) {
      return repo.softRemove(input);
    }
    return repo.softRemove(input);
  }

  remove(entities: Entity[], metadata?: IServiceMetadata): Promise<Entity[]>;
  remove(entity: Entity, metadata?: IServiceMetadata): Promise<Entity>;
  remove(
    input: Entity | Entity[],
    metadata?: IServiceMetadata,
  ): Promise<Entity | Entity[]> {
    this.logger.debug({
      [`remove ${this.repository.metadata.targetName}`]: input,
    });

    const repo = this.getRepo(metadata);
    if (Array.isArray(input)) {
      return repo.remove(input);
    }
    return repo.remove(input);
  }

  /**
   * 比較既有 entities 的 id, 以此刪除, 更新, 新增 entities
   * @param oldEntities
   * @param newEntities
   * @param user
   * @param metadata
   * @returns
   */
  async syncEntityArray(
    oldEntities: Entity[] | undefined,
    newEntities: DeepPartial<Entity>[],
    user: User,
    metadata?: IServiceMetadata,
  ): Promise<Entity[]> {
    const repo = this.getRepo(metadata);

    const oldEntitiesMap = oldEntities
      ? new Map(oldEntities.map((entity) => [entity.id, entity]))
      : new Map<string, Entity>();

    const updateEntities: Entity[] = [];
    const createEntities: Entity[] = [];
    newEntities.forEach((entity) => {
      if (entity.id && oldEntitiesMap.get(entity.id)) {
        updateEntities.push(
          this.create({
            ...oldEntitiesMap.get(entity.id),
            ...entity,
            updatedBy: user.id,
          }),
        );
        oldEntitiesMap.delete(entity.id);
      } else {
        createEntities.push(
          this.create({
            ...entity,
            createdBy: user.id,
            updatedBy: user.id,
          }),
        );
      }
    });
    const deleteEntities = [...oldEntitiesMap.values()].map((entity) =>
      this.create({
        ...entity,
        deletedBy: user.id,
      }),
    );

    await repo.save(deleteEntities);
    await repo.softRemove(deleteEntities);
    await repo.save(updateEntities);
    await repo.save(createEntities);

    return [...updateEntities, ...createEntities];
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
    metadata?: Partial<IServiceMetadata>,
  ): Promise<NodePage<Entity>> {
    const repo = this.getRepo(metadata);

    // transform null properties to undefined
    const take = options?.take ?? undefined;
    const skip = options?.skip ?? undefined;
    const order = options?.order ? this.omitNullFields(options.order) : {};
    const where = options?.where ? this.transformNullFields(options.where) : [];

    const relations = this.getRelationsByWhereAndOrder(
      Array.isArray(where) ? [...where, order] : [where, order],
    );

    this.logger.debug({
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

  private getRepo(metadata?: Partial<IServiceMetadata>) {
    const repo = metadata?.manager
      ? metadata.manager.getRepository(this.repository.target)
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
