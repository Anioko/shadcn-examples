"use client"

import { useState, useCallback, useMemo, useRef } from "react"
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  Connection,
  addEdge,
  useNodesState,
  useEdgesState,
  Panel,
  NodeChange,
  EdgeChange,
  MarkerType,
} from "reactflow"
import "reactflow/dist/style.css"
import { toPng, toJpeg, toSvg } from "html-to-image"
import { WorkflowBoardConfig, WorkflowNode, WorkflowEdge } from "@/lib/types/workflow"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, Download, Upload, Database, Table2 } from "lucide-react"
import DatabaseSchemaNode, { Column } from "./nodes/database-schema-node"
import CrowsFootEdge, { Cardinality, Optionality } from "./edges/crowsfoot-edge"
import { TableEditDialog } from "./dialogs/table-edit-dialog"
import { EdgeEditDialog } from "./dialogs/edge-edit-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface ERDWorkflowBoardWrapperProps {
  config: WorkflowBoardConfig
  initialNodes: WorkflowNode[]
  initialEdges: WorkflowEdge[]
  onNodeClick?: (nodeId: string) => void
  onEdgeClick?: (edgeId: string) => void
}

// Map node types to React Flow custom node types
const nodeTypes = {
  table: DatabaseSchemaNode,
  entity: DatabaseSchemaNode,
  view: DatabaseSchemaNode,
  "materialized-view": DatabaseSchemaNode,
}

// Map edge types
const edgeTypes = {
  crowsfoot: CrowsFootEdge,
}

