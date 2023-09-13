import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  Unique,
} from 'typeorm';

import { ABTestPerformance } from './ab-test-performance.entity';
import ABTestStrategy from './ab-test-strategy.entity';
import { MainEntity } from './generic/base';
import Product from './product.entity';

@Entity({
  name: 'ABTests',
})
@Unique(['name'])
@Index('idx_name', ['name'])
export default class ABTest extends MainEntity {
  @Column({ type: 'varchar', length: 255, nullable: false })
  public name!: string;

  @Column({ type: 'timestamp', nullable: false, default: () => Date.now() })
  public startDate!: Date;

  @Column({ type: 'timestamp', nullable: false })
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
  @OneToMany(() => ABTestStrategy, (abTestStrategy) => abTestStrategy.abTest, {
    nullable: false,
  })
  public abTestStrategies!: ABTestStrategy[];

  /**
   * Product associated with the A/B test.
   */
  @ManyToOne(() => Product, (product) => product.abTests, {
    nullable: false,
  })
  public product!: Promise<Product>;
}
