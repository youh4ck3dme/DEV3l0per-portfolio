import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge and conditionally apply CSS classes.
 * Combines clsx for conditional classes and tailwind-merge for Tailwind CSS class deduplication.
 *
 * @param {...ClassValue[]} inputs - CSS class values to merge
 * @returns {string} Merged and deduplicated CSS class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
