import { Field, ID, InterfaceType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { User } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@InterfaceType()
export abstract class MetaEntity {
  /** @see https://github.com/typestack/class-validator#validation-groups */
  validationGroups?: string[] | string;

  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt!: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt!: Date;

  @Field(() => Date, { nullable: true })
  @DeleteDateColumn({ nullable: true })
  deletedAt?: Maybe<Date>;

  @Field(() => ID, { nullable: true })
  @Column({ type: 'uuid', nullable: true })
  createdUserId?: Maybe<string>;
  @ManyToOne('User', { nullable: true })
  createdUser?: Maybe<User>;

  @Field(() => ID, { nullable: true })
  @Column({ type: 'uuid', nullable: true })
  updatedUserId?: Maybe<string>;
  @ManyToOne('User', { nullable: true })
  updatedUser?: Maybe<User>;

  @Field(() => ID, { nullable: true })
  @Column({ type: 'uuid', nullable: true })
  deletedUserId?: Maybe<string>;
  @ManyToOne('User', { nullable: true })
  deletedUser?: Maybe<User>;
}
