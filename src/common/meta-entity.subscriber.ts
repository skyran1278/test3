import { ForbiddenException, Logger, NotFoundException } from '@nestjs/common';
import { validate } from 'class-validator';
import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  RecoverEvent,
  RemoveEvent,
  SoftRemoveEvent,
  TransactionCommitEvent,
  UpdateEvent,
} from 'typeorm';

import { als } from '../als/als.service';
import { AuditActionEnum } from '../audit-log/audit-action.enum';
import { AuditLog } from '../audit-log/audit-log.entity';
import { ValidatorError } from '../error/validator.error';
import { PermissionActionEnum } from '../permission/permission-action.enum';
import { MetaEntity } from './meta.entity';

@EventSubscriber()
export class MetaEntitySubscriber
  implements EntitySubscriberInterface<MetaEntity>
{
  private readonly logger = new Logger(this.constructor.name);

  listenTo = () => MetaEntity;

  async beforeInsert(event: InsertEvent<MetaEntity>) {
    const { entity } = event;
    if (!this.isMetaEntity(entity)) return;

    const user = als.get('user');
    if (user) {
      entity.createdUserId = user.id;
      entity.updatedUserId = user.id;
    }

    const ability = als.get('ability');
    if (ability?.cannot(PermissionActionEnum.CREATE, entity)) {
      throw new ForbiddenException();
    }

    await this.validate(entity);
  }

  async beforeUpdate(event: UpdateEvent<MetaEntity>) {
    const { entity } = event;
    if (!this.isMetaEntity(entity)) return;

    const user = als.get('user');
    if (user) {
      entity.updatedUserId = user.id;
    }

    const ability = als.get('ability');
    if (ability?.cannot(PermissionActionEnum.UPDATE, entity)) {
      throw new ForbiddenException();
    }

    await this.validate(entity);
  }

  async beforeSoftRemove(event: SoftRemoveEvent<MetaEntity>) {
    const { entity } = event;
    if (!this.isMetaEntity(entity)) return;

    const user = als.get('user');
    if (user) {
      entity.deletedUserId = user.id;

      const ability = als.get('ability');
      if (ability?.cannot(PermissionActionEnum.DELETE, entity)) {
        throw new ForbiddenException();
      }

      const repo = event.manager.getRepository(event.metadata.target);
      await repo.update(
        { id: entity.id },
        repo.create({ deletedUserId: entity.deletedUserId }),
      );
    }
  }

  beforeRemove(event: RemoveEvent<MetaEntity>) {
    const { entity } = event;
    if (!this.isMetaEntity(entity)) return;

    const ability = als.get('ability');
    if (ability?.cannot(PermissionActionEnum.DELETE, entity)) {
      throw new ForbiddenException();
    }
  }

  beforeTransactionCommit(event: TransactionCommitEvent) {
    const auditLogs = als.get('auditLogs') ?? [];
    if (auditLogs.length === 0) return;

    const auditLogRepo = event.manager.getRepository(AuditLog);
    return auditLogRepo.save(auditLogs);
  }

  afterInsert(event: InsertEvent<MetaEntity>) {
    const { entity } = event;
    this.addAuditLog(event, AuditActionEnum.INSERT, entity.id, entity);
  }

  afterUpdate(event: UpdateEvent<MetaEntity>) {
    const previousEntity = event.databaseEntity;
    const newEntity = event.entity;

    this.addAuditLog(event, AuditActionEnum.UPDATE, previousEntity.id, {
      previousEntity,
      newEntity,
      updatedColumns: event.updatedColumns.map((column) => column.propertyName),
    });
  }

  afterSoftRemove(event: SoftRemoveEvent<MetaEntity>) {
    this.removeKindEventAuditLog(event, AuditActionEnum.SOFT_REMOVE);
  }

  afterRemove(event: RemoveEvent<MetaEntity>) {
    this.removeKindEventAuditLog(event, AuditActionEnum.REMOVE);
  }

  afterRecover(event: RecoverEvent<MetaEntity>) {
    this.removeKindEventAuditLog(event, AuditActionEnum.RECOVER);
  }

  private removeKindEventAuditLog(
    event:
      | RemoveEvent<MetaEntity>
      | SoftRemoveEvent<MetaEntity>
      | RecoverEvent<MetaEntity>,
    auditAction: AuditActionEnum,
  ) {
    const entity = event.entity;
    const entityId = event.entityId as string | string[] | undefined;

    if (!entityId) {
      this.logger.error({
        message: 'Entity is not found in the event.',
        detail: { entityId, entity, auditAction },
      });
      throw new NotFoundException('Entity is not found in the event.');
    }

    if (entityId instanceof Array) {
      return entityId.forEach((id) => {
        this.addAuditLog(event, auditAction, id, entity ?? {});
      });
    }

    this.addAuditLog(event, auditAction, entityId, entity ?? {});
  }

  private addAuditLog(
    event:
      | InsertEvent<MetaEntity>
      | UpdateEvent<MetaEntity>
      | SoftRemoveEvent<MetaEntity>
      | RemoveEvent<MetaEntity>
      | RecoverEvent<MetaEntity>,
    auditAction: AuditActionEnum,
    entityId: string,
    entityDetail: object,
  ) {
    const requestId = als.get('requestId');
    const user = als.get('user');
    const input = als.get('input');
    const auditLogs = als.get('auditLogs') ?? [];

    const auditLogRepo = event.manager.getRepository(AuditLog);

    const auditLog = auditLogRepo.create({
      requestId,
      userId: user.id,
      input,
      tableName: event.metadata.tableName,
      action: auditAction,
      entityId: entityId,
      entityDetail,
    });

    als.set('auditLogs', [...auditLogs, auditLog]);
  }

  private isMetaEntity(entity: unknown): entity is MetaEntity {
    /**
     * @description
     * - beforeInsert
     *   - event.entity may be Entity | ObjectLiteral | undefined
     *   - for example, if using upsert, event.entity is ObjectLiteral, typeorm type is incorrect
     * - beforeUpdate
     *   - event.entity may be ObjectLiteral | undefined
     *   - event.databaseEntity is Entity
     */

    if (
      !entity ||
      (entity as { mpath: unknown })?.mpath instanceof Function ||
      typeof (entity as { mpath: unknown })?.mpath === 'string'
    ) {
      this.logger.verbose({
        message: 'Entity is not an instance of MetaEntity.',
        details: {
          entity,
          reasons: [
            'When a OneToManyField contains a many-sided object, it updates the many-sided relation and the updatedAt field. TypeORM fails to retrieve the many-sided object, preventing validation.',
          ],
        },
      });
      return false;
    }

    if (
      (entity as { mpath: unknown })?.mpath instanceof Function ||
      typeof (entity as { mpath: unknown })?.mpath === 'string'
    ) {
      this.logger.verbose({
        message: 'Entity is not an instance of MetaEntity.',
        details: {
          entity,
          reasons: [
            'Tree entities will update the mpath field, causing the entity to be an object literal.',
          ],
        },
      });
      return false;
    }

    if (!(entity instanceof MetaEntity)) {
      this.logger.error({
        message: 'Entity is not an instance of MetaEntity.',
        details: {
          entity,
          reasons: [
            'Passing an object literal to the repository will cause the entity to be an object literal, not an instance of MetaEntity.',
          ],
        },
      });
      throw new TypeError(
        `Entity ${JSON.stringify(entity)} is not an instance of MetaEntity.`,
      );
    }

    return true;
  }

  private async validate(entity: MetaEntity) {
    if (entity.noValidate) return;

    const errors = await validate(entity);

    if (!errors.length) return;

    this.logger.error({
      'class-validator validation failed': { entity, errors },
    });

    throw new ValidatorError(errors);
  }
}
