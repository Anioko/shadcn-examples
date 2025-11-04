// Mock data for Roadmap/Gantt views across frameworks
import { RoadmapItem } from "./types/roadmap"

// Helper to create status objects
const createStatus = (id: RoadmapItem["status"]["id"], name: string, color: string) => ({ id, name, color })

// =============================================================================
// Scrum - Sprint & Release Planning
// =============================================================================

export const scrumMockRoadmapItems: RoadmapItem[] = [
  {
    id: "scrum-1",
    name: "Q1 2024 Release",
    description: "Major product release with new features",
    startAt: new Date(2024, 0, 1),
    endAt: new Date(2024, 2, 31),
    status: createStatus("in-progress", "In Progress", "#3B82F6"),
    frameworkId: "scrum",
    priority: "high",
    group: "releases",
    createdAt: new Date(2023, 11, 1),
    updatedAt: new Date(2024, 0, 15),
    metadata: { type: "Release", completionPercent: 65 },
  },
  {
    id: "scrum-2",
    name: "Sprint 15",
    startAt: new Date(2024, 0, 15),
    endAt: new Date(2024, 0, 28),
    status: createStatus("completed", "Completed", "#10B981"),
    frameworkId: "scrum",
    priority: "high",
    group: "sprints",
    createdAt: new Date(2024, 0, 1),
    updatedAt: new Date(2024, 0, 28),
    metadata: { type: "Sprint", completionPercent: 100 },
  },
  {
    id: "scrum-3",
    name: "User Authentication Epic",
    description: "Complete overhaul of authentication system",
    startAt: new Date(2024, 0, 1),
    endAt: new Date(2024, 1, 15),
    status: createStatus("completed", "Completed", "#10B981"),
    frameworkId: "scrum",
    priority: "critical",
    group: "epics",
    createdAt: new Date(2023, 11, 15),
    updatedAt: new Date(2024, 1, 15),
    metadata: { type: "Epic", completionPercent: 100 },
  },
  {
    id: "scrum-4",
    name: "Sprint 16",
    startAt: new Date(2024, 0, 29),
    endAt: new Date(2024, 1, 11),
    status: createStatus("in-progress", "In Progress", "#3B82F6"),
    frameworkId: "scrum",
    priority: "high",
    group: "sprints",
    createdAt: new Date(2024, 0, 15),
    updatedAt: new Date(2024, 1, 5),
    metadata: { type: "Sprint", completionPercent: 45 },
  },
]

// =============================================================================
// SAFe - Program Increment Planning
// =============================================================================

export const safeMockRoadmapItems: RoadmapItem[] = [
  {
    id: "safe-1",
    name: "PI 2024.1",
    description: "Program Increment Q1-Q2 2024",
    startAt: new Date(2024, 0, 1),
    endAt: new Date(2024, 2, 31),
    status: createStatus("in-progress", "In Progress", "#3B82F6"),
    frameworkId: "safe",
    priority: "high",
    group: "program-increments",
    createdAt: new Date(2023, 11, 1),
    updatedAt: new Date(2024, 1, 1),
    metadata: { type: "Program Increment", completionPercent: 40 },
  },
  {
    id: "safe-2",
    name: "Customer Portal Redesign",
    startAt: new Date(2024, 0, 15),
    endAt: new Date(2024, 2, 15),
    status: createStatus("in-progress", "In Progress", "#3B82F6"),
    frameworkId: "safe",
    priority: "high",
    group: "features",
    createdAt: new Date(2023, 11, 20),
    updatedAt: new Date(2024, 1, 10),
    metadata: { type: "Feature", completionPercent: 55 },
  },
  {
    id: "safe-3",
    name: "API Platform Modernization",
    description: "Technical enabler for microservices",
    startAt: new Date(2024, 1, 1),
    endAt: new Date(2024, 3, 30),
    status: createStatus("planning", "Planning", "#F59E0B"),
    frameworkId: "safe",
    priority: "medium",
    group: "enablers",
    createdAt: new Date(2024, 0, 5),
    updatedAt: new Date(2024, 1, 1),
    metadata: { type: "Enabler", completionPercent: 10 },
  },
]

