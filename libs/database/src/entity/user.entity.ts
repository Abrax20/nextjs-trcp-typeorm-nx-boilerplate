// user.entity.ts
import { zod } from '@sprindt/generic';
import { Column, Entity, ManyToOne } from 'typeorm';

import { Account } from './account.entity';
import { MainEntity } from './generic/base';
import { Role } from './role.entity';

@Entity({
  name: 'Users',
})
export class User extends MainEntity {
  public async update(
    user: Partial<{
      email: string;
      name: string;
      hashedPassword: string;
      isActive: boolean;
    }>
  ) {
    this.changeField('email', user.email, zod.string().email());
    this.changeField('name', user.name, zod.string());
    this.changeField('hashedPassword', user.hashedPassword, zod.string());
    this.changeField('isActive', user.isActive, zod.boolean());

    return this.save();
  }

  @Column('varchar', { nullable: false, length: 255, unique: true })
  public email!: string;

  @Column('varchar', { nullable: false, length: 255 })
  public name!: string;

  @Column('varchar', { nullable: false, length: 255 })
  public hashedPassword!: string;

  @Column('boolean', { nullable: false, default: true })
  public isActive!: boolean;

  @ManyToOne(() => Role, (role) => role.users)
  public role: Role;

  @ManyToOne(() => Account, (account) => account.users)
  public account: Account;
}
