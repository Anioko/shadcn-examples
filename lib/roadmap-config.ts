// Framework-specific Roadmap configurations
// Supports enterprise frameworks with timeline planning

import { RoadmapBoardConfig } from "./types/roadmap"

// =============================================================================
// TIER 1: HIGHLY SUITABLE - Strategic & Project Frameworks
// =============================================================================

// Scrum - Sprint & Release Planning
export const scrumRoadmapConfig: RoadmapBoardConfig = {
  frameworkId: "scrum",
  frameworkName: "Scrum",
  groups: [
    { id: "releases", name: "Releases", description: "Product releases", color: "bg-blue-100", order: 0 },
    { id: "sprints", name: "Sprints", description: "Sprint planning", color: "bg-purple-100", order: 1 },
    { id: "epics", name: "Epics", description: "Large features", color: "bg-green-100", order: 2 },
  ],
  itemTypes: ["Release", "Sprint", "Epic", "Feature"],
  defaultRange: "monthly",
  defaultView: "active",
}

// SAFe - Program Increment Planning
export const safeRoadmapConfig: RoadmapBoardConfig = {
  frameworkId: "safe",
  frameworkName: "SAFe",
  groups: [
    { id: "program-increments", name: "Program Increments", description: "PI planning cycles", color: "bg-indigo-100", order: 0 },
    { id: "features", name: "Features", description: "Program features", color: "bg-blue-100", order: 1 },
    { id: "enablers", name: "Enablers", description: "Technical enablers", color: "bg-purple-100", order: 2 },
  ],
  itemTypes: ["Program Increment", "Feature", "Enabler", "Milestone"],
  defaultRange: "quarterly",
  defaultView: "all",
}

// PRINCE2 - Project Stages
export const prince2RoadmapConfig: RoadmapBoardConfig = {
  frameworkId: "prince2",
  frameworkName: "PRINCE2",
  groups: [
    { id: "stages", name: "Project Stages", description: "Management stages", color: "bg-blue-100", order: 0 },
    { id: "deliverables", name: "Deliverables", description: "Key deliverables", color: "bg-green-100", order: 1 },
    { id: "milestones", name: "Milestones", description: "Decision points", color: "bg-amber-100", order: 2 },
  ],
  itemTypes: ["Stage", "Deliverable", "Milestone", "Review"],
  defaultRange: "monthly",
  defaultView: "all",
}

// PMBOK - Project Phases
export const pmbokRoadmapConfig: RoadmapBoardConfig = {
  frameworkId: "pmbok",
  frameworkName: "PMBOK",
  groups: [
    { id: "phases", name: "Project Phases", description: "Project lifecycle phases", color: "bg-blue-100", order: 0 },
    { id: "deliverables", name: "Deliverables", description: "Project deliverables", color: "bg-green-100", order: 1 },
    { id: "milestones", name: "Milestones", description: "Key milestones", color: "bg-purple-100", order: 2 },
  ],
  itemTypes: ["Phase", "Deliverable", "Milestone", "Gate Review"],
  defaultRange: "monthly",
  defaultView: "all",
}

// TOGAF - Architecture Development
export const togafRoadmapConfig: RoadmapBoardConfig = {
  frameworkId: "togaf",
  frameworkName: "TOGAF",
  groups: [
    { id: "adm-phases", name: "ADM Phases", description: "Architecture Development Method phases", color: "bg-blue-100", order: 0 },
    { id: "architecture-work", name: "Architecture Work", description: "Architecture deliverables", color: "bg-purple-100", order: 1 },
    { id: "implementation", name: "Implementation", description: "Implementation projects", color: "bg-green-100", order: 2 },
  ],
  itemTypes: ["ADM Phase", "Architecture", "Project", "Milestone"],
  defaultRange: "quarterly",
  defaultView: "all",
}

// DevOps - Release Pipeline
export const devopsRoadmapConfig: RoadmapBoardConfig = {
  frameworkId: "devops",
  frameworkName: "DevOps",
  groups: [
    { id: "releases", name: "Releases", description: "Product releases", color: "bg-blue-100", order: 0 },
    { id: "features", name: "Features", description: "Feature development", color: "bg-green-100", order: 1 },
    { id: "infrastructure", name: "Infrastructure", description: "Infrastructure improvements", color: "bg-purple-100", order: 2 },
  ],
  itemTypes: ["Release", "Feature", "Infrastructure", "Improvement"],
  defaultRange: "monthly",
  defaultView: "active",
}

