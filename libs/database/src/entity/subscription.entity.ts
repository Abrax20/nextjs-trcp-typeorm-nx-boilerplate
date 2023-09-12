import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Account } from './account.entity';
import { MainEntity } from './generic/base';
import { Plan } from './plan.entity';

@Entity('Subscriptions')
export class SubscriptionEntity extends MainEntity {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @ManyToOne(() => Account, (account) => account.subscriptions)
  @JoinColumn({ name: 'account_id' })
  public account!: Account;

  @ManyToOne(() => Plan, (plan) => plan.subscriptions)
  @JoinColumn({ name: 'plan_id' })
  public plan!: Plan;

  @Column('boolean', { default: true })
  public autoRenew!: boolean;

  @Column('boolean', { default: true })
  public notation!: boolean;

  @Column('varchar', { nullable: true, unique: true })
  public stripeCustomerId?: string;

  @Column('varchar', { nullable: true })
  public stripePaymentMethodId?: string;

  @Column('varchar', { nullable: true, unique: true })
  public stripeSubscriptionId?: string;

  @Column('timestamp', { nullable: true })
  public stripeSubscriptionEndDate?: Date;

  @Column('varchar', { default: 'ACTIVE' })
  public stripeSubscriptionStatus!: string;
}