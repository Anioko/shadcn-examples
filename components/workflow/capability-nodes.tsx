// Capability Model Node Components
"use client"

import { memo } from "react"
import { Handle, Position, NodeResizer } from "reactflow"
import { Badge } from "@/components/ui/badge"
import {
  Layers, Box, Users, Monitor, GitBranch, Building2,
  TrendingUp, DollarSign, AlertCircle, ChevronDown, ChevronUp
} from "lucide-react"
import {
  MaturityLevel,
  InvestmentLevel,
  CriticalityLevel,
  ResourceType,
  MATURITY_LEVELS,
  INVESTMENT_LEVELS,
  CRITICALITY_LEVELS,
  RESOURCE_TYPES,
  getMaturityColor,
  getCriticalityColor,
  getInvestmentColor,
  calculateCapabilityHealth,
  getHealthColor,
  CapabilityMetadata
} from "@/lib/frameworks/capability-model"

interface BaseNodeProps {
  data: {
    label: string
    description?: string
    status?: string
    metadata?: CapabilityMetadata
    width?: number
    height?: number
    isCollapsed?: boolean
    hasChildren?: boolean
    childCount?: number
    onToggleCollapse?: () => void
  }
  selected?: boolean
}

// ============================================================================
// CAPABILITY NODE - Main business capability
// ============================================================================
export const CapabilityNode = memo(({ data, selected }: BaseNodeProps) => {
  const width = data.width || 200
  const height = data.height || 120
  const metadata = data.metadata || {}

  const currentMaturity = metadata.currentMaturity || 3
  const targetMaturity = metadata.targetMaturity || 4
  const criticality = metadata.criticality || "medium"
  const investmentLevel = metadata.investmentLevel || "medium"
  const healthScore = metadata.healthScore || calculateCapabilityHealth(metadata)

  const maturityColor = getMaturityColor(currentMaturity)
  const criticalityColor = getCriticalityColor(criticality)
  const investmentColor = getInvestmentColor(investmentLevel)
  const healthColor = getHealthColor(healthScore)

  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
        background: `linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)`,
        borderRadius: "12px",
        border: selected ? "3px solid #1e40af" : "2px solid #1e3a8a",
        boxShadow: selected
          ? "0 8px 24px rgba(59, 130, 246, 0.4)"
          : "0 4px 12px rgba(0, 0, 0, 0.15)",
        color: "white",
        padding: "12px",
        position: "relative",
        transition: "all 0.2s ease",
      }}
    >
      <NodeResizer
        minWidth={180}
        minHeight={100}
        isVisible={selected}
        lineStyle={{ borderWidth: 2, borderColor: "#1e40af" }}
        handleStyle={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#1e40af" }}
      />

      {/* Collapse/Expand Toggle */}
      {data.hasChildren && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            data.onToggleCollapse?.()
          }}
          className="absolute top-2 right-2 bg-white/20 hover:bg-white/30 rounded p-1 transition-colors"
          title={data.isCollapsed ? "Expand" : "Collapse"}
        >
          {data.isCollapsed ? (
            <ChevronDown className="h-3 w-3" />
          ) : (
            <ChevronUp className="h-3 w-3" />
          )}
        </button>
      )}

      {/* Icon */}
      <div className="flex items-start gap-2 mb-2">
        <div className="bg-white/20 rounded-lg p-1.5">
          <Layers className="h-4 w-4" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-sm truncate pr-6">{data.label}</div>
          {metadata.owner && (
            <div className="text-xs opacity-80 truncate mt-0.5">{metadata.owner}</div>
          )}
        </div>
      </div>

      {/* Maturity Indicator */}
      <div className="flex items-center gap-1 mb-2">
        <TrendingUp className="h-3 w-3 opacity-80" />
        <div className="text-[10px] flex items-center gap-1">
          <span>Maturity:</span>
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((level) => (
              <div
                key={level}
                className="w-2 h-2 rounded-sm"
                style={{
                  backgroundColor: level <= currentMaturity ? maturityColor : "rgba(255,255,255,0.2)",
                }}
              />
            ))}
          </div>
          <span className="ml-1">{currentMaturity}</span>
          {targetMaturity && targetMaturity !== currentMaturity && (
            <span className="opacity-70">→ {targetMaturity}</span>
          )}
        </div>
      </div>

      {/* Criticality & Investment Badges */}
      <div className="flex items-center gap-1 mb-2 flex-wrap">
        <Badge
          variant="secondary"
          className="text-[9px] h-4 px-1.5 border-0"
          style={{ backgroundColor: criticalityColor, color: "white" }}
        >
          {CRITICALITY_LEVELS[criticality].name}
        </Badge>
        <Badge
          variant="secondary"
          className="text-[9px] h-4 px-1.5 border-0"
          style={{ backgroundColor: investmentColor, color: "white" }}
        >
          <DollarSign className="h-2.5 w-2.5 mr-0.5" />
          {INVESTMENT_LEVELS[investmentLevel].name}
        </Badge>
      </div>

      {/* Health Score Bar */}
      <div className="mt-auto">
        <div className="flex items-center justify-between text-[9px] mb-1">
          <span className="opacity-80">Health</span>
          <span className="font-semibold">{healthScore}%</span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-1.5 overflow-hidden">
          <div
            className="h-full transition-all duration-300 rounded-full"
            style={{
              width: `${healthScore}%`,
              backgroundColor: healthColor,
            }}
          />
        </div>
      </div>

      {/* Connection Handles */}
      <Handle type="target" position={Position.Top} className="!bg-white !w-2 !h-2" />
      <Handle type="source" position={Position.Bottom} className="!bg-white !w-2 !h-2" />
      <Handle type="target" position={Position.Left} className="!bg-white !w-2 !h-2" />
      <Handle type="source" position={Position.Right} className="!bg-white !w-2 !h-2" />
    </div>
  )
})

