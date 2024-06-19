import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, JoinTable, ManyToMany } from 'typeorm';

import { ColumnField } from '../common/column-field.decorator';
import { MetaEntity } from '../common/meta.entity';
import { Permission } from '../permission/permission.entity';
import { User } from '../user/user.entity';

@Entity()
@ObjectType({ implements: [MetaEntity] })
export class Role extends MetaEntity {
  @ColumnField({
    type: 'varchar',
    length: 20,
    comment: '角色名稱',
  })
  name!: string;

  @Field(() => [Permission], { nullable: true, description: '權限' })
  @JoinTable()
  @ManyToMany(() => Permission, (permission) => permission.roles)
  permissions?: Permission[];

  @ManyToMany(() => User, (item) => item.roles)
  users?: User[];
}
