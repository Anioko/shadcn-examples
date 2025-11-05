/**
 * Porter's Five Forces Analysis Types
 * A framework for analyzing competitive forces that shape every industry
 */

export interface PortersFiveForcesAnalysis {
  id: string
  name: string
  description?: string
  createdAt: string
  updatedAt: string

  // The 5 forces
  threatOfNewEntrants: string
  bargainingPowerOfSuppliers: string
  bargainingPowerOfBuyers: string
  threatOfSubstitutes: string
  competitiveRivalry: string
}

export interface PortersFiveForcesAnalysisExport {
  analysis: PortersFiveForcesAnalysis
  exportedAt: string
  version: string
}
