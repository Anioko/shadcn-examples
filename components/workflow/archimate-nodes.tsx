"use client"

import { memo, useState } from "react"
import { Handle, Position, NodeProps, NodeResizer } from "reactflow"
import { ChevronDown, ChevronRight } from "lucide-react"

// ArchiMate 3.2 Color Scheme (Official)
const BUSINESS_COLOR = "#FFFFB5" // Yellow
const APPLICATION_COLOR = "#B5FFFF" // Light Blue
const TECHNOLOGY_COLOR = "#C9E7B7" // Light Green
const STRATEGY_COLOR = "#FFD5D5" // Light Pink
const MOTIVATION_COLOR = "#CCCCFF" // Light Purple
const IMPLEMENTATION_COLOR = "#FFE0C2" // Light Orange
const PHYSICAL_COLOR = "#C9E7C7" // Light Gray-Green

// ============================================================================
// BUSINESS LAYER - Yellow (#FFFFB5)
// ============================================================================

// Business Actor - Active Structure (rounded rectangle with icon)
export const BusinessActorNode = memo(({ data, selected }: NodeProps) => {
  const width = data.width || 100
  const height = data.height || 60

  return (
    <div className="relative" style={{ width, height }}>
      <NodeResizer
        color="#ca8a04"
        isVisible={selected}
        minWidth={80}
        minHeight={40}
      />
      <div
        className="w-full h-full rounded-lg border-2 border-yellow-600 p-3 shadow-md flex items-center justify-center"
        style={{ backgroundColor: BUSINESS_COLOR }}
      >
        <div className="text-xs font-semibold text-center">{data.label}</div>
      </div>
      <Handle type="target" position={Position.Left} className="w-2 h-2" />
      <Handle type="source" position={Position.Right} className="w-2 h-2" />
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
    </div>
  )
})
BusinessActorNode.displayName = "BusinessActorNode"

// Business Process - Behavior (rounded rectangle)
export const BusinessProcessNode = memo(({ data, selected }: NodeProps) => {
  const width = data.width || 120
  const height = data.height || 60

  return (
    <div className="relative" style={{ width, height }}>
      <NodeResizer
        color="#ca8a04"
        isVisible={selected}
        minWidth={100}
        minHeight={60}
      />
      <div
        className="w-full h-full rounded-lg border-2 border-yellow-600 p-3 shadow-md flex items-center justify-center"
        style={{ backgroundColor: BUSINESS_COLOR }}
      >
        <div className="text-xs font-semibold text-center">{data.label}</div>
      </div>
      <Handle type="target" position={Position.Left} className="w-2 h-2" />
      <Handle type="source" position={Position.Right} className="w-2 h-2" />
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
    </div>
  )
})
BusinessProcessNode.displayName = "BusinessProcessNode"

// Business Service - Behavior (rounded rectangle with service icon)
export const BusinessServiceNode = memo(({ data, selected }: NodeProps) => {
  const width = data.width || 100
  const height = data.height || 60
  const isCollapsed = data.isCollapsed || false

  return (
    <div className="relative" style={{ width, height }}>
      <NodeResizer
        color="#ca8a04"
        isVisible={selected}
        minWidth={80}
        minHeight={50}
      />
      <div
        className="w-full h-full rounded-t-lg border-2 border-yellow-600 p-3 shadow-md overflow-hidden"
        style={{
          backgroundColor: BUSINESS_COLOR,
          transition: 'all 0.2s ease-in-out',
        }}
      >
        {data.hasChildren && (
          <div className="absolute top-1 right-1 z-10">
            <button
              className="hover:bg-gray-200 rounded p-0.5 bg-white/70"
              onClick={(e) => {
                e.stopPropagation()
                if (data.onToggleCollapse) data.onToggleCollapse()
              }}
            >
              {isCollapsed ? (
                <ChevronRight className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )}
            </button>
          </div>
        )}
        <div className="flex items-center justify-center h-full">
          <div className="text-xs font-semibold text-center">{data.label}</div>
        </div>
        {isCollapsed && data.hasChildren && (
          <div className="text-[9px] text-center opacity-60 mt-1">
            {data.childCount || 0} nested
          </div>
        )}
      </div>
      <Handle type="target" position={Position.Left} className="w-2 h-2" />
      <Handle type="source" position={Position.Right} className="w-2 h-2" />
    </div>
  )
})
BusinessServiceNode.displayName = "BusinessServiceNode"

// Business Object - Passive Structure (rectangle with flat corners)
export const BusinessObjectNode = memo(({ data, selected }: NodeProps) => {
  const width = data.width || 90
  const height = data.height || 60
  const isCollapsed = data.isCollapsed || false

  return (
    <div className="relative" style={{ width, height }}>
      <NodeResizer
        color="#ca8a04"
        isVisible={selected}
        minWidth={70}
        minHeight={40}
      />
      <div
        className="w-full h-full border-2 border-yellow-600 p-3 shadow-md overflow-hidden"
        style={{
          backgroundColor: BUSINESS_COLOR,
          transition: 'all 0.2s ease-in-out',
        }}
      >
        {data.hasChildren && (
          <div className="absolute top-1 right-1 z-10">
            <button
              className="hover:bg-gray-200 rounded p-0.5 bg-white/70"
              onClick={(e) => {
                e.stopPropagation()
                if (data.onToggleCollapse) data.onToggleCollapse()
              }}
            >
              {isCollapsed ? (
                <ChevronRight className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )}
            </button>
          </div>
        )}
        <div className="flex items-center justify-center h-full">
          <div className="text-xs font-semibold text-center">{data.label}</div>
        </div>
        {isCollapsed && data.hasChildren && (
          <div className="text-[9px] text-center opacity-60 mt-1">
            {data.childCount || 0} nested
          </div>
        )}
      </div>
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
    </div>
  )
})
BusinessObjectNode.displayName = "BusinessObjectNode"

// Business Role - Active Structure (rounded rectangle)
export const BusinessRoleNode = memo(({ data, selected }: NodeProps) => {
  const width = data.width || 100
  const height = data.height || 60
  const isCollapsed = data.isCollapsed || false

  return (
    <div className="relative" style={{ width, height }}>
      <NodeResizer
        color="#ca8a04"
        isVisible={selected}
        minWidth={80}
        minHeight={40}
      />
      <div
        className="w-full h-full rounded-lg border-2 border-yellow-600 p-3 shadow-md overflow-hidden"
        style={{
          backgroundColor: BUSINESS_COLOR,
          transition: 'all 0.2s ease-in-out',
        }}
      >
        {data.hasChildren && (
          <div className="absolute top-1 right-1 z-10">
            <button
              className="hover:bg-gray-200 rounded p-0.5 bg-white/70"
              onClick={(e) => {
                e.stopPropagation()
                if (data.onToggleCollapse) data.onToggleCollapse()
              }}
            >
              {isCollapsed ? (
                <ChevronRight className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )}
            </button>
          </div>
        )}
        <div className="flex items-center justify-center h-full">
          <div className="text-xs font-semibold text-center">{data.label}</div>
        </div>
        {isCollapsed && data.hasChildren && (
          <div className="text-[9px] text-center opacity-60 mt-1">
            {data.childCount || 0} nested
          </div>
        )}
      </div>
      <Handle type="target" position={Position.Left} className="w-2 h-2" />
      <Handle type="source" position={Position.Right} className="w-2 h-2" />
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
    </div>
  )
})
BusinessRoleNode.displayName = "BusinessRoleNode"

// Business Collaboration - Active Structure (rounded rectangle)
export const BusinessCollaborationNode = memo(({ data, selected }: NodeProps) => {
  const width = data.width || 100
  const height = data.height || 60
  const isCollapsed = data.isCollapsed || false

  return (
    <div className="relative" style={{ width, height }}>
      <NodeResizer
        color="#ca8a04"
        isVisible={selected}
        minWidth={80}
        minHeight={40}
      />
      <div
        className="w-full h-full rounded-lg border-2 border-yellow-600 p-3 shadow-md overflow-hidden"
        style={{
          backgroundColor: BUSINESS_COLOR,
          transition: 'all 0.2s ease-in-out',
        }}
      >
        {data.hasChildren && (
          <div className="absolute top-1 right-1 z-10">
            <button
              className="hover:bg-gray-200 rounded p-0.5 bg-white/70"
              onClick={(e) => {
                e.stopPropagation()
                if (data.onToggleCollapse) data.onToggleCollapse()
              }}
            >
              {isCollapsed ? (
                <ChevronRight className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )}
            </button>
          </div>
        )}
        <div className="flex items-center justify-center h-full">
          <div className="text-xs font-semibold text-center">{data.label}</div>
        </div>
        {isCollapsed && data.hasChildren && (
          <div className="text-[9px] text-center opacity-60 mt-1">
            {data.childCount || 0} nested
          </div>
        )}
      </div>
      <Handle type="target" position={Position.Left} className="w-2 h-2" />
      <Handle type="source" position={Position.Right} className="w-2 h-2" />
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
    </div>
  )
})
BusinessCollaborationNode.displayName = "BusinessCollaborationNode"

// Business Interface - Active Structure (rounded rectangle with circle)
export const BusinessInterfaceNode = memo(({ data, selected }: NodeProps) => {
  const width = data.width || 100
  const height = data.height || 60
  const isCollapsed = data.isCollapsed || false

  return (
    <div className="relative" style={{ width, height }}>
      <NodeResizer
        color="#ca8a04"
        isVisible={selected}
        minWidth={80}
        minHeight={40}
      />
      <div
        className="w-full h-full rounded-lg border-2 border-yellow-600 p-3 shadow-md overflow-hidden"
        style={{
          backgroundColor: BUSINESS_COLOR,
          transition: 'all 0.2s ease-in-out',
        }}
      >
        {data.hasChildren && (
          <div className="absolute top-1 right-1 z-10">
            <button
              className="hover:bg-gray-200 rounded p-0.5 bg-white/70"
              onClick={(e) => {
                e.stopPropagation()
                if (data.onToggleCollapse) data.onToggleCollapse()
              }}
            >
              {isCollapsed ? (
                <ChevronRight className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )}
            </button>
          </div>
        )}
        <div className="flex items-center justify-center h-full">
          <div className="text-xs font-semibold text-center">{data.label}</div>
        </div>
        {isCollapsed && data.hasChildren && (
          <div className="text-[9px] text-center opacity-60 mt-1">
            {data.childCount || 0} nested
          </div>
        )}
      </div>
      <Handle type="target" position={Position.Left} className="w-2 h-2" />
      <Handle type="source" position={Position.Right} className="w-2 h-2" />
    </div>
  )
})
BusinessInterfaceNode.displayName = "BusinessInterfaceNode"

