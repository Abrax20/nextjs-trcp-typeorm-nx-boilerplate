import { zod } from '@sprindt/generic';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import ABTest from './ab-test.entity';
import { Account } from './account.entity';
import AccountPlatform from './account-platform.entity';
import { MainEntity } from './generic/base';

@Entity({
  name: 'Products',
})
export default class Product extends MainEntity {
  @Column('varchar', { length: 255 })
  public title: string;

  @Column('text', { nullable: true })
  public bodyHtml?: string;

  @Column('varchar', { length: 255, nullable: true })
  public vendor?: string;

  @Column('varchar', { length: 255 })
  public slug: string;

  @Column('json', { nullable: true })
  public platformSpecificAttributes?: Record<string, unknown>;

  @OneToMany(() => ABTest, (abTest) => abTest.product)
  public abTests: ABTest[];

  @ManyToOne(() => Account, (account) => account.products)
  public account: Account;

  @ManyToOne(
    () => AccountPlatform,
    (accountPlatform) => accountPlatform.products,
    {
      nullable: true,
    }
  )
  public accountPlatform?: AccountPlatform;

  public async update(data: Partial<Product>): Promise<void> {
    const validatedData = zod
      .object({
        title: zod.string().optional(),
        bodyHtml: zod.string().optional(),
        vendor: zod.string().optional(),
        slug: zod.string().optional(),
        platformSpecificAttributes: zod.record(zod.unknown()).optional(),
      })
      .parse(data);

    Object.assign(this, validatedData);

    await this.save();
  }
}
