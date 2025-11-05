/**
 * Ansoff Matrix Types
 * A strategic planning tool for analyzing growth strategies across market-product dimensions
 */

export interface AnsoffMatrix {
  id: string
  name: string
  description?: string
  createdAt: string
  updatedAt: string

  // The 4 quadrants
  marketPenetration: string
  marketDevelopment: string
  productDevelopment: string
  diversification: string
}

export interface AnsoffMatrixExport {
  matrix: AnsoffMatrix
  exportedAt: string
  version: string
}
