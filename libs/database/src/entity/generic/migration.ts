import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { MainEntity } from './base';

@Entity({
  name: 'Migrations',
})
export class Migration extends MainEntity {
  @PrimaryGeneratedColumn('increment')
  public id!: number;

  @Column('varchar', { nullable: false })
  public name!: string;

  @Column('int', { nullable: false })
  public timestamp!: string;
}
