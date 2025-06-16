import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ZodError, type ZodSchema } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseJsonSafely<T>(
  jsonString: string,
  schema: ZodSchema<T>
): T {
  try {
    const parsed = JSON.parse(jsonString);

    return schema.parse(parsed);
  } catch (error) {
    if (error instanceof ZodError) {
      throw new Error(`Invalid JSON structure: ${error.message}`);
    }

    throw new Error(`Failed to parse JSON: ${error}`);
  }
}
