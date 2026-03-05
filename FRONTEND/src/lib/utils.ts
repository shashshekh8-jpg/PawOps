import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Intelligently merges Tailwind classes, resolving conflicts[cite: 138, 362].
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

