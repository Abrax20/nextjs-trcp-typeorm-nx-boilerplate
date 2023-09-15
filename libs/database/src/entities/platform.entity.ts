import { zod } from '@sprindt/generic';
import { Column, ManyToMany } from 'typeorm';

import { Account } from './account.entity';
import { MainEntity } from './generic/base';

export class Platform extends MainEntity {
  @Column('varchar', { length: 255, unique: true })
  public name!: string;

  @Column('text', { nullable: true })
  public description?: string;

  @ManyToMany(() => Account, (account) => account.platforms, {
    nullable: true,
  })
  public accounts?: Account[];

  public async update(data: Partial<Platform>) {
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
