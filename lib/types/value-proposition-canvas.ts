/**
 * Value Proposition Canvas Types
 * Based on Strategyzer's Value Proposition Canvas
 * https://www.strategyzer.com/canvas/value-proposition-canvas
 */

export interface ValuePropositionCanvas {
  id: string
  name: string
  description?: string
  createdAt: string
  updatedAt: string

  // CUSTOMER PROFILE (Right Side)
  customerJobs: string
  customerPains: string
  customerGains: string

  // VALUE MAP (Left Side)
  productsServices: string
  painRelievers: string
  gainCreators: string
}

export interface ValuePropositionCanvasExport {
  canvas: ValuePropositionCanvas
  exportedAt: string
  version: string
}
