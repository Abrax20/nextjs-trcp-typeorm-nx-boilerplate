import { Entity, ManyToOne, OneToMany } from 'typeorm';

import ABTest from './ab-test.entity';
import { Account } from './account.entity';
import { MainEntity } from './generic/base';

@Entity({
  name: 'Products',
})
export default class Product extends MainEntity {
  public title!: string;
  public body_html!: string;
  public vendor!: string;
  public slug!: string;
  public platformSpecificAttributes: string;

  @OneToMany(() => ABTest, (abTest) => abTest.product)
  public abTests: ABTest[];

  @ManyToOne(() => Account, (account) => account.products)
  public account: Account;
}
