import { z } from 'zod';

// Reusable validation schemas for the application

// Basic string validation for names, titles, etc.
export const nameSchema = z.string().min(3, "يجب أن يكون على الأقل 3 أحرف").max(100, "يجب أن يكون أقل من 100 حرف");

// Email validation
export const emailSchema = z.string().email("البريد الإلكتروني غير صالح");

// Password validation
export const passwordSchema = z.string().min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل");

// Positive number validation for currency, quantities etc.
export const positiveNumberSchema = z.number().positive("يجب أن يكون الرقم أكبر من صفر");

// URL validation
export const urlSchema = z.string().url("الرابط غير صالح");


/**
 * Validates an object against a Zod schema.
 * @param schema The Zod schema to validate against.
 * @param data The data object to validate.
 * @returns An object with success status and either data or errors.
 */
export function validateData<T extends z.ZodType<any, any>>(schema: T, data: unknown): 
  { success: true; data: z.infer<T> } | 
  { success: false; errors: z.ZodIssue[] } {
    
  const result = schema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  } else {
    return { success: false, errors: result.error.issues };
  }
}
