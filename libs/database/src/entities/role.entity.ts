import { Column, Entity, OneToMany } from 'typeorm';
import { z } from 'zod';

import { MainEntity } from './generic/base';
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
  public name!: string;

  @Column('text', { nullable: true })
  public description?: string;

  @OneToMany(() => User, (user) => user.role)
  public users: User[];

  // @ManyToMany(() => Permission, (permission) => permission.roles)
  // public permissions!: Permission[];

  public async update(data: Partial<Role>) {
    const validatedData = z
      .object({
        name: z.string().optional(),
        description: z.string().optional(),
      })
      .parse(data);

    Object.assign(this, validatedData);

    return this.save();
  }
}
