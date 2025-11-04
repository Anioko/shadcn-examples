"use client"

import { memo } from "react"
import { EdgeProps, getBezierPath, EdgeLabelRenderer, BaseEdge } from "reactflow"

export type Cardinality = "one" | "many"
export type Optionality = "mandatory" | "optional"

export interface CrowsFootEdgeData {
  label?: string
  sourceCardinality?: Cardinality
  targetCardinality?: Cardinality
  sourceOptionality?: Optionality
  targetOptionality?: Optionality
  relationshipType?: "one-to-one" | "one-to-many" | "many-to-one" | "many-to-many"
  sourceExactlyOne?: boolean
  targetExactlyOne?: boolean
  onEdit?: () => void
}

function CrowsFootEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data,
  selected,
}: EdgeProps<CrowsFootEdgeData>) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  })

  const edgeColor = selected ? "#3b82f6" : "#64748b"

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        style={{
          ...style,
          stroke: edgeColor,
          strokeWidth: selected ? 2 : 1.5,
        }}
      />

      {/* Edge Label */}
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: "all",
          }}
          className="nodrag nopan"
        >
          <div
            onClick={(e) => {
              e.stopPropagation()
              data?.onEdit?.()
            }}
            className={`
              px-2.5 py-1 rounded-md text-xs font-semibold shadow-md
              transition-all duration-200 cursor-pointer
              ${selected
                ? 'bg-blue-500 text-white border-2 border-blue-600'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-blue-400'
              }
            `}
            title="Click to edit relationship"
          >
            {data?.label || "Click to label"}
          </div>
        </div>
      </EdgeLabelRenderer>
    </>
  )
}

export default memo(CrowsFootEdge)