// Business Function - Behavior (rounded rectangle)
export const BusinessFunctionNode = memo(({ data, selected }: NodeProps) => {
  const width = data.width || 120
  const height = data.height || 60
  const isCollapsed = data.isCollapsed || false

  return (
    <div className="relative" style={{ width, height }}>
      <NodeResizer
        color="#ca8a04"
        isVisible={selected}
        minWidth={100}
        minHeight={60}
      />
      <div
        className="w-full h-full rounded-lg border-2 border-yellow-600 p-3 shadow-md overflow-hidden"
        style={{
          backgroundColor: BUSINESS_COLOR,
          transition: 'all 0.2s ease-in-out',
        }}
      >
        {data.hasChildren && (
          <div className="absolute top-1 right-1 z-10">
            <button
              className="hover:bg-gray-200 rounded p-0.5 bg-white/70"
              onClick={(e) => {
                e.stopPropagation()
                if (data.onToggleCollapse) data.onToggleCollapse()
              }}
            >
              {isCollapsed ? (
                <ChevronRight className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )}
            </button>
          </div>
        )}
        <div className="flex items-center justify-center h-full">
          <div className="text-xs font-semibold text-center">{data.label}</div>
        </div>
        {isCollapsed && data.hasChildren && (
          <div className="text-[9px] text-center opacity-60 mt-1">
            {data.childCount || 0} nested
          </div>
        )}
      </div>
      <Handle type="target" position={Position.Left} className="w-2 h-2" />
      <Handle type="source" position={Position.Right} className="w-2 h-2" />
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
    </div>
  )
})
BusinessFunctionNode.displayName = "BusinessFunctionNode"

// Business Interaction - Behavior (rounded rectangle)
export const BusinessInteractionNode = memo(({ data, selected }: NodeProps) => {
  const width = data.width || 120
  const height = data.height || 60
  const isCollapsed = data.isCollapsed || false

  return (
    <div className="relative" style={{ width, height }}>
      <NodeResizer
        color="#ca8a04"
        isVisible={selected}
        minWidth={100}
        minHeight={60}
      />
      <div
        className="w-full h-full rounded-lg border-2 border-yellow-600 p-3 shadow-md overflow-hidden"
        style={{
          backgroundColor: BUSINESS_COLOR,
          transition: 'all 0.2s ease-in-out',
        }}
      >
        {data.hasChildren && (
          <div className="absolute top-1 right-1 z-10">
            <button
              className="hover:bg-gray-200 rounded p-0.5 bg-white/70"
              onClick={(e) => {
                e.stopPropagation()
                if (data.onToggleCollapse) data.onToggleCollapse()
              }}
            >
              {isCollapsed ? (
                <ChevronRight className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )}
            </button>
          </div>
        )}
        <div className="flex items-center justify-center h-full">
          <div className="text-xs font-semibold text-center">{data.label}</div>
        </div>
        {isCollapsed && data.hasChildren && (
          <div className="text-[9px] text-center opacity-60 mt-1">
            {data.childCount || 0} nested
          </div>
        )}
      </div>
      <Handle type="target" position={Position.Left} className="w-2 h-2" />
      <Handle type="source" position={Position.Right} className="w-2 h-2" />
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
    </div>
  )
})
BusinessInteractionNode.displayName = "BusinessInteractionNode"

// Business Event - Behavior (rounded rectangle)
export const BusinessEventNode = memo(({ data, selected }: NodeProps) => {
  const width = data.width || 120
  const height = data.height || 60
  const isCollapsed = data.isCollapsed || false

  return (
    <div className="relative" style={{ width, height }}>
      <NodeResizer
        color="#ca8a04"
        isVisible={selected}
        minWidth={100}
        minHeight={60}
      />
      <div
        className="w-full h-full rounded-lg border-2 border-yellow-600 p-3 shadow-md overflow-hidden"
        style={{
          backgroundColor: BUSINESS_COLOR,
          transition: 'all 0.2s ease-in-out',
        }}
      >
        {data.hasChildren && (
          <div className="absolute top-1 right-1 z-10">
            <button
              className="hover:bg-gray-200 rounded p-0.5 bg-white/70"
              onClick={(e) => {
                e.stopPropagation()
                if (data.onToggleCollapse) data.onToggleCollapse()
              }}
            >
              {isCollapsed ? (
                <ChevronRight className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )}
            </button>
          </div>
        )}
        <div className="flex items-center justify-center h-full">
          <div className="text-xs font-semibold text-center">{data.label}</div>
        </div>
        {isCollapsed && data.hasChildren && (
          <div className="text-[9px] text-center opacity-60 mt-1">
            {data.childCount || 0} nested
          </div>
        )}
      </div>
      <Handle type="target" position={Position.Left} className="w-2 h-2" />
      <Handle type="source" position={Position.Right} className="w-2 h-2" />
    </div>
  )
})
BusinessEventNode.displayName = "BusinessEventNode"

// Contract - Passive Structure (rectangle)
export const ContractNode = memo(({ data, selected }: NodeProps) => {
  const width = data.width || 90
  const height = data.height || 60
  const isCollapsed = data.isCollapsed || false

  return (
    <div className="relative" style={{ width, height }}>
      <NodeResizer
        color="#ca8a04"
        isVisible={selected}
        minWidth={70}
        minHeight={40}
      />
      <div
        className="w-full h-full border-2 border-yellow-600 p-3 shadow-md overflow-hidden"
        style={{
          backgroundColor: BUSINESS_COLOR,
          transition: 'all 0.2s ease-in-out',
        }}
      >
        {data.hasChildren && (
          <div className="absolute top-1 right-1 z-10">
            <button
              className="hover:bg-gray-200 rounded p-0.5 bg-white/70"
              onClick={(e) => {
                e.stopPropagation()
                if (data.onToggleCollapse) data.onToggleCollapse()
              }}
            >
              {isCollapsed ? (
                <ChevronRight className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )}
            </button>
          </div>
        )}
        <div className="flex items-center justify-center h-full">
          <div className="text-xs font-semibold text-center">{data.label}</div>
        </div>
        {isCollapsed && data.hasChildren && (
          <div className="text-[9px] text-center opacity-60 mt-1">
            {data.childCount || 0} nested
          </div>
        )}
      </div>
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
    </div>
  )
})
ContractNode.displayName = "ContractNode"

// Representation - Passive Structure (rectangle)
export const RepresentationNode = memo(({ data, selected }: NodeProps) => {
  const width = data.width || 90
  const height = data.height || 60
  const isCollapsed = data.isCollapsed || false

  return (
    <div className="relative" style={{ width, height }}>
      <NodeResizer
        color="#ca8a04"
        isVisible={selected}
        minWidth={70}
        minHeight={40}
      />
      <div
        className="w-full h-full border-2 border-yellow-600 p-3 shadow-md overflow-hidden"
        style={{
          backgroundColor: BUSINESS_COLOR,
          transition: 'all 0.2s ease-in-out',
        }}
      >
        {data.hasChildren && (
          <div className="absolute top-1 right-1 z-10">
            <button
              className="hover:bg-gray-200 rounded p-0.5 bg-white/70"
              onClick={(e) => {
                e.stopPropagation()
                if (data.onToggleCollapse) data.onToggleCollapse()
              }}
            >
              {isCollapsed ? (
                <ChevronRight className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )}
            </button>
          </div>
        )}
        <div className="flex items-center justify-center h-full">
          <div className="text-xs font-semibold text-center">{data.label}</div>
        </div>
        {isCollapsed && data.hasChildren && (
          <div className="text-[9px] text-center opacity-60 mt-1">
            {data.childCount || 0} nested
          </div>
        )}
      </div>
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
    </div>
  )
})
RepresentationNode.displayName = "RepresentationNode"

// Product - Passive Structure (rectangle)
export const ProductNode = memo(({ data, selected }: NodeProps) => {
  const width = data.width || 90
  const height = data.height || 60
  const isCollapsed = data.isCollapsed || false

  return (
    <div className="relative" style={{ width, height }}>
      <NodeResizer
        color="#ca8a04"
        isVisible={selected}
        minWidth={70}
        minHeight={40}
      />
      <div
        className="w-full h-full border-2 border-yellow-600 p-3 shadow-md overflow-hidden"
        style={{
          backgroundColor: BUSINESS_COLOR,
          transition: 'all 0.2s ease-in-out',
        }}
      >
        {data.hasChildren && (
          <div className="absolute top-1 right-1 z-10">
            <button
              className="hover:bg-gray-200 rounded p-0.5 bg-white/70"
              onClick={(e) => {
                e.stopPropagation()
                if (data.onToggleCollapse) data.onToggleCollapse()
              }}
            >
              {isCollapsed ? (
                <ChevronRight className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )}
            </button>
          </div>
        )}
        <div className="flex items-center justify-center h-full">
          <div className="text-xs font-semibold text-center">{data.label}</div>
        </div>
        {isCollapsed && data.hasChildren && (
          <div className="text-[9px] text-center opacity-60 mt-1">
            {data.childCount || 0} nested
          </div>
        )}
      </div>
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
    </div>
  )
})
ProductNode.displayName = "ProductNode"

// ============================================================================
// APPLICATION LAYER - Light Blue (#B5FFFF)
// ============================================================================

// Application Component - Active Structure
export const ApplicationComponentNode = memo(({ data, selected }: NodeProps) => {
  const width = data.width || 100
  const height = data.height || 60

  return (
    <div className="relative" style={{ width, height }}>
      <NodeResizer
        color="#2563eb"
        isVisible={selected}
        minWidth={80}
        minHeight={60}
      />
      <div
        className="w-full h-full rounded-lg border-2 border-blue-600 p-3 shadow-md flex items-center justify-center"
        style={{ backgroundColor: APPLICATION_COLOR }}
      >
        <div className="text-xs font-semibold text-center">{data.label}</div>
      </div>
      <Handle type="target" position={Position.Left} className="w-2 h-2" />
      <Handle type="source" position={Position.Right} className="w-2 h-2" />
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
    </div>
  )
})
ApplicationComponentNode.displayName = "ApplicationComponentNode"

// Application Service - Behavior
export const ApplicationServiceNode = memo(({ data, selected }: NodeProps) => {
  const width = data.width || 100
  const height = data.height || 60
  const isCollapsed = data.isCollapsed || false

  return (
    <div className="relative" style={{ width, height }}>
      <NodeResizer
        color="#2563eb"
        isVisible={selected}
        minWidth={80}
        minHeight={50}
      />
      <div
        className="w-full h-full rounded-t-lg border-2 border-blue-600 p-3 shadow-md overflow-hidden"
        style={{
          backgroundColor: APPLICATION_COLOR,
          transition: 'all 0.2s ease-in-out',
        }}
      >
        {data.hasChildren && (
          <div className="absolute top-1 right-1 z-10">
            <button
              className="hover:bg-gray-200 rounded p-0.5 bg-white/70"
              onClick={(e) => {
                e.stopPropagation()
                if (data.onToggleCollapse) data.onToggleCollapse()
              }}
            >
              {isCollapsed ? (
                <ChevronRight className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )}
            </button>
          </div>
        )}
        <div className="flex items-center justify-center h-full">
          <div className="text-xs font-semibold text-center">{data.label}</div>
        </div>
        {isCollapsed && data.hasChildren && (
          <div className="text-[9px] text-center opacity-60 mt-1">
            {data.childCount || 0} nested
          </div>
        )}
      </div>
      <Handle type="target" position={Position.Left} className="w-2 h-2" />
      <Handle type="source" position={Position.Right} className="w-2 h-2" />
    </div>
  )
})
ApplicationServiceNode.displayName = "ApplicationServiceNode"

