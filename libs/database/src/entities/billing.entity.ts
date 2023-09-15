import { zod } from '@sprindt/generic';
import { Column, OneToOne } from 'typeorm';

import { MainEntity } from './generic/base';
import { Subscription } from './subscription.entity';

export default class Billing extends MainEntity {
  @Column('float')
  public amount: number;

  @Column('text')
  public address: string;

  @Column('timestamp')
  public billingDate: Date;

  @OneToOne(() => Subscription, (subscription) => subscription.billing)
  public subscription: Subscription;

  async update(data: Partial<Billing>): Promise<Billing> {
    const validatedData = zod
      .object({
        amount: zod.number().optional(),
        address: zod.string().optional(),
        billingDate: zod.date().optional(),
      })
      .parse(data);

    Object.assign(this, validatedData);

    return this.save();
  }
}
