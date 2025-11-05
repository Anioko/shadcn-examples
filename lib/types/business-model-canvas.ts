/**
 * Business Model Canvas Types
 * Based on Strategyzer's Business Model Canvas
 */

export interface BusinessModelCanvas {
  id: string
  name: string
  description?: string
  createdAt: string
  updatedAt: string

  // The 9 blocks of the Business Model Canvas
  keyPartners: string
  keyActivities: string
  keyResources: string
  valuePropositions: string
  customerRelationships: string
  channels: string
  customerSegments: string
  costStructure: string
  revenueStreams: string
}

export interface BusinessModelCanvasExport {
  canvas: BusinessModelCanvas
  exportedAt: string
  version: string
}
