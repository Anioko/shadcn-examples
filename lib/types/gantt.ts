// Gantt Types - Timeline project structure

export type GanttTaskPriority = "low" | "medium" | "high" | "critical"
export type GanttTaskStatus = string // Dynamic based on framework
export type GanttTaskSource = "task" | "frameworkTask" | "workflow" | "mock"

export interface GanttTask {
  // Core fields
  id: string
  title: string
  description?: string
  status: GanttTaskStatus
  frameworkId: string
  priority: GanttTaskPriority
  createdAt: Date
  updatedAt: Date

  // Timeline fields
  startDate: Date
  endDate: Date
  progress?: number // 0-100

  // Assignee (from User model)
  assignee?: {
    id: string
    name: string
    email?: string
    avatar?: string
  }

  // Optional fields
  tags?: string[]
  dependencies?: string[] // IDs of tasks this depends on

  // Database integration fields
  organizationId?: string // For multi-tenancy
  lanePosition?: number // Position within the lane (for ordering)
  source?: GanttTaskSource // Which database model this comes from

  // Related entities (for drill-down and context)
  sprintId?: string
  projectId?: string
  workflowId?: string

  // Framework-specific metadata
  metadata?: {
    type?: string // Task type (e.g., "Phase", "Milestone", "Deliverable")
    phase?: string // Framework phase/segment
    frameworkType?: string // TOGAF, PRINCE2, PMBOK, etc.
    segmentName?: string // e.g., "ADM_PHASE_A", "Architecture Vision"

    // Task-specific
    taskType?: string // IMPLEMENTATION, AUDIT, REVIEW, etc.
    dependsOnTaskIds?: string[]
    blockedByTaskIds?: string[]

    // Milestone
    isMilestone?: boolean
    milestoneType?: string

    // Resource
    estimatedHours?: number
    actualHours?: number
    resourceName?: string

    // Any other framework-specific data
    [key: string]: any
  }
}

export interface GanttLane {
  id: string
  title: string
  description?: string
  color?: string // Lane accent color
  order: number
}

export interface GanttBoardConfig {
  frameworkId: string
  frameworkName: string
  lanes: GanttLane[]
  taskTypes?: string[] // Types of work items this framework tracks
  defaultView?: "all" | "my-items" | "critical-path"
  startDate: Date
  endDate: Date
  viewMode?: "daily" | "monthly" | "quarterly"
}

export interface GanttBoard {
  id: string
  frameworkId: string
  name: string
  config: GanttBoardConfig
  tasks: GanttTask[]
}