CapabilityNode.displayName = "CapabilityNode"

// ============================================================================
// SUB-CAPABILITY NODE - Nested capability under parent
// ============================================================================
export const SubCapabilityNode = memo(({ data, selected }: BaseNodeProps) => {
  const width = data.width || 160
  const height = data.height || 90
  const metadata = data.metadata || {}

  const currentMaturity = metadata.currentMaturity || 3
  const criticality = metadata.criticality || "medium"
  const investmentLevel = metadata.investmentLevel || "low"

  const maturityColor = getMaturityColor(currentMaturity)
  const criticalityColor = getCriticalityColor(criticality)

  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
        background: `linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)`,
        borderRadius: "10px",
        border: selected ? "3px solid #6d28d9" : "2px solid #5b21b6",
        boxShadow: selected
          ? "0 6px 20px rgba(139, 92, 246, 0.4)"
          : "0 3px 10px rgba(0, 0, 0, 0.12)",
        color: "white",
        padding: "10px",
        position: "relative",
        transition: "all 0.2s ease",
      }}
    >
      <NodeResizer
        minWidth={140}
        minHeight={70}
        isVisible={selected}
        lineStyle={{ borderWidth: 2, borderColor: "#6d28d9" }}
        handleStyle={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#6d28d9" }}
      />

      {/* Icon & Label */}
      <div className="flex items-start gap-2 mb-2">
        <div className="bg-white/20 rounded-lg p-1">
          <Box className="h-3.5 w-3.5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-xs truncate">{data.label}</div>
        </div>
      </div>

      {/* Maturity Level */}
      <div className="flex items-center gap-1 mb-2">
        <div className="text-[9px] flex items-center gap-1">
          <span className="opacity-80">L{currentMaturity}</span>
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((level) => (
              <div
                key={level}
                className="w-1.5 h-1.5 rounded-sm"
                style={{
                  backgroundColor: level <= currentMaturity ? maturityColor : "rgba(255,255,255,0.2)",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Criticality Badge */}
      <Badge
        variant="secondary"
        className="text-[8px] h-3.5 px-1.5 border-0"
        style={{ backgroundColor: criticalityColor, color: "white" }}
      >
        {CRITICALITY_LEVELS[criticality].name}
      </Badge>

      {/* Connection Handles */}
      <Handle type="target" position={Position.Top} className="!bg-white !w-1.5 !h-1.5" />
      <Handle type="source" position={Position.Bottom} className="!bg-white !w-1.5 !h-1.5" />
      <Handle type="target" position={Position.Left} className="!bg-white !w-1.5 !h-1.5" />
      <Handle type="source" position={Position.Right} className="!bg-white !w-1.5 !h-1.5" />
    </div>
  )
})

SubCapabilityNode.displayName = "SubCapabilityNode"

// ============================================================================
// RESOURCE NODE - People, Technology, Data, Infrastructure
// ============================================================================
export const ResourceNode = memo(({ data, selected }: BaseNodeProps) => {
  const width = data.width || 140
  const height = data.height || 80
  const metadata = data.metadata || {}

  const resourceType = metadata.resourceType || "technology"
  const allocation = metadata.allocationPercentage || 100

  const resourceInfo = RESOURCE_TYPES[resourceType]
  const Icon = {
    people: Users,
    technology: Monitor,
    data: Box,
    infrastructure: Building2,
  }[resourceType] || Monitor

  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
        background: `linear-gradient(135deg, #10b981 0%, #059669 100%)`,
        borderRadius: "10px",
        border: selected ? "3px solid #047857" : "2px solid #065f46",
        boxShadow: selected
          ? "0 6px 20px rgba(16, 185, 129, 0.4)"
          : "0 3px 10px rgba(0, 0, 0, 0.12)",
        color: "white",
        padding: "10px",
        position: "relative",
        transition: "all 0.2s ease",
      }}
    >
      <NodeResizer
        minWidth={120}
        minHeight={60}
        isVisible={selected}
        lineStyle={{ borderWidth: 2, borderColor: "#047857" }}
        handleStyle={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#047857" }}
      />

      {/* Icon & Label */}
      <div className="flex items-start gap-2 mb-2">
        <div className="bg-white/20 rounded-lg p-1">
          <Icon className="h-3.5 w-3.5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-xs truncate">{data.label}</div>
          <div className="text-[9px] opacity-80">{resourceInfo.name}</div>
        </div>
      </div>

      {/* Allocation Bar */}
      {allocation !== undefined && (
        <div className="mt-2">
          <div className="flex items-center justify-between text-[9px] mb-1">
            <span className="opacity-80">Allocation</span>
            <span className="font-semibold">{allocation}%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-1.5 overflow-hidden">
            <div
              className="h-full bg-white/80 transition-all duration-300 rounded-full"
              style={{ width: `${allocation}%` }}
            />
          </div>
        </div>
      )}

      {/* Cost Center */}
      {metadata.costCenter && (
        <div className="text-[8px] opacity-70 mt-1 truncate">
          CC: {metadata.costCenter}
        </div>
      )}

      {/* Connection Handles */}
      <Handle type="target" position={Position.Top} className="!bg-white !w-1.5 !h-1.5" />
      <Handle type="source" position={Position.Bottom} className="!bg-white !w-1.5 !h-1.5" />
      <Handle type="target" position={Position.Left} className="!bg-white !w-1.5 !h-1.5" />
      <Handle type="source" position={Position.Right} className="!bg-white !w-1.5 !h-1.5" />
    </div>
  )
})

