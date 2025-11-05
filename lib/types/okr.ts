/**
 * OKR (Objectives and Key Results) Types
 * A goal-setting framework for defining and tracking objectives and measurable outcomes
 */

export interface OKR {
  id: string
  name: string
  description?: string
  createdAt: string
  updatedAt: string

  // 1 Objective and up to 4 Key Results
  objective: string
  keyResult1: string
  keyResult2: string
  keyResult3: string
  keyResult4: string
}

export interface OKRExport {
  okr: OKR
  exportedAt: string
  version: string
}
