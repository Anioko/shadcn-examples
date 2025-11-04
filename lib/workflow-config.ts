// Framework-specific Workflow board configurations
// Supports process-flow and service-based frameworks

import { WorkflowBoardConfig } from "./types/workflow"

// =============================================================================
// WORKFLOW-SUITABLE FRAMEWORKS (Process-flow based)
// =============================================================================

// 1. BPMN 2.0 - Business Process Model and Notation
export const bpmnWorkflowConfig: WorkflowBoardConfig = {
  frameworkId: "bpmn",
  frameworkName: "BPMN 2.0",
  lanes: [
    { id: "customer", title: "Customer", description: "Customer actions and interactions", color: "bg-blue-100", order: 0 },
    { id: "sales", title: "Sales", description: "Sales team processes", color: "bg-green-100", order: 1 },
    { id: "fulfillment", title: "Fulfillment", description: "Order fulfillment processes", color: "bg-purple-100", order: 2 },
    { id: "finance", title: "Finance", description: "Financial processes", color: "bg-orange-100", order: 3 },
  ],
  nodeTypes: ["start", "task", "decision", "parallel", "event", "subprocess", "end"],
  defaultView: "all",
}

// 2. ITIL 4 - Service Management Workflows
export const itil4WorkflowConfig: WorkflowBoardConfig = {
  frameworkId: "itil-4",
  frameworkName: "ITIL 4",
  lanes: [
    { id: "user", title: "User/Customer", description: "End user interactions", color: "bg-slate-100", order: 0 },
    { id: "service-desk", title: "Service Desk", description: "First line support", color: "bg-blue-100", order: 1 },
    { id: "support-team", title: "Support Team", description: "Technical support team", color: "bg-purple-100", order: 2 },
    { id: "change-management", title: "Change Management", description: "Change approval and coordination", color: "bg-orange-100", order: 3 },
  ],
  nodeTypes: ["start", "task", "decision", "gateway", "event", "end"],
  defaultView: "all",
}

// 3. DevOps & DORA - CI/CD Pipeline
export const devopsWorkflowConfig: WorkflowBoardConfig = {
  frameworkId: "devops",
  frameworkName: "DevOps Pipeline",
  lanes: [
    { id: "development", title: "Development", description: "Code development activities", color: "bg-blue-100", order: 0 },
    { id: "build", title: "Build & Test", description: "Automated build and testing", color: "bg-green-100", order: 1 },
    { id: "staging", title: "Staging", description: "Pre-production environment", color: "bg-yellow-100", order: 2 },
    { id: "production", title: "Production", description: "Live deployment", color: "bg-red-100", order: 3 },
  ],
  nodeTypes: ["start", "task", "decision", "parallel", "gateway", "end"],
  defaultView: "all",
}

// 4. Lean / Value Stream Mapping
export const leanWorkflowConfig: WorkflowBoardConfig = {
  frameworkId: "lean",
  frameworkName: "Lean Value Stream",
  lanes: [
    { id: "supplier", title: "Supplier", description: "Upstream supplier processes", color: "bg-slate-100", order: 0 },
    { id: "manufacturing", title: "Manufacturing", description: "Production processes", color: "bg-blue-100", order: 1 },
    { id: "distribution", title: "Distribution", description: "Logistics and distribution", color: "bg-green-100", order: 2 },
    { id: "customer", title: "Customer", description: "Customer delivery", color: "bg-purple-100", order: 3 },
  ],
  nodeTypes: ["task", "decision", "event", "subprocess"],
  defaultView: "all",
}

