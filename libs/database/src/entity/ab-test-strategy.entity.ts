import { Column, Entity, ManyToOne } from 'typeorm';

import ABTest from './ab-test.entity';

@Entity({
  name: 'ABTestStrategies',
})
export default class ABTestStrategy {
  @Column({ type: 'varchar', length: 255, unique: true })
  public name!: string;

  @Column({ type: 'text', nullable: true })
  public description: string;

  @ManyToOne(() => ABTest, (abTest) => abTest.abTestStrategies)
  public abTest!: ABTest;
}
