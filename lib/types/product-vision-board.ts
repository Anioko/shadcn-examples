/**
 * Product Vision Board Types
 * Roman Pichler's tool for defining product vision and strategy
 * https://www.romanpichler.com/tools/product-vision-board/
 */

export interface ProductVisionBoard {
  id: string
  name: string
  description?: string
  createdAt: string
  updatedAt: string

  // The 5 sections
  vision: string
  targetGroup: string
  needs: string
  product: string
  businessGoals: string
}

export interface ProductVisionBoardExport {
  board: ProductVisionBoard
  exportedAt: string
  version: string
}
