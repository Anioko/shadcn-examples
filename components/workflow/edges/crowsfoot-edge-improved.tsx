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
  // New: Support for "exactly one" (one and only one)
  sourceExactlyOne?: boolean
  targetExactlyOne?: boolean
}

function CrowsFootEdgeImproved({
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

  // Enhanced color scheme for better visibility
  const edgeColor = selected ? "#3b82f6" : "#1e293b" // Blue when selected, dark slate otherwise
  const markerColor = selected ? "#2563eb" : "#334155" // Darker blue/slate for markers

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        style={{
          ...style,
          stroke: edgeColor,
          strokeWidth: selected ? 3 : 2.5, // Thicker lines for better visibility
        }}
      />

      {/* Source Marker (at the start of the edge) */}
      <CrowsFootMarkerImproved
        x={sourceX}
        y={sourceY}
        cardinality={sourceCard}
        optionality={sourceOpt}
        position={sourcePosition}
        isSource={true}
        color={markerColor}
        selected={selected}
        exactlyOne={data?.sourceExactlyOne}
      />

      {/* Target Marker (at the end of the edge) */}
      <CrowsFootMarkerImproved
        x={targetX}
        y={targetY}
        cardinality={targetCard}
        optionality={targetOpt}
        position={targetPosition}
        isSource={false}
        color={markerColor}
        selected={selected}
        exactlyOne={data?.targetExactlyOne}
      />

      {/* Edge Label with improved styling */}
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
            <div
              className={`
                px-2.5 py-1 rounded-md text-xs font-semibold shadow-md
                transition-all duration-200
                ${selected
                  ? 'bg-blue-500 text-white border-2 border-blue-600'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }
              `}
            >
              {data.label}
            </div>
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  )
}

interface CrowsFootMarkerImprovedProps {
  x: number
  y: number
  cardinality: Cardinality
  optionality: Optionality
  position: string
  isSource: boolean
  color: string
  selected?: boolean
  exactlyOne?: boolean
}

function CrowsFootMarkerImproved({
  x,
  y,
  cardinality,
  optionality,
  position,
  isSource,
  color,
  selected,
  exactlyOne,
}: CrowsFootMarkerImprovedProps) {
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

  // Improved offset - larger to prevent overlap with table borders
  const offset = 20 // Increased from 15
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

  // Enhanced stroke width for better visibility
  const strokeWidth = selected ? 2.5 : 2

  return (
    <g transform={`translate(${markerX}, ${markerY}) rotate(${rotation})`}>
      {/* Optionality marker with improved sizing */}
      {optionality === "optional" ? (
        // Larger circle for better visibility
        <circle
          cx="0"
          cy="0"
          r="5" // Increased from 4
          fill="white"
          stroke={color}
          strokeWidth={strokeWidth}
        />
      ) : exactlyOne ? (
        // "Exactly one" (one and only one) - double perpendicular lines
        <g>
          <line x1="-2" y1="-7" x2="-2" y2="7" stroke={color} strokeWidth={strokeWidth} />
          <line x1="2" y1="-7" x2="2" y2="7" stroke={color} strokeWidth={strokeWidth} />
        </g>
      ) : (
        // Single perpendicular line for mandatory
        <line x1="0" y1="-7" x2="0" y2="7" stroke={color} strokeWidth={strokeWidth} />
      )}

      {/* Cardinality marker with improved sizing and spacing */}
      {cardinality === "many" ? (
        // Crow's foot - larger and more visible
        <g transform="translate(10, 0)"> {/* Increased spacing from 8 to 10 */}
          <line
            x1="0" y1="0" x2="10" y2="-8" // Increased from x2="8" y2="-6"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round" // Smoother line endings
          />
          <line
            x1="0" y1="0" x2="10" y2="0" // Increased from x2="8"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          <line
            x1="0" y1="0" x2="10" y2="8" // Increased from x2="8" y2="6"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
        </g>
      ) : (
        // "One" cardinality - single perpendicular line
        <line
          x1="10" y1="-7" x2="10" y2="7" // Increased spacing from x1="8"
          stroke={color}
          strokeWidth={strokeWidth}
        />
      )}

      {/* Optional: Add directional indicator (small arrow) when selected */}
      {selected && !isSource && (
        <g transform="translate(18, 0)">
          <path
            d="M 0,-3 L 4,0 L 0,3 Z"
            fill={color}
            opacity="0.6"
          />
        </g>
      )}
    </g>
  )
}

export default memo(CrowsFootEdgeImproved)
