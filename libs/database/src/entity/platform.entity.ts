import { Column, ManyToMany } from 'typeorm';

import { Account } from './account.entity';
import { MainEntity } from './generic/base';

export class Platform extends MainEntity {
  @Column('varchar', { length: 255, unique: true })
  public name!: string;

  @ManyToMany(() => Account, (account) => account.platforms, {
    nullable: true,
  })
  public accounts: Account[];
}
