import { Logger } from '@nestjs/common';
import { validate } from 'class-validator';
import { GraphQLError } from 'graphql';
import { als } from 'src/als/als.module';
import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  SoftRemoveEvent,
  UpdateEvent,
} from 'typeorm';

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

    const store = als.getStore();
    if (store) {
      entity.createdUserId = store.user?.id;
      entity.updatedUserId = store.user?.id;
    }

    await this.validate(entity);
  }

  async beforeUpdate(event: UpdateEvent<MetaEntity>) {
    const { entity } = event;
    if (!this.isMetaEntity(entity)) return;

    const store = als.getStore();
    if (store) {
      entity.updatedUserId = store.user?.id;
    }

    await this.validate(entity);
  }

  beforeSoftRemove(event: SoftRemoveEvent<MetaEntity>) {
    const { entity } = event;
    if (!this.isMetaEntity(entity)) return;

    const store = als.getStore();
    if (store) {
      entity.deletedUserId = store.user?.id;
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

    if (!(entity instanceof MetaEntity)) {
      this.logger.verbose({
        message: 'Validation failed: Entity is not an instance of MetaEntity.',
        details: {
          entity,
          reasons: [
            'When a OneToManyField contains a many-sided object, it updates the many-sided relation and the updatedAt field.',
            'TypeORM fails to retrieve the many-sided object, preventing validation.',
          ],
        },
      });
      return false;
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
