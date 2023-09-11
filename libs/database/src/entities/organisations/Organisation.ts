import { zod } from '@example/generic';
import { LanguageType } from '@example/types';
import {
  Column,
  Entity
} from 'typeorm';

import { Model } from '../Model';

@Entity({
  name: 'Organisation',
})
export class Organisation extends Model {
  @Column('text', { nullable: false, unique: true })
  public orgId!: string;

  @Column('text', { nullable: false })
  public name!: string;

  @Column('text', { default: '' })
  public website!: string;

  @Column('text', { nullable: true, default: null })
  public stripeCustomerId!: string | null;

  @Column('text', { nullable: true, default: null })
  public stripeSubscriptionId!: string | null;

  public update({
    name,
    website,
  }: Partial<{
    name: string;
    website: string;
    supportedLanguages: LanguageType[] | null;
  }>): Promise<this> {
    this.changeField('name', name, zod.string());
    this.changeField('website', website, zod.string());
    return this.save();
  }
}
