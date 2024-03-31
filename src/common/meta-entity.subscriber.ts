import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';

import { Logger } from '@nestjs/common';
import { validate } from 'class-validator';
import { GraphQLError } from 'graphql';
import { MetaEntity } from './meta.entity';

@EventSubscriber()
export class MetaEntitySubscriber
  implements EntitySubscriberInterface<MetaEntity>
{
  private readonly logger = new Logger(this.constructor.name);

  listenTo = () => MetaEntity;

  async beforeInsert(event: InsertEvent<MetaEntity>) {
    await this.validate(event);
  }

  async beforeUpdate(event: UpdateEvent<MetaEntity>) {
    await this.validate(event);
  }

  private async validate(
    event: InsertEvent<MetaEntity> | UpdateEvent<MetaEntity>,
  ) {
    /**
     * @description
     * - beforeInsert
     *   - event.entity may be Entity | ObjectLiteral | undefined
     *   - for example, if using upsert, event.entity is ObjectLiteral, typeorm type is incorrect
     * - beforeUpdate
     *   - event.entity may be ObjectLiteral | undefined
     *   - event.databaseEntity is Entity
     */
    const entity = event.entity;

    if (!(entity instanceof MetaEntity)) {
      console.log('event', event);
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
      return;
    }

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