// Data Object - Passive Structure
export const DataObjectNode = memo(({ data, selected }: NodeProps) => {
  const width = data.width || 90
  const height = data.height || 60
  const isCollapsed = data.isCollapsed || false

  return (
    <div className="relative" style={{ width, height }}>
      <NodeResizer
        color="#2563eb"
        isVisible={selected}
        minWidth={70}
        minHeight={40}
      />
      <div
        className="w-full h-full border-2 border-blue-600 p-3 shadow-md overflow-hidden"
        style={{
          backgroundColor: APPLICATION_COLOR,
          transition: 'all 0.2s ease-in-out',
        }}
      >
        {data.hasChildren && (
          <div className="absolute top-1 right-1 z-10">
            <button
              className="hover:bg-gray-200 rounded p-0.5 bg-white/70"
              onClick={(e) => {
                e.stopPropagation()
                if (data.onToggleCollapse) data.onToggleCollapse()
              }}
            >
              {isCollapsed ? (
                <ChevronRight className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )}
            </button>
          </div>
        )}
        <div className="flex items-center justify-center h-full">
          <div className="text-xs font-semibold text-center">{data.label}</div>
        </div>
        {isCollapsed && data.hasChildren && (
          <div className="text-[9px] text-center opacity-60 mt-1">
            {data.childCount || 0} nested
          </div>
        )}
      </div>
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
    </div>
  )
})
DataObjectNode.displayName = "DataObjectNode"

// Application Collaboration - Active Structure
export const ApplicationCollaborationNode = memo(({ data, selected }: NodeProps) => {
  const width = data.width || 100
  const height = data.height || 60
  const isCollapsed = data.isCollapsed || false

  return (
    <div className="relative" style={{ width, height }}>
      <NodeResizer
        color="#2563eb"
        isVisible={selected}
        minWidth={80}
        minHeight={40}
      />
      <div
        className="w-full h-full rounded-lg border-2 border-blue-600 p-3 shadow-md overflow-hidden"
        style={{
          backgroundColor: APPLICATION_COLOR,
          transition: 'all 0.2s ease-in-out',
        }}
      >
        {data.hasChildren && (
          <div className="absolute top-1 right-1 z-10">
            <button
              className="hover:bg-gray-200 rounded p-0.5 bg-white/70"
              onClick={(e) => {
                e.stopPropagation()
                if (data.onToggleCollapse) data.onToggleCollapse()
              }}
            >
              {isCollapsed ? (
                <ChevronRight className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )}
            </button>
          </div>
        )}
        <div className="flex items-center justify-center h-full">
          <div className="text-xs font-semibold text-center">{data.label}</div>
        </div>
        {isCollapsed && data.hasChildren && (
          <div className="text-[9px] text-center opacity-60 mt-1">
            {data.childCount || 0} nested
          </div>
        )}
      </div>
      <Handle type="target" position={Position.Left} className="w-2 h-2" />
      <Handle type="source" position={Position.Right} className="w-2 h-2" />
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
    </div>
  )
})
ApplicationCollaborationNode.displayName = "ApplicationCollaborationNode"

// Application Interface - Active Structure
export const ApplicationInterfaceNode = memo(({ data, selected }: NodeProps) => {
  const width = data.width || 100
  const height = data.height || 60
  const isCollapsed = data.isCollapsed || false

  return (
    <div className="relative" style={{ width, height }}>
      <NodeResizer
        color="#2563eb"
        isVisible={selected}
        minWidth={80}
        minHeight={40}
      />
      <div
        className="w-full h-full rounded-lg border-2 border-blue-600 p-3 shadow-md overflow-hidden"
        style={{
          backgroundColor: APPLICATION_COLOR,
          transition: 'all 0.2s ease-in-out',
        }}
      >
        {data.hasChildren && (
          <div className="absolute top-1 right-1 z-10">
            <button
              className="hover:bg-gray-200 rounded p-0.5 bg-white/70"
              onClick={(e) => {
                e.stopPropagation()
                if (data.onToggleCollapse) data.onToggleCollapse()
              }}
            >
              {isCollapsed ? (
                <ChevronRight className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )}
            </button>
          </div>
        )}
        <div className="flex items-center justify-center h-full">
          <div className="text-xs font-semibold text-center">{data.label}</div>
        </div>
        {isCollapsed && data.hasChildren && (
          <div className="text-[9px] text-center opacity-60 mt-1">
            {data.childCount || 0} nested
          </div>
        )}
      </div>
      <Handle type="target" position={Position.Left} className="w-2 h-2" />
      <Handle type="source" position={Position.Right} className="w-2 h-2" />
    </div>
  )
})
ApplicationInterfaceNode.displayName = "ApplicationInterfaceNode"

// Application Function - Behavior
export const ApplicationFunctionNode = memo(({ data, selected }: NodeProps) => {
  const width = data.width || 120
  const height = data.height || 60
  const isCollapsed = data.isCollapsed || false

  return (
    <div className="relative" style={{ width, height }}>
      <NodeResizer
        color="#2563eb"
        isVisible={selected}
        minWidth={100}
        minHeight={60}
      />
      <div
        className="w-full h-full rounded-lg border-2 border-blue-600 p-3 shadow-md overflow-hidden"
        style={{
          backgroundColor: APPLICATION_COLOR,
          transition: 'all 0.2s ease-in-out',
        }}
      >
        {data.hasChildren && (
          <div className="absolute top-1 right-1 z-10">
            <button
              className="hover:bg-gray-200 rounded p-0.5 bg-white/70"
              onClick={(e) => {
                e.stopPropagation()
                if (data.onToggleCollapse) data.onToggleCollapse()
              }}
            >
              {isCollapsed ? (
                <ChevronRight className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )}
            </button>
          </div>
        )}
        <div className="flex items-center justify-center h-full">
          <div className="text-xs font-semibold text-center">{data.label}</div>
        </div>
        {isCollapsed && data.hasChildren && (
          <div className="text-[9px] text-center opacity-60 mt-1">
            {data.childCount || 0} nested
          </div>
        )}
      </div>
      <Handle type="target" position={Position.Left} className="w-2 h-2" />
      <Handle type="source" position={Position.Right} className="w-2 h-2" />
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
    </div>
  )
})
ApplicationFunctionNode.displayName = "ApplicationFunctionNode"

// Application Interaction - Behavior
export const ApplicationInteractionNode = memo(({ data, selected }: NodeProps) => {
  const width = data.width || 120
  const height = data.height || 60
  const isCollapsed = data.isCollapsed || false

  return (
    <div className="relative" style={{ width, height }}>
      <NodeResizer
        color="#2563eb"
        isVisible={selected}
        minWidth={100}
        minHeight={60}
      />
      <div
        className="w-full h-full rounded-lg border-2 border-blue-600 p-3 shadow-md overflow-hidden"
        style={{
          backgroundColor: APPLICATION_COLOR,
          transition: 'all 0.2s ease-in-out',
        }}
      >
        {data.hasChildren && (
          <div className="absolute top-1 right-1 z-10">
            <button
              className="hover:bg-gray-200 rounded p-0.5 bg-white/70"
              onClick={(e) => {
                e.stopPropagation()
                if (data.onToggleCollapse) data.onToggleCollapse()
              }}
            >
              {isCollapsed ? (
                <ChevronRight className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )}
            </button>
          </div>
        )}
        <div className="flex items-center justify-center h-full">
          <div className="text-xs font-semibold text-center">{data.label}</div>
        </div>
        {isCollapsed && data.hasChildren && (
          <div className="text-[9px] text-center opacity-60 mt-1">
            {data.childCount || 0} nested
          </div>
        )}
      </div>
      <Handle type="target" position={Position.Left} className="w-2 h-2" />
      <Handle type="source" position={Position.Right} className="w-2 h-2" />
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
    </div>
  )
})
ApplicationInteractionNode.displayName = "ApplicationInteractionNode"

// Application Process - Behavior
export const ApplicationProcessNode = memo(({ data, selected }: NodeProps) => {
  const width = data.width || 120
  const height = data.height || 60
  const isCollapsed = data.isCollapsed || false

  return (
    <div className="relative" style={{ width, height }}>
      <NodeResizer
        color="#2563eb"
        isVisible={selected}
        minWidth={100}
        minHeight={60}
      />
      <div
        className="w-full h-full rounded-lg border-2 border-blue-600 p-3 shadow-md overflow-hidden"
        style={{
          backgroundColor: APPLICATION_COLOR,
          transition: 'all 0.2s ease-in-out',
        }}
      >
        {data.hasChildren && (
          <div className="absolute top-1 right-1 z-10">
            <button
              className="hover:bg-gray-200 rounded p-0.5 bg-white/70"
              onClick={(e) => {
                e.stopPropagation()
                if (data.onToggleCollapse) data.onToggleCollapse()
              }}
            >
              {isCollapsed ? (
                <ChevronRight className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )}
            </button>
          </div>
        )}
        <div className="flex items-center justify-center h-full">
          <div className="text-xs font-semibold text-center">{data.label}</div>
        </div>
        {isCollapsed && data.hasChildren && (
          <div className="text-[9px] text-center opacity-60 mt-1">
            {data.childCount || 0} nested
          </div>
        )}
      </div>
      <Handle type="target" position={Position.Left} className="w-2 h-2" />
      <Handle type="source" position={Position.Right} className="w-2 h-2" />
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
    </div>
  )
})
ApplicationProcessNode.displayName = "ApplicationProcessNode"

// Application Event - Behavior
export const ApplicationEventNode = memo(({ data, selected }: NodeProps) => {
  const width = data.width || 120
  const height = data.height || 60
  const isCollapsed = data.isCollapsed || false

  return (
    <div className="relative" style={{ width, height }}>
      <NodeResizer
        color="#2563eb"
        isVisible={selected}
        minWidth={100}
        minHeight={60}
      />
      <div
        className="w-full h-full rounded-lg border-2 border-blue-600 p-3 shadow-md overflow-hidden"
        style={{
          backgroundColor: APPLICATION_COLOR,
          transition: 'all 0.2s ease-in-out',
        }}
      >
        {data.hasChildren && (
          <div className="absolute top-1 right-1 z-10">
            <button
              className="hover:bg-gray-200 rounded p-0.5 bg-white/70"
              onClick={(e) => {
                e.stopPropagation()
                if (data.onToggleCollapse) data.onToggleCollapse()
              }}
            >
              {isCollapsed ? (
                <ChevronRight className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )}
            </button>
          </div>
        )}
        <div className="flex items-center justify-center h-full">
          <div className="text-xs font-semibold text-center">{data.label}</div>
        </div>
        {isCollapsed && data.hasChildren && (
          <div className="text-[9px] text-center opacity-60 mt-1">
            {data.childCount || 0} nested
          </div>
        )}
      </div>
      <Handle type="target" position={Position.Left} className="w-2 h-2" />
      <Handle type="source" position={Position.Right} className="w-2 h-2" />
    </div>
  )
})
ApplicationEventNode.displayName = "ApplicationEventNode"

// ============================================================================
// TECHNOLOGY LAYER - Light Green (#C9E7B7)
// ============================================================================

// Node (Infrastructure) - Active Structure
export const InfrastructureNodeNode = memo(({ data, selected }: NodeProps) => {
  const width = data.width || 100
  const height = data.height || 60
  const isCollapsed = data.isCollapsed || false

  return (
    <div className="relative" style={{ width, height }}>
      <NodeResizer
        color="#16a34a"
        isVisible={selected}
        minWidth={80}
        minHeight={40}
      />
      <div
        className="w-full h-full rounded-lg border-2 border-green-700 p-3 shadow-md overflow-hidden"
        style={{
          backgroundColor: TECHNOLOGY_COLOR,
          transition: 'all 0.2s ease-in-out',
        }}
      >
        {data.hasChildren && (
          <div className="absolute top-1 right-1 z-10">
            <button
              className="hover:bg-gray-200 rounded p-0.5 bg-white/70"
              onClick={(e) => {
                e.stopPropagation()
                if (data.onToggleCollapse) data.onToggleCollapse()
              }}
            >
              {isCollapsed ? (
                <ChevronRight className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )}
            </button>
          </div>
        )}
        <div className="flex items-center justify-center h-full">
          <div className="text-xs font-semibold text-center">{data.label}</div>
        </div>
        {isCollapsed && data.hasChildren && (
          <div className="text-[9px] text-center opacity-60 mt-1">
            {data.childCount || 0} nested
          </div>
        )}
      </div>
      <Handle type="target" position={Position.Left} className="w-2 h-2" />
      <Handle type="source" position={Position.Right} className="w-2 h-2" />
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
    </div>
  )
})
InfrastructureNodeNode.displayName = "InfrastructureNodeNode"