ResourceNode.displayName = "ResourceNode"

// ============================================================================
// APPLICATION NODE - Supporting applications/systems
// ============================================================================
export const ApplicationNode = memo(({ data, selected }: BaseNodeProps) => {
  const width = data.width || 150
  const height = data.height || 85
  const metadata = data.metadata || {}

  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
        background: `linear-gradient(135deg, #f97316 0%, #ea580c 100%)`,
        borderRadius: "10px",
        border: selected ? "3px solid #c2410c" : "2px solid #9a3412",
        boxShadow: selected
          ? "0 6px 20px rgba(249, 115, 22, 0.4)"
          : "0 3px 10px rgba(0, 0, 0, 0.12)",
        color: "white",
        padding: "10px",
        position: "relative",
        transition: "all 0.2s ease",
      }}
    >
      <NodeResizer
        minWidth={130}
        minHeight={65}
        isVisible={selected}
        lineStyle={{ borderWidth: 2, borderColor: "#c2410c" }}
        handleStyle={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#c2410c" }}
      />

      {/* Icon & Label */}
      <div className="flex items-start gap-2 mb-2">
        <div className="bg-white/20 rounded-lg p-1">
          <Monitor className="h-3.5 w-3.5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-xs truncate">{data.label}</div>
          {metadata.version && (
            <div className="text-[9px] opacity-80">v{metadata.version}</div>
          )}
        </div>
      </div>

      {/* Vendor Info */}
      {metadata.vendor && (
        <div className="text-[9px] opacity-80 mb-1 truncate">
          Vendor: {metadata.vendor}
        </div>
      )}

      {/* License Cost */}
      {metadata.licenseCost && (
        <div className="flex items-center gap-1 text-[9px]">
          <DollarSign className="h-2.5 w-2.5" />
          <span>{metadata.licenseCost.toLocaleString()}/yr</span>
        </div>
      )}

      {/* Renewal Date */}
      {metadata.renewalDate && (
        <div className="text-[8px] opacity-70 mt-1">
          Renewal: {metadata.renewalDate}
        </div>
      )}

      {/* Integration Points Badge */}
      {metadata.integrationPoints && metadata.integrationPoints.length > 0 && (
        <Badge
          variant="secondary"
          className="text-[8px] h-3.5 px-1.5 border-0 bg-white/20 mt-1"
        >
          {metadata.integrationPoints.length} integrations
        </Badge>
      )}

      {/* Connection Handles */}
      <Handle type="target" position={Position.Top} className="!bg-white !w-1.5 !h-1.5" />
      <Handle type="source" position={Position.Bottom} className="!bg-white !w-1.5 !h-1.5" />
      <Handle type="target" position={Position.Left} className="!bg-white !w-1.5 !h-1.5" />
      <Handle type="source" position={Position.Right} className="!bg-white !w-1.5 !h-1.5" />
    </div>
  )
})

