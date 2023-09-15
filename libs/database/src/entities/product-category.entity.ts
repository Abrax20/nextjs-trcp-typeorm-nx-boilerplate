import { zod } from '@sprindt/generic';
import { Column, Entity, ManyToMany } from 'typeorm';

import { MainEntity } from './generic/base';
import Product from './product.entity';

@Entity({
  name: 'ProductCategories',
})
export default class ProductCategory extends MainEntity {
  @Column('varchar', { length: 255 })
  public name: string;

  @Column('text', { nullable: true })
  public description?: string;

  @ManyToMany(() => Product, (product) => product.categories, {
    nullable: true,
  })
  public products?: Product[];

  async update(data: Partial<ProductCategory>): Promise<ProductCategory> {
    const validatedData = zod
      .object({
        name: zod.string().optional(),
        description: zod.string().optional(),
      })
      .parse(data);

    Object.assign(this, validatedData);

    return this.save();
  }
}
