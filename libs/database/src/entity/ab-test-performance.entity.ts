import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { z } from 'zod';

import ABTest from './ab-test.entity';
import { MainEntity } from './generic/base';

@Entity({
  name: 'ABTestPerformances',
})
export class ABTestPerformance extends MainEntity {
  @Column({ type: 'int', default: 0 })
  public sessions!: number;

  @Column({ type: 'float', precision: 2, default: 0.0 })
  public conversionRate!: number;

  @Column({ type: 'float', precision: 2, default: 0.0 })
  public aov!: number;

  @Column({ type: 'float', precision: 2, default: 0.0 })
  public revenue!: number;

  @Column({ type: 'float', precision: 2, default: 0.0 })
  public revenuePerSession!: number;

  @Column({ type: 'float', precision: 2, default: 0.0 })
  public likelyHoodToPerform!: number;

  @Column()
  public abTestId!: string;

  /**
   * A/B test associated with the performance metrics.
   */
  @OneToOne(() => ABTest, (abTest) => abTest.abTestPerformance)
  @JoinColumn({ name: 'abTestId' })
  public abTest!: ABTest;

  public async update(data: Partial<ABTestPerformance>) {
    const validatedData = z
      .object({
        sessions: z.number().optional(),
        conversionRate: z.number().optional(),
        aov: z.number().optional(),
        revenue: z.number().optional(),
        revenuePerSession: z.number().optional(),
        likelyHoodToPerform: z.number().optional(),
      })
      .parse(data);

    Object.assign(this, validatedData);
    return this.save();
  }
}