// Technology Service
export const TechnologyServiceNode = memo(({ data, selected }: NodeProps) => {
  const width = data.width || 100
  const height = data.height || 60
  const isCollapsed = data.isCollapsed || false

  return (
    <div className="relative" style={{ width, height }}>
      <NodeResizer
        color="#16a34a"
        isVisible={selected}
        minWidth={80}
        minHeight={50}
      />
      <div
        className="w-full h-full rounded-t-lg border-2 border-green-700 p-3 shadow-md overflow-hidden"
        style={{
          backgroundColor: TECHNOLOGY_COLOR,
          transition: 'all 0.2s ease-in-out',
        }}
      >
        {data.hasChildren && (
          <div className="absolute top-1 right-1 z-10">
            <button
              className="hover:bg-gray-200 rounded p-0.5 bg-white/70"
              onClick={(e) => {
                e.stopPropagation()
                if (data.onToggleCollapse) data.onToggleCollapse()
              }}
            >
              {isCollapsed ? (
                <ChevronRight className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )}
            </button>
          </div>
        )}
        <div className="flex items-center justify-center h-full">
          <div className="text-xs font-semibold text-center">{data.label}</div>
        </div>
        {isCollapsed && data.hasChildren && (
          <div className="text-[9px] text-center opacity-60 mt-1">
            {data.childCount || 0} nested
          </div>
        )}
      </div>
      <Handle type="target" position={Position.Left} className="w-2 h-2" />
      <Handle type="source" position={Position.Right} className="w-2 h-2" />
    </div>
  )
})
TechnologyServiceNode.displayName = "TechnologyServiceNode"

// Device - Active Structure
export const DeviceNode = memo(({ data, selected }: NodeProps) => {
  const width = data.width || 100
  const height = data.height || 60
  const isCollapsed = data.isCollapsed || false

  return (
    <div className="relative" style={{ width, height }}>
      <NodeResizer
        color="#16a34a"
        isVisible={selected}
        minWidth={80}
        minHeight={40}
      />
      <div
        className="w-full h-full rounded-lg border-2 border-green-700 p-3 shadow-md overflow-hidden"
        style={{
          backgroundColor: TECHNOLOGY_COLOR,
          transition: 'all 0.2s ease-in-out',
        }}
      >
        {data.hasChildren && (
          <div className="absolute top-1 right-1 z-10">
            <button
              className="hover:bg-gray-200 rounded p-0.5 bg-white/70"
              onClick={(e) => {
                e.stopPropagation()
                if (data.onToggleCollapse) data.onToggleCollapse()
              }}
            >
              {isCollapsed ? (
                <ChevronRight className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )}
            </button>
          </div>
        )}
        <div className="flex items-center justify-center h-full">
          <div className="text-xs font-semibold text-center">{data.label}</div>
        </div>
        {isCollapsed && data.hasChildren && (
          <div className="text-[9px] text-center opacity-60 mt-1">
            {data.childCount || 0} nested
          </div>
        )}
      </div>
      <Handle type="target" position={Position.Left} className="w-2 h-2" />
      <Handle type="source" position={Position.Right} className="w-2 h-2" />
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
    </div>
  )
})
DeviceNode.displayName = "DeviceNode"

// System Software - Active Structure
export const SystemSoftwareNode = memo(({ data, selected }: NodeProps) => {
  const width = data.width || 100
  const height = data.height || 60
  const isCollapsed = data.isCollapsed || false

  return (
    <div className="relative" style={{ width, height }}>
      <NodeResizer
        color="#16a34a"
        isVisible={selected}
        minWidth={80}
        minHeight={40}
      />
      <div
        className="w-full h-full rounded-lg border-2 border-green-700 p-3 shadow-md overflow-hidden"
        style={{
          backgroundColor: TECHNOLOGY_COLOR,
          transition: 'all 0.2s ease-in-out',
        }}
      >
        {data.hasChildren && (
          <div className="absolute top-1 right-1 z-10">
            <button
              className="hover:bg-gray-200 rounded p-0.5 bg-white/70"
              onClick={(e) => {
                e.stopPropagation()
                if (data.onToggleCollapse) data.onToggleCollapse()
              }}
            >
              {isCollapsed ? (
                <ChevronRight className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )}
            </button>
          </div>
        )}
        <div className="flex items-center justify-center h-full">
          <div className="text-xs font-semibold text-center">{data.label}</div>
        </div>
        {isCollapsed && data.hasChildren && (
          <div className="text-[9px] text-center opacity-60 mt-1">
            {data.childCount || 0} nested
          </div>
        )}
      </div>
      <Handle type="target" position={Position.Left} className="w-2 h-2" />
      <Handle type="source" position={Position.Right} className="w-2 h-2" />
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
    </div>
  )
})
SystemSoftwareNode.displayName = "SystemSoftwareNode"

// Technology Collaboration - Active Structure
export const TechnologyCollaborationNode = memo(({ data, selected }: NodeProps) => {
  const width = data.width || 100
  const height = data.height || 60
  const isCollapsed = data.isCollapsed || false

  return (
    <div className="relative" style={{ width, height }}>
      <NodeResizer
        color="#16a34a"
        isVisible={selected}
        minWidth={80}
        minHeight={40}
      />
      <div
        className="w-full h-full rounded-lg border-2 border-green-700 p-3 shadow-md overflow-hidden"
        style={{
          backgroundColor: TECHNOLOGY_COLOR,
          transition: 'all 0.2s ease-in-out',
        }}
      >
        {data.hasChildren && (
          <div className="absolute top-1 right-1 z-10">
            <button
              className="hover:bg-gray-200 rounded p-0.5 bg-white/70"
              onClick={(e) => {
                e.stopPropagation()
                if (data.onToggleCollapse) data.onToggleCollapse()
              }}
            >
              {isCollapsed ? (
                <ChevronRight className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )}
            </button>
          </div>
        )}
        <div className="flex items-center justify-center h-full">
          <div className="text-xs font-semibold text-center">{data.label}</div>
        </div>
        {isCollapsed && data.hasChildren && (
          <div className="text-[9px] text-center opacity-60 mt-1">
            {data.childCount || 0} nested
          </div>
        )}
      </div>
      <Handle type="target" position={Position.Left} className="w-2 h-2" />
      <Handle type="source" position={Position.Right} className="w-2 h-2" />
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
    </div>
  )
})
TechnologyCollaborationNode.displayName = "TechnologyCollaborationNode"

// Technology Interface - Active Structure
export const TechnologyInterfaceNode = memo(({ data, selected }: NodeProps) => {
  const width = data.width || 100
  const height = data.height || 60
  const isCollapsed = data.isCollapsed || false

  return (
    <div className="relative" style={{ width, height }}>
      <NodeResizer
        color="#16a34a"
        isVisible={selected}
        minWidth={80}
        minHeight={40}
      />
      <div
        className="w-full h-full rounded-lg border-2 border-green-700 p-3 shadow-md overflow-hidden"
        style={{
          backgroundColor: TECHNOLOGY_COLOR,
          transition: 'all 0.2s ease-in-out',
        }}
      >
        {data.hasChildren && (
          <div className="absolute top-1 right-1 z-10">
            <button
              className="hover:bg-gray-200 rounded p-0.5 bg-white/70"
              onClick={(e) => {
                e.stopPropagation()
                if (data.onToggleCollapse) data.onToggleCollapse()
              }}
            >
              {isCollapsed ? (
                <ChevronRight className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )}
            </button>
          </div>
        )}
        <div className="flex items-center justify-center h-full">
          <div className="text-xs font-semibold text-center">{data.label}</div>
        </div>
        {isCollapsed && data.hasChildren && (
          <div className="text-[9px] text-center opacity-60 mt-1">
            {data.childCount || 0} nested
          </div>
        )}
      </div>
      <Handle type="target" position={Position.Left} className="w-2 h-2" />
      <Handle type="source" position={Position.Right} className="w-2 h-2" />
    </div>
  )
})
TechnologyInterfaceNode.displayName = "TechnologyInterfaceNode"

// Path - Active Structure
export const PathNode = memo(({ data, selected }: NodeProps) => {
  const width = data.width || 100
  const height = data.height || 60
  const isCollapsed = data.isCollapsed || false

  return (
    <div className="relative" style={{ width, height }}>
      <NodeResizer
        color="#16a34a"
        isVisible={selected}
        minWidth={80}
        minHeight={40}
      />
      <div
        className="w-full h-full rounded-lg border-2 border-green-700 p-3 shadow-md overflow-hidden"
        style={{
          backgroundColor: TECHNOLOGY_COLOR,
          transition: 'all 0.2s ease-in-out',
        }}
      >
        {data.hasChildren && (
          <div className="absolute top-1 right-1 z-10">
            <button
              className="hover:bg-gray-200 rounded p-0.5 bg-white/70"
              onClick={(e) => {
                e.stopPropagation()
                if (data.onToggleCollapse) data.onToggleCollapse()
              }}
            >
              {isCollapsed ? (
                <ChevronRight className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )}
            </button>
          </div>
        )}
        <div className="flex items-center justify-center h-full">
          <div className="text-xs font-semibold text-center">{data.label}</div>
        </div>
        {isCollapsed && data.hasChildren && (
          <div className="text-[9px] text-center opacity-60 mt-1">
            {data.childCount || 0} nested
          </div>
        )}
      </div>
      <Handle type="target" position={Position.Left} className="w-2 h-2" />
      <Handle type="source" position={Position.Right} className="w-2 h-2" />
    </div>
  )
})
PathNode.displayName = "PathNode"

// Communication Network - Active Structure
export const CommunicationNetworkNode = memo(({ data, selected }: NodeProps) => {
  const width = data.width || 100
  const height = data.height || 60
  const isCollapsed = data.isCollapsed || false

  return (
    <div className="relative" style={{ width, height }}>
      <NodeResizer
        color="#16a34a"
        isVisible={selected}
        minWidth={80}
        minHeight={40}
      />
      <div
        className="w-full h-full rounded-lg border-2 border-green-700 p-3 shadow-md overflow-hidden"
        style={{
          backgroundColor: TECHNOLOGY_COLOR,
          transition: 'all 0.2s ease-in-out',
        }}
      >
        {data.hasChildren && (
          <div className="absolute top-1 right-1 z-10">
            <button
              className="hover:bg-gray-200 rounded p-0.5 bg-white/70"
              onClick={(e) => {
                e.stopPropagation()
                if (data.onToggleCollapse) data.onToggleCollapse()
              }}
            >
              {isCollapsed ? (
                <ChevronRight className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )}
            </button>
          </div>
        )}
        <div className="flex items-center justify-center h-full">
          <div className="text-xs font-semibold text-center">{data.label}</div>
        </div>
        {isCollapsed && data.hasChildren && (
          <div className="text-[9px] text-center opacity-60 mt-1">
            {data.childCount || 0} nested
          </div>
        )}
      </div>
      <Handle type="target" position={Position.Left} className="w-2 h-2" />
      <Handle type="source" position={Position.Right} className="w-2 h-2" />
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
    </div>
  )
})
CommunicationNetworkNode.displayName = "CommunicationNetworkNode"

