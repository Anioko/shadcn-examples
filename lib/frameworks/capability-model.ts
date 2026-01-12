// Capability Model Framework - Enterprise-grade capability-based planning
// Version 1.0

export const CAPABILITY_MODEL_FRAMEWORK = {
  id: "capability-model",
  name: "Capability Model",
  version: "1.0",
  description: "Enterprise capability-based planning with maturity assessment, investment planning, and roadmap visualization",
  category: "Strategy & Planning",
}

// Capability Node Types
export type CapabilityNodeType =
  | "capability"           // Main business capability
  | "sub-capability"       // Nested capability under parent
  | "resource"            // Supporting resource (People, Technology, Data)
  | "application"         // Supporting application/system
  | "process"            // Supporting business process
  | "organization"       // Owning organization unit

// Maturity Levels (CMMI-inspired)
export type MaturityLevel = 1 | 2 | 3 | 4 | 5

export const MATURITY_LEVELS = {
  1: { name: "Initial", description: "Ad-hoc, unpredictable processes", color: "#ef4444" },
  2: { name: "Developing", description: "Process documented but inconsistent", color: "#f59e0b" },
  3: { name: "Defined", description: "Standardized and documented", color: "#eab308" },
  4: { name: "Managed", description: "Measured and controlled", color: "#84cc16" },
  5: { name: "Optimizing", description: "Continuously improving", color: "#22c55e" },
} as const

// Investment Levels
export type InvestmentLevel = "low" | "medium" | "high" | "critical"

export const INVESTMENT_LEVELS = {
  low: { name: "Low", budget: "$0-50K", color: "#94a3b8" },
  medium: { name: "Medium", budget: "$50K-250K", color: "#3b82f6" },
  high: { name: "High", budget: "$250K-1M", color: "#f59e0b" },
  critical: { name: "Critical", budget: "$1M+", color: "#ef4444" },
} as const

// Criticality Levels
export type CriticalityLevel = "low" | "medium" | "high" | "mission-critical"

export const CRITICALITY_LEVELS = {
  low: { name: "Low", description: "Minor impact if unavailable", color: "#94a3b8" },
  medium: { name: "Medium", description: "Moderate impact on operations", color: "#eab308" },
  high: { name: "High", description: "Significant impact on business", color: "#f59e0b" },
  "mission-critical": { name: "Mission-Critical", description: "Business cannot operate without", color: "#ef4444" },
} as const

// Resource Types
export type ResourceType = "people" | "technology" | "data" | "infrastructure"

export const RESOURCE_TYPES = {
  people: { name: "People", icon: "users", color: "#8b5cf6" },
  technology: { name: "Technology", icon: "cpu", color: "#06b6d4" },
  data: { name: "Data", icon: "database", color: "#10b981" },
  infrastructure: { name: "Infrastructure", icon: "server", color: "#64748b" },
} as const

// Heat Map Modes
export type HeatMapMode = "none" | "maturity" | "investment" | "criticality" | "health"

// Relationship Types
export type CapabilityRelationType =
  | "supports"      // Capability supports another
  | "depends-on"    // Capability depends on another
  | "enables"       // Capability enables another
  | "uses"          // Capability uses a resource/app

export const RELATIONSHIP_TYPES = {
  "supports": { name: "Supports", color: "#3b82f6", description: "Provides support to" },
  "depends-on": { name: "Depends On", color: "#f59e0b", description: "Requires for operation" },
  "enables": { name: "Enables", color: "#22c55e", description: "Makes possible" },
  "uses": { name: "Uses", color: "#8b5cf6", description: "Utilizes resource" },
} as const

// Capability Metadata Interface
export interface CapabilityMetadata {
  // Dimensions
  width?: number
  height?: number

  // Hierarchy
  parentNode?: string
  isCollapsed?: boolean
  hidden?: boolean

  // Maturity
  currentMaturity?: MaturityLevel
  targetMaturity?: MaturityLevel
  maturityScore?: number
  maturityNotes?: string

