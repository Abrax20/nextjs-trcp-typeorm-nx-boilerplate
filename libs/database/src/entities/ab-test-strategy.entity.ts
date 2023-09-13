import { Column, Entity, ManyToOne } from 'typeorm';
import { z } from 'zod';

import ABTest from './ab-test.entity';
import { MainEntity } from './generic/base';

@Entity({
  name: 'ABTestStrategies',
})
export default class ABTestStrategy extends MainEntity {
  @Column({ type: 'varchar', length: 255, unique: true })
  public name!: string;

  @Column({ type: 'text', nullable: true })
  public description?: string;

  @ManyToOne(() => ABTest, (abTest) => abTest.abTestStrategies)
  public abTest!: ABTest;

  public async update(data: Partial<ABTestStrategy>) {
    const validatedData = z
      .object({
        name: z.string().optional(),
        description: z.string().optional(),
      })
      .parse(data);

    Object.assign(this, validatedData);
    return this.save();
  }
}
