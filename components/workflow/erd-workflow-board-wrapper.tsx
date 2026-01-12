"use client"

import { useState, useCallback, useMemo, useRef, useEffect } from "react"
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
import { Plus, Download, Upload, Database, Table2, Undo2, Redo2, Copy, Clipboard, Save, Trash2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useHistory } from "@/lib/use-history"
import { useKeyboardShortcuts } from "@/lib/use-keyboard-shortcuts"
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
  const { toast } = useToast()

  // State for workflow data
  const [workflowNodes, setWorkflowNodes] = useState<WorkflowNode[]>(initialNodes)
  const [workflowEdges, setWorkflowEdges] = useState<WorkflowEdge[]>(initialEdges)

  // State for editing nodes
  const [editingNodeId, setEditingNodeId] = useState<string | null>(null)
  const [editDialogOpen, setEditDialogOpen] = useState(false)

  // State for editing edges
  const [editingEdgeId, setEditingEdgeId] = useState<string | null>(null)
  const [edgeEditDialogOpen, setEdgeEditDialogOpen] = useState(false)

  // History management for undo/redo
  const history = useHistory({ nodes: workflowNodes, edges: workflowEdges })

  // Clipboard for copy/paste
  const [clipboard, setClipboard] = useState<{ nodes: WorkflowNode[], edges: WorkflowEdge[] } | null>(null)

  // Ref to track current nodes for handlers (avoids dependency issues)
  const nodesRef = useRef<Node[]>([])

  // Track if a drag is currently happening to prevent sync interference
  const isDraggingRef = useRef(false)

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

  // Keep nodesRef in sync with nodes state (for handlers that need current selection)
  useEffect(() => {
    nodesRef.current = nodes
  }, [nodes])

  // Update history when nodes/edges change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      history.setState({ nodes: workflowNodes, edges: workflowEdges })
    }, 500) // Debounce to avoid too many history entries
    return () => clearTimeout(timeoutId)
  }, [workflowNodes, workflowEdges])

  // Sync workflowNodes to React Flow nodes when workflowNodes change
  // Skip sync during active drag to prevent position reset
  useEffect(() => {
    if (!isDraggingRef.current) {
      setNodes(transformedNodes)
    }
  }, [transformedNodes, setNodes])

  // Sync workflowEdges to React Flow edges when workflowEdges change
  useEffect(() => {
    setEdges(transformedEdges)
  }, [transformedEdges, setEdges])

  // Undo handler
  const handleUndo = useCallback(() => {
    if (history.canUndo) {
      history.undo()
      const prevState = history.state
      setWorkflowNodes(prevState.nodes)
      setWorkflowEdges(prevState.edges)
      toast({ title: "Undo", description: "Reverted last change" })
    }
  }, [history, toast])

  // Redo handler
  const handleRedo = useCallback(() => {
    if (history.canRedo) {
      history.redo()
      const nextState = history.state
      setWorkflowNodes(nextState.nodes)
      setWorkflowEdges(nextState.edges)
      toast({ title: "Redo", description: "Reapplied change" })
    }
  }, [history, toast])

  // Copy selected nodes
  const handleCopy = useCallback(() => {
    // Get selected node IDs from current React Flow nodes ref
    const selectedNodeIds = new Set(nodesRef.current.filter(n => n.selected).map(n => n.id))

    if (selectedNodeIds.size === 0) {
      toast({ title: "Nothing to copy", description: "Select nodes first" })
      return
    }

    // Get the workflow nodes that are selected
    const selectedNodes = workflowNodes.filter(n => selectedNodeIds.has(n.id))
    const selectedEdges = workflowEdges.filter(e =>
      selectedNodeIds.has(e.source) && selectedNodeIds.has(e.target)
    )

    setClipboard({ nodes: selectedNodes, edges: selectedEdges })
    toast({ title: "Copied", description: `Copied ${selectedNodes.length} node(s)` })
  }, [workflowNodes, workflowEdges, toast])

  // Paste copied nodes
  const handlePaste = useCallback(() => {
    if (!clipboard) {
      toast({ title: "Nothing to paste", description: "Copy nodes first" })
      return
    }

    const offset = 50
    const idMap = new Map<string, string>()

    const newNodes = clipboard.nodes.map(node => {
      const newId = `table-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      idMap.set(node.id, newId)
      return {
        ...node,
        id: newId,
        position: {
          x: node.position.x + offset,
          y: node.position.y + offset
        }
      }
    })

    const newEdges = clipboard.edges.map(edge => ({
      ...edge,
      id: `edge-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      source: idMap.get(edge.source)!,
      target: idMap.get(edge.target)!
    }))

    setWorkflowNodes(prev => [...prev, ...newNodes])
    setWorkflowEdges(prev => [...prev, ...newEdges])
    toast({ title: "Pasted", description: `Pasted ${newNodes.length} node(s)` })
  }, [clipboard, toast])

  // Delete selected nodes
  const handleDeleteSelected = useCallback(() => {
    // Get selected node IDs from React Flow nodes ref
    const selectedNodeIds = nodesRef.current.filter(n => n.selected).map(n => n.id)

    if (selectedNodeIds.length === 0) return

    setWorkflowNodes(prev => prev.filter(n => !selectedNodeIds.includes(n.id)))
    setWorkflowEdges(prev => prev.filter(e =>
      !selectedNodeIds.includes(e.source) && !selectedNodeIds.includes(e.target)
    ))
    toast({ title: "Deleted", description: `Deleted ${selectedNodeIds.length} node(s)` })
  }, [toast])

  // Handle node changes (including position updates)
  const handleNodesChange = useCallback(
    (changes: NodeChange[]) => {
      onNodesChange(changes)

      // Track if any position change is actively dragging
      const hasDragging = changes.some(
        (c): c is NodeChange & { type: 'position'; dragging: boolean } =>
          c.type === 'position' && 'dragging' in c && c.dragging === true
      )
      if (hasDragging) {
        isDraggingRef.current = true
        return // Don't update workflowNodes during active drag
      }

      // Update workflowNodes positions after drag ends
      const positionChanges = changes.filter(
        (c): c is NodeChange & { type: 'position'; position: { x: number; y: number }; dragging: boolean } =>
          c.type === 'position' && 'dragging' in c && c.dragging === false && 'position' in c
      )
      if (positionChanges.length > 0) {
        setWorkflowNodes((prev) =>
          prev.map((wn) => {
            const change = positionChanges.find((c) => c.id === wn.id)
            if (change && change.position) {
              return { ...wn, position: change.position }
            }
            return wn
          })
        )

        // Re-enable sync after state update completes
        setTimeout(() => {
          isDraggingRef.current = false
        }, 50)
      }

      // Track if any dimension change is actively resizing
      const hasResizing = changes.some(
        (c): c is NodeChange & { type: 'dimensions'; resizing: boolean } =>
          c.type === 'dimensions' && 'resizing' in c && c.resizing === true
      )
      if (hasResizing) {
        isDraggingRef.current = true
        return // Don't update workflowNodes during active resize
      }

      // Update workflowNodes dimensions after resize ends
      const dimensionChanges = changes.filter(
        (c): c is NodeChange & { type: 'dimensions'; dimensions?: { width: number; height: number }; resizing: boolean } =>
          c.type === 'dimensions' && 'resizing' in c && c.resizing === false && 'dimensions' in c
      )
      if (dimensionChanges.length > 0) {
        setWorkflowNodes((prev) =>
          prev.map((wn) => {
            const change = dimensionChanges.find((c) => c.id === wn.id)
            if (change && change.dimensions) {
              return {
                ...wn,
                metadata: {
                  ...wn.metadata,
                  width: change.dimensions.width,
                  height: change.dimensions.height,
                },
              }
            }
            return wn
          })
        )

        // Re-enable sync after state update completes
        setTimeout(() => {
          isDraggingRef.current = false
        }, 50)
      }
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
    toast({ title: "Exported", description: "Workflow saved to JSON file" })
  }, [workflowNodes, workflowEdges, config.frameworkId, toast])

  // Keyboard shortcuts
  useKeyboardShortcuts({
    onUndo: handleUndo,
    onRedo: handleRedo,
    onCopy: handleCopy,
    onPaste: handlePaste,
    onDelete: handleDeleteSelected,
    onSave: exportWorkflow,
  })

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

            <div className="w-px h-5 bg-border" />

            {/* Undo/Redo */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleUndo}
              disabled={!history.canUndo}
              title="Undo (Ctrl+Z)"
            >
              <Undo2 className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRedo}
              disabled={!history.canRedo}
              title="Redo (Ctrl+Y)"
            >
              <Redo2 className="h-4 w-4" />
            </Button>

            <div className="w-px h-5 bg-border" />

            {/* Copy/Paste */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              title="Copy (Ctrl+C)"
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handlePaste}
              disabled={!clipboard}
              title="Paste (Ctrl+V)"
            >
              <Clipboard className="h-4 w-4" />
            </Button>

            <div className="w-px h-5 bg-border" />

            {/* Delete */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleDeleteSelected}
              title="Delete Selected (Del)"
            >
              <Trash2 className="h-4 w-4" />
            </Button>

            <div className="w-px h-5 bg-border" />

            {/* Save/Export */}
            <Button
              variant="outline"
              size="sm"
              onClick={exportWorkflow}
              className="gap-1.5"
              title="Save to JSON (Ctrl+S)"
            >
              <Save className="h-4 w-4" />
              Save
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
      <div className="absolute bottom-4 left-4 bg-white/95 p-3 rounded-lg shadow-md border text-xs max-w-md space-y-1">
        <div>
          <strong>💡 ERD Controls:</strong> <strong>Double-click a table to edit it.</strong> <strong>Click a relationship label to edit cardinality.</strong> Drag tables to reposition. Drag from connection points to create relationships. Use mouse wheel to zoom.
        </div>
        <div>
          <strong>⌨️ Keyboard Shortcuts:</strong> Undo (Ctrl+Z), Redo (Ctrl+Y), Copy (Ctrl+C), Paste (Ctrl+V), Delete (Del/Backspace), Save (Ctrl+S). Multi-select with Shift+Click or drag selection box.
        </div>
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