// Technology Function - Behavior
export const TechnologyFunctionNode = memo(({ data, selected }: NodeProps) => {
  const width = data.width || 120
  const height = data.height || 60
  const isCollapsed = data.isCollapsed || false

  return (
    <div className="relative" style={{ width, height }}>
      <NodeResizer
        color="#16a34a"
        isVisible={selected}
        minWidth={100}
        minHeight={60}
      />
      <div
        className="w-full h-full rounded-lg border-2 border-green-700 p-3 shadow-md overflow-hidden"
        style={{
          backgroundColor: TECHNOLOGY_COLOR,
          transition: 'all 0.2s ease-in-out',
        }}
      >
        {data.hasChildren && (
          <div className="absolute top-1 right-1 z-10">
            <button
              className="hover:bg-gray-200 rounded p-0.5 bg-white/70"
              onClick={(e) => {
                e.stopPropagation()
                if (data.onToggleCollapse) data.onToggleCollapse()
              }}
            >
              {isCollapsed ? (
                <ChevronRight className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )}
            </button>
          </div>
        )}
        <div className="flex items-center justify-center h-full">
          <div className="text-xs font-semibold text-center">{data.label}</div>
        </div>
        {isCollapsed && data.hasChildren && (
          <div className="text-[9px] text-center opacity-60 mt-1">
            {data.childCount || 0} nested
          </div>
        )}
      </div>
      <Handle type="target" position={Position.Left} className="w-2 h-2" />
      <Handle type="source" position={Position.Right} className="w-2 h-2" />
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
    </div>
  )
})
TechnologyFunctionNode.displayName = "TechnologyFunctionNode"

// Technology Process - Behavior
export const TechnologyProcessNode = memo(({ data, selected }: NodeProps) => {
  const width = data.width || 120
  const height = data.height || 60
  const isCollapsed = data.isCollapsed || false

  return (
    <div className="relative" style={{ width, height }}>
      <NodeResizer
        color="#16a34a"
        isVisible={selected}
        minWidth={100}
        minHeight={60}
      />
      <div
        className="w-full h-full rounded-lg border-2 border-green-700 p-3 shadow-md overflow-hidden"
        style={{
          backgroundColor: TECHNOLOGY_COLOR,
          transition: 'all 0.2s ease-in-out',
        }}
      >
        {data.hasChildren && (
          <div className="absolute top-1 right-1 z-10">
            <button
              className="hover:bg-gray-200 rounded p-0.5 bg-white/70"
              onClick={(e) => {
                e.stopPropagation()
                if (data.onToggleCollapse) data.onToggleCollapse()
              }}
            >
              {isCollapsed ? (
                <ChevronRight className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )}
            </button>
          </div>
        )}
        <div className="flex items-center justify-center h-full">
          <div className="text-xs font-semibold text-center">{data.label}</div>
        </div>
        {isCollapsed && data.hasChildren && (
          <div className="text-[9px] text-center opacity-60 mt-1">
            {data.childCount || 0} nested
          </div>
        )}
      </div>
      <Handle type="target" position={Position.Left} className="w-2 h-2" />
      <Handle type="source" position={Position.Right} className="w-2 h-2" />
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
    </div>
  )
})
TechnologyProcessNode.displayName = "TechnologyProcessNode"

// Technology Interaction - Behavior
export const TechnologyInteractionNode = memo(({ data, selected }: NodeProps) => {
  const width = data.width || 120
  const height = data.height || 60
  const isCollapsed = data.isCollapsed || false

  return (
    <div className="relative" style={{ width, height }}>
      <NodeResizer
        color="#16a34a"
        isVisible={selected}
        minWidth={100}
        minHeight={60}
      />
      <div
        className="w-full h-full rounded-lg border-2 border-green-700 p-3 shadow-md overflow-hidden"
        style={{
          backgroundColor: TECHNOLOGY_COLOR,
          transition: 'all 0.2s ease-in-out',
        }}
      >
        {data.hasChildren && (
          <div className="absolute top-1 right-1 z-10">
            <button
              className="hover:bg-gray-200 rounded p-0.5 bg-white/70"
              onClick={(e) => {
                e.stopPropagation()
                if (data.onToggleCollapse) data.onToggleCollapse()
              }}
            >
              {isCollapsed ? (
                <ChevronRight className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )}
            </button>
          </div>
        )}
        <div className="flex items-center justify-center h-full">
          <div className="text-xs font-semibold text-center">{data.label}</div>
        </div>
        {isCollapsed && data.hasChildren && (
          <div className="text-[9px] text-center opacity-60 mt-1">
            {data.childCount || 0} nested
          </div>
        )}
      </div>
      <Handle type="target" position={Position.Left} className="w-2 h-2" />
      <Handle type="source" position={Position.Right} className="w-2 h-2" />
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
    </div>
  )
})
TechnologyInteractionNode.displayName = "TechnologyInteractionNode"

// Technology Event - Behavior
export const TechnologyEventNode = memo(({ data, selected }: NodeProps) => {
  const width = data.width || 120
  const height = data.height || 60
  const isCollapsed = data.isCollapsed || false

  return (
    <div className="relative" style={{ width, height }}>
      <NodeResizer
        color="#16a34a"
        isVisible={selected}
        minWidth={100}
        minHeight={60}
      />
      <div
        className="w-full h-full rounded-lg border-2 border-green-700 p-3 shadow-md overflow-hidden"
        style={{
          backgroundColor: TECHNOLOGY_COLOR,
          transition: 'all 0.2s ease-in-out',
        }}
      >
        {data.hasChildren && (
          <div className="absolute top-1 right-1 z-10">
            <button
              className="hover:bg-gray-200 rounded p-0.5 bg-white/70"
              onClick={(e) => {
                e.stopPropagation()
                if (data.onToggleCollapse) data.onToggleCollapse()
              }}
            >
              {isCollapsed ? (
                <ChevronRight className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )}
            </button>
          </div>
        )}
        <div className="flex items-center justify-center h-full">
          <div className="text-xs font-semibold text-center">{data.label}</div>
        </div>
        {isCollapsed && data.hasChildren && (
          <div className="text-[9px] text-center opacity-60 mt-1">
            {data.childCount || 0} nested
          </div>
        )}
      </div>
      <Handle type="target" position={Position.Left} className="w-2 h-2" />
      <Handle type="source" position={Position.Right} className="w-2 h-2" />
    </div>
  )
})
TechnologyEventNode.displayName = "TechnologyEventNode"

// Artifact - Passive Structure
export const ArtifactNode = memo(({ data, selected }: NodeProps) => {
  const width = data.width || 90
  const height = data.height || 60
  const isCollapsed = data.isCollapsed || false

  return (
    <div className="relative" style={{ width, height }}>
      <NodeResizer
        color="#16a34a"
        isVisible={selected}
        minWidth={70}
        minHeight={40}
      />
      <div
        className="w-full h-full  border-2 border-green-700 p-3 shadow-md overflow-hidden"
        style={{
          backgroundColor: TECHNOLOGY_COLOR,
          transition: 'all 0.2s ease-in-out',
        }}
      >
        {data.hasChildren && (
          <div className="absolute top-1 right-1 z-10">
            <button
              className="hover:bg-gray-200 rounded p-0.5 bg-white/70"
              onClick={(e) => {
                e.stopPropagation()
                if (data.onToggleCollapse) data.onToggleCollapse()
              }}
            >
              {isCollapsed ? (
                <ChevronRight className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )}
            </button>
          </div>
        )}
        <div className="flex items-center justify-center h-full">
          <div className="text-xs font-semibold text-center">{data.label}</div>
        </div>
        {isCollapsed && data.hasChildren && (
          <div className="text-[9px] text-center opacity-60 mt-1">
            {data.childCount || 0} nested
          </div>
        )}
      </div>
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
    </div>
  )
})
ArtifactNode.displayName = "ArtifactNode"

// ============================================================================
// STRATEGY LAYER - Light Pink (#FFD5D5)
// ============================================================================

// Capability - Strategy
export const CapabilityNode = memo(({ data, selected }: NodeProps) => {
  const width = data.width || 110
  const height = data.height || 60

  return (
    <div className="relative" style={{ width, height }}>
      <NodeResizer
        color="#ef4444"
        isVisible={selected}
        minWidth={90}
        minHeight={50}
      />
      <div
        className="w-full h-full rounded-lg border-2 border-red-500 p-3 shadow-md flex items-center justify-center"
        style={{ backgroundColor: STRATEGY_COLOR }}
      >
        <div className="text-xs font-semibold text-center">{data.label}</div>
      </div>
      <Handle type="target" position={Position.Left} className="w-2 h-2" />
      <Handle type="source" position={Position.Right} className="w-2 h-2" />
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
    </div>
  )
})
CapabilityNode.displayName = "CapabilityNode"

// Course of Action
export const CourseOfActionNode = memo(({ data, selected }: NodeProps) => {
  const width = data.width || 100
  const height = data.height || 60
  const isCollapsed = data.isCollapsed || false

  return (
    <div className="relative" style={{ width, height }}>
      <NodeResizer
        color="#ef4444"
        isVisible={selected}
        minWidth={80}
        minHeight={40}
      />
      <div
        className="w-full h-full rounded-lg border-2 border-red-500 p-3 shadow-md overflow-hidden"
        style={{
          backgroundColor: STRATEGY_COLOR,
          transition: 'all 0.2s ease-in-out',
        }}
      >
        {data.hasChildren && (
          <div className="absolute top-1 right-1 z-10">
            <button
              className="hover:bg-gray-200 rounded p-0.5 bg-white/70"
              onClick={(e) => {
                e.stopPropagation()
                if (data.onToggleCollapse) data.onToggleCollapse()
              }}
            >
              {isCollapsed ? (
                <ChevronRight className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )}
            </button>
          </div>
        )}
        <div className="flex items-center justify-center h-full">
          <div className="text-xs font-semibold text-center">{data.label}</div>
        </div>
        {isCollapsed && data.hasChildren && (
          <div className="text-[9px] text-center opacity-60 mt-1">
            {data.childCount || 0} nested
          </div>
        )}
      </div>
      <Handle type="target" position={Position.Left} className="w-2 h-2" />
      <Handle type="source" position={Position.Right} className="w-2 h-2" />
    </div>
  )
})
CourseOfActionNode.displayName = "CourseOfActionNode"

