/**
 * Capability Map Types
 * For hierarchical capability mapping and capability-based planning
 */

export type CapabilityLevel = 0 | 1 | 2 | 3 | 4

export type MaturityLevel = 1 | 2 | 3 | 4 | 5 // 1=Initial, 2=Developing, 3=Defined, 4=Managed, 5=Optimized

// Application-specific maturity levels for technical capability planning
export type ApplicationMaturityLevel = 1 | 2 | 3 | 4 | 5 // 1=Not Implemented, 2=Basic/MVP, 3=Functional, 4=Advanced, 5=Optimized/Leading

export type StrategicImportance = 'low' | 'medium' | 'high' | 'critical'

export type InvestmentLevel = 'none' | 'low' | 'medium' | 'high'

// Generic capability type for backward compatibility
export type CapabilityType = 'strategic' | 'operational' | 'supporting' | string

// Framework-specific groupings
export type ITILValueChainActivity = 'plan' | 'improve' | 'engage' | 'design-transition' | 'obtain-build' | 'deliver-support'
export type COBITDomain = 'edm' | 'apo' | 'bai' | 'dss' | 'mea'
export type NISTCSFFunction = 'govern' | 'identify' | 'protect' | 'detect' | 'respond' | 'recover'
export type ISO27001Clause = 'context' | 'leadership' | 'planning' | 'support' | 'operation' | 'performance' | 'improvement' | 'controls'

export type ApplicationCapabilityDomain =
  | 'user-experience'
  | 'application-services'
  | 'data-storage'
  | 'security-identity'
  | 'devops-platform'
  | 'ai-analytics'
  | 'communication'

export interface CapabilityMetrics {
  maturity: MaturityLevel
  strategicImportance: StrategicImportance
  currentInvestment: InvestmentLevel
  plannedInvestment: InvestmentLevel
  riskLevel?: 'low' | 'medium' | 'high'
  owner?: string
}

export interface ApplicationCapabilityMetrics {
  maturity: ApplicationMaturityLevel
  strategicImportance: StrategicImportance
  currentInvestment: InvestmentLevel
  plannedInvestment: InvestmentLevel
  riskLevel?: 'low' | 'medium' | 'high'
  owner?: string
}

export interface Capability {
  id: string
  name: string
  description?: string
  level: CapabilityLevel // 0=Domain, 1=Capability, 2=Sub-capability, 3=Sub-sub-capability
  type: CapabilityType // Strategic, Operational, or Supporting
  parentId?: string // Reference to parent capability
  metrics: CapabilityMetrics
  children?: Capability[] // Child capabilities
  gridPosition?: {
    row: number
    col: number
    rowSpan?: number
    colSpan?: number
  }
}

export interface ApplicationCapability {
  id: string
  name: string
  description?: string
  level: CapabilityLevel // 0=Domain, 1=Capability, 2=Sub-capability, 3=Sub-sub-capability
  domain: ApplicationCapabilityDomain // User Experience, Application Services, etc.
  parentId?: string // Reference to parent capability
  metrics: ApplicationCapabilityMetrics
  children?: ApplicationCapability[] // Child capabilities
  gridPosition?: {
    row: number
    col: number
    rowSpan?: number
    colSpan?: number
  }
}

export interface CapabilityTypeDescriptions {
  [key: string]: string // Support any framework-specific grouping
}

export interface ApplicationCapabilityDomainDescriptions {
  'user-experience': string
  'application-services': string
  'data-storage': string
  'security-identity': string
  'devops-platform': string
  'ai-analytics': string
  'communication': string
}

export interface CapabilityMap {
  id: string
  name: string
  description?: string
  typeDescriptions?: CapabilityTypeDescriptions
  customTypeConfig?: Record<string, {
    label: string
    bgColor: string
    borderColor: string
    headerBg: string
    textColor: string
  }>
  version: string
  capabilities: Capability[]
  createdAt: string
  updatedAt: string
}

export interface ApplicationCapabilityMap {
  id: string
  name: string
  description?: string
  domainDescriptions?: ApplicationCapabilityDomainDescriptions
  version: string
  capabilities: ApplicationCapability[]
  createdAt: string
  updatedAt: string
}

export interface CapabilityGapAnalysis {
  capabilityId: string
  currentState: MaturityLevel
  targetState: MaturityLevel
  gap: number
  priority: 'low' | 'medium' | 'high' | 'critical'
  initiatives: string[]
}

export interface CapabilityRoadmapItem {
  id: string
  capabilityId: string
  initiative: string
  description: string
  startDate: string
  endDate: string
  status: 'planned' | 'in-progress' | 'completed' | 'on-hold'
  investmentRequired: InvestmentLevel
}

// Heat map color mappings
export const MATURITY_COLORS: Record<MaturityLevel, string> = {
  1: 'bg-red-500',
  2: 'bg-orange-500',
  3: 'bg-yellow-500',
  4: 'bg-lime-500',
  5: 'bg-green-500',
}

// Application capability maturity colors
export const APPLICATION_MATURITY_COLORS: Record<ApplicationMaturityLevel, string> = {
  1: 'bg-gray-400',     // Not Implemented
  2: 'bg-orange-400',   // Basic/MVP
  3: 'bg-yellow-400',   // Functional
  4: 'bg-lime-500',     // Advanced
  5: 'bg-green-500',    // Optimized/Leading
}

export const IMPORTANCE_COLORS: Record<StrategicImportance, string> = {
  low: 'bg-gray-400',
  medium: 'bg-blue-400',
  high: 'bg-purple-500',
  critical: 'bg-red-600',
}

export const INVESTMENT_COLORS: Record<InvestmentLevel, string> = {
  none: 'bg-gray-300',
  low: 'bg-blue-300',
  medium: 'bg-blue-500',
  high: 'bg-blue-700',
}
