import { FindOptionsWhere } from 'typeorm';

import { MetaEntity } from './meta.entity';
import { DeepNullable } from './nullable.interface';

export interface WhereInput<T extends MetaEntity> {
  toFindOptionsWhere(): DeepNullable<FindOptionsWhere<T>> | undefined;
}
