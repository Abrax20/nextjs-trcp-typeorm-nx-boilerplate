import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { z } from 'zod';

import { ABTestPerformance } from './ab-test-performance.entity';
import ABTestStrategy from './ab-test-strategy.entity';
import { MainEntity } from './generic/base';
import Product from './product.entity';

@Entity({
  name: 'ABTests',
})
export default class ABTest extends MainEntity {
  @Column({ type: 'varchar', length: 255 })
  public name!: string;

  @Column({
    type: 'timestamp',

    default: () => 'CURRENT_TIMESTAMP',
  })
  public startDate!: Date;

  @Column({ type: 'timestamp' })
  public endDate!: Date;

  /**
   * Performance metrics of the A/B test.
   */
  @OneToOne(
    () => ABTestPerformance,
    (abTestPerformance) => abTestPerformance.abTest
  )
  @JoinColumn()
  public abTestPerformance!: ABTestPerformance;

  /**
   * Strategies used in the A/B test.
   */
  @OneToMany(() => ABTestStrategy, (abTestStrategy) => abTestStrategy.abTest)
  public abTestStrategies!: ABTestStrategy[];

  /**
   * Product associated with the A/B test.
   */
  @ManyToOne(() => Product, (product) => product.abTests)
  public product!: Product;

  public async update(data: Partial<ABTest>) {
    const validatedData = z
      .object({
        name: z.string().optional(),
        startDate: z.date().optional(),
        endDate: z.date().optional(),
      })
      .parse(data);

    Object.assign(this, validatedData);
    return this.save();
  }
}