ApplicationNode.displayName = "ApplicationNode"

// ============================================================================
// PROCESS NODE - Supporting business processes
// ============================================================================
export const ProcessNode = memo(({ data, selected }: BaseNodeProps) => {
  const width = data.width || 160
  const height = data.height || 85
  const metadata = data.metadata || {}

  const processMaturity = metadata.processMaturity || 3
  const efficiencyScore = metadata.efficiencyScore || 75
  const automationLevel = metadata.automationLevel || 50

  const maturityColor = getMaturityColor(processMaturity)

  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
        background: `linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)`,
        borderRadius: "10px",
        border: selected ? "3px solid #0f766e" : "2px solid #115e59",
        boxShadow: selected
          ? "0 6px 20px rgba(20, 184, 166, 0.4)"
          : "0 3px 10px rgba(0, 0, 0, 0.12)",
        color: "white",
        padding: "10px",
        position: "relative",
        transition: "all 0.2s ease",
      }}
    >
      <NodeResizer
        minWidth={140}
        minHeight={65}
        isVisible={selected}
        lineStyle={{ borderWidth: 2, borderColor: "#0f766e" }}
        handleStyle={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#0f766e" }}
      />

      {/* Icon & Label */}
      <div className="flex items-start gap-2 mb-2">
        <div className="bg-white/20 rounded-lg p-1">
          <GitBranch className="h-3.5 w-3.5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-xs truncate">{data.label}</div>
        </div>
      </div>

      {/* Process Maturity */}
      <div className="flex items-center gap-1 mb-2">
        <div className="text-[9px] flex items-center gap-1">
          <span className="opacity-80">Maturity:</span>
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((level) => (
              <div
                key={level}
                className="w-1.5 h-1.5 rounded-sm"
                style={{
                  backgroundColor: level <= processMaturity ? maturityColor : "rgba(255,255,255,0.2)",
                }}
              />
            ))}
          </div>
          <span className="ml-0.5">{processMaturity}</span>
        </div>
      </div>

      {/* Efficiency Score */}
      {efficiencyScore !== undefined && (
        <div className="mb-2">
          <div className="flex items-center justify-between text-[9px] mb-1">
            <span className="opacity-80">Efficiency</span>
            <span className="font-semibold">{efficiencyScore}%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-1 overflow-hidden">
            <div
              className="h-full bg-white/80 transition-all duration-300 rounded-full"
              style={{ width: `${efficiencyScore}%` }}
            />
          </div>
        </div>
      )}

      {/* Automation Level */}
      {automationLevel !== undefined && (
        <div className="text-[9px] opacity-80">
          {automationLevel}% automated
        </div>
      )}

      {/* Connection Handles */}
      <Handle type="target" position={Position.Top} className="!bg-white !w-1.5 !h-1.5" />
      <Handle type="source" position={Position.Bottom} className="!bg-white !w-1.5 !h-1.5" />
      <Handle type="target" position={Position.Left} className="!bg-white !w-1.5 !h-1.5" />
      <Handle type="source" position={Position.Right} className="!bg-white !w-1.5 !h-1.5" />
    </div>
  )
})

