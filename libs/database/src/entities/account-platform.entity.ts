import { Column, ManyToOne, OneToMany, Unique } from 'typeorm';

import { Account } from './account.entity';
import { MainEntity } from './generic/base';
import { Platform } from './platform.entity';
import Product from './product.entity';

@Unique(['apiEndpoint', 'apiToken'])
export default class AccountPlatform extends MainEntity {
  @Column('varchar')
  public apiEndpoint: string;

  @Column('varchar')
  public apiToken: string;

  @ManyToOne(() => Account, (account) => account.accountPlatforms)
  public account: Account;

  @ManyToOne(() => Platform, (platform) => platform.accountPlatforms)
  public platform: Platform;

  @OneToMany(() => Product, (product) => product.accountPlatform, {
    nullable: true,
  })
  public products?: Product[];
}