// Digital Transformation
export const digitalTransformationRoadmapConfig: RoadmapBoardConfig = {
  frameworkId: "digital-transformation",
  frameworkName: "Digital Transformation",
  groups: [
    { id: "initiatives", name: "Initiatives", description: "Transformation initiatives", color: "bg-blue-100", order: 0 },
    { id: "technology", name: "Technology", description: "Technology modernization", color: "bg-purple-100", order: 1 },
    { id: "process", name: "Process", description: "Process optimization", color: "bg-green-100", order: 2 },
    { id: "culture", name: "Culture", description: "Cultural change", color: "bg-amber-100", order: 3 },
  ],
  itemTypes: ["Initiative", "Project", "Milestone", "Quick Win"],
  defaultRange: "quarterly",
  defaultView: "all",
}

// OKRs - Objectives & Key Results
export const okrsRoadmapConfig: RoadmapBoardConfig = {
  frameworkId: "okrs",
  frameworkName: "OKRs",
  groups: [
    { id: "objectives", name: "Objectives", description: "Strategic objectives", color: "bg-blue-100", order: 0 },
    { id: "key-results", name: "Key Results", description: "Measurable key results", color: "bg-green-100", order: 1 },
    { id: "initiatives", name: "Initiatives", description: "Supporting initiatives", color: "bg-purple-100", order: 2 },
  ],
  itemTypes: ["Objective", "Key Result", "Initiative", "Milestone"],
  defaultRange: "quarterly",
  defaultView: "active",
}

// Lean - Value Stream
export const leanRoadmapConfig: RoadmapBoardConfig = {
  frameworkId: "lean",
  frameworkName: "Lean",
  groups: [
    { id: "improvements", name: "Improvements", description: "Continuous improvements", color: "bg-green-100", order: 0 },
    { id: "kaizen", name: "Kaizen Events", description: "Improvement events", color: "bg-blue-100", order: 1 },
    { id: "projects", name: "Projects", description: "Improvement projects", color: "bg-purple-100", order: 2 },
  ],
  itemTypes: ["Improvement", "Kaizen Event", "Project", "Experiment"],
  defaultRange: "monthly",
  defaultView: "active",
}

// Design Thinking
export const designThinkingRoadmapConfig: RoadmapBoardConfig = {
  frameworkId: "design-thinking",
  frameworkName: "Design Thinking",
  groups: [
    { id: "discovery", name: "Discovery", description: "Research and empathy", color: "bg-blue-100", order: 0 },
    { id: "ideation", name: "Ideation", description: "Ideation and concepts", color: "bg-purple-100", order: 1 },
    { id: "prototyping", name: "Prototyping", description: "Prototypes and testing", color: "bg-green-100", order: 2 },
    { id: "implementation", name: "Implementation", description: "Launch and iterate", color: "bg-amber-100", order: 3 },
  ],
  itemTypes: ["Research", "Workshop", "Prototype", "Test", "Launch"],
  defaultRange: "monthly",
  defaultView: "all",
}

// =============================================================================
// Configuration Registry
// =============================================================================

export const frameworkRoadmapConfigs: Record<string, RoadmapBoardConfig> = {
  "scrum": scrumRoadmapConfig,
  "safe": safeRoadmapConfig,
  "prince2": prince2RoadmapConfig,
  "pmbok": pmbokRoadmapConfig,
  "togaf": togafRoadmapConfig,
  "devops": devopsRoadmapConfig,
  "digital-transformation": digitalTransformationRoadmapConfig,
  "okrs": okrsRoadmapConfig,
  "lean": leanRoadmapConfig,
  "design-thinking": designThinkingRoadmapConfig,
}

// Helper function to get config for a framework
export function getFrameworkRoadmapConfig(frameworkId: string): RoadmapBoardConfig | null {
  return frameworkRoadmapConfigs[frameworkId] || null
}

// Helper to check if a framework supports Roadmap
export function supportsRoadmap(frameworkId: string): boolean {
  return frameworkId in frameworkRoadmapConfigs
}