ProcessNode.displayName = "ProcessNode"

// ============================================================================
// ORGANIZATION NODE - Owning organization units
// ============================================================================
export const OrganizationNode = memo(({ data, selected }: BaseNodeProps) => {
  const width = data.width || 170
  const height = data.height || 90
  const metadata = data.metadata || {}

  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
        background: `linear-gradient(135deg, #64748b 0%, #475569 100%)`,
        borderRadius: "10px",
        border: selected ? "3px solid #334155" : "2px solid #1e293b",
        boxShadow: selected
          ? "0 6px 20px rgba(100, 116, 139, 0.4)"
          : "0 3px 10px rgba(0, 0, 0, 0.12)",
        color: "white",
        padding: "10px",
        position: "relative",
        transition: "all 0.2s ease",
      }}
    >
      <NodeResizer
        minWidth={150}
        minHeight={70}
        isVisible={selected}
        lineStyle={{ borderWidth: 2, borderColor: "#334155" }}
        handleStyle={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#334155" }}
      />

      {/* Icon & Label */}
      <div className="flex items-start gap-2 mb-2">
        <div className="bg-white/20 rounded-lg p-1">
          <Building2 className="h-3.5 w-3.5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-xs truncate">{data.label}</div>
          {metadata.department && (
            <div className="text-[9px] opacity-80 truncate">{metadata.department}</div>
          )}
        </div>
      </div>

      {/* Headcount */}
      {metadata.headcount && (
        <div className="flex items-center gap-1 text-[9px] mb-1">
          <Users className="h-2.5 w-2.5" />
          <span>{metadata.headcount} employees</span>
        </div>
      )}

      {/* Budget Allocation */}
      {metadata.budgetAllocation && (
        <div className="flex items-center gap-1 text-[9px]">
          <DollarSign className="h-2.5 w-2.5" />
          <span>${(metadata.budgetAllocation / 1000).toFixed(0)}K budget</span>
        </div>
      )}

      {/* Connection Handles */}
      <Handle type="target" position={Position.Top} className="!bg-white !w-1.5 !h-1.5" />
      <Handle type="source" position={Position.Bottom} className="!bg-white !w-1.5 !h-1.5" />
      <Handle type="target" position={Position.Left} className="!bg-white !w-1.5 !h-1.5" />
      <Handle type="source" position={Position.Right} className="!bg-white !w-1.5 !h-1.5" />
    </div>
  )
})

OrganizationNode.displayName = "OrganizationNode"
