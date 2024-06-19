import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

import { ColumnField } from '../common/column-field.decorator';
import { MetaEntity } from '../common/meta.entity';
import { Role } from '../role/role.entity';

@Entity()
@ObjectType({ implements: [MetaEntity] })
export class User extends MetaEntity {
  @ColumnField({
    type: 'varchar',
    length: 255,
  })
  email!: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  hashedPassword!: string;

  @Field(() => [Role], { nullable: true, description: '角色' })
  @JoinTable()
  @ManyToMany(() => Role, (item) => item.users)
  roles?: Role[];
}
