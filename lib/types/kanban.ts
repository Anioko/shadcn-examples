// Kanban Types - Polymorphic work item structure

export type KanbanCardPriority = "low" | "medium" | "high" | "critical"
export type KanbanCardStatus = string // Dynamic based on framework columns
export type KanbanCardSource = "task" | "frameworkTask" | "workflow" | "mock"

export interface KanbanCard {
  // Core fields
  id: string
  title: string
  description?: string
  status: KanbanCardStatus
  frameworkId: string
  priority: KanbanCardPriority
  createdAt: Date
  updatedAt: Date

  // Assignee (from User model)
  assignee?: {
    id: string
    name: string
    email?: string
    avatar?: string
  }

  // Optional fields
  dueDate?: Date
  tags?: string[]

  // Database integration fields
  organizationId?: string // For multi-tenancy
  columnPosition?: number // Position within the column (for ordering)
  source?: KanbanCardSource // Which database model this comes from

  // Related entities (for drill-down and context)
  sprintId?: string
  projectId?: string
  workflowId?: string

  // Framework-specific metadata
  metadata?: {
    type?: string // Card type (e.g., "Compliance", "Project", "Process")
    phase?: string // Framework phase/segment
    controlId?: string // For compliance frameworks (ISO, NIST, etc.)
    frameworkType?: string // HIPAA, SOC2, ISO27001, TOGAF, etc.
    segmentName?: string // e.g., "ADM_PHASE_A", "Architecture Vision"

    // FrameworkTask-specific
    taskType?: string // IMPLEMENTATION, AUDIT, REVIEW, etc.
    progress?: number // 0-100
    dependsOnTaskIds?: string[]
    blockedByTaskIds?: string[]

    // Workflow-specific
    totalTasks?: number
    completedTasks?: number
    progressPercent?: number

    // Sprint-specific
    storyPoints?: number

    // Any other framework-specific data
    [key: string]: any
  }
}

export interface KanbanColumn {
  id: string
  title: string
  status: string
  description?: string
  color?: string // Column accent color
  limit?: number // WIP limit (for Phase 2)
  order: number
}

export interface KanbanBoardConfig {
  frameworkId: string
  frameworkName: string
  columns: KanbanColumn[]
  cardTypes?: string[] // Types of work items this framework tracks
  defaultView?: "all" | "my-items" | "overdue"
}

export interface KanbanBoard {
  id: string
  frameworkId: string
  name: string
  config: KanbanBoardConfig
  cards: KanbanCard[]
}
