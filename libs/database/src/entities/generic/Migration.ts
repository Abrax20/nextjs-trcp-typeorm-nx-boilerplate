import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { Model } from '../Model';

@Entity({
  name: 'Migrations',
})
export class Migration extends Model {
  @PrimaryGeneratedColumn('increment')
  public id!: number;

  @Column('varchar', { nullable: false })
  public name!: string;

  @Column('int', { nullable: false })
  public timestamp!: string;
}