// Resource - Active Structure (rounded rectangle)
export const ResourceNode = memo(({ data, selected }: NodeProps) => {
  const width = data.width || 100
  const height = data.height || 60
  const isCollapsed = data.isCollapsed || false

  return (
    <div className="relative" style={{ width, height }}>
      <NodeResizer
        color="#ef4444"
        isVisible={selected}
        minWidth={80}
        minHeight={40}
      />
      <div
        className="w-full h-full rounded-lg border-2 border-red-500 p-3 shadow-md overflow-hidden"
        style={{
          backgroundColor: STRATEGY_COLOR,
          transition: 'all 0.2s ease-in-out',
        }}
      >
        {data.hasChildren && (
          <div className="absolute top-1 right-1 z-10">
            <button
              className="hover:bg-gray-200 rounded p-0.5 bg-white/70"
              onClick={(e) => {
                e.stopPropagation()
                if (data.onToggleCollapse) data.onToggleCollapse()
              }}
            >
              {isCollapsed ? (
                <ChevronRight className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )}
            </button>
          </div>
        )}
        <div className="flex items-center justify-center h-full">
          <div className="text-xs font-semibold text-center">{data.label}</div>
        </div>
        {isCollapsed && data.hasChildren && (
          <div className="text-[9px] text-center opacity-60 mt-1">
            {data.childCount || 0} nested
          </div>
        )}
      </div>
      <Handle type="target" position={Position.Left} className="w-2 h-2" />
      <Handle type="source" position={Position.Right} className="w-2 h-2" />
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
    </div>
  )
})
ResourceNode.displayName = "ResourceNode"

// Value Stream - Behavior (rounded rectangle)
export const ValueStreamNode = memo(({ data, selected }: NodeProps) => {
  const width = data.width || 120
  const height = data.height || 60
  const isCollapsed = data.isCollapsed || false

  return (
    <div className="relative" style={{ width, height }}>
      <NodeResizer
        color="#ef4444"
        isVisible={selected}
        minWidth={100}
        minHeight={60}
      />
      <div
        className="w-full h-full rounded-lg border-2 border-red-500 p-3 shadow-md overflow-hidden"
        style={{
          backgroundColor: STRATEGY_COLOR,
          transition: 'all 0.2s ease-in-out',
        }}
      >
        {data.hasChildren && (
          <div className="absolute top-1 right-1 z-10">
            <button
              className="hover:bg-gray-200 rounded p-0.5 bg-white/70"
              onClick={(e) => {
                e.stopPropagation()
                if (data.onToggleCollapse) data.onToggleCollapse()
              }}
            >
              {isCollapsed ? (
                <ChevronRight className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )}
            </button>
          </div>
        )}
        <div className="flex items-center justify-center h-full">
          <div className="text-xs font-semibold text-center">{data.label}</div>
        </div>
        {isCollapsed && data.hasChildren && (
          <div className="text-[9px] text-center opacity-60 mt-1">
            {data.childCount || 0} nested
          </div>
        )}
      </div>
      <Handle type="target" position={Position.Left} className="w-2 h-2" />
      <Handle type="source" position={Position.Right} className="w-2 h-2" />
    </div>
  )
})
ValueStreamNode.displayName = "ValueStreamNode"

// ============================================================================
// IMPLEMENTATION & MIGRATION - Light Orange (#FFE0C2)
// ============================================================================

// Work Package
export const WorkPackageNode = memo(({ data, selected }: NodeProps) => {
  const width = data.width || 100
  const height = data.height || 60
  const isCollapsed = data.isCollapsed || false

  return (
    <div className="relative" style={{ width, height }}>
      <NodeResizer
        color="#ea580c"
        isVisible={selected}
        minWidth={80}
        minHeight={40}
      />
      <div
        className="w-full h-full rounded-lg border-2 border-orange-600 p-3 shadow-md overflow-hidden"
        style={{
          backgroundColor: IMPLEMENTATION_COLOR,
          transition: 'all 0.2s ease-in-out',
        }}
      >
        {data.hasChildren && (
          <div className="absolute top-1 right-1 z-10">
            <button
              className="hover:bg-gray-200 rounded p-0.5 bg-white/70"
              onClick={(e) => {
                e.stopPropagation()
                if (data.onToggleCollapse) data.onToggleCollapse()
              }}
            >
              {isCollapsed ? (
                <ChevronRight className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )}
            </button>
          </div>
        )}
        <div className="flex items-center justify-center h-full">
          <div className="text-xs font-semibold text-center">{data.label}</div>
        </div>
        {isCollapsed && data.hasChildren && (
          <div className="text-[9px] text-center opacity-60 mt-1">
            {data.childCount || 0} nested
          </div>
        )}
      </div>
      <Handle type="target" position={Position.Left} className="w-2 h-2" />
      <Handle type="source" position={Position.Right} className="w-2 h-2" />
    </div>
  )
})
WorkPackageNode.displayName = "WorkPackageNode"

// Deliverable
export const DeliverableNode = memo(({ data, selected }: NodeProps) => {
  const width = data.width || 90
  const height = data.height || 60
  const isCollapsed = data.isCollapsed || false

  return (
    <div className="relative" style={{ width, height }}>
      <NodeResizer
        color="#ea580c"
        isVisible={selected}
        minWidth={70}
        minHeight={40}
      />
      <div
        className="w-full h-full  border-2 border-orange-600 p-3 shadow-md overflow-hidden"
        style={{
          backgroundColor: IMPLEMENTATION_COLOR,
          transition: 'all 0.2s ease-in-out',
        }}
      >
        {data.hasChildren && (
          <div className="absolute top-1 right-1 z-10">
            <button
              className="hover:bg-gray-200 rounded p-0.5 bg-white/70"
              onClick={(e) => {
                e.stopPropagation()
                if (data.onToggleCollapse) data.onToggleCollapse()
              }}
            >
              {isCollapsed ? (
                <ChevronRight className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )}
            </button>
          </div>
        )}
        <div className="flex items-center justify-center h-full">
          <div className="text-xs font-semibold text-center">{data.label}</div>
        </div>
        {isCollapsed && data.hasChildren && (
          <div className="text-[9px] text-center opacity-60 mt-1">
            {data.childCount || 0} nested
          </div>
        )}
      </div>
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
    </div>
  )
})
DeliverableNode.displayName = "DeliverableNode"

// Implementation Event - Behavior
export const ImplementationEventNode = memo(({ data, selected }: NodeProps) => {
  const width = data.width || 120
  const height = data.height || 60
  const isCollapsed = data.isCollapsed || false

  return (
    <div className="relative" style={{ width, height }}>
      <NodeResizer
        color="#ea580c"
        isVisible={selected}
        minWidth={100}
        minHeight={60}
      />
      <div
        className="w-full h-full rounded-lg border-2 border-orange-600 p-3 shadow-md overflow-hidden"
        style={{
          backgroundColor: IMPLEMENTATION_COLOR,
          transition: 'all 0.2s ease-in-out',
        }}
      >
        {data.hasChildren && (
          <div className="absolute top-1 right-1 z-10">
            <button
              className="hover:bg-gray-200 rounded p-0.5 bg-white/70"
              onClick={(e) => {
                e.stopPropagation()
                if (data.onToggleCollapse) data.onToggleCollapse()
              }}
            >
              {isCollapsed ? (
                <ChevronRight className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )}
            </button>
          </div>
        )}
        <div className="flex items-center justify-center h-full">
          <div className="text-xs font-semibold text-center">{data.label}</div>
        </div>
        {isCollapsed && data.hasChildren && (
          <div className="text-[9px] text-center opacity-60 mt-1">
            {data.childCount || 0} nested
          </div>
        )}
      </div>
      <Handle type="target" position={Position.Left} className="w-2 h-2" />
      <Handle type="source" position={Position.Right} className="w-2 h-2" />
    </div>
  )
})
ImplementationEventNode.displayName = "ImplementationEventNode"

// Plateau - Composite
export const PlateauNode = memo(({ data, selected }: NodeProps) => {
  const width = data.width || 100
  const height = data.height || 60
  const isCollapsed = data.isCollapsed || false

  return (
    <div className="relative" style={{ width, height }}>
      <NodeResizer
        color="#ea580c"
        isVisible={selected}
        minWidth={80}
        minHeight={40}
      />
      <div
        className="w-full h-full rounded-lg border-2 border-orange-600 p-3 shadow-md overflow-hidden"
        style={{
          backgroundColor: IMPLEMENTATION_COLOR,
          transition: 'all 0.2s ease-in-out',
        }}
      >
        {data.hasChildren && (
          <div className="absolute top-1 right-1 z-10">
            <button
              className="hover:bg-gray-200 rounded p-0.5 bg-white/70"
              onClick={(e) => {
                e.stopPropagation()
                if (data.onToggleCollapse) data.onToggleCollapse()
              }}
            >
              {isCollapsed ? (
                <ChevronRight className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )}
            </button>
          </div>
        )}
        <div className="flex items-center justify-center h-full">
          <div className="text-xs font-semibold text-center">{data.label}</div>
        </div>
        {isCollapsed && data.hasChildren && (
          <div className="text-[9px] text-center opacity-60 mt-1">
            {data.childCount || 0} nested
          </div>
        )}
      </div>
      <Handle type="target" position={Position.Left} className="w-2 h-2" />
      <Handle type="source" position={Position.Right} className="w-2 h-2" />
    </div>
  )
})
PlateauNode.displayName = "PlateauNode"

// Gap - Composite
export const GapNode = memo(({ data, selected }: NodeProps) => {
  const width = data.width || 100
  const height = data.height || 60
  const isCollapsed = data.isCollapsed || false

  return (
    <div className="relative" style={{ width, height }}>
      <NodeResizer
        color="#ea580c"
        isVisible={selected}
        minWidth={80}
        minHeight={40}
      />
      <div
        className="w-full h-full rounded-lg border-2 border-orange-600 border-dashed p-3 shadow-md overflow-hidden"
        style={{
          backgroundColor: IMPLEMENTATION_COLOR,
          transition: 'all 0.2s ease-in-out',
        }}
      >
        {data.hasChildren && (
          <div className="absolute top-1 right-1 z-10">
            <button
              className="hover:bg-gray-200 rounded p-0.5 bg-white/70"
              onClick={(e) => {
                e.stopPropagation()
                if (data.onToggleCollapse) data.onToggleCollapse()
              }}
            >
              {isCollapsed ? (
                <ChevronRight className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )}
            </button>
          </div>
        )}
        <div className="flex items-center justify-center h-full">
          <div className="text-xs font-semibold text-center">{data.label}</div>
        </div>
        {isCollapsed && data.hasChildren && (
          <div className="text-[9px] text-center opacity-60 mt-1">
            {data.childCount || 0} nested
          </div>
        )}
      </div>
      <Handle type="target" position={Position.Left} className="w-2 h-2" />
      <Handle type="source" position={Position.Right} className="w-2 h-2" />
    </div>
  )
})
GapNode.displayName = "GapNode"

// ============================================================================
// PHYSICAL LAYER - Light Gray-Green (#C9E7C7)
// ============================================================================

// Equipment - Active Structure
export const EquipmentNode = memo(({ data, selected }: NodeProps) => {
  const width = data.width || 100
  const height = data.height || 60
  const isCollapsed = data.isCollapsed || false

  return (
    <div className="relative" style={{ width, height }}>
      <NodeResizer
        color="#4b5563"
        isVisible={selected}
        minWidth={80}
        minHeight={40}
      />
      <div
        className="w-full h-full rounded-lg border-2 border-gray-600 p-3 shadow-md overflow-hidden"
        style={{
          backgroundColor: PHYSICAL_COLOR,
          transition: 'all 0.2s ease-in-out',
        }}
      >
        {data.hasChildren && (
          <div className="absolute top-1 right-1 z-10">
            <button
              className="hover:bg-gray-200 rounded p-0.5 bg-white/70"
              onClick={(e) => {
                e.stopPropagation()
                if (data.onToggleCollapse) data.onToggleCollapse()
              }}
            >
              {isCollapsed ? (
                <ChevronRight className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )}
            </button>
          </div>
        )}
        <div className="flex items-center justify-center h-full">
          <div className="text-xs font-semibold text-center">{data.label}</div>
        </div>
        {isCollapsed && data.hasChildren && (
          <div className="text-[9px] text-center opacity-60 mt-1">
            {data.childCount || 0} nested
          </div>
        )}
      </div>
      <Handle type="target" position={Position.Left} className="w-2 h-2" />
      <Handle type="source" position={Position.Right} className="w-2 h-2" />
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
    </div>
  )
})
EquipmentNode.displayName = "EquipmentNode"

