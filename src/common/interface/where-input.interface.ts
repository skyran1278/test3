import { FindOptionsWhere } from 'typeorm';

import { Nullable } from '../base.service';
import { MetaEntity } from '../meta.entity';

export interface IWhereInput<T extends MetaEntity> {
  toFindOptionsWhere(): Nullable<FindOptionsWhere<T>> | undefined;
}
