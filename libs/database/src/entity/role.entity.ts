// role.entity.ts
import { zod } from '@sprindt/generic';
import { Column, Entity, OneToMany } from 'typeorm';

import { MainEntity } from './generic/base';
import { User } from './user.entity';

@Entity({
  name: 'Roles',
})
export class Role extends MainEntity {
  public async update(
    role: Partial<{
      name: string;
      description: string;
    }>
  ) {
    this.changeField('name', role.name, zod.string());
    this.changeField('description', role.description, zod.string());

    return this.save();
  }

  @Column('varchar', { nullable: false, length: 255, unique: true })
  public name!: string;

  @Column('varchar', { nullable: true, length: 255 })
  public description!: string;

  @OneToMany(() => User, (user) => user.role)
  public users: User[];
}
