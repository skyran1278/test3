import { ForbiddenException, Logger, NotFoundException } from '@nestjs/common';
import { validate } from 'class-validator';
import { isObject } from 'lodash';
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

import { alsService } from '../als/als.service';
import { AuditActionEnum } from '../audit-log/audit-action.enum';
import { AuditLog } from '../audit-log/audit-log.entity';
import { ValidatorError } from '../error/validator.error';
import { PermissionActionEnum } from '../permission/permission-action.enum';
import { Permission } from '../permission/permission.entity';
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

    const user = alsService.getOrFail('user');
    entity.createdUserId = user.id;
    entity.updatedUserId = user.id;

    this.checkPermission(PermissionActionEnum.CREATE, entity);

    await this.validate(entity);
  }

  async beforeUpdate(event: UpdateEvent<MetaEntity>) {
    const { entity } = event;
    if (!this.isMetaEntity(entity)) return;

    const user = alsService.getOrFail('user');
    entity.updatedUserId = user.id;

    this.checkPermission(PermissionActionEnum.UPDATE, entity);

    await this.validate(entity);
  }

  async beforeSoftRemove(event: SoftRemoveEvent<MetaEntity>) {
    const { entity } = event;
    if (!this.isMetaEntity(entity)) return;

    this.checkPermission(PermissionActionEnum.DELETE, entity);

    const user = alsService.getOrFail('user');
    entity.deletedUserId = user.id;

    await this.updateDeletedUserId(event, user.id);
  }

  beforeRemove(event: RemoveEvent<MetaEntity>) {
    const { entity } = event;
    if (!this.isMetaEntity(entity)) return;

    this.checkPermission(PermissionActionEnum.DELETE, entity);
  }

  beforeTransactionCommit(event: TransactionCommitEvent) {
    if (!alsService.isActive()) return;

    const auditLogs = alsService.get('auditLogs') ?? [];
    if (auditLogs.length === 0) return;

    const auditLogRepo = event.manager.getRepository(AuditLog);
    return auditLogRepo.save(auditLogs);
  }

  afterLoad(entity: MetaEntity) {
    // Since we need to load the permission entity to check permissions, we should skip the permission check for the permission entity itself.
    if (entity instanceof Permission) {
      return;
    }

    if (
      alsService.has('noAuthentication') ||
      alsService.has('noAuthorization')
    ) {
      return this.logger.debug(
        'Skip the permission check for the afterLoad hook when noAuthentication or noAuthorization is present in ALS.',
      );
    }

    this.checkPermission(PermissionActionEnum.READ, entity);
  }

  afterInsert(event: InsertEvent<MetaEntity>) {
    const { entity } = event;
    this.addAuditLog(event, AuditActionEnum.INSERT, entity.id, entity);
  }

  afterUpdate(event: UpdateEvent<MetaEntity>) {
    const previousEntity = event.databaseEntity;
    const newEntity = event.entity;

    if (this.isUpdateMpath(event)) return;

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

  private updateDeletedUserId(
    event: SoftRemoveEvent<MetaEntity>,
    deletedUserId: string,
  ) {
    const { entity } = event;
    if (!this.isMetaEntity(entity)) return;

    const repo = event.manager.getRepository(event.metadata.target);
    return repo.update({ id: entity.id }, repo.create({ deletedUserId }));
  }

  private checkPermission(action: PermissionActionEnum, entity: MetaEntity) {
    const ability = alsService.getOrFail('ability');
    if (ability.cannot(action, entity)) {
      throw new ForbiddenException();
    }
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
    const requestId = alsService.get('requestId');
    const user = alsService.getOrFail('user');
    const input = alsService.get('input');
    const auditLogs = alsService.get('auditLogs') ?? [];

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

    alsService.set('auditLogs', [...auditLogs, auditLog]);
  }

  private isUpdateMpath(event: UpdateEvent<MetaEntity>) {
    const previousEntity = event.databaseEntity;
    const newEntity = event.entity;

    if (
      previousEntity === undefined &&
      isObject(newEntity) &&
      'mpath' in newEntity
    ) {
      return true;
    }

    return false;
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

    if (!entity) {
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