// =============================================================================
// DevOps - Release Pipeline
// =============================================================================

export const devopsMockRoadmapItems: RoadmapItem[] = [
  {
    id: "devops-1",
    name: "v2.5.0 Release",
    description: "Performance improvements and bug fixes",
    startAt: new Date(2024, 1, 1),
    endAt: new Date(2024, 1, 15),
    status: createStatus("in-progress", "In Progress", "#3B82F6"),
    frameworkId: "devops",
    priority: "high",
    group: "releases",
    createdAt: new Date(2024, 0, 15),
    updatedAt: new Date(2024, 1, 5),
    metadata: { type: "Release", completionPercent: 70 },
  },
  {
    id: "devops-2",
    name: "Real-time Notifications",
    startAt: new Date(2024, 1, 5),
    endAt: new Date(2024, 2, 1),
    status: createStatus("in-progress", "In Progress", "#3B82F6"),
    frameworkId: "devops",
    priority: "medium",
    group: "features",
    createdAt: new Date(2024, 0, 20),
    updatedAt: new Date(2024, 1, 10),
    metadata: { type: "Feature", completionPercent: 40 },
  },
  {
    id: "devops-3",
    name: "Kubernetes Migration",
    description: "Move to Kubernetes orchestration",
    startAt: new Date(2024, 2, 1),
    endAt: new Date(2024, 4, 31),
    status: createStatus("planning", "Planning", "#F59E0B"),
    frameworkId: "devops",
    priority: "high",
    group: "infrastructure",
    createdAt: new Date(2024, 1, 1),
    updatedAt: new Date(2024, 1, 15),
    metadata: { type: "Infrastructure", completionPercent: 5 },
  },
]

// =============================================================================
// TOGAF - Architecture Development
// =============================================================================

export const togafMockRoadmapItems: RoadmapItem[] = [
  {
    id: "togaf-1",
    name: "Phase A: Architecture Vision",
    startAt: new Date(2024, 0, 1),
    endAt: new Date(2024, 0, 31),
    status: createStatus("completed", "Completed", "#10B981"),
    frameworkId: "togaf",
    priority: "high",
    group: "adm-phases",
    createdAt: new Date(2023, 11, 1),
    updatedAt: new Date(2024, 0, 31),
    metadata: { type: "ADM Phase", completionPercent: 100 },
  },
  {
    id: "togaf-2",
    name: "Phase B: Business Architecture",
    startAt: new Date(2024, 1, 1),
    endAt: new Date(2024, 2, 15),
    status: createStatus("in-progress", "In Progress", "#3B82F6"),
    frameworkId: "togaf",
    priority: "high",
    group: "adm-phases",
    createdAt: new Date(2024, 0, 15),
    updatedAt: new Date(2024, 2, 1),
    metadata: { type: "ADM Phase", completionPercent: 60 },
  },
  {
    id: "togaf-3",
    name: "Target Architecture Definition",
    startAt: new Date(2024, 1, 15),
    endAt: new Date(2024, 3, 30),
    status: createStatus("in-progress", "In Progress", "#3B82F6"),
    frameworkId: "togaf",
    priority: "high",
    group: "architecture-work",
    createdAt: new Date(2024, 1, 1),
    updatedAt: new Date(2024, 2, 10),
    metadata: { type: "Architecture", completionPercent: 35 },
  },
]

// =============================================================================
// Digital Transformation
// =============================================================================

