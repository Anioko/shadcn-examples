// Framework-specific Gantt timeline configurations
// Supports project/phase-based frameworks with sequential/parallel workflows

import { GanttBoardConfig } from "./types/gantt"

// =============================================================================
// GANTT-SUITABLE FRAMEWORKS (Project/Phase-based)
// =============================================================================

// 1. TOGAF ADM
export const togafGanttConfig: GanttBoardConfig = {
  frameworkId: "togaf",
  frameworkName: "TOGAF ADM",
  lanes: [
    { id: "preliminary", title: "Preliminary Phase", description: "Framework and principles setup", color: "bg-slate-100", order: 0 },
    { id: "phase-a", title: "Phase A: Architecture Vision", description: "Define scope and vision", color: "bg-blue-100", order: 1 },
    { id: "phase-b", title: "Phase B: Business Architecture", description: "Business architecture baseline", color: "bg-yellow-100", order: 2 },
    { id: "phase-c", title: "Phase C: Information Systems", description: "Data and application architecture", color: "bg-purple-100", order: 3 },
    { id: "phase-d", title: "Phase D: Technology Architecture", description: "Technology architecture", color: "bg-orange-100", order: 4 },
    { id: "phase-ef", title: "Phase E&F: Opportunities & Migration", description: "Solutions and migration planning", color: "bg-pink-100", order: 5 },
    { id: "phase-g", title: "Phase G: Implementation Governance", description: "Govern implementation", color: "bg-indigo-100", order: 6 },
    { id: "phase-h", title: "Phase H: Change Management", description: "Architecture change management", color: "bg-green-100", order: 7 },
  ],
  taskTypes: ["Architecture Deliverable", "Building Block", "Work Package", "Milestone"],
  defaultView: "all",
  startDate: new Date(2025, 0, 1),
  endDate: new Date(2025, 11, 31),
  viewMode: "monthly",
}

// 2. PRINCE2
export const prince2GanttConfig: GanttBoardConfig = {
  frameworkId: "prince2",
  frameworkName: "PRINCE2",
  lanes: [
    { id: "starting-up", title: "Starting Up a Project", description: "Pre-project initiation", color: "bg-slate-100", order: 0 },
    { id: "initiating", title: "Initiating a Project", description: "Detailed project plan", color: "bg-blue-100", order: 1 },
    { id: "stage-1", title: "Stage 1: Foundation", description: "Project foundation stage", color: "bg-yellow-100", order: 2 },
    { id: "stage-2", title: "Stage 2: Development", description: "Main development stage", color: "bg-purple-100", order: 3 },
    { id: "stage-3", title: "Stage 3: Delivery", description: "Product delivery stage", color: "bg-orange-100", order: 4 },
    { id: "closing", title: "Closing a Project", description: "Project closure activities", color: "bg-green-100", order: 5 },
  ],
  taskTypes: ["Stage", "Work Package", "Deliverable", "Decision Point"],
  defaultView: "all",
  startDate: new Date(2025, 0, 1),
  endDate: new Date(2025, 5, 30),
  viewMode: "daily",
}

// 3. PMBOK
export const pmbokGanttConfig: GanttBoardConfig = {
  frameworkId: "pmbok",
  frameworkName: "PMBOK",
  lanes: [
    { id: "integration", title: "Integration Management", description: "Project integration processes", color: "bg-blue-100", order: 0 },
    { id: "scope", title: "Scope Management", description: "Scope planning and control", color: "bg-purple-100", order: 1 },
    { id: "schedule", title: "Schedule Management", description: "Schedule development and control", color: "bg-yellow-100", order: 2 },
    { id: "cost", title: "Cost Management", description: "Cost estimation and control", color: "bg-orange-100", order: 3 },
    { id: "quality", title: "Quality Management", description: "Quality planning and assurance", color: "bg-pink-100", order: 4 },
    { id: "resources", title: "Resource Management", description: "Resource planning and management", color: "bg-indigo-100", order: 5 },
    { id: "communications", title: "Communications Management", description: "Communication planning", color: "bg-green-100", order: 6 },
    { id: "risk", title: "Risk Management", description: "Risk identification and mitigation", color: "bg-red-100", order: 7 },
    { id: "procurement", title: "Procurement Management", description: "Procurement and contracts", color: "bg-cyan-100", order: 8 },
    { id: "stakeholder", title: "Stakeholder Management", description: "Stakeholder engagement", color: "bg-lime-100", order: 9 },
  ],
  taskTypes: ["Activity", "Deliverable", "Milestone", "Phase Gate"],
  defaultView: "all",
  startDate: new Date(2025, 0, 1),
  endDate: new Date(2025, 11, 31),
  viewMode: "monthly",
}

// 4. Azure Cloud Adoption Framework
export const azureCafGanttConfig: GanttBoardConfig = {
  frameworkId: "azure-caf",
  frameworkName: "Azure Cloud Adoption Framework",
  lanes: [
    { id: "strategy", title: "Strategy", description: "Define business justification and outcomes", color: "bg-slate-100", order: 0 },
    { id: "plan", title: "Plan", description: "Cloud adoption plan", color: "bg-blue-100", order: 1 },
    { id: "ready", title: "Ready", description: "Prepare cloud environment", color: "bg-yellow-100", order: 2 },
    { id: "adopt-migrate", title: "Adopt: Migrate", description: "Migrate workloads", color: "bg-purple-100", order: 3 },
    { id: "adopt-innovate", title: "Adopt: Innovate", description: "Develop cloud-native solutions", color: "bg-orange-100", order: 4 },
    { id: "govern", title: "Govern", description: "Governance and compliance", color: "bg-pink-100", order: 5 },
    { id: "manage", title: "Manage", description: "Operations management", color: "bg-green-100", order: 6 },
  ],
  taskTypes: ["Workload", "Migration Wave", "Landing Zone", "Milestone"],
  defaultView: "all",
  startDate: new Date(2025, 0, 1),
  endDate: new Date(2025, 8, 30),
  viewMode: "monthly",
}

// =============================================================================
// Registry of All Framework Configs
// =============================================================================

export const frameworkGanttConfigs: Record<string, GanttBoardConfig> = {
  "togaf": togafGanttConfig,
  "prince2": prince2GanttConfig,
  "pmbok": pmbokGanttConfig,
  "azure-caf": azureCafGanttConfig,
}

// Helper function to get config for a framework
export function getFrameworkGanttConfig(frameworkId: string): GanttBoardConfig | null {
  return frameworkGanttConfigs[frameworkId] || null
}

// Helper to check if a framework supports Gantt
export function supportsGantt(frameworkId: string): boolean {
  return frameworkId in frameworkGanttConfigs
}

// Get all supported framework IDs
export function getSupportedGanttFrameworks(): string[] {
  return Object.keys(frameworkGanttConfigs)
}
