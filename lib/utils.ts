import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Convert plural words to singular form
 * Simple implementation for common cases
 */
export function singularize(word: string): string {
  // Handle special cases first
  const specialCases: Record<string, string> = {
    "People": "Person",
    "Children": "Child",
    "Analyses": "Analysis",
    "Crises": "Crisis",
    "Criteria": "Criterion",
    "Data": "Datum",
    "Foci": "Focus",
    "Fungi": "Fungus",
    "Hypotheses": "Hypothesis",
    "Indices": "Index",
    "Matrices": "Matrix",
    "Nuclei": "Nucleus",
    "Phenomena": "Phenomenon",
    "Radii": "Radius",
    "Stimuli": "Stimulus",
    "Syntheses": "Synthesis",
    "Theses": "Thesis",
  }

  // Check special cases (case-insensitive)
  for (const [plural, singular] of Object.entries(specialCases)) {
    if (word.toLowerCase() === plural.toLowerCase()) {
      // Preserve original casing
      if (word === word.toUpperCase()) return singular.toUpperCase()
      if (word[0] === word[0].toUpperCase()) return singular
      return singular.toLowerCase()
    }
  }

  // If already singular or doesn't end in 's', return as-is
  if (!word.endsWith('s') && !word.endsWith('S')) {
    return word
  }

  // Handle common plural patterns
  if (word.match(/.*ies$/i)) {
    // activities -> activity, policies -> policy
    return word.slice(0, -3) + 'y'
  } else if (word.match(/.*oes$/i)) {
    // heroes -> hero, tomatoes -> tomato
    return word.slice(0, -2)
  } else if (word.match(/.*sses$/i)) {
    // processes -> process, classes -> class
    return word.slice(0, -2)
  } else if (word.match(/.*xes$/i)) {
    // boxes -> box, fixes -> fix
    return word.slice(0, -2)
  } else if (word.match(/.*ches$/i) || word.match(/.*shes$/i)) {
    // branches -> branch, dishes -> dish
    return word.slice(0, -2)
  } else if (word.match(/.*s$/i)) {
    // Remove final 's'
    return word.slice(0, -1)
  }

  return word
}
