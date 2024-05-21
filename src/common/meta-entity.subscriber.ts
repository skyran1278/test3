import { Logger } from '@nestjs/common';
import { validate } from 'class-validator';
import { GraphQLError } from 'graphql';
import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  SoftRemoveEvent,
  UpdateEvent,
} from 'typeorm';

import { als } from '../als/als.service';
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

    await this.validate(entity);
  }

  async beforeUpdate(event: UpdateEvent<MetaEntity>) {
    const { entity } = event;
    if (!this.isMetaEntity(entity)) return;

    const user = als.get('user');
    if (user) {
      entity.updatedUserId = user.id;
    }

    await this.validate(entity);
  }

  async beforeSoftRemove(event: SoftRemoveEvent<MetaEntity>) {
    const { entity } = event;
    if (!this.isMetaEntity(entity)) return;

    const user = als.get('user');
    if (user) {
      entity.deletedUserId = user.id;

      const repo = event.manager.getRepository(event.metadata.target);
      await repo.update(
        { id: entity.id },
        repo.create({ deletedUserId: entity.deletedUserId }),
      );
    }
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
      throw new GraphQLError('Entity is not an instance of MetaEntity.');
    }

    return true;
  }

  private async validate(entity: MetaEntity) {
    if (entity.noValidate) return;

    const errors = await validate(entity);

    if (!errors.length) return;

    this.logger.verbose({
      'class-validator validation failed': { entity, errors },
    });

    throw new GraphQLError('class-validator validation failed', {
      extensions: { errors },
    });
  }
}
