// src/lib/utils.js
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * cn utility - merges Tailwind classes with conditional logic
 * @param  {...any} inputs - class names or conditions
 * @returns {string} merged class string
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
