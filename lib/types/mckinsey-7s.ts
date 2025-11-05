/**
 * McKinsey 7S Framework Types
 * A strategic planning and management model for analyzing organizational effectiveness
 */

export interface McKinsey7S {
  id: string
  name: string
  description?: string
  createdAt: string
  updatedAt: string

  // The 7 elements
  // Hard elements
  strategy: string
  structure: string
  systems: string

  // Soft elements
  sharedValues: string
  style: string
  staff: string
  skills: string
}

export interface McKinsey7SExport {
  framework: McKinsey7S
  exportedAt: string
  version: string
}
