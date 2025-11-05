/**
 * Wardley Mapping Types
 * A strategic planning tool for mapping value chains and understanding component evolution
 */

export interface WardleyMapping {
  id: string
  name: string
  description?: string
  createdAt: string
  updatedAt: string

  // 4 sections of Wardley Mapping
  valueChain: string
  evolutionStages: string
  components: string
  strategicMovement: string
}

export interface WardleyMappingExport {
  wardleyMapping: WardleyMapping
  exportedAt: string
  version: string
}
