/**
 * Lean Canvas Types
 * Based on Ash Maurya's Lean Canvas - A 1-page business model for startups
 * https://leanstack.com/lean-canvas
 */

export interface LeanCanvas {
  id: string
  name: string
  description?: string
  createdAt: string
  updatedAt: string

  // The 9 blocks of the Lean Canvas
  problem: string
  solution: string
  uniqueValueProposition: string
  unfairAdvantage: string
  customerSegments: string
  keyMetrics: string
  channels: string
  costStructure: string
  revenueStreams: string
}

export interface LeanCanvasExport {
  canvas: LeanCanvas
  exportedAt: string
  version: string
}
