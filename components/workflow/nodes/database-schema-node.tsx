"use client"

import { memo } from "react"
import { Handle, Position, NodeResizer } from "reactflow"
import { Database, Key, KeyRound, Link2 } from "lucide-react"
import { cn } from "@/lib/utils"

export interface Column {
  name: string
  type: string
  isPrimaryKey?: boolean
  isForeignKey?: boolean
  isUnique?: boolean
  isNullable?: boolean
  defaultValue?: string
}

export interface DatabaseSchemaNodeData {
  label: string
  tableName?: string
  columns?: Column[]
  description?: string
  schema?: string
  width?: number
  height?: number
  selected?: boolean
  onEdit?: () => void
}

interface DatabaseSchemaNodeProps {
  data: DatabaseSchemaNodeData
  selected?: boolean
}

function DatabaseSchemaNode({ data, selected }: DatabaseSchemaNodeProps) {
  const columns = data.columns || []
  const tableName = data.tableName || data.label

  return (
    <>
      <NodeResizer
        minWidth={200}
        minHeight={100}
        isVisible={selected}
        lineClassName="border-blue-500"
        handleClassName="h-3 w-3 bg-white border-2 border-blue-500"
      />

      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 !bg-blue-500"
      />

      <div
        className={cn(
          "rounded-lg border-2 bg-white shadow-sm transition-all overflow-hidden cursor-pointer",
          selected ? "border-blue-500 ring-2 ring-blue-200" : "border-gray-300"
        )}
        style={{
          width: data.width || 250,
          minHeight: data.height || 'auto',
        }}
        onDoubleClick={(e) => {
          e.stopPropagation()
          data.onEdit?.()
        }}
        title="Double-click to edit"
      >
        {/* Table Header */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-3 py-2 text-white">
          <div className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm truncate">{tableName}</div>
              {data.schema && (
                <div className="text-xs opacity-90 truncate">{data.schema}</div>
              )}
            </div>
          </div>
        </div>

        {/* Columns */}
        {columns.length > 0 && (
          <div className="divide-y divide-gray-200">
            {columns.map((column, index) => (
              <div
                key={index}
                className={cn(
                  "px-3 py-1.5 text-xs flex items-center gap-2",
                  column.isPrimaryKey && "bg-yellow-50",
                  column.isForeignKey && "bg-blue-50"
                )}
              >
                {/* Key Icons */}
                <div className="flex items-center gap-1 w-5">
                  {column.isPrimaryKey && (
                    <Key className="h-3 w-3 text-yellow-600" title="Primary Key" />
                  )}
                  {column.isForeignKey && (
                    <Link2 className="h-3 w-3 text-blue-600" title="Foreign Key" />
                  )}
                  {column.isUnique && !column.isPrimaryKey && (
                    <KeyRound className="h-3 w-3 text-green-600" title="Unique" />
                  )}
                </div>

                {/* Column Name */}
                <span
                  className={cn(
                    "font-medium flex-1 min-w-0 truncate",
                    column.isPrimaryKey && "text-yellow-900",
                    column.isForeignKey && "text-blue-900"
                  )}
                >
                  {column.name}
                </span>

                {/* Column Type */}
                <span className="text-gray-500 font-mono text-[10px] uppercase">
                  {column.type}
                </span>

                {/* Nullable indicator */}
                {!column.isNullable && (
                  <span className="text-red-500 font-bold text-[10px]" title="NOT NULL">
                    *
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Description */}
        {data.description && (
          <div className="px-3 py-2 text-xs text-gray-600 bg-gray-50 border-t border-gray-200">
            {data.description}
          </div>
        )}

        {/* Empty state */}
        {columns.length === 0 && (
          <div className="px-3 py-4 text-xs text-gray-400 text-center italic">
            No columns defined
          </div>
        )}
      </div>

      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 !bg-blue-500"
      />
    </>
  )
}

export default memo(DatabaseSchemaNode)
