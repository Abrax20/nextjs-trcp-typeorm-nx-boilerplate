// permission.entity.ts
import { zod } from '@sprindt/generic';
import { Column, Entity, ManyToMany } from 'typeorm';

import { MainEntity } from './generic/base';
import { Role } from './role.entity';

@Entity({
  name: 'Permissions',
})
export class Permission extends MainEntity {
  @Column('varchar', { nullable: false, length: 255, unique: true })
  public name: string;

  @Column('varchar', { nullable: true, length: 255 })
  public description: string;

  @ManyToMany(() => Role, (role) => role.permissions)
  public roles: Role[];

  public async update(data: Partial<Permission>) {
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