export const digitalTransformationMockRoadmapItems: RoadmapItem[] = [
  {
    id: "dt-1",
    name: "Cloud Migration Initiative",
    description: "Move core systems to cloud infrastructure",
    startAt: new Date(2024, 0, 1),
    endAt: new Date(2024, 5, 30),
    status: createStatus("in-progress", "In Progress", "#3B82F6"),
    frameworkId: "digital-transformation",
    priority: "critical",
    group: "initiatives",
    createdAt: new Date(2023, 10, 1),
    updatedAt: new Date(2024, 1, 15),
    metadata: { type: "Initiative", completionPercent: 45, budget: 500000 },
  },
  {
    id: "dt-2",
    name: "Legacy System Modernization",
    startAt: new Date(2024, 2, 1),
    endAt: new Date(2024, 8, 31),
    status: createStatus("planning", "Planning", "#F59E0B"),
    frameworkId: "digital-transformation",
    priority: "high",
    group: "technology",
    createdAt: new Date(2024, 0, 15),
    updatedAt: new Date(2024, 2, 1),
    metadata: { type: "Project", completionPercent: 15 },
  },
  {
    id: "dt-3",
    name: "Agile Transformation",
    description: "Adopt agile methodologies across teams",
    startAt: new Date(2024, 1, 1),
    endAt: new Date(2024, 6, 31),
    status: createStatus("in-progress", "In Progress", "#3B82F6"),
    frameworkId: "digital-transformation",
    priority: "high",
    group: "culture",
    createdAt: new Date(2023, 11, 1),
    updatedAt: new Date(2024, 2, 1),
    metadata: { type: "Initiative", completionPercent: 30 },
  },
]

// =============================================================================
// OKRs - Objectives & Key Results
// =============================================================================

export const okrsMockRoadmapItems: RoadmapItem[] = [
  {
    id: "okr-1",
    name: "Increase Market Share by 15%",
    description: "Strategic objective for Q1-Q2",
    startAt: new Date(2024, 0, 1),
    endAt: new Date(2024, 5, 30),
    status: createStatus("in-progress", "In Progress", "#3B82F6"),
    frameworkId: "okrs",
    priority: "critical",
    group: "objectives",
    createdAt: new Date(2023, 11, 1),
    updatedAt: new Date(2024, 2, 1),
    metadata: { type: "Objective", completionPercent: 40 },
  },
  {
    id: "okr-2",
    name: "Launch in 3 New Markets",
    startAt: new Date(2024, 0, 1),
    endAt: new Date(2024, 5, 30),
    status: createStatus("in-progress", "In Progress", "#3B82F6"),
    frameworkId: "okrs",
    priority: "high",
    group: "key-results",
    createdAt: new Date(2023, 11, 15),
    updatedAt: new Date(2024, 2, 5),
    metadata: { type: "Key Result", completionPercent: 33 },
  },
  {
    id: "okr-3",
    name: "Marketing Campaign Initiative",
    startAt: new Date(2024, 1, 1),
    endAt: new Date(2024, 3, 31),
    status: createStatus("in-progress", "In Progress", "#3B82F6"),
    frameworkId: "okrs",
    priority: "medium",
    group: "initiatives",
    createdAt: new Date(2024, 0, 10),
    updatedAt: new Date(2024, 2, 1),
    metadata: { type: "Initiative", completionPercent: 50 },
  },
]

// =============================================================================
// Export Functions
// =============================================================================

export function getMockRoadmapItems(frameworkId: string): RoadmapItem[] {
  switch (frameworkId) {
    case "scrum":
      return scrumMockRoadmapItems
    case "safe":
      return safeMockRoadmapItems
    case "devops":
      return devopsMockRoadmapItems
    case "togaf":
      return togafMockRoadmapItems
    case "digital-transformation":
      return digitalTransformationMockRoadmapItems
    case "okrs":
      return okrsMockRoadmapItems
    default:
      // Return generic roadmap items for other frameworks
      return [
        {
          id: "generic-1",
          name: "Q1 Initiative",
          startAt: new Date(2024, 0, 1),
          endAt: new Date(2024, 2, 31),
          status: createStatus("in-progress", "In Progress", "#3B82F6"),
          frameworkId,
          priority: "high",
          group: "initiatives",
          createdAt: new Date(2023, 11, 1),
          updatedAt: new Date(2024, 1, 1),
          metadata: { type: "Initiative", completionPercent: 50 },
        },
      ]
  }
}
