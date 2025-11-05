/**
 * PESTLE Analysis Types
 * A strategic tool for analyzing Political, Economic, Social, Technological, Legal, and Environmental factors
 */

export interface PESTLEAnalysis {
  id: string
  name: string
  description?: string
  createdAt: string
  updatedAt: string

  // The 6 factors
  political: string
  economic: string
  social: string
  technological: string
  legal: string
  environmental: string
}

export interface PESTLEAnalysisExport {
  analysis: PESTLEAnalysis
  exportedAt: string
  version: string
}
