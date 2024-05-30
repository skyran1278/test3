import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from '../user/user.entity';
import { AuditActionEnum } from './audit-action.enum';

@Entity()
export class AuditLog {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @Column({ type: 'varchar', length: 36 })
  requestId!: string;

  @Column({ type: 'uuid' })
  userId!: string;
  @ManyToOne(() => User)
  user?: User;

  @Column({ type: 'text' })
  input!: string;

  @Column({ type: 'varchar', length: 255 })
  tableName!: string;

  @Column({ type: 'enum', enum: AuditActionEnum })
  action!: AuditActionEnum;

  @Column({ type: 'uuid' })
  entityId!: string;

  @Column({ type: 'json' })
  entityDetail!: Record<string, unknown>;
}
