/**
 * Blue Ocean Strategy Canvas Types
 * A strategic planning tool for creating uncontested market space using the ERRC framework
 * (Eliminate, Reduce, Raise, Create)
 *
 * Based on the Blue Ocean Strategy by W. Chan Kim and Renée Mauborgne
 */

export interface BlueOceanStrategy {
  id: string
  name: string
  description?: string
  createdAt: string
  updatedAt: string

  // The 4 action framework (ERRC)
  eliminate: string
  reduce: string
  raise: string
  create: string
}

export interface BlueOceanStrategyExport {
  strategy: BlueOceanStrategy
  exportedAt: string
  version: string
}
