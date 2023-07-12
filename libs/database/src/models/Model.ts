import { BaseEntity } from 'typeorm';
import { z } from 'zod';

export class Model extends BaseEntity {
  public changeField(key: keyof this, value: unknown, type: z.ZodType) {
    try {
      this[key] = type.parse(value);
      return true;
    } catch {
      return false;
    }
  }
}
