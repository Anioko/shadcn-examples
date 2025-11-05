// Workflow Types - Visual process flow structure

export type WorkflowNodeType =
  // BPMN types
  | "start" | "end" | "task" | "decision" | "parallel" | "event" | "subprocess" | "gateway"
  // ArchiMate 3.2 - Motivation Layer
  | "goal" | "driver" | "stakeholder" | "assessment" | "outcome" | "principle" | "requirement" | "constraint" | "meaning" | "value"
  // ArchiMate 3.2 - Strategy Layer
  | "capability" | "course-of-action" | "resource" | "value-stream"
  // ArchiMate 3.2 - Business Layer
  | "business-actor" | "business-role" | "business-collaboration" | "business-interface"
  | "business-process" | "business-function" | "business-interaction" | "business-event"
  | "business-service" | "business-object" | "contract" | "representation" | "product"
  // ArchiMate 3.2 - Application Layer
  | "application-component" | "application-collaboration" | "application-interface"
  | "application-function" | "application-interaction" | "application-process" | "application-event"
  | "application-service" | "data-object"
  // ArchiMate 3.2 - Technology Layer
  | "infrastructure-node" | "device" | "system-software" | "technology-collaboration" | "technology-interface"
  | "path" | "communication-network"
  | "technology-function" | "technology-process" | "technology-interaction" | "technology-event"
  | "technology-service" | "artifact"
  // ArchiMate 3.2 - Physical Layer
  | "equipment" | "facility" | "distribution-network" | "material" | "location"
  // ArchiMate 3.2 - Implementation & Migration Layer
  | "work-package" | "deliverable" | "implementation-event" | "plateau" | "gap"
  // ArchiMate 3.2 - Composite & Other
  | "grouping"
  // Capability Model types
  | "sub-capability" | "application" | "process" | "organization"

export type WorkflowNodeStatus = "active" | "completed" | "pending" | "error"

export interface WorkflowNode {
  id: string
  type: WorkflowNodeType
  label: string
  description?: string
  status: WorkflowNodeStatus

  // Position on canvas
  position: {
    x: number
    y: number
  }

  // Visual styling
  color?: string
  icon?: string

  // Metadata
  metadata?: Record<string, unknown> & {
    duration?: string
    assignee?: string
    automation?: boolean
    sla?: string
  }
}

export interface WorkflowEdge {
  id: string
  source: string
  target: string
  label?: string
  condition?: string
  type?: "default" | "conditional" | "error" | "archimate-structural" | "archimate-dependency" | "archimate-dynamic" | "capability-relationship"
  // ArchiMate 3.2 specific relationship types
  archimateRelationType?:
    // Structural
    | "composition" | "aggregation" | "assignment" | "realization"
    // Dependency
    | "serving" | "access" | "influence" | "association"
    // Dynamic
    | "triggering" | "flow"
    // Other
    | "specialization"
  // Capability Model specific relationship types
  capabilityRelationType?:
    | "supports" | "depends-on" | "enables" | "uses"
}

export interface WorkflowLane {
  id: string
  title: string
  description?: string
  color?: string
  order: number
}

export interface WorkflowBoardConfig {
  frameworkId: string
  frameworkName: string
  lanes?: WorkflowLane[]
  nodeTypes: WorkflowNodeType[]
  defaultView?: "all" | "active" | "critical-path"
}

export interface WorkflowBoard {
  id: string
  frameworkId: string
  name: string
  description?: string
  config: WorkflowBoardConfig
  nodes: WorkflowNode[]
  edges: WorkflowEdge[]
}