export function ERDWorkflowBoardWrapper({
  config,
  initialNodes,
  initialEdges,
  onNodeClick,
  onEdgeClick,
}: ERDWorkflowBoardWrapperProps) {
  const reactFlowWrapper = useRef<HTMLDivElement>(null)

  // State for workflow data
  const [workflowNodes, setWorkflowNodes] = useState<WorkflowNode[]>(initialNodes)
  const [workflowEdges, setWorkflowEdges] = useState<WorkflowEdge[]>(initialEdges)

  // State for editing nodes
  const [editingNodeId, setEditingNodeId] = useState<string | null>(null)
  const [editDialogOpen, setEditDialogOpen] = useState(false)

  // State for editing edges
  const [editingEdgeId, setEditingEdgeId] = useState<string | null>(null)
  const [edgeEditDialogOpen, setEdgeEditDialogOpen] = useState(false)

  // Transform WorkflowNode to React Flow Node
  const transformedNodes: Node[] = useMemo(() => {
    return workflowNodes.map((node) => ({
      id: node.id,
      type: node.type,
      position: node.position,
      data: {
        label: node.label,
        tableName: node.metadata?.tableName,
        schema: node.metadata?.schema,
        columns: node.metadata?.columns,
        description: node.description,
        width: node.metadata?.width,
        height: node.metadata?.height,
        onEdit: () => {
          setEditingNodeId(node.id)
          setEditDialogOpen(true)
        },
      },
    }))
  }, [workflowNodes])

  // Transform WorkflowEdge to React Flow Edge
  const transformedEdges: Edge[] = useMemo(() => {
    return workflowEdges.map((edge) => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      label: edge.label,
      type: edge.type || "crowsfoot",
      animated: edge.animated || false,
      data: {
        ...edge.data,
        onEdit: () => {
          setEditingEdgeId(edge.id)
          setEdgeEditDialogOpen(true)
        },
      },
      sourceHandle: edge.sourceHandle,
      targetHandle: edge.targetHandle,
    }))
  }, [workflowEdges])

  // React Flow state
  const [nodes, setNodes, onNodesChange] = useNodesState(transformedNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(transformedEdges)

  // Update nodes when workflowNodes changes
  useMemo(() => {
    setNodes(transformedNodes)
  }, [transformedNodes, setNodes])

  // Update edges when workflowEdges changes
  useMemo(() => {
    setEdges(transformedEdges)
  }, [transformedEdges, setEdges])

  // Handle node changes (including position updates)
  const handleNodesChange = useCallback(
    (changes: NodeChange[]) => {
      onNodesChange(changes)

      // Update workflowNodes with new positions
      changes.forEach((change) => {
        if (change.type === "position" && change.position) {
          setWorkflowNodes((prev) =>
            prev.map((node) =>
              node.id === change.id
                ? { ...node, position: change.position! }
                : node
            )
          )
        }
      })
    },
    [onNodesChange]
  )

  // Handle edge changes
  const handleEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      onEdgesChange(changes)
    },
    [onEdgesChange]
  )

  // Handle connection (creating new edges)
  const onConnect = useCallback(
    (connection: Connection) => {
      const newEdge: WorkflowEdge = {
        id: `edge-${Date.now()}`,
        source: connection.source!,
        target: connection.target!,
        type: "crowsfoot",
        label: "relationship",
        animated: false,
        data: {
          relationshipType: "one-to-many",
          sourceCardinality: "one",
          targetCardinality: "many",
          sourceOptionality: "mandatory",
          targetOptionality: "optional",
        },
      }

      setWorkflowEdges((prev) => [...prev, newEdge])
      setEdges((eds) => addEdge({
        ...connection,
        id: newEdge.id,
        type: "crowsfoot",
        label: newEdge.label,
        data: newEdge.data,
      }, eds))
    },
    [setEdges]
  )

  // Handle node click
  const handleNodeClick = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      if (onNodeClick) {
        onNodeClick(node.id)
      }
    },
    [onNodeClick]
  )

  // Handle edge click
  const handleEdgeClick = useCallback(
    (_event: React.MouseEvent, edge: Edge) => {
      if (onEdgeClick) {
        onEdgeClick(edge.id)
      }
    },
    [onEdgeClick]
  )

  // Export workflow as JSON
  const exportWorkflow = useCallback(() => {
    const data = {
      nodes: workflowNodes,
      edges: workflowEdges,
    }

    const dataStr = JSON.stringify(data, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `${config.frameworkId}-erd-${Date.now()}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }, [workflowNodes, workflowEdges, config.frameworkId])

  // Export as image
  const exportAsImage = useCallback(async (format: "png" | "jpeg" | "svg") => {
    const reactFlowElement = reactFlowWrapper.current

    if (!reactFlowElement) {
      console.error("React Flow wrapper not found")
      return
    }

    const fileName = `${config.frameworkId}-erd-${Date.now()}.${format === "jpeg" ? "jpg" : format}`

    try {
      let dataUrl: string

      const exportOptions = {
        backgroundColor: "#ffffff",
        pixelRatio: 2,
      }

      if (format === "png") {
        dataUrl = await toPng(reactFlowElement, exportOptions)
      } else if (format === "jpeg") {
        dataUrl = await toJpeg(reactFlowElement, {
          ...exportOptions,
          quality: 0.95,
        })
      } else {
        dataUrl = await toSvg(reactFlowElement, exportOptions)
      }

      const a = document.createElement("a")
      a.href = dataUrl
      a.download = fileName
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    } catch (error) {
      console.error("Error exporting image:", error)
      alert(`Failed to export image: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
  }, [config.frameworkId])

  // Import workflow from JSON
  const importWorkflow = useCallback(() => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "application/json"
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (event) => {
          try {
            const data = JSON.parse(event.target?.result as string)

            if (!data || typeof data !== "object") {
              alert("Invalid workflow file: File must contain a JSON object")
              return
            }

            if (!Array.isArray(data.nodes)) {
              alert("Invalid workflow file: Missing or invalid \"nodes\" array")
              return
            }

            if (!Array.isArray(data.edges)) {
              alert("Invalid workflow file: Missing or invalid \"edges\" array")
              return
            }

            setWorkflowNodes(data.nodes)
            setWorkflowEdges(data.edges)

            console.log(`Successfully imported ${data.nodes.length} nodes and ${data.edges.length} edges`)
          } catch (error) {
            console.error("Failed to parse workflow file:", error)
            alert(`Failed to import workflow: ${error instanceof Error ? error.message : "Invalid JSON file"}`)
          }
        }
        reader.readAsText(file)
      }
    }
    input.click()
  }, [])

  // Add new table
  const addNewTable = useCallback(() => {
    const newTable: WorkflowNode = {
      id: `table-${Date.now()}`,
      type: "table",
      label: "new_table",
      description: "New database table",
      status: "active",
      position: { x: 100, y: 100 },
      metadata: {
        tableName: "new_table",
        schema: "public",
        width: 280,
        height: 200,
        columns: [
          { name: "id", type: "UUID", isPrimaryKey: true, isNullable: false },
          { name: "created_at", type: "TIMESTAMP", isNullable: false, defaultValue: "NOW()" },
        ],
      },
    }

    setWorkflowNodes((prev) => [...prev, newTable])
  }, [])

  // Handle saving edits to a table
  const handleSaveTableEdit = useCallback((data: {
    tableName: string
    schema: string
    description?: string
    columns: Column[]
  }) => {
    if (!editingNodeId) return

    setWorkflowNodes((prev) =>
      prev.map((node) =>
        node.id === editingNodeId
          ? {
              ...node,
              label: data.tableName,
              description: data.description,
              metadata: {
                ...node.metadata,
                tableName: data.tableName,
                schema: data.schema,
                columns: data.columns,
              },
            }
          : node
      )
    )
  }, [editingNodeId])

  // Get the node being edited
  const editingNode = useMemo(() => {
    if (!editingNodeId) return null
    return workflowNodes.find((node) => node.id === editingNodeId)
  }, [editingNodeId, workflowNodes])

  // Handle saving edits to an edge
  const handleSaveEdgeEdit = useCallback((data: {
    label?: string
    sourceCardinality: Cardinality
    targetCardinality: Cardinality
    sourceOptionality: Optionality
    targetOptionality: Optionality
    sourceExactlyOne?: boolean
    targetExactlyOne?: boolean
    relationshipType?: string
  }) => {
    if (!editingEdgeId) return

    setWorkflowEdges((prev) =>
      prev.map((edge) =>
        edge.id === editingEdgeId
          ? {
              ...edge,
              label: data.label,
              data: {
                ...edge.data,
                sourceCardinality: data.sourceCardinality,
                targetCardinality: data.targetCardinality,
                sourceOptionality: data.sourceOptionality,
                targetOptionality: data.targetOptionality,
                sourceExactlyOne: data.sourceExactlyOne,
                targetExactlyOne: data.targetExactlyOne,
                relationshipType: data.relationshipType,
              },
            }
          : edge
      )
    )
  }, [editingEdgeId])

  // Handle deleting an edge
  const handleDeleteEdge = useCallback(() => {
    if (!editingEdgeId) return

    setWorkflowEdges((prev) => prev.filter((edge) => edge.id !== editingEdgeId))
    setEdges((eds) => eds.filter((edge) => edge.id !== editingEdgeId))
  }, [editingEdgeId, setEdges])

  // Get the edge being edited
  const editingEdge = useMemo(() => {
    if (!editingEdgeId) return null
    return workflowEdges.find((edge) => edge.id === editingEdgeId)
  }, [editingEdgeId, workflowEdges])

  return (
    <div className="h-full w-full" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={handleNodesChange}
        onEdgesChange={handleEdgesChange}
        onConnect={onConnect}
        onNodeClick={handleNodeClick}
        onEdgeClick={handleEdgeClick}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        attributionPosition="bottom-left"
      >
        <Background />
        <Controls />
        <MiniMap
          nodeColor={(node) => {
            if (node.type === "table") return "#3b82f6"
            if (node.type === "view") return "#10b981"
            return "#6366f1"
          }}
          nodeStrokeWidth={3}
        />

        {/* Top Panel - Title and Actions */}
        <Panel position="top-left">
          <div className="flex items-center gap-2 bg-white p-3 rounded-lg shadow-md border">
            <Database className="h-5 w-5 text-blue-600" />
            <h2 className="font-semibold text-lg">{config.frameworkName}</h2>
            <Badge variant="outline" className="ml-2">
              {workflowNodes.length} Tables
            </Badge>
          </div>
        </Panel>

        <Panel position="top-right">
          <div className="flex items-center gap-2 bg-white p-2 rounded-lg shadow-md border">
            {/* Add Table */}
            <Button
              size="sm"
              onClick={addNewTable}
              className="gap-1.5"
            >
              <Table2 className="h-4 w-4" />
              Add Table
            </Button>

            {/* Import */}
            <Button
              size="sm"
              variant="outline"
              onClick={importWorkflow}
              className="gap-1.5"
            >
              <Upload className="h-4 w-4" />
              Import
            </Button>

            {/* Export Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="outline" className="gap-1.5">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={exportWorkflow}>
                  Export as JSON
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => exportAsImage("png")}>
                  Export as PNG
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => exportAsImage("jpeg")}>
                  Export as JPEG
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => exportAsImage("svg")}>
                  Export as SVG
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </Panel>

        {/* Legend Panel */}
        <Panel position="bottom-right">
          <div className="bg-white p-3 rounded-lg shadow-md border text-xs">
            <div className="font-semibold mb-2">Crow's Foot Notation Legend</div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-4 h-0.5 bg-gray-600"></div>
                <span>One (Mandatory)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full border border-gray-600"></div>
                <span>Optional</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-lg">≺</div>
                <span>Many (Crow's Foot)</span>
              </div>
            </div>
          </div>
        </Panel>
      </ReactFlow>

      {/* Instructions */}
      <div className="absolute bottom-4 left-4 bg-white/95 p-3 rounded-lg shadow-md border text-xs max-w-md">
        <strong>💡 ERD Controls:</strong> <strong>Double-click a table to edit it.</strong> <strong>Click a relationship label to edit cardinality.</strong> Drag tables to reposition. Drag from connection points to create relationships. Use mouse wheel to zoom.
      </div>

      {/* Table Edit Dialog */}
      {editingNode && (
        <TableEditDialog
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          tableName={editingNode.metadata?.tableName || editingNode.label}
          schema={editingNode.metadata?.schema || "public"}
          description={editingNode.description}
          columns={editingNode.metadata?.columns || []}
          onSave={handleSaveTableEdit}
        />
      )}

      {/* Edge Edit Dialog */}
      {editingEdge && (
        <EdgeEditDialog
          open={edgeEditDialogOpen}
          onOpenChange={setEdgeEditDialogOpen}
          label={editingEdge.label}
          sourceCardinality={editingEdge.data?.sourceCardinality}
          targetCardinality={editingEdge.data?.targetCardinality}
          sourceOptionality={editingEdge.data?.sourceOptionality}
          targetOptionality={editingEdge.data?.targetOptionality}
          sourceExactlyOne={editingEdge.data?.sourceExactlyOne}
          targetExactlyOne={editingEdge.data?.targetExactlyOne}
          relationshipType={editingEdge.data?.relationshipType}
          onSave={handleSaveEdgeEdit}
          onDelete={handleDeleteEdge}
        />
      )}
    </div>
  )
}
