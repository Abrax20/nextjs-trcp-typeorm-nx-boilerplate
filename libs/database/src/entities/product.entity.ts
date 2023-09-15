import { zod } from '@sprindt/generic';
import sanitizeHtml from 'sanitize-html';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import ABTest from './ab-test.entity';
import { Account } from './account.entity';
import AccountPlatform from './account-platform.entity';
import { MainEntity } from './generic/base';
import ProductCategory from './product-category.entity';
import ProductImage from './product-image.entity';
import ProductVariant from './product-variant.entity';
import PublishedScope from './published-scope.entity';

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

  @Column('varchar', { length: 255, unique: true })
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

  @OneToMany(() => ProductVariant, (productVariant) => productVariant.product)
  public variants: ProductVariant[];

  @OneToMany(() => ProductImage, (productImage) => productImage.product, {
    nullable: true,
  })
  public productImages?: ProductImage[];

  @ManyToMany(() => PublishedScope, (publishedScope) => publishedScope.products)
  @JoinTable()
  public publishedScopes: PublishedScope[];

  @ManyToMany(
    () => ProductCategory,
    (productCategory) => productCategory.products,
    { nullable: true }
  )
  @JoinTable()
  public categories?: ProductCategory[];

  public async update(data: Partial<Product>): Promise<Product> {
    const validatedData = zod
      .object({
        title: zod.string().optional(),
        bodyHtml: zod.string().optional(),
        vendor: zod.string().optional(),
        slug: zod.string().optional(),
        platformSpecificAttributes: zod.record(zod.unknown()).optional(),
      })
      .parse(data);

    // Sanitize bodyHtml if it exists in the validatedData
    if (validatedData.bodyHtml) {
      validatedData.bodyHtml = sanitizeHtml(validatedData.bodyHtml);
    }

    Object.assign(this, validatedData);

    return this.save();
  }
}
