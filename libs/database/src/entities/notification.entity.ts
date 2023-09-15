import { zod } from '@sprindt/generic';
import { Column, Entity, OneToOne } from 'typeorm';

import { MainEntity } from './generic/base';
import { User } from './user.entity';

@Entity({
  name: 'Notifications',
})
export default class Notification extends MainEntity {
  @Column('boolean', { default: true, name: 'email_notifications' })
  public email_notifications: boolean;

  @Column('boolean', { default: true, name: 'push_notifications' })
  public push_notifications: boolean;

  @OneToOne(() => User, (user) => user.notification)
  public user: User;

  public async update(data: Partial<Notification>) {
    const validatedData = zod
      .object({
        email_notifications: zod.boolean().optional(),
        push_notifications: zod.boolean().optional(),
      })
      .parse(data);

    Object.assign(this, validatedData);

    return this.save();
  }
}
