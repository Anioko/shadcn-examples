import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function singularize(word: string): string {
  if (!word) return ""
  if (word.endsWith("ies")) {
    return word.slice(0, -3) + "y"
  }
  if (word.endsWith("es")) {
    return word.slice(0, -2)
  }
  if (word.endsWith("s")) {
    return word.slice(0, -1)
  }
  return word
}
