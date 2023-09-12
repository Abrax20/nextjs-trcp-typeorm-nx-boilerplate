import { Column, Entity } from 'typeorm';

import { Model } from './base';

@Entity({
  name: 'IPAddressAllowList',
})
export class IPAddressAllowList extends Model {
  @Column('inet', { primary: true, nullable: false })
  public ip!: string;

  @Column('text', { nullable: true, default: null })
  public comment!: string | null;

  @Column('inet', { nullable: true, default: null })
  public rateLimitFactor!: number | null;
}
