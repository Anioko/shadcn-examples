"use client"

import { useState, useCallback, useMemo, useEffect } from "react"
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
  MarkerType,
  Panel,
  NodeChange,
} from "reactflow"
import "reactflow/dist/style.css"
import { WorkflowBoardConfig, WorkflowNode, WorkflowEdge } from "@/lib/types/workflow"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, Download, Upload, Trash2 } from "lucide-react"
import { WorkflowNodeEditDialog } from "./workflow-node-edit-dialog"
import { WorkflowEdgeEditDialog } from "./workflow-edge-edit-dialog"
import {
  StartEventNode,
  EndEventNode,
  TaskNode,
  GatewayNode,
  EventNode,
  SubprocessNode,
  ParallelGatewayNode,
} from "./bpmn-nodes"

interface WorkflowBoardWrapperProps {
  config: WorkflowBoardConfig
  initialNodes: WorkflowNode[]
  initialEdges: WorkflowEdge[]
  onNodeClick?: (nodeId: string) => void
  onEdgeClick?: (edgeId: string) => void
}

// Map WorkflowNode types to React Flow custom node types
const nodeTypes = {
  start: StartEventNode,
  end: EndEventNode,
  task: TaskNode,
  decision: GatewayNode,
  parallel: ParallelGatewayNode,
  event: EventNode,
  subprocess: SubprocessNode,
  gateway: GatewayNode,
}

