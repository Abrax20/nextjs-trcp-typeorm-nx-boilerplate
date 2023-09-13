// user.entity.ts
import { Column, Entity, ManyToOne } from 'typeorm';
import { z } from 'zod';

import { Account } from './account.entity';
import { MainEntity } from './generic/base';
import { Role } from './role.entity';

@Entity({
  name: 'Users',
})
export class User extends MainEntity {
  @Column('varchar', { length: 255, unique: true })
  public email!: string;

  @Column('varchar', { length: 255 })
  public name!: string;

  @Column('boolean', { default: true })
  public isActive!: boolean;

  @ManyToOne(() => Role, (role) => role.users)
  public role!: Role;

  @ManyToOne(() => Account, (account) => account.users)
  public account!: Account;

  public async update(data: Partial<User>) {
    const validatedData = z
      .object({
        email: z.string().email().optional(),
        name: z.string().optional(),
        isActive: z.boolean().optional(),
      })
      .parse(data);

    Object.assign(this, validatedData);

    return this.save();
  }
}
