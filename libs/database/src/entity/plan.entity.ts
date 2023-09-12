import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { MainEntity } from './generic/base';
import { SubscriptionEntity } from './subscription.entity';

@Entity('Plans')
export class Plan extends MainEntity {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Column('varchar', { unique: true })
  public name!: string;

  @Column('text', { nullable: true })
  public description?: string;

  @Column('float', { default: 0 })
  public price!: number;

  @OneToMany(() => SubscriptionEntity, (subscription) => subscription.plan)
  public subscriptions!: SubscriptionEntity[];
}
