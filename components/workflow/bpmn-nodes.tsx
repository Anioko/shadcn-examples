"use client"

import { memo } from "react"
import { Handle, Position, NodeProps } from "reactflow"
import { Badge } from "@/components/ui/badge"

// BPMN Start Event - Circle with thin border
export const StartEventNode = memo(({ data }: NodeProps) => {
  return (
    <div className="relative">
      <div className="w-12 h-12 rounded-full bg-green-100 border-2 border-green-600 flex items-center justify-center shadow-md">
        <div className="text-[10px] font-semibold text-green-800">START</div>
      </div>
      <Handle type="source" position={Position.Right} className="w-2 h-2" />
      {data.label && (
        <div className="absolute top-14 left-1/2 -translate-x-1/2 text-xs font-medium whitespace-nowrap">
          {data.label}
        </div>
      )}
    </div>
  )
})
StartEventNode.displayName = "StartEventNode"

// BPMN End Event - Circle with thick border
export const EndEventNode = memo(({ data }: NodeProps) => {
  return (
    <div className="relative">
      <div className="w-12 h-12 rounded-full bg-red-100 border-4 border-red-600 flex items-center justify-center shadow-md">
        <div className="text-[10px] font-semibold text-red-800">END</div>
      </div>
      <Handle type="target" position={Position.Left} className="w-2 h-2" />
      {data.label && (
        <div className="absolute top-14 left-1/2 -translate-x-1/2 text-xs font-medium whitespace-nowrap">
          {data.label}
        </div>
      )}
    </div>
  )
})
EndEventNode.displayName = "EndEventNode"

// BPMN Task/Activity - Rounded rectangle
export const TaskNode = memo(({ data }: NodeProps) => {
  return (
    <div className="relative">
      <div className="min-w-[120px] bg-blue-100 border-2 border-blue-600 rounded-lg p-3 shadow-md">
        <div className="flex items-center gap-2 mb-1">
          <div className="text-xs font-semibold text-blue-900">{data.label}</div>
          {data.status && (
            <Badge
              variant={data.status === "active" ? "default" : data.status === "completed" ? "secondary" : "outline"}
              className="h-4 text-[9px]"
            >
              {data.status}
            </Badge>
          )}
        </div>
        {data.description && (
          <div className="text-[10px] text-blue-700">{data.description}</div>
        )}
        {data.metadata && (
          <div className="text-[9px] text-blue-600 mt-1 space-y-0.5">
            {data.metadata.duration && <div>⏱ {data.metadata.duration}</div>}
            {data.metadata.assignee && <div>👤 {data.metadata.assignee}</div>}
            {data.metadata.automation && <div>🤖 Auto</div>}
          </div>
        )}
      </div>
      <Handle type="target" position={Position.Left} className="w-2 h-2" />
      <Handle type="source" position={Position.Right} className="w-2 h-2" />
    </div>
  )
})
TaskNode.displayName = "TaskNode"

// BPMN Gateway/Decision - Diamond shape
export const GatewayNode = memo(({ data }: NodeProps) => {
  return (
    <div className="relative">
      <div className="w-16 h-16 bg-yellow-100 border-2 border-yellow-600 rotate-45 flex items-center justify-center shadow-md">
        <div className="-rotate-45 text-2xl font-bold text-yellow-800">×</div>
      </div>
      <Handle type="target" position={Position.Left} className="w-2 h-2 -left-2" />
      <Handle type="source" position={Position.Right} className="w-2 h-2 -right-2" />
      <Handle type="source" position={Position.Bottom} className="w-2 h-2 -bottom-2" />
      {data.label && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 text-xs font-medium whitespace-nowrap">
          {data.label}
        </div>
      )}
    </div>
  )
})
GatewayNode.displayName = "GatewayNode"

// BPMN Intermediate Event - Circle with double border
export const EventNode = memo(({ data }: NodeProps) => {
  return (
    <div className="relative">
      <div className="w-12 h-12 rounded-full bg-orange-100 border-2 border-orange-600 flex items-center justify-center shadow-md">
        <div className="w-10 h-10 rounded-full border-2 border-orange-600 flex items-center justify-center">
          <div className="text-xs font-semibold text-orange-800">⚡</div>
        </div>
      </div>
      <Handle type="target" position={Position.Left} className="w-2 h-2" />
      <Handle type="source" position={Position.Right} className="w-2 h-2" />
      {data.label && (
        <div className="absolute top-14 left-1/2 -translate-x-1/2 text-xs font-medium whitespace-nowrap">
          {data.label}
        </div>
      )}
    </div>
  )
})
EventNode.displayName = "EventNode"

// BPMN Subprocess - Rounded rectangle with + icon
export const SubprocessNode = memo(({ data }: NodeProps) => {
  return (
    <div className="relative">
      <div className="min-w-[120px] bg-purple-100 border-2 border-purple-600 rounded-lg p-3 shadow-md">
        <div className="flex items-center gap-2 mb-1">
          <div className="text-xs font-semibold text-purple-900">{data.label}</div>
          <div className="text-xs text-purple-600">⊞</div>
        </div>
        {data.description && (
          <div className="text-[10px] text-purple-700">{data.description}</div>
        )}
        {data.metadata && (
          <div className="text-[9px] text-purple-600 mt-1">
            {data.metadata.sla && <div>📋 {data.metadata.sla}</div>}
          </div>
        )}
      </div>
      <Handle type="target" position={Position.Left} className="w-2 h-2" />
      <Handle type="source" position={Position.Right} className="w-2 h-2" />
    </div>
  )
})
SubprocessNode.displayName = "SubprocessNode"

// BPMN Parallel Gateway - Diamond with + symbol
export const ParallelGatewayNode = memo(({ data }: NodeProps) => {
  return (
    <div className="relative">
      <div className="w-16 h-16 bg-purple-100 border-2 border-purple-600 rotate-45 flex items-center justify-center shadow-md">
        <div className="-rotate-45 text-2xl font-bold text-purple-800">+</div>
      </div>
      <Handle type="target" position={Position.Left} className="w-2 h-2 -left-2" />
      <Handle type="source" position={Position.Right} className="w-2 h-2 -right-2" />
      <Handle type="source" position={Position.Top} className="w-2 h-2 -top-2" />
      <Handle type="source" position={Position.Bottom} className="w-2 h-2 -bottom-2" />
      {data.label && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 text-xs font-medium whitespace-nowrap">
          {data.label}
        </div>
      )}
    </div>
  )
})
ParallelGatewayNode.displayName = "ParallelGatewayNode"
