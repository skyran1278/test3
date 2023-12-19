import assert from 'assert';

import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';

import { MetaEntity } from './meta.entity';

@EventSubscriber()
export class MetaEntitySubscriber
  implements EntitySubscriberInterface<MetaEntity>
{
  listenTo = () => MetaEntity;

  beforeInsert(event: InsertEvent<MetaEntity>) {
    this.validate(event);
  }

  beforeUpdate(event: UpdateEvent<MetaEntity>) {
    this.validate(event);
  }

  private validate(event: InsertEvent<MetaEntity> | UpdateEvent<MetaEntity>) {
    /**
     * @description
     * - beforeInsert
     *   - event.entity may be Entity | ObjectLiteral | undefined
     *   - for example, if using upsert, event.entity is ObjectLiteral, typeorm type is incorrect
     * - beforeUpdate
     *   - event.entity may be ObjectLiteral | undefined
     *   - event.databaseEntity is Entity
     * TODO: check databaseEntity type is Entity
     */
    const entity = event.entity;
    assert(
      entity instanceof MetaEntity,
      new TypeError(
        'Entity should instanceof CustomBaseEntity or can not be validated',
      ),
    );
  }
}
