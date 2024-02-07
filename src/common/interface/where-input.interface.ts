import { FindOptionsWhere } from 'typeorm';

import { MetaEntity } from '../meta.entity';
import { Nullable } from './nullable.interface';

export interface IWhereInput<T extends MetaEntity> {
  toFindOptionsWhere(): Nullable<FindOptionsWhere<T>> | undefined;
}
