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
  public description: string;

  @OneToMany(() => User, (user) => user.role)
  public users: User[];

  public async update(
    role: Partial<{
      name: UserRole;
      description: string;
    }>
  ) {
    if (role.name) {
      this.name = z.nativeEnum(UserRole).parse(role.name);

      if (role.description) {
        this.description = z.string().parse(role.description);
      }
    }
  }
}