  // Investment
  investmentLevel?: InvestmentLevel
  currentBudget?: number
  plannedBudget?: number
  actualSpend?: number
  investmentNotes?: string

  // Criticality & Health
  criticality?: CriticalityLevel
  healthScore?: number // 0-100
  riskLevel?: "low" | "medium" | "high" | "critical"

  // Ownership
  owner?: string
  stakeholders?: string[]
  organizationUnit?: string

  // Resources (for resource nodes)
  resourceType?: ResourceType
  allocationPercentage?: number
  costCenter?: string

  // Applications (for application nodes)
  version?: string
  vendor?: string
  licenseCost?: number
  renewalDate?: string
  integrationPoints?: string[]

  // Processes (for process nodes)
  processMaturity?: MaturityLevel
  efficiencyScore?: number
  automationLevel?: number

  // Organization (for organization nodes)
  headcount?: number
  budgetAllocation?: number
  department?: string

  // Roadmap
  currentState?: string
  targetState?: string
  initiatives?: string[]
  milestones?: CapabilityMilestone[]

  // Timeline
  startDate?: string
  targetDate?: string
  completionDate?: string
}

export interface CapabilityMilestone {
  id: string
  name: string
  date: string
  status: "planned" | "in-progress" | "completed" | "at-risk"
  description?: string
}

// Assessment Question Structure
export interface AssessmentQuestion {
  id: string
  category: string
  question: string
  weight: number // 1-5
  criteria: {
    level: MaturityLevel
    description: string
  }[]
}

// Default Assessment Questions
export const DEFAULT_ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  {
    id: "process-documentation",
    category: "Process Maturity",
    question: "Are capability processes documented and standardized?",
    weight: 5,
    criteria: [
      { level: 1, description: "No documentation exists" },
      { level: 2, description: "Basic documentation, inconsistently followed" },
      { level: 3, description: "Comprehensive documentation, generally followed" },
      { level: 4, description: "Standardized documentation with metrics" },
      { level: 5, description: "Continuously improved with best practices" },
    ],
  },
  {
    id: "technology-support",
    category: "Technology Enablement",
    question: "How well is the capability supported by technology?",
    weight: 4,
    criteria: [
      { level: 1, description: "Manual processes, no technology support" },
      { level: 2, description: "Basic tools, disconnected systems" },
      { level: 3, description: "Integrated tools with some automation" },
      { level: 4, description: "Fully automated with monitoring" },
      { level: 5, description: "AI-enabled with predictive capabilities" },
    ],
  },
  {
    id: "resource-allocation",
    category: "Resource Management",
    question: "Are resources adequately allocated and skilled?",
    weight: 4,
    criteria: [
      { level: 1, description: "Ad-hoc resource allocation" },
      { level: 2, description: "Basic allocation, skills gaps exist" },
      { level: 3, description: "Structured allocation with training" },
      { level: 4, description: "Optimized allocation with succession planning" },
      { level: 5, description: "Strategic resource optimization with analytics" },
    ],
  },
  {
    id: "governance",
    category: "Governance & Control",
    question: "What level of governance and oversight exists?",
    weight: 3,
    criteria: [
      { level: 1, description: "No formal governance" },
      { level: 2, description: "Basic oversight, unclear accountability" },
      { level: 3, description: "Defined governance structure and roles" },
      { level: 4, description: "Active governance with KPIs" },
      { level: 5, description: "Strategic governance with continuous monitoring" },
    ],
  },
  {
    id: "measurement",
    category: "Measurement & Analytics",
    question: "Are capability outcomes measured and analyzed?",
    weight: 5,
    criteria: [
      { level: 1, description: "No measurement or metrics" },
      { level: 2, description: "Basic metrics collected inconsistently" },
      { level: 3, description: "Regular metrics with reporting" },
      { level: 4, description: "Advanced analytics with dashboards" },
      { level: 5, description: "Predictive analytics driving decisions" },
    ],
  },
]

