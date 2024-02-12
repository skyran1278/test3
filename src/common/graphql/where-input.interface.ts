import { FindOptionsWhere } from 'typeorm';

import { MetaEntity } from '../dao/meta.entity';
import { Nullable } from '../nullable.interface';

export interface WhereInput<T extends MetaEntity> {
  toFindOptionsWhere(): Nullable<FindOptionsWhere<T>> | undefined;
}
