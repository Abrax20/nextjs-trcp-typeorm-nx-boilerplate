// user.entity.ts
import { zod } from '@sprindt/generic';
import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';

import { Account } from './account.entity';
import { MainEntity } from './generic/base';
import Notification from './notification.entity';
import { Role } from './role.entity';

@Entity({
  name: 'Users',
})
export class User extends MainEntity {
  @Column('varchar', { length: 255, unique: true })
  public email: string;

  @Column('varchar', { length: 255 })
  public name: string;

  @Column('boolean', { default: true })
  public isActive: boolean;

  @ManyToOne(() => Role, (role) => role.users)
  public role: Role;

  @ManyToOne(() => Account, (account) => account.users)
  public account: Account;

  @OneToOne(() => Notification, (notification) => notification.user)
  public notification: Notification;

  public async update(data: Partial<User>) {
    const validatedData = zod
      .object({
        email: zod.string().email().optional(),
        name: zod.string().optional(),
        isActive: zod.boolean().optional(),
      })
      .parse(data);

    Object.assign(this, validatedData);

    return this.save();
  }
}
