import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Simple singularization function for common English plural forms
 * Converts plural nouns to their singular form
 */
export function singularize(word: string): string {
  if (!word) return word;

  const lowercaseWord = word.toLowerCase();

  // Common irregular plurals
  const irregulars: Record<string, string> = {
    'people': 'person',
    'men': 'man',
    'women': 'woman',
    'children': 'child',
    'teeth': 'tooth',
    'feet': 'foot',
    'mice': 'mouse',
    'geese': 'goose',
    'analyses': 'analysis',
    'theses': 'thesis',
    'criteria': 'criterion',
    'phenomena': 'phenomenon',
    'initiatives': 'initiative',
    'activities': 'activity',
    'capabilities': 'capability',
    'priorities': 'priority',
    'dependencies': 'dependency',
    'opportunities': 'opportunity',
    'subsidiaries': 'subsidiary',
    'strategies': 'strategy',
    'categories': 'category',
    'entities': 'entity',
    'identities': 'identity'
  };

  // Check for irregular forms first
  if (irregulars[lowercaseWord]) {
    return preserveCase(word, irregulars[lowercaseWord]);
  }

  // Words ending in 'ies' -> 'y' (e.g., companies -> company)
  if (lowercaseWord.endsWith('ies') && lowercaseWord.length > 3) {
    const base = word.slice(0, -3);
    return base + 'y';
  }

  // Words ending in 'ves' -> 'f' or 'fe' (e.g., leaves -> leaf)
  if (lowercaseWord.endsWith('ves')) {
    const base = word.slice(0, -3);
    // Most words ending in 'ves' come from 'f' (leaf->leaves)
    return base + 'f';
  }

  // Words ending in 'es' (but not 'ses', 'xes', 'zes', 'ches', 'shes')
  if (lowercaseWord.endsWith('ses') ||
      lowercaseWord.endsWith('xes') ||
      lowercaseWord.endsWith('zes') ||
      lowercaseWord.endsWith('ches') ||
      lowercaseWord.endsWith('shes')) {
    return word.slice(0, -2);
  }

  // Words ending in 'es' after 'o' (e.g., heroes -> hero)
  if (lowercaseWord.endsWith('oes') && lowercaseWord.length > 3) {
    return word.slice(0, -2);
  }

  // Words ending in 'es' (general case)
  if (lowercaseWord.endsWith('es') && lowercaseWord.length > 2) {
    return word.slice(0, -2);
  }

  // Words ending in 's' (general case)
  if (lowercaseWord.endsWith('s') && lowercaseWord.length > 1) {
    return word.slice(0, -1);
  }

  // Return original if no pattern matches
  return word;
}

/**
 * Helper function to preserve the case pattern of the original word
 */
function preserveCase(originalWord: string, singularForm: string): string {
  // If original is all uppercase
  if (originalWord === originalWord.toUpperCase()) {
    return singularForm.toUpperCase();
  }

  // If original is capitalized
  if (originalWord[0] === originalWord[0].toUpperCase()) {
    return singularForm.charAt(0).toUpperCase() + singularForm.slice(1);
  }

  // Return as-is for lowercase
  return singularForm;
}
