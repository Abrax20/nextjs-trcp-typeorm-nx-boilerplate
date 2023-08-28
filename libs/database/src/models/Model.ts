import { BaseEntity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { z } from 'zod';

export class Model extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public uuid!: string;

  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn()
  public updatedAt!: Date;

  public changeField(key: keyof this, value: unknown, type: z.ZodType) {
    try {
      this[key] = type.parse(value);
      return true;
    } catch {
      return false;
    }
  }
}
