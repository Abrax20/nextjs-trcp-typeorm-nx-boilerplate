import {
  BaseEntity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { z, ZodError } from 'zod';

/**
 * MainEntity is a base entity that provides common fields and utilities for other entities.
 */
export class MainEntity extends BaseEntity {
  /**
   * UUID of the entity.
   */
  @PrimaryGeneratedColumn('uuid')
  public uuid: string;

  /**
   * Timestamp when the entity was created.
   */
  @CreateDateColumn({ nullable: false })
  public createdAt: Date;

  /**
   * Timestamp when the entity was last updated.
   */
  @UpdateDateColumn({ nullable: false })
  public updatedAt: Date;

  /**
   * Validates and changes a field's value based on a provided Zod schema.
   * @param key - The field to change.
   * @param value - The new value.
   * @param type - The Zod schema to validate against.
   * @returns True if the change was successful, false otherwise.
   */
  public changeField(
    key: keyof this,
    value: unknown,
    type: z.ZodType<any, any>
  ): boolean {
    try {
      this[key] = type.parse(value);
      return true;
    } catch (error) {
      if (error instanceof ZodError) {
        console.error(`Failed to update field ${String(key)}:`, error.errors);
      } else {
        console.error(
          `Unexpected error when updating field ${String(key)}:`,
          error
        );
      }
      return false;
    }
  }
}
