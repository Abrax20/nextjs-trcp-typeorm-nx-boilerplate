import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { MainEntity } from './base';

@Entity({
  name: 'IPAddressBlockList',
})
export class IPAddressBlockList extends MainEntity {
  @PrimaryGeneratedColumn('uuid')
  public uuid: string;

  @Column('inet', { nullable: false })
  public startIp: string;

  @Column('inet', { nullable: false })
  public endIp: string;

  @CreateDateColumn()
  public createdAt: Date;
}