// 5. ArchiMate 3.2 - Enterprise Architecture Modeling
export const archimate32WorkflowConfig: WorkflowBoardConfig = {
  frameworkId: "archimate3.2",
  frameworkName: "ArchiMate 3.2",
  lanes: [
    { id: "motivation", title: "Motivation Layer", description: "Goals, drivers, and requirements", color: "bg-purple-100", order: 0 },
    { id: "strategy", title: "Strategy Layer", description: "Strategic direction and capabilities", color: "bg-pink-100", order: 1 },
    { id: "business", title: "Business Layer", description: "Business processes and actors", color: "bg-yellow-100", order: 2 },
    { id: "application", title: "Application Layer", description: "Application components and services", color: "bg-cyan-100", order: 3 },
    { id: "technology", title: "Technology Layer", description: "Infrastructure and technology services", color: "bg-green-100", order: 4 },
    { id: "physical", title: "Physical Layer", description: "Physical equipment and facilities", color: "bg-gray-100", order: 5 },
    { id: "implementation", title: "Implementation & Migration", description: "Project work packages", color: "bg-orange-100", order: 6 },
  ],
  nodeTypes: [
    // Motivation Layer
    "goal", "driver", "stakeholder", "assessment", "outcome", "principle", "requirement", "constraint", "meaning", "value",
    // Strategy Layer
    "capability", "course-of-action", "resource", "value-stream",
    // Business Layer
    "business-actor", "business-role", "business-collaboration", "business-interface",
    "business-process", "business-function", "business-interaction", "business-event",
    "business-service", "business-object", "contract", "representation", "product",
    // Application Layer
    "application-component", "application-collaboration", "application-interface",
    "application-function", "application-interaction", "application-process", "application-event",
    "application-service", "data-object",
    // Technology Layer
    "infrastructure-node", "device", "system-software", "technology-collaboration", "technology-interface",
    "path", "communication-network",
    "technology-function", "technology-process", "technology-interaction", "technology-event",
    "technology-service", "artifact",
    // Physical Layer
    "equipment", "facility", "distribution-network", "material", "location",
    // Implementation & Migration Layer
    "work-package", "deliverable", "implementation-event", "plateau", "gap",
    // Composite & Other
    "grouping",
  ],
  defaultView: "all",
}

// 6. Data Architecture / ERD - Entity Relationship Diagrams with Crow's Foot Notation
export const dataArchitectureWorkflowConfig: WorkflowBoardConfig = {
  frameworkId: "data-architecture",
  frameworkName: "Data Architecture (ERD)",
  lanes: [
    { id: "conceptual", title: "Conceptual Layer", description: "High-level business entities", color: "bg-purple-100", order: 0 },
    { id: "logical", title: "Logical Layer", description: "Detailed entity relationships", color: "bg-blue-100", order: 1 },
    { id: "physical", title: "Physical Layer", description: "Database implementation", color: "bg-green-100", order: 2 },
  ],
  nodeTypes: [
    // Entity types
    "entity", "table", "view", "materialized-view",
    // Relationship markers (for edge labeling)
    "one-to-one", "one-to-many", "many-to-one", "many-to-many",
    // Constraint types
    "primary-key", "foreign-key", "unique", "index",
  ],
  defaultView: "all",
}

// =============================================================================
// Registry of All Framework Configs
// =============================================================================

export const frameworkWorkflowConfigs: Record<string, WorkflowBoardConfig> = {
  "bpmn": bpmnWorkflowConfig,
  "itil-4": itil4WorkflowConfig,
  "devops": devopsWorkflowConfig,
  "lean": leanWorkflowConfig,
  "archimate3.2": archimate32WorkflowConfig,
  "data-architecture": dataArchitectureWorkflowConfig,
}

// Helper function to get config for a framework
export function getFrameworkWorkflowConfig(frameworkId: string): WorkflowBoardConfig | null {
  return frameworkWorkflowConfigs[frameworkId] || null
}

// Helper to check if a framework supports Workflow
export function supportsWorkflow(frameworkId: string): boolean {
  return frameworkId in frameworkWorkflowConfigs
}

// Get all supported framework IDs
export function getSupportedWorkflowFrameworks(): string[] {
  return Object.keys(frameworkWorkflowConfigs)
}
