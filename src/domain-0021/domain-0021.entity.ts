import { Field, ObjectType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { Entity, Tree, TreeChildren, TreeParent } from 'typeorm';

import { ColumnField } from '../common/column-field.decorator';
import { MetaEntity } from '../common/meta.entity';
import { TreeBaseInterface } from '../common/tree-base.interface';

@Tree('materialized-path')
@Entity()
@ObjectType({ implements: [MetaEntity] })
export class Domain0021 extends MetaEntity implements TreeBaseInterface {
  @ColumnField({ type: 'int', nullable: true, comment: 'domain0021001' })
  domain0021001?: Maybe<number>;

  @ColumnField({
    type: 'uuid',
    nullable: true,
    comment: 'parent ID',
  })
  parentId?: Maybe<string>;
  @Field(() => Domain0021, { nullable: true, description: 'parent' })
  @TreeParent()
  parent?: Maybe<Domain0021>;

  @Field(() => [Domain0021], { nullable: true, description: 'tree children' })
  @TreeChildren()
  children?: Maybe<Domain0021[]>;
}
