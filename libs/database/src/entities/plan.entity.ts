import { zod } from '@sprindt/generic';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { MainEntity } from './generic/base';
import { Subscription } from './subscription.entity';

@Entity('Plans')
export class Plan extends MainEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('varchar', { unique: true })
  public name: string;

  @Column('text', { nullable: true })
  public description?: string;

  @Column('float')
  public price: number;

  @OneToOne(() => Subscription, (subscription) => subscription.plan)
  public subscription: Subscription;

  async update(data: Partial<Plan>): Promise<Plan> {
    const validatedData = zod
      .object({
        name: zod.string().optional(),
        description: zod.string().optional(),
        price: zod.number().optional(),
      })
      .parse(data);

    Object.assign(this, validatedData);

    return this.save();
  }
}
