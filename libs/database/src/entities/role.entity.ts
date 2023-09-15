import { zod } from '@sprindt/generic';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';

import { MainEntity } from './generic/base';
import { Permission } from './permission.entity';
import { User } from './user.entity';

enum UserRole {
  ADMIN = 'admin',
  EDITOR = 'editor',
}

@Entity({
  name: 'Roles',
})
export class Role extends MainEntity {
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.EDITOR,
    unique: true,
  })
  public name: string;

  @Column('text', { nullable: true })
  public description?: string;

  @OneToMany(() => User, (user) => user.role)
  public users: User[];

  @ManyToMany(() => Permission, (permission) => permission.roles)
  @JoinTable()
  public permissions: Permission[];

  public async update(data: Partial<Role>) {
    const validatedData = zod
      .object({
        name: zod.nativeEnum(UserRole).optional(),
        description: zod.string().optional(),
      })
      .parse(data);

    Object.assign(this, validatedData);

    return this.save();
  }
}
