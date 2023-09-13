import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
} from 'typeorm';

import { MainEntity } from './generic/base';
import { Platform } from './platform.entity';
import Product from './product.entity';
import { Subscription } from './subscription.entity';
import { User } from './user.entity';

@Entity({
  name: 'Accounts',
})
export class Account extends MainEntity {
  @Column('varchar', { nullable: false, length: 255, unique: true })
  public accountName!: string;

  @Column('boolean', { nullable: false, default: true })
  public isActive!: boolean;

  @OneToMany(() => User, (user) => user.account)
  public users!: User[];

  @OneToOne(() => Subscription, (subscription) => subscription.account)
  public subscription!: Subscription;

  @OneToMany(() => Product, (product) => product.account, {
    nullable: true,
  })
  public products: Product[];

  @ManyToMany(() => Platform, (platform) => platform.accounts, {
    nullable: true,
  })
  @JoinTable()
  public platforms: Platform[];
}
