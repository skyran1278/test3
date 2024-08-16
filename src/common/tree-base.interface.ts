import { Maybe } from 'graphql/jsutils/Maybe';

import { MetaEntity } from './meta.entity';

export interface TreeBaseInterface extends MetaEntity {
  parentId?: Maybe<string>;
  parent?: Maybe<TreeBaseInterface>;

  children?: Maybe<TreeBaseInterface[]>;
}
