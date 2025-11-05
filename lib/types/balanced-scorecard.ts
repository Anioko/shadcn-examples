/**
 * Balanced Scorecard Types
 * A strategic planning and management system for measuring organizational performance across four perspectives
 */

export interface BalancedScorecard {
  id: string
  name: string
  description?: string
  createdAt: string
  updatedAt: string

  // The 4 perspectives
  financialPerspective: string
  customerPerspective: string
  internalProcessPerspective: string
  learningGrowthPerspective: string
}

export interface BalancedScorecardExport {
  scorecard: BalancedScorecard
  exportedAt: string
  version: string
}
