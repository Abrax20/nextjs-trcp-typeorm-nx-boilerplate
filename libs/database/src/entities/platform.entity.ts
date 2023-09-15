import { zod } from '@sprindt/generic';
import { Column, Entity, OneToMany } from 'typeorm';

import AccountPlatform from './account-platform.entity';
import { MainEntity } from './generic/base';

@Entity({
  name: 'Platforms',
})
export class Platform extends MainEntity {
  @Column('varchar', { length: 255, unique: true })
  public name: string;

  @Column('text', { nullable: true })
  public description?: string;

  @OneToMany(
    () => AccountPlatform,
    (accountPlatform) => accountPlatform.platform,
    { nullable: true }
  )
  public accountPlatforms?: AccountPlatform[];

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
