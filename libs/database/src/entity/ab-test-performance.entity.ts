import { Column, Entity, OneToOne } from 'typeorm';

import ABTest from './ab-test.entity';
import { MainEntity } from './generic/base';

@Entity({
  name: 'ABTestPerformances',
})
export class ABTestPerformance extends MainEntity {
  @Column({ type: 'int', default: 0 })
  public sessions!: number;

  @Column({ type: 'float', default: 0.0 })
  public conversionRate!: number;

  @Column({ type: 'float', default: 0.0 })
  public aov!: number;

  @Column({ type: 'float', default: 0.0 })
  public revenue!: number;

  @Column({ type: 'float', default: 0.0 })
  public revenuePerSession!: number;

  @Column({ type: 'float', default: 0.0 })
  public likelyHoodToPerform!: number;

  /**
   * A/B test associated with the performance metrics.
   */
  @OneToOne(() => ABTest, (abTest) => abTest.abTestPerformance)
  public abTest!: ABTest;
}
