// Roadmap/Gantt Types - Timeline-based planning structure

export type RoadmapItemPriority = "low" | "medium" | "high" | "critical"
export type RoadmapItemStatus = "draft" | "planning" | "in-progress" | "completed" | "on-hold" | "cancelled"

export interface RoadmapItem {
  // Core fields
  id: string
  name: string
  description?: string
  startAt: Date
  endAt: Date
  status: {
    id: RoadmapItemStatus
    name: string
    color: string
  }
  frameworkId: string
  priority: RoadmapItemPriority
  createdAt: Date
  updatedAt: Date

  // Grouping
  group: string // Category/group for organizing items (e.g., "Infrastructure", "Security", "Product Features")
  lane?: string // Optional: items with the same lane will share a row

  // Assignee (from User model)
  owner?: {
    id: string
    name: string
    email?: string
    avatar?: string
  }

  // Optional fields
  tags?: string[]
  dependencies?: string[] // IDs of items this depends on

  // Database integration fields
  organizationId?: string // For multi-tenancy
  
  // Related entities
  projectId?: string
  milestoneId?: string

  // Framework-specific metadata
  metadata?: {
    type?: string // Item type (e.g., "Initiative", "Epic", "Milestone")
    phase?: string // Framework phase
    completionPercent?: number // 0-100
    budget?: number
    resources?: string[]
    risks?: string[]
    
    // Any other framework-specific data
    [key: string]: any
  }
}

export interface RoadmapGroup {
  id: string
  name: string
  description?: string
  color?: string
  order: number
}

export interface RoadmapBoardConfig {
  frameworkId: string
  frameworkName: string
  groups: RoadmapGroup[]
  itemTypes?: string[] // Types of roadmap items this framework tracks
  defaultRange?: "daily" | "monthly" | "quarterly" // Matches GanttProvider Range type
  defaultView?: "all" | "active" | "by-priority"
}

export interface RoadmapBoard {
  id: string
  frameworkId: string
  name: string
  description?: string
  config: RoadmapBoardConfig
  items: RoadmapItem[]
}
