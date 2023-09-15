import { zod } from '@sprindt/generic';
import { Column, Entity, OneToMany, OneToOne } from 'typeorm';

import AccountPlatform from './account-platform.entity';
import { MainEntity } from './generic/base';
import Product from './product.entity';
import { Subscription } from './subscription.entity';
import { User } from './user.entity';

@Entity({
  name: 'Accounts',
})
export class Account extends MainEntity {
  @Column('varchar', { length: 255, unique: true })
  public name: string;

  @Column('boolean', { default: true })
  public isActive: boolean;

  @OneToMany(() => User, (user) => user.account)
  public users: User[];

  @OneToOne(() => Subscription, (subscription) => subscription.account)
  public subscription: Subscription;

  @OneToMany(() => Product, (product) => product.account, {
    nullable: true,
  })
  public products?: Product[];

  @OneToMany(
    () => AccountPlatform,
    (accountPlatform) => accountPlatform.account,
    {
      nullable: true,
    }
  )
  public accountPlatforms?: AccountPlatform[];

  public async update(data: Partial<Account>) {
    const validatedData = zod
      .object({
        name: zod.string().optional(),
        isActive: zod.boolean().optional(),
      })
      .parse(data);

    Object.assign(this, validatedData);

    return this.save();
  }
}
