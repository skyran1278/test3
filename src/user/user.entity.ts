import { ObjectType } from '@nestjs/graphql';
import { FieldColumn } from 'src/common/field-column.decorator';
import { MetaEntity } from 'src/common/meta.entity';
import { Entity } from 'typeorm';

@Entity()
@ObjectType({ implements: MetaEntity })
export class User extends MetaEntity {
  @FieldColumn({ type: 'int', comment: 'user001' })
  user001!: number;

  @FieldColumn({ type: 'int', comment: 'user002' })
  user002!: number;
}
