import { zod } from '@sprindt/generic';
import { Column, Entity, OneToMany } from 'typeorm';

import { MainEntity } from './generic/base';
import { SubscriptionEntity } from './subscription.entity';
import { UserEntity } from './user.entity';

@Entity({
  name: 'Accounts',
})
export class AccountEntity extends MainEntity {
  public async update(
    account: Partial<{
      accountName: string;
      isActive: boolean;
    }>
  ) {
    this.changeField('accountName', account.accountName, zod.string());
    this.changeField('isActive', account.isActive, zod.boolean());

    return this.save();
  }

  @Column('varchar', { nullable: false, length: 255, unique: true })
  public accountName!: string;

  @Column('boolean', { nullable: false, default: true })
  public isActive!: boolean;

  @OneToMany(() => UserEntity, (user) => user.account)
  public users: UserEntity[];

  @OneToMany(() => SubscriptionEntity, (subscription) => subscription.account)
  public subscriptions: SubscriptionEntity[];
}
