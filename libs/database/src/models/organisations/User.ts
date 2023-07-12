/* eslint-disable max-lines */

import { zod } from '@example/generic';
import { LanguageType } from '@example/types';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Model } from '../Model';

@Entity({
  name: 'Users',
})
export class User extends Model {
  @PrimaryGeneratedColumn('uuid')
  public uuid!: string;

  public async update(
    user: Partial<{
      lastName: string;
      firstName: string;
      language: LanguageType;
    }>
  ) {
    this.changeField('lastName', user.lastName, zod.string());
    this.changeField('firstName', user.firstName, zod.string());
    this.changeField('language', user.language, zod.nativeEnum(LanguageType));

    return this.save();
  }

  @Index({
    unique: true,
    fulltext: true,
  })
  @Column('varchar', { nullable: false, length: 255 })
  public email!: string;

  @Index({
    fulltext: true,
  })
  @Column('varchar', { nullable: false, length: 255 })
  public firstName!: string;

  @Index({
    fulltext: true,
  })
  @Column('varchar', { nullable: false, length: 255 })
  public lastName!: string;

  @Column('boolean', { nullable: false, default: false })
  public activated!: boolean;

  @Column({
    type: 'enum',
    enum: LanguageType,
    default: LanguageType.English,
  })
  public language!: LanguageType;

  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn()
  public updatedAt!: Date;
}