export function WorkflowBoardWrapper({
  config,
  initialNodes,
  initialEdges,
  onNodeClick,
  onEdgeClick,
}: WorkflowBoardWrapperProps) {
  // State for workflow data
  const [workflowNodes, setWorkflowNodes] = useState<WorkflowNode[]>(initialNodes)
  const [workflowEdges, setWorkflowEdges] = useState<WorkflowEdge[]>(initialEdges)

  // State for edit dialogs
  const [selectedNode, setSelectedNode] = useState<WorkflowNode | null>(null)
  const [selectedEdge, setSelectedEdge] = useState<WorkflowEdge | null>(null)
  const [isNodeDialogOpen, setIsNodeDialogOpen] = useState(false)
  const [isEdgeDialogOpen, setIsEdgeDialogOpen] = useState(false)

  // State for delete mode
  const [deleteMode, setDeleteMode] = useState(false)

  // Transform WorkflowNode to React Flow Node
  const transformedNodes: Node[] = useMemo(() => {
    return workflowNodes.map((node) => ({
      id: node.id,
      type: node.type,
      position: node.position,
      data: {
        label: node.label,
        description: node.description,
        status: node.status,
        metadata: node.metadata,
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
      type: edge.type === "conditional" ? "step" : edge.type === "error" ? "smoothstep" : "default",
      animated: edge.type === "conditional" || edge.type === "error",
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: edge.type === "error" ? "#ef4444" : edge.type === "conditional" ? "#f59e0b" : "#6b7280",
      },
      style: {
        stroke: edge.type === "error" ? "#ef4444" : edge.type === "conditional" ? "#f59e0b" : "#6b7280",
        strokeWidth: 2,
      },
      labelStyle: {
        fontSize: 10,
        fontWeight: 600,
      },
      labelBgStyle: {
        fill: "#ffffff",
        fillOpacity: 0.9,
      },
    }))
  }, [workflowEdges])

  const [nodes, setNodes, onNodesChange] = useNodesState(transformedNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(transformedEdges)

  // Sync workflowNodes to React Flow nodes when workflowNodes change
  useEffect(() => {
    setNodes(transformedNodes)
  }, [transformedNodes, setNodes])

  // Sync workflowEdges to React Flow edges when workflowEdges change
  useEffect(() => {
    setEdges(transformedEdges)
  }, [transformedEdges, setEdges])

  // Sync position changes from React Flow back to workflowNodes
  const handleNodesChange = useCallback(
    (changes: NodeChange[]) => {
      onNodesChange(changes)

      // Update workflowNodes positions after drag
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
      }
    },
    [onNodesChange]
  )

  const onConnect = useCallback(
    (params: Connection) => {
      const newEdge: WorkflowEdge = {
        id: `edge-${Date.now()}`,
        source: params.source || '',
        target: params.target || '',
        label: params.label as string | undefined,
      }
      setWorkflowEdges((prev) => [...prev, newEdge])
    },
    []
  )

  // Handle node click - open edit dialog
  const handleNodeClick = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      if (deleteMode) {
        // Delete node in delete mode
        setWorkflowNodes((prev) => prev.filter((n) => n.id !== node.id))
        setNodes((prev) => prev.filter((n) => n.id !== node.id))
        // Also remove connected edges
        setWorkflowEdges((prev) =>
          prev.filter((e) => e.source !== node.id && e.target !== node.id)
        )
        setEdges((prev) =>
          prev.filter((e) => e.source !== node.id && e.target !== node.id)
        )
      } else {
        // Open edit dialog
        const workflowNode = workflowNodes.find((n) => n.id === node.id)
        if (workflowNode) {
          setSelectedNode(workflowNode)
          setIsNodeDialogOpen(true)
        }
      }
      onNodeClick?.(node.id)
    },
    [deleteMode, workflowNodes, onNodeClick, setNodes, setEdges]
  )

  // Handle edge click - open edit dialog
  const handleEdgeClick = useCallback(
    (_event: React.MouseEvent, edge: Edge) => {
      if (deleteMode) {
        // Delete edge in delete mode
        setWorkflowEdges((prev) => prev.filter((e) => e.id !== edge.id))
        setEdges((prev) => prev.filter((e) => e.id !== edge.id))
      } else {
        // Open edit dialog
        const workflowEdge = workflowEdges.find((e) => e.id === edge.id)
        if (workflowEdge) {
          setSelectedEdge(workflowEdge)
          setIsEdgeDialogOpen(true)
        }
      }
      onEdgeClick?.(edge.id)
    },
    [deleteMode, workflowEdges, onEdgeClick, setEdges]
  )

  // Handle node save
  const handleNodeSave = useCallback((updatedNode: WorkflowNode) => {
    setWorkflowNodes((prev) =>
      prev.map((n) => (n.id === updatedNode.id ? updatedNode : n))
    )
  }, [])

  // Handle edge save
  const handleEdgeSave = useCallback((updatedEdge: WorkflowEdge) => {
    setWorkflowEdges((prev) =>
      prev.map((e) => (e.id === updatedEdge.id ? updatedEdge : e))
    )
  }, [])

  // Add new node
  const addNode = useCallback(
    (type: WorkflowNode["type"]) => {
      const id = `node-${Date.now()}`
      const newNode: WorkflowNode = {
        id,
        type,
        label: `New ${type.charAt(0).toUpperCase() + type.slice(1)}`,
        status: "pending",
        position: {
          x: Math.random() * 400 + 100,
          y: Math.random() * 300 + 100,
        },
      }
      setWorkflowNodes((prev) => [...prev, newNode])
    },
    []
  )

  // Export workflow as JSON
  const exportWorkflow = useCallback(() => {
    const data = {
      nodes: workflowNodes,
      edges: workflowEdges,
      config,
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${config.frameworkId}-workflow-${Date.now()}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [workflowNodes, workflowEdges, config])

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
            if (data.nodes && data.edges) {
              setWorkflowNodes(data.nodes)
              setWorkflowEdges(data.edges)
            }
          } catch (error) {
            console.error("Failed to parse workflow file:", error)
          }
        }
        reader.readAsText(file)
      }
    }
    input.click()
  }, [])

  // Keyboard handler for delete
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Delete" || e.key === "Backspace") {
        if (selectedNode && isNodeDialogOpen) {
          // Don't delete if editing
          return
        }
        // Delete mode toggle or direct delete would go here
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedNode, isNodeDialogOpen])

  // Calculate stats
  const stats = useMemo(() => {
    const totalNodes = workflowNodes.length
    const activeNodes = workflowNodes.filter((n) => n.status === "active").length
    const completedNodes = workflowNodes.filter((n) => n.status === "completed").length
    const totalEdges = workflowEdges.length

    return { totalNodes, activeNodes, completedNodes, totalEdges }
  }, [workflowNodes, workflowEdges])

  return (
    <div className="flex flex-col gap-4">
      {/* Stats Bar */}
      <div className="flex items-center justify-between py-2 px-4 bg-muted/50 rounded-lg">
        <div className="flex items-center gap-4 text-sm">
          <span className="text-muted-foreground">
            <span className="font-medium">{stats.totalNodes}</span> nodes
          </span>
          <span className="text-muted-foreground">
            <span className="font-medium">{stats.totalEdges}</span> connections
          </span>
          {stats.activeNodes > 0 && (
            <Badge variant="default" className="h-6">
              {stats.activeNodes} active
            </Badge>
          )}
          {stats.completedNodes > 0 && (
            <Badge variant="secondary" className="h-6">
              {stats.completedNodes} completed
            </Badge>
          )}
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between py-2 px-4 border rounded-lg bg-background">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium mr-2">Add Node:</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => addNode("start")}
            className="h-8"
          >
            <Plus className="h-3 w-3 mr-1" />
            Start
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => addNode("task")}
            className="h-8"
          >
            <Plus className="h-3 w-3 mr-1" />
            Task
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => addNode("decision")}
            className="h-8"
          >
            <Plus className="h-3 w-3 mr-1" />
            Decision
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => addNode("end")}
            className="h-8"
          >
            <Plus className="h-3 w-3 mr-1" />
            End
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={deleteMode ? "destructive" : "outline"}
            size="sm"
            onClick={() => setDeleteMode(!deleteMode)}
            className="h-8"
          >
            <Trash2 className="h-3 w-3 mr-1" />
            {deleteMode ? "Delete Mode ON" : "Delete Mode"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={exportWorkflow}
            className="h-8"
          >
            <Download className="h-3 w-3 mr-1" />
            Export
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={importWorkflow}
            className="h-8"
          >
            <Upload className="h-3 w-3 mr-1" />
            Import
          </Button>
        </div>
      </div>

      {/* Workflow Canvas */}
      <div className="border rounded-lg overflow-hidden bg-background" style={{ height: "700px" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={handleNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={handleNodeClick}
          onEdgeClick={handleEdgeClick}
          fitView
          attributionPosition="bottom-left"
        >
          <Background />
          <Controls />
          <MiniMap
            nodeColor={(node) => {
              const workflowNode = initialNodes.find((n) => n.id === node.id)
              if (workflowNode?.status === "active") return "#3b82f6"
              if (workflowNode?.status === "completed") return "#22c55e"
              if (workflowNode?.status === "error") return "#ef4444"
              return "#94a3b8"
            }}
            className="border rounded"
          />

          {/* Legend - BPMN 2.0 Notation */}
          <Panel position="top-right" className="bg-background border rounded-lg p-3 shadow-md space-y-2">
            <div className="text-xs font-semibold mb-2">BPMN 2.0 Notation</div>
            <div className="space-y-1.5 text-[10px]">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-green-100 border-2 border-green-600"></div>
                <span>Start Event</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-3 rounded bg-blue-100 border-2 border-blue-600"></div>
                <span>Task/Activity</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-100 border-2 border-yellow-600 rotate-45"></div>
                <span>Gateway</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-orange-100 border-2 border-orange-600"></div>
                <span>Event</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-3 rounded bg-purple-100 border-2 border-purple-600"></div>
                <span>Subprocess</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-red-100 border-4 border-red-600"></div>
                <span>End Event</span>
              </div>
            </div>
          </Panel>
        </ReactFlow>
      </div>

      {/* Help Text */}
      <div className="text-xs text-muted-foreground px-4">
        <strong>💡 Tip:</strong> Drag nodes to rearrange. Click nodes to edit. Connect nodes by dragging from one to another. Toggle delete mode to remove nodes/edges. Export/import workflows as JSON.
      </div>

      {/* Edit Dialogs */}
      <WorkflowNodeEditDialog
        node={selectedNode}
        open={isNodeDialogOpen}
        onOpenChange={setIsNodeDialogOpen}
        onSave={handleNodeSave}
      />
      <WorkflowEdgeEditDialog
        edge={selectedEdge}
        open={isEdgeDialogOpen}
        onOpenChange={setIsEdgeDialogOpen}
        onSave={handleEdgeSave}
      />
    </div>
  )
}
