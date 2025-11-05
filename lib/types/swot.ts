/**
 * SWOT Analysis Types
 * A strategic planning tool for identifying Strengths, Weaknesses, Opportunities, and Threats
 */

export interface SWOTAnalysis {
  id: string
  name: string
  description?: string
  createdAt: string
  updatedAt: string

  // The 4 quadrants
  strengths: string
  weaknesses: string
  opportunities: string
  threats: string
}

export interface SWOTAnalysisExport {
  analysis: SWOTAnalysis
  exportedAt: string
  version: string
}
