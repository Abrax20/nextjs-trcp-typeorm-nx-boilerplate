import { zod } from '@sprindt/generic';
import { Column, Entity, ManyToOne } from 'typeorm';

import { MainEntity } from './generic/base';
import Product from './product.entity';

enum WeightUnit {
  GRAM = 'GRAM',
  KILOGRAM = 'KILOGRAM',
  OUNCE = 'OUNCE',
  POUND = 'POUND',
}

@Entity({
  name: 'ProductVariants',
})
export default class ProductVariant extends MainEntity {
  @Column('varchar', { length: 255 })
  public title: string;

  @Column('float')
  public price: number;

  @Column('varchar', { length: 255 })
  public sku: string;

  @Column('boolean', { nullable: true })
  public taxable?: boolean;

  @Column('varchar', { length: 255, nullable: true })
  public barcode?: string;

  @Column('int', { nullable: true })
  public grams?: number;

  @Column('enum', {
    enum: WeightUnit,
    default: WeightUnit.GRAM,
    nullable: true,
  })
  public weightUnit?: string;

  @Column('float', { nullable: true })
  public weight?: number;

  @Column('int')
  public inventoryQuantity: number;

  @Column('boolean', { nullable: true })
  public requiresShipping?: boolean;

  @ManyToOne(() => Product, (product) => product.variants)
  public product: Product;

  async update(data: Partial<ProductVariant>): Promise<ProductVariant> {
    const validatedData = zod
      .object({
        title: zod.string().optional(),
        price: zod.number().optional(),
        sku: zod.string().optional(),
        taxable: zod.boolean().optional(),
        barcode: zod.string().optional(),
        grams: zod.number().optional(),
        weightUnit: zod.nativeEnum(WeightUnit).optional(),
        weight: zod.number().optional(),
        inventoryQuantity: zod.number().optional(),
        requiresShipping: zod.boolean().optional(),
      })
      .parse(data);

    Object.assign(this, validatedData);

    return this.save();
  }
}
