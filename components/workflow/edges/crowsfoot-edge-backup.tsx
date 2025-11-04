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
  markerEnd,
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

  // Determine cardinality and optionality from relationshipType if provided
  let sourceCard: Cardinality = data?.sourceCardinality || "one"
  let targetCard: Cardinality = data?.targetCardinality || "many"
  let sourceOpt: Optionality = data?.sourceOptionality || "mandatory"
  let targetOpt: Optionality = data?.targetOptionality || "mandatory"

  if (data?.relationshipType) {
    switch (data.relationshipType) {
      case "one-to-one":
        sourceCard = "one"
        targetCard = "one"
        break
      case "one-to-many":
        sourceCard = "one"
        targetCard = "many"
        break
      case "many-to-one":
        sourceCard = "many"
        targetCard = "one"
        break
      case "many-to-many":
        sourceCard = "many"
        targetCard = "many"
        break
    }
  }

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        style={{
          ...style,
          stroke: selected ? "#3b82f6" : "#64748b",
          strokeWidth: selected ? 2.5 : 2,
        }}
      />

      {/* Source Marker (at the start of the edge) */}
      <CrowsFootMarker
        x={sourceX}
        y={sourceY}
        cardinality={sourceCard}
        optionality={sourceOpt}
        position={sourcePosition}
        isSource={true}
      />

      {/* Target Marker (at the end of the edge) */}
      <CrowsFootMarker
        x={targetX}
        y={targetY}
        cardinality={targetCard}
        optionality={targetOpt}
        position={targetPosition}
        isSource={false}
      />

      {/* Edge Label */}
      {data?.label && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: "absolute",
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              pointerEvents: "all",
            }}
            className="nodrag nopan"
          >
            <div className="bg-white px-2 py-1 rounded border border-gray-300 text-xs font-medium shadow-sm">
              {data.label}
            </div>
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  )
}

interface CrowsFootMarkerProps {
  x: number
  y: number
  cardinality: Cardinality
  optionality: Optionality
  position: string
  isSource: boolean
}

function CrowsFootMarker({
  x,
  y,
  cardinality,
  optionality,
  position,
  isSource,
}: CrowsFootMarkerProps) {
  // Calculate rotation based on position
  let rotation = 0
  switch (position) {
    case "right":
      rotation = isSource ? 180 : 0
      break
    case "left":
      rotation = isSource ? 0 : 180
      break
    case "top":
      rotation = isSource ? 90 : 270
      break
    case "bottom":
      rotation = isSource ? 270 : 90
      break
  }

  // Offset from the edge endpoint
  const offset = 15
  let offsetX = 0
  let offsetY = 0

  switch (position) {
    case "right":
      offsetX = isSource ? -offset : offset
      break
    case "left":
      offsetX = isSource ? offset : -offset
      break
    case "top":
      offsetY = isSource ? offset : -offset
      break
    case "bottom":
      offsetY = isSource ? -offset : offset
      break
  }

  const markerX = x + offsetX
  const markerY = y + offsetY

  return (
    <g transform={`translate(${markerX}, ${markerY}) rotate(${rotation})`}>
      {/* Optionality marker (circle for optional, line for mandatory) */}
      {optionality === "optional" ? (
        <circle cx="0" cy="0" r="4" fill="none" stroke="#64748b" strokeWidth="1.5" />
      ) : (
        <line x1="0" y1="-6" x2="0" y2="6" stroke="#64748b" strokeWidth="2" />
      )}

      {/* Cardinality marker */}
      {cardinality === "many" ? (
        // Crow's foot (three lines spreading out)
        <g transform="translate(8, 0)">
          <line x1="0" y1="0" x2="8" y2="-6" stroke="#64748b" strokeWidth="1.5" />
          <line x1="0" y1="0" x2="8" y2="0" stroke="#64748b" strokeWidth="1.5" />
          <line x1="0" y1="0" x2="8" y2="6" stroke="#64748b" strokeWidth="1.5" />
        </g>
      ) : (
        // One (single line)
        <line x1="8" y1="-6" x2="8" y2="6" stroke="#64748b" strokeWidth="2" />
      )}
    </g>
  )
}

export default memo(CrowsFootEdge)