// Default Node Templates
export const DEFAULT_CAPABILITY_TEMPLATES = {
  capability: {
    type: "capability" as const,
    label: "New Capability",
    status: "pending" as const,
    metadata: {
      width: 200,
      height: 120,
      currentMaturity: 3 as MaturityLevel,
      targetMaturity: 4 as MaturityLevel,
      investmentLevel: "medium" as InvestmentLevel,
      criticality: "medium" as CriticalityLevel,
      healthScore: 75,
    },
  },
  subCapability: {
    type: "sub-capability" as const,
    label: "New Sub-Capability",
    status: "pending" as const,
    metadata: {
      width: 160,
      height: 90,
      currentMaturity: 3 as MaturityLevel,
      investmentLevel: "low" as InvestmentLevel,
      criticality: "medium" as CriticalityLevel,
    },
  },
  resource: {
    type: "resource" as const,
    label: "New Resource",
    status: "active" as const,
    metadata: {
      width: 140,
      height: 80,
      resourceType: "technology" as ResourceType,
      allocationPercentage: 100,
    },
  },
  application: {
    type: "application" as const,
    label: "New Application",
    status: "active" as const,
    metadata: {
      width: 150,
      height: 85,
      version: "1.0",
    },
  },
  process: {
    type: "process" as const,
    label: "New Process",
    status: "active" as const,
    metadata: {
      width: 160,
      height: 85,
      processMaturity: 3 as MaturityLevel,
      efficiencyScore: 75,
    },
  },
  organization: {
    type: "organization" as const,
    label: "New Organization Unit",
    status: "active" as const,
    metadata: {
      width: 170,
      height: 90,
    },
  },
}

// Analytics Helper Functions
export function calculateCapabilityHealth(metadata: CapabilityMetadata): number {
  let score = 0
  let factors = 0

  // Maturity contributes 30%
  if (metadata.currentMaturity) {
    score += (metadata.currentMaturity / 5) * 30
    factors++
  }

  // Investment adequacy contributes 25%
  if (metadata.investmentLevel && metadata.criticality) {
    const investmentScore = {
      low: 1,
      medium: 2,
      high: 3,
      critical: 4,
    }[metadata.investmentLevel]

    const criticalityScore = {
      low: 1,
      medium: 2,
      high: 3,
      "mission-critical": 4,
    }[metadata.criticality]

    // Good if investment matches or exceeds criticality
    const adequacy = Math.min(investmentScore / criticalityScore, 1)
    score += adequacy * 25
    factors++
  }

  // Risk contributes 25%
  if (metadata.riskLevel) {
    const riskScore = {
      low: 1,
      medium: 0.7,
      high: 0.4,
      critical: 0.1,
    }[metadata.riskLevel]
    score += riskScore * 25
    factors++
  }

  // Progress toward target contributes 20%
  if (metadata.currentMaturity && metadata.targetMaturity) {
    const progress = metadata.currentMaturity / metadata.targetMaturity
    score += Math.min(progress, 1) * 20
    factors++
  }

  return factors > 0 ? Math.round(score) : 50 // Default to 50 if no data
}

export function calculateMaturityGap(current?: MaturityLevel, target?: MaturityLevel): number {
  if (!current || !target) return 0
  return target - current
}

export function getHealthColor(score: number): string {
  if (score >= 80) return "#22c55e" // green
  if (score >= 60) return "#84cc16" // lime
  if (score >= 40) return "#eab308" // yellow
  if (score >= 20) return "#f59e0b" // orange
  return "#ef4444" // red
}

export function getMaturityColor(level?: MaturityLevel): string {
  if (!level) return "#94a3b8"
  return MATURITY_LEVELS[level].color
}

export function getCriticalityColor(criticality?: CriticalityLevel): string {
  if (!criticality) return "#94a3b8"
  return CRITICALITY_LEVELS[criticality].color
}

export function getInvestmentColor(investment?: InvestmentLevel): string {
  if (!investment) return "#94a3b8"
  return INVESTMENT_LEVELS[investment].color
}
