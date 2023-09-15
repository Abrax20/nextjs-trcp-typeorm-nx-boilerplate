import { zod } from '@sprindt/generic';
import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';

import { Account } from './account.entity';
import Billing from './billing.entity';
import { MainEntity } from './generic/base';
import { Plan } from './plan.entity';

enum StripeSubscriptionStatus {
  ACTIVE = 'ACTIVE',
  CANCELED = 'CANCELED',
  PAST_DUE = 'PAST_DUE',
  UNPAID = 'UNPAID',
}

@Entity('Subscriptions')
export class Subscription extends MainEntity {
  @OneToOne(() => Account, (account) => account.subscription)
  public account: Account;

  @ManyToOne(() => Plan, (plan) => plan.subscription)
  public plan: Plan;

  @Column('boolean', { default: true })
  public autoRenew: boolean;

  @Column('boolean', { default: true })
  public notation: boolean;

  @Column('varchar', { unique: true })
  public stripeCustomerId: string;

  @Column('varchar')
  public stripePaymentMethodId: string;

  @Column('varchar', { unique: true })
  public stripeSubscriptionId: string;

  @Column('timestamp')
  public stripeSubscriptionEndDate: Date;

  @Column({
    enum: StripeSubscriptionStatus,
    default: StripeSubscriptionStatus.ACTIVE,
  })
  public stripeSubscriptionStatus: StripeSubscriptionStatus;

  @OneToOne(() => Billing, (billing) => billing.subscription)
  public billing: Billing;

  async update(data: Partial<Subscription>): Promise<Subscription> {
    const validatedData = zod
      .object({
        autoRenew: zod.boolean().optional(),
        notation: zod.boolean().optional(),
        stripeCustomerId: zod.string().optional(),
        stripePaymentMethodId: zod.string().optional(),
        stripeSubscriptionId: zod.string().optional(),
        stripeSubscriptionEndDate: zod.date().optional(),
        stripeSubscriptionStatus: zod
          .nativeEnum(StripeSubscriptionStatus)
          .optional(),
      })
      .parse(data);

    Object.assign(this, validatedData);

    return this.save();
  }
}
