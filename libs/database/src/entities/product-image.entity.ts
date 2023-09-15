import { zod } from '@sprindt/generic';
import { Column, Entity, ManyToOne } from 'typeorm';

import { MainEntity } from './generic/base';
import Product from './product.entity';

@Entity({
  name: 'ProductImages',
})
export default class ProductImage extends MainEntity {
  @Column('varchar', { length: 255, nullable: true })
  public alt?: string;

  @Column('varchar')
  public src: string;

  @ManyToOne(() => Product, (product) => product.productImages)
  public product: Product;

  async update(data: Partial<ProductImage>): Promise<ProductImage> {
    const validatedData = zod
      .object({
        alt: zod.string().optional(),
        src: zod.string().optional(),
      })
      .parse(data);

    Object.assign(this, validatedData);

    return this.save();
  }
}