// Facility - Active Structure
export const FacilityNode = memo(({ data, selected }: NodeProps) => {
  const width = data.width || 100
  const height = data.height || 60
  const isCollapsed = data.isCollapsed || false

  return (
    <div className="relative" style={{ width, height }}>
      <NodeResizer
        color="#4b5563"
        isVisible={selected}
        minWidth={80}
        minHeight={40}
      />
      <div
        className="w-full h-full rounded-lg border-2 border-gray-600 p-3 shadow-md overflow-hidden"
        style={{
          backgroundColor: PHYSICAL_COLOR,
          transition: 'all 0.2s ease-in-out',
        }}
      >
        {data.hasChildren && (
          <div className="absolute top-1 right-1 z-10">
            <button
              className="hover:bg-gray-200 rounded p-0.5 bg-white/70"
              onClick={(e) => {
                e.stopPropagation()
                if (data.onToggleCollapse) data.onToggleCollapse()
              }}
            >
              {isCollapsed ? (
                <ChevronRight className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )}
            </button>
          </div>
        )}
        <div className="flex items-center justify-center h-full">
          <div className="text-xs font-semibold text-center">{data.label}</div>
        </div>
        {isCollapsed && data.hasChildren && (
          <div className="text-[9px] text-center opacity-60 mt-1">
            {data.childCount || 0} nested
          </div>
        )}
      </div>
      <Handle type="target" position={Position.Left} className="w-2 h-2" />
      <Handle type="source" position={Position.Right} className="w-2 h-2" />
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
    </div>
  )
})
FacilityNode.displayName = "FacilityNode"

// Distribution Network - Active Structure
export const DistributionNetworkNode = memo(({ data, selected }: NodeProps) => {
  const width = data.width || 100
  const height = data.height || 60
  const isCollapsed = data.isCollapsed || false

  return (
    <div className="relative" style={{ width, height }}>
      <NodeResizer
        color="#4b5563"
        isVisible={selected}
        minWidth={80}
        minHeight={40}
      />
      <div
        className="w-full h-full rounded-lg border-2 border-gray-600 p-3 shadow-md overflow-hidden"
        style={{
          backgroundColor: PHYSICAL_COLOR,
          transition: 'all 0.2s ease-in-out',
        }}
      >
        {data.hasChildren && (
          <div className="absolute top-1 right-1 z-10">
            <button
              className="hover:bg-gray-200 rounded p-0.5 bg-white/70"
              onClick={(e) => {
                e.stopPropagation()
                if (data.onToggleCollapse) data.onToggleCollapse()
              }}
            >
              {isCollapsed ? (
                <ChevronRight className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )}
            </button>
          </div>
        )}
        <div className="flex items-center justify-center h-full">
          <div className="text-xs font-semibold text-center">{data.label}</div>
        </div>
        {isCollapsed && data.hasChildren && (
          <div className="text-[9px] text-center opacity-60 mt-1">
            {data.childCount || 0} nested
          </div>
        )}
      </div>
      <Handle type="target" position={Position.Left} className="w-2 h-2" />
      <Handle type="source" position={Position.Right} className="w-2 h-2" />
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
    </div>
  )
})
DistributionNetworkNode.displayName = "DistributionNetworkNode"

// Material - Passive Structure
export const MaterialNode = memo(({ data, selected }: NodeProps) => {
  const width = data.width || 90
  const height = data.height || 60
  const isCollapsed = data.isCollapsed || false

  return (
    <div className="relative" style={{ width, height }}>
      <NodeResizer
        color="#4b5563"
        isVisible={selected}
        minWidth={70}
        minHeight={40}
      />
      <div
        className="w-full h-full  border-2 border-gray-600 p-3 shadow-md overflow-hidden"
        style={{
          backgroundColor: PHYSICAL_COLOR,
          transition: 'all 0.2s ease-in-out',
        }}
      >
        {data.hasChildren && (
          <div className="absolute top-1 right-1 z-10">
            <button
              className="hover:bg-gray-200 rounded p-0.5 bg-white/70"
              onClick={(e) => {
                e.stopPropagation()
                if (data.onToggleCollapse) data.onToggleCollapse()
              }}
            >
              {isCollapsed ? (
                <ChevronRight className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )}
            </button>
          </div>
        )}
        <div className="flex items-center justify-center h-full">
          <div className="text-xs font-semibold text-center">{data.label}</div>
        </div>
        {isCollapsed && data.hasChildren && (
          <div className="text-[9px] text-center opacity-60 mt-1">
            {data.childCount || 0} nested
          </div>
        )}
      </div>
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
    </div>
  )
})
MaterialNode.displayName = "MaterialNode"

// Location - Composite Element (can contain other physical elements)
export const LocationNode = memo(({ data, selected }: NodeProps) => {
  const width = data.width || 160
  const height = data.height || 120
  const isCollapsed = data.isCollapsed || false

  return (
    <div className="relative" style={{ width, height }}>
      <NodeResizer
        color="#4b5563"
        isVisible={selected}
        minWidth={120}
        minHeight={80}
      />
      <div
        className="w-full h-full rounded-lg border-2 border-gray-600 p-3 shadow-md overflow-hidden"
        style={{
          backgroundColor: PHYSICAL_COLOR,
          transition: 'all 0.2s ease-in-out',
        }}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1">
            <span className="text-sm">📍</span>
            <div className="text-xs font-semibold">{data.label}</div>
          </div>
          {data.hasChildren && (
            <button
              className="hover:bg-gray-200 rounded p-0.5"
              onClick={(e) => {
                e.stopPropagation()
                if (data.onToggleCollapse) data.onToggleCollapse()
              }}
            >
              {isCollapsed ? (
                <ChevronRight className="w-3 h-3 text-gray-600" />
              ) : (
                <ChevronDown className="w-3 h-3 text-gray-600" />
              )}
            </button>
          )}
        </div>
        {!isCollapsed && (
          <>
            {data.description && (
              <div className="text-[10px] opacity-75 mb-2">{data.description}</div>
            )}
            <div className="text-[9px] opacity-60 mt-2 italic">Drop elements here</div>
          </>
        )}
        {isCollapsed && (
          <div className="text-[9px] opacity-60 italic">
            {data.childCount || 0} element(s)
          </div>
        )}
      </div>
      <Handle type="target" position={Position.Left} className="w-2 h-2" />
      <Handle type="source" position={Position.Right} className="w-2 h-2" />
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
    </div>
  )
})
LocationNode.displayName = "LocationNode"

// ============================================================================
// COMPOSITE / OTHER ELEMENTS
// ============================================================================

// Grouping - Visual grouping element (dashed border, no structural meaning)
export const GroupingNode = memo(({ data, selected }: NodeProps) => {
  const width = data.width || 200
  const height = data.height || 140
  const isCollapsed = data.isCollapsed || false

  return (
    <div className="relative" style={{ width, height }}>
      <NodeResizer
        color="#94a3b8"
        isVisible={selected}
        minWidth={150}
        minHeight={100}
      />
      <div
        className="w-full h-full rounded-lg border-2 border-dashed border-slate-400 p-4 shadow-sm bg-slate-50/30 overflow-hidden"
        style={{
          transition: 'all 0.2s ease-in-out',
        }}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1">
            <span className="text-sm">📁</span>
            <div className="text-xs font-semibold text-slate-600">{data.label}</div>
          </div>
          {data.hasChildren && (
            <button
              className="hover:bg-slate-200 rounded p-0.5"
              onClick={(e) => {
                e.stopPropagation()
                if (data.onToggleCollapse) data.onToggleCollapse()
              }}
            >
              {isCollapsed ? (
                <ChevronRight className="w-3 h-3 text-slate-500" />
              ) : (
                <ChevronDown className="w-3 h-3 text-slate-500" />
              )}
            </button>
          )}
        </div>
        {!isCollapsed && (
          <>
            {data.description && (
              <div className="text-[10px] text-slate-500 mb-2">{data.description}</div>
            )}
            <div className="text-[9px] text-slate-400 mt-3 italic">
              Visual grouping - drag elements here
            </div>
          </>
        )}
        {isCollapsed && (
          <div className="text-[9px] text-slate-400 italic">
            {data.childCount || 0} element(s)
          </div>
        )}
      </div>
      <Handle type="target" position={Position.Left} className="w-2 h-2 opacity-50" />
      <Handle type="source" position={Position.Right} className="w-2 h-2 opacity-50" />
      <Handle type="target" position={Position.Top} className="w-2 h-2 opacity-50" />
      <Handle type="source" position={Position.Bottom} className="w-2 h-2 opacity-50" />
    </div>
  )
})
GroupingNode.displayName = "GroupingNode"

// ============================================================================
// MOTIVATION LAYER - Light Purple (#CCCCFF)
// ============================================================================

// Goal - Cloud-like shape
export const GoalNode = memo(({ data, selected }: NodeProps) => {
  const width = data.width || 100
  const height = data.height || 60

  return (
    <div className="relative" style={{ width, height }}>
      <NodeResizer
        color="#9333ea"
        isVisible={selected}
        minWidth={80}
        minHeight={60}
      />
      <div
        className="w-full h-full rounded-full border-2 border-purple-600 p-3 shadow-md flex flex-col items-center justify-center"
        style={{ backgroundColor: MOTIVATION_COLOR }}
      >
        <div className="text-xs font-semibold text-center">{data.label}</div>
      </div>
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
    </div>
  )
})
GoalNode.displayName = "GoalNode"

// Driver - Oval shape
export const DriverNode = memo(({ data, selected }: NodeProps) => {
  const width = data.width || 100
  const height = data.height || 60
  const isCollapsed = data.isCollapsed || false

  return (
    <div className="relative" style={{ width, height }}>
      <NodeResizer
        color="#9333ea"
        isVisible={selected}
        minWidth={80}
        minHeight={60}
      />
      <div
        className="w-full h-full rounded-full border-2 border-purple-600 px-4 py-2 shadow-md overflow-hidden"
        style={{
          backgroundColor: MOTIVATION_COLOR,
          transition: 'all 0.2s ease-in-out',
        }}
      >
        {data.hasChildren && (
          <div className="absolute top-1 right-1 z-10">
            <button
              className="hover:bg-gray-200 rounded p-0.5 bg-white/70"
              onClick={(e) => {
                e.stopPropagation()
                if (data.onToggleCollapse) data.onToggleCollapse()
              }}
            >
              {isCollapsed ? (
                <ChevronRight className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )}
            </button>
          </div>
        )}
        <div className="flex items-center justify-center h-full">
          <div className="text-xs font-semibold text-center">{data.label}</div>
        </div>
        {isCollapsed && data.hasChildren && (
          <div className="text-[9px] text-center opacity-60 mt-1">
            {data.childCount || 0} nested
          </div>
        )}
      </div>
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
    </div>
  )
})
DriverNode.displayName = "DriverNode"

