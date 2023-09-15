import { zod } from '@sprindt/generic';
import { Column, Entity, ManyToMany } from 'typeorm';

import { MainEntity } from './generic/base';
import Product from './product.entity';

@Entity({
  name: 'PublishedScopes',
})
export default class PublishedScope extends MainEntity {
  @Column('varchar', { length: 255 })
  public name: string;

  @ManyToMany(() => Product, (product) => product.publishedScopes, {
    nullable: true,
  })
  public products?: Product[];

  async update(data: Partial<PublishedScope>): Promise<void> {
    const validatedData = zod
      .object({
        name: zod.string().optional(),
      })
      .parse(data);

    Object.assign(this, validatedData);
  }
}
