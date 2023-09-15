import { zod } from '@sprindt/generic';
import { Column, Entity, ManyToOne } from 'typeorm';

import ABTest from './ab-test.entity';
import { MainEntity } from './generic/base';

@Entity({
  name: 'ABTestStrategies',
})
export default class ABTestStrategy extends MainEntity {
  @Column({ type: 'varchar', length: 255, unique: true })
  public name: string;

  @Column({ type: 'text', nullable: true })
  public description?: string;

  @ManyToOne(() => ABTest, (abTest) => abTest.abTestStrategies)
  public abTest: ABTest;

  public async update(data: Partial<ABTestStrategy>) {
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