// Stakeholder - Oval shape
export const StakeholderNode = memo(({ data, selected }: NodeProps) => {
  const width = data.width || 100
  const height = data.height || 60
  const isCollapsed = data.isCollapsed || false

  return (
    <div className="relative" style={{ width, height }}>
      <NodeResizer
        color="#9333ea"
        isVisible={selected}
        minWidth={80}
        minHeight={60}
      />
      <div
        className="w-full h-full rounded-full border-2 border-purple-600 px-4 py-2 shadow-md overflow-hidden"
        style={{
          backgroundColor: MOTIVATION_COLOR,
          transition: 'all 0.2s ease-in-out',
        }}
      >
        {data.hasChildren && (
          <div className="absolute top-1 right-1 z-10">
            <button
              className="hover:bg-gray-200 rounded p-0.5 bg-white/70"
              onClick={(e) => {
                e.stopPropagation()
                if (data.onToggleCollapse) data.onToggleCollapse()
              }}
            >
              {isCollapsed ? (
                <ChevronRight className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )}
            </button>
          </div>
        )}
        <div className="flex items-center justify-center h-full">
          <div className="text-xs font-semibold text-center">{data.label}</div>
        </div>
        {isCollapsed && data.hasChildren && (
          <div className="text-[9px] text-center opacity-60 mt-1">
            {data.childCount || 0} nested
          </div>
        )}
      </div>
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
    </div>
  )
})
StakeholderNode.displayName = "StakeholderNode"

// Assessment - Oval shape
export const AssessmentNode = memo(({ data, selected }: NodeProps) => {
  const width = data.width || 100
  const height = data.height || 60
  const isCollapsed = data.isCollapsed || false

  return (
    <div className="relative" style={{ width, height }}>
      <NodeResizer
        color="#9333ea"
        isVisible={selected}
        minWidth={80}
        minHeight={60}
      />
      <div
        className="w-full h-full rounded-full border-2 border-purple-600 px-4 py-2 shadow-md overflow-hidden"
        style={{
          backgroundColor: MOTIVATION_COLOR,
          transition: 'all 0.2s ease-in-out',
        }}
      >
        {data.hasChildren && (
          <div className="absolute top-1 right-1 z-10">
            <button
              className="hover:bg-gray-200 rounded p-0.5 bg-white/70"
              onClick={(e) => {
                e.stopPropagation()
                if (data.onToggleCollapse) data.onToggleCollapse()
              }}
            >
              {isCollapsed ? (
                <ChevronRight className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )}
            </button>
          </div>
        )}
        <div className="flex items-center justify-center h-full">
          <div className="text-xs font-semibold text-center">{data.label}</div>
        </div>
        {isCollapsed && data.hasChildren && (
          <div className="text-[9px] text-center opacity-60 mt-1">
            {data.childCount || 0} nested
          </div>
        )}
      </div>
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
    </div>
  )
})
AssessmentNode.displayName = "AssessmentNode"

// Outcome - Oval shape
export const OutcomeNode = memo(({ data, selected }: NodeProps) => {
  const width = data.width || 100
  const height = data.height || 60
  const isCollapsed = data.isCollapsed || false

  return (
    <div className="relative" style={{ width, height }}>
      <NodeResizer
        color="#9333ea"
        isVisible={selected}
        minWidth={80}
        minHeight={60}
      />
      <div
        className="w-full h-full rounded-full border-2 border-purple-600 px-4 py-2 shadow-md overflow-hidden"
        style={{
          backgroundColor: MOTIVATION_COLOR,
          transition: 'all 0.2s ease-in-out',
        }}
      >
        {data.hasChildren && (
          <div className="absolute top-1 right-1 z-10">
            <button
              className="hover:bg-gray-200 rounded p-0.5 bg-white/70"
              onClick={(e) => {
                e.stopPropagation()
                if (data.onToggleCollapse) data.onToggleCollapse()
              }}
            >
              {isCollapsed ? (
                <ChevronRight className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )}
            </button>
          </div>
        )}
        <div className="flex items-center justify-center h-full">
          <div className="text-xs font-semibold text-center">{data.label}</div>
        </div>
        {isCollapsed && data.hasChildren && (
          <div className="text-[9px] text-center opacity-60 mt-1">
            {data.childCount || 0} nested
          </div>
        )}
      </div>
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
    </div>
  )
})
OutcomeNode.displayName = "OutcomeNode"

// Principle - Oval shape
export const PrincipleNode = memo(({ data, selected }: NodeProps) => {
  const width = data.width || 100
  const height = data.height || 60
  const isCollapsed = data.isCollapsed || false

  return (
    <div className="relative" style={{ width, height }}>
      <NodeResizer
        color="#9333ea"
        isVisible={selected}
        minWidth={80}
        minHeight={60}
      />
      <div
        className="w-full h-full rounded-full border-2 border-purple-600 px-4 py-2 shadow-md overflow-hidden"
        style={{
          backgroundColor: MOTIVATION_COLOR,
          transition: 'all 0.2s ease-in-out',
        }}
      >
        {data.hasChildren && (
          <div className="absolute top-1 right-1 z-10">
            <button
              className="hover:bg-gray-200 rounded p-0.5 bg-white/70"
              onClick={(e) => {
                e.stopPropagation()
                if (data.onToggleCollapse) data.onToggleCollapse()
              }}
            >
              {isCollapsed ? (
                <ChevronRight className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )}
            </button>
          </div>
        )}
        <div className="flex items-center justify-center h-full">
          <div className="text-xs font-semibold text-center">{data.label}</div>
        </div>
        {isCollapsed && data.hasChildren && (
          <div className="text-[9px] text-center opacity-60 mt-1">
            {data.childCount || 0} nested
          </div>
        )}
      </div>
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
    </div>
  )
})
PrincipleNode.displayName = "PrincipleNode"

// Requirement - Oval shape
export const RequirementNode = memo(({ data, selected }: NodeProps) => {
  const width = data.width || 100
  const height = data.height || 60
  const isCollapsed = data.isCollapsed || false

  return (
    <div className="relative" style={{ width, height }}>
      <NodeResizer
        color="#9333ea"
        isVisible={selected}
        minWidth={80}
        minHeight={60}
      />
      <div
        className="w-full h-full rounded-full border-2 border-purple-600 px-4 py-2 shadow-md overflow-hidden"
        style={{
          backgroundColor: MOTIVATION_COLOR,
          transition: 'all 0.2s ease-in-out',
        }}
      >
        {data.hasChildren && (
          <div className="absolute top-1 right-1 z-10">
            <button
              className="hover:bg-gray-200 rounded p-0.5 bg-white/70"
              onClick={(e) => {
                e.stopPropagation()
                if (data.onToggleCollapse) data.onToggleCollapse()
              }}
            >
              {isCollapsed ? (
                <ChevronRight className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )}
            </button>
          </div>
        )}
        <div className="flex items-center justify-center h-full">
          <div className="text-xs font-semibold text-center">{data.label}</div>
        </div>
        {isCollapsed && data.hasChildren && (
          <div className="text-[9px] text-center opacity-60 mt-1">
            {data.childCount || 0} nested
          </div>
        )}
      </div>
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
    </div>
  )
})
RequirementNode.displayName = "RequirementNode"

// Constraint - Oval shape
export const ConstraintNode = memo(({ data, selected }: NodeProps) => {
  const width = data.width || 100
  const height = data.height || 60
  const isCollapsed = data.isCollapsed || false

  return (
    <div className="relative" style={{ width, height }}>
      <NodeResizer
        color="#9333ea"
        isVisible={selected}
        minWidth={80}
        minHeight={60}
      />
      <div
        className="w-full h-full rounded-full border-2 border-purple-600 px-4 py-2 shadow-md overflow-hidden"
        style={{
          backgroundColor: MOTIVATION_COLOR,
          transition: 'all 0.2s ease-in-out',
        }}
      >
        {data.hasChildren && (
          <div className="absolute top-1 right-1 z-10">
            <button
              className="hover:bg-gray-200 rounded p-0.5 bg-white/70"
              onClick={(e) => {
                e.stopPropagation()
                if (data.onToggleCollapse) data.onToggleCollapse()
              }}
            >
              {isCollapsed ? (
                <ChevronRight className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )}
            </button>
          </div>
        )}
        <div className="flex items-center justify-center h-full">
          <div className="text-xs font-semibold text-center">{data.label}</div>
        </div>
        {isCollapsed && data.hasChildren && (
          <div className="text-[9px] text-center opacity-60 mt-1">
            {data.childCount || 0} nested
          </div>
        )}
      </div>
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
    </div>
  )
})
ConstraintNode.displayName = "ConstraintNode"

// Meaning - Oval shape
export const MeaningNode = memo(({ data, selected }: NodeProps) => {
  const width = data.width || 100
  const height = data.height || 60
  const isCollapsed = data.isCollapsed || false

  return (
    <div className="relative" style={{ width, height }}>
      <NodeResizer
        color="#9333ea"
        isVisible={selected}
        minWidth={80}
        minHeight={60}
      />
      <div
        className="w-full h-full rounded-full border-2 border-purple-600 px-4 py-2 shadow-md overflow-hidden"
        style={{
          backgroundColor: MOTIVATION_COLOR,
          transition: 'all 0.2s ease-in-out',
        }}
      >
        {data.hasChildren && (
          <div className="absolute top-1 right-1 z-10">
            <button
              className="hover:bg-gray-200 rounded p-0.5 bg-white/70"
              onClick={(e) => {
                e.stopPropagation()
                if (data.onToggleCollapse) data.onToggleCollapse()
              }}
            >
              {isCollapsed ? (
                <ChevronRight className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )}
            </button>
          </div>
        )}
        <div className="flex items-center justify-center h-full">
          <div className="text-xs font-semibold text-center">{data.label}</div>
        </div>
        {isCollapsed && data.hasChildren && (
          <div className="text-[9px] text-center opacity-60 mt-1">
            {data.childCount || 0} nested
          </div>
        )}
      </div>
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
    </div>
  )
})
MeaningNode.displayName = "MeaningNode"

// Value - Oval shape
export const ValueNode = memo(({ data, selected }: NodeProps) => {
  const width = data.width || 100
  const height = data.height || 60
  const isCollapsed = data.isCollapsed || false

  return (
    <div className="relative" style={{ width, height }}>
      <NodeResizer
        color="#9333ea"
        isVisible={selected}
        minWidth={80}
        minHeight={60}
      />
      <div
        className="w-full h-full rounded-full border-2 border-purple-600 px-4 py-2 shadow-md overflow-hidden"
        style={{
          backgroundColor: MOTIVATION_COLOR,
          transition: 'all 0.2s ease-in-out',
        }}
      >
        {data.hasChildren && (
          <div className="absolute top-1 right-1 z-10">
            <button
              className="hover:bg-gray-200 rounded p-0.5 bg-white/70"
              onClick={(e) => {
                e.stopPropagation()
                if (data.onToggleCollapse) data.onToggleCollapse()
              }}
            >
              {isCollapsed ? (
                <ChevronRight className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )}
            </button>
          </div>
        )}
        <div className="flex items-center justify-center h-full">
          <div className="text-xs font-semibold text-center">{data.label}</div>
        </div>
        {isCollapsed && data.hasChildren && (
          <div className="text-[9px] text-center opacity-60 mt-1">
            {data.childCount || 0} nested
          </div>
        )}
      </div>
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
    </div>
  )
})
ValueNode.displayName = "ValueNode"
