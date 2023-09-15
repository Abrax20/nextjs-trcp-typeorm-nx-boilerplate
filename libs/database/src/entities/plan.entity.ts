import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { MainEntity } from './generic/base';
import { Subscription } from './subscription.entity';

@Entity('Plans')
export class Plan extends MainEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('varchar', { unique: true })
  public name: string;

  @Column('text', { nullable: true })
  public description?: string;

  @Column('float', { default: 0 })
  public price: number;

  @OneToOne(() => Subscription, (subscription) => subscription.plan)
  public subscriptions: Subscription[];
}
