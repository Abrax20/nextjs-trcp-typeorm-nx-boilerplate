// permission.entity.ts
import { zod } from '@sprindt/generic';
import { Column, Entity } from 'typeorm';

import { MainEntity } from './generic/base';

@Entity({
  name: 'Permissions',
})
export class Permission extends MainEntity {
  public async update(
    permission: Partial<{
      name: string;
      description: string;
    }>
  ) {
    this.changeField('name', permission.name, zod.string());
    this.changeField('description', permission.description, zod.string());

    return this.save();
  }

  @Column('varchar', { nullable: false, length: 255, unique: true })
  public name!: string;

  @Column('varchar', { nullable: true, length: 255 })
  public description!: string;
}
