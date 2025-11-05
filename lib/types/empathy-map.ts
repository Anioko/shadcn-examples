/**
 * Empathy Map Types
 * A collaborative tool to gain deeper insight into customers
 * https://www.nngroup.com/articles/empathy-mapping/
 */

export interface EmpathyMap {
  id: string
  name: string
  description?: string
  createdAt: string
  updatedAt: string

  // The 4 quadrants + 2 additional sections
  says: string
  thinks: string
  does: string
  feels: string
  pains: string
  gains: string
}

export interface EmpathyMapExport {
  map: EmpathyMap
  exportedAt: string
  version: string
}
