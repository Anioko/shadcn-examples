"use client"

import { useState, useCallback, useMemo, useEffect, useRef } from "react"
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  Connection,
  useNodesState,
  useEdgesState,
  MarkerType,
  Panel,
  NodeChange,
  getNodesBounds,
  getViewportForBounds,
} from "reactflow"
import "reactflow/dist/style.css"
import { toPng, toJpeg, toSvg } from 'html-to-image'
import { WorkflowBoardConfig, WorkflowNode, WorkflowEdge } from "@/lib/types/workflow"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, Download, Upload, Trash2, Undo2, Redo2, Copy, Clipboard, Save, FileUp } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useHistory } from "@/lib/use-history"
import { useKeyboardShortcuts } from "@/lib/use-keyboard-shortcuts"
import { WorkflowNodeEditDialog } from "./workflow-node-edit-dialog"
import { WorkflowEdgeEditDialog } from "./workflow-edge-edit-dialog"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  // Motivation Layer
  GoalNode, DriverNode, StakeholderNode, AssessmentNode, OutcomeNode,
  PrincipleNode, RequirementNode, ConstraintNode, MeaningNode, ValueNode,
  // Strategy Layer
  CapabilityNode, CourseOfActionNode, ResourceNode, ValueStreamNode,
  // Business Layer
  BusinessActorNode, BusinessRoleNode, BusinessCollaborationNode, BusinessInterfaceNode,
  BusinessProcessNode, BusinessFunctionNode, BusinessInteractionNode, BusinessEventNode,
  BusinessServiceNode, BusinessObjectNode, ContractNode, RepresentationNode, ProductNode,
  // Application Layer
  ApplicationComponentNode, ApplicationCollaborationNode, ApplicationInterfaceNode,
  ApplicationFunctionNode, ApplicationInteractionNode, ApplicationProcessNode, ApplicationEventNode,
  ApplicationServiceNode, DataObjectNode,
  // Technology Layer
  InfrastructureNodeNode, DeviceNode, SystemSoftwareNode, TechnologyCollaborationNode, TechnologyInterfaceNode,
  PathNode, CommunicationNetworkNode,
  TechnologyFunctionNode, TechnologyProcessNode, TechnologyInteractionNode, TechnologyEventNode,
  TechnologyServiceNode, ArtifactNode,
  // Physical Layer
  EquipmentNode, FacilityNode, DistributionNetworkNode, MaterialNode, LocationNode,
  // Implementation & Migration Layer
  WorkPackageNode, DeliverableNode, ImplementationEventNode, PlateauNode, GapNode,
  // Composite & Other
  GroupingNode,
} from "./archimate-nodes"

interface WorkflowBoardWrapperProps {
  config: WorkflowBoardConfig
  initialNodes: WorkflowNode[]
  initialEdges: WorkflowEdge[]
  onNodeClick?: (nodeId: string) => void
  onEdgeClick?: (edgeId: string) => void
}

// Map ArchiMate node types to React Flow custom node types
const nodeTypes = {
  // Motivation Layer
  "goal": GoalNode,
  "driver": DriverNode,
  "stakeholder": StakeholderNode,
  "assessment": AssessmentNode,
  "outcome": OutcomeNode,
  "principle": PrincipleNode,
  "requirement": RequirementNode,
  "constraint": ConstraintNode,
  "meaning": MeaningNode,
  "value": ValueNode,
  // Strategy Layer
  "capability": CapabilityNode,
  "course-of-action": CourseOfActionNode,
  "resource": ResourceNode,
  "value-stream": ValueStreamNode,
  // Business Layer
  "business-actor": BusinessActorNode,
  "business-role": BusinessRoleNode,
  "business-collaboration": BusinessCollaborationNode,
  "business-interface": BusinessInterfaceNode,
  "business-process": BusinessProcessNode,
  "business-function": BusinessFunctionNode,
  "business-interaction": BusinessInteractionNode,
  "business-event": BusinessEventNode,
  "business-service": BusinessServiceNode,
  "business-object": BusinessObjectNode,
  "contract": ContractNode,
  "representation": RepresentationNode,
  "product": ProductNode,
  // Application Layer
  "application-component": ApplicationComponentNode,
  "application-collaboration": ApplicationCollaborationNode,
  "application-interface": ApplicationInterfaceNode,
  "application-function": ApplicationFunctionNode,
  "application-interaction": ApplicationInteractionNode,
  "application-process": ApplicationProcessNode,
  "application-event": ApplicationEventNode,
  "application-service": ApplicationServiceNode,
  "data-object": DataObjectNode,
  // Technology Layer
  "infrastructure-node": InfrastructureNodeNode,
  "device": DeviceNode,
  "system-software": SystemSoftwareNode,
  "technology-collaboration": TechnologyCollaborationNode,
  "technology-interface": TechnologyInterfaceNode,
  "path": PathNode,
  "communication-network": CommunicationNetworkNode,
  "technology-function": TechnologyFunctionNode,
  "technology-process": TechnologyProcessNode,
  "technology-interaction": TechnologyInteractionNode,
  "technology-event": TechnologyEventNode,
  "technology-service": TechnologyServiceNode,
  "artifact": ArtifactNode,
  // Physical Layer
  "equipment": EquipmentNode,
  "facility": FacilityNode,
  "distribution-network": DistributionNetworkNode,
  "material": MaterialNode,
  "location": LocationNode,
  // Implementation & Migration Layer
  "work-package": WorkPackageNode,
  "deliverable": DeliverableNode,
  "implementation-event": ImplementationEventNode,
  "plateau": PlateauNode,
  "gap": GapNode,
  // Composite & Other
  "grouping": GroupingNode,
}

export function ArchimateWorkflowBoardWrapper({
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

  // Ref for ReactFlow component
  const reactFlowWrapper = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  // History management for undo/redo
  const history = useHistory({ nodes: workflowNodes, edges: workflowEdges })

  // Clipboard for copy/paste
  const [clipboard, setClipboard] = useState<{ nodes: WorkflowNode[], edges: WorkflowEdge[] } | null>(null)

  // Ref to track current nodes for handlers (avoids dependency issues)
  const nodesRef = useRef<Node[]>([])

  // Track if a drag is currently happening to prevent sync interference
  const isDraggingRef = useRef(false)



  // Update history when nodes/edges change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      history.setState({ nodes: workflowNodes, edges: workflowEdges })
    }, 500) // Debounce to avoid too many history entries
    return () => clearTimeout(timeoutId)
  }, [workflowNodes, workflowEdges])

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
      const newId = `node-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
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

  // Export to JSON
  const handleExportJSON = useCallback(() => {
    const data = {
      nodes: workflowNodes,
      edges: workflowEdges,
      metadata: {
        version: '1.0',
        type: config.type,
        exportedAt: new Date().toISOString()
      }
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `workflow-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
    toast({ title: "Exported", description: "Workflow saved to JSON file" })
  }, [workflowNodes, workflowEdges, config.type, toast])

  // Import from JSON
  const handleImportJSON = useCallback(() => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return

      try {
        const text = await file.text()
        const data = JSON.parse(text)

        if (!data.nodes || !data.edges) {
          toast({ title: "Invalid file", description: "JSON file is not a valid workflow", variant: "destructive" })
          return
        }

        setWorkflowNodes(data.nodes)
        setWorkflowEdges(data.edges)
        toast({ title: "Imported", description: "Workflow loaded from JSON file" })
      } catch (error) {
        toast({ title: "Error", description: "Failed to import workflow", variant: "destructive" })
      }
    }
    input.click()
  }, [toast])

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

  // Keyboard shortcuts
  useKeyboardShortcuts({
    onUndo: handleUndo,
    onRedo: handleRedo,
    onCopy: handleCopy,
    onPaste: handlePaste,
    onDelete: handleDeleteSelected,
    onSave: handleExportJSON,
  })

  // Helper to calculate child count
  const getChildCount = useCallback((nodeId: string) => {
    return workflowNodes.filter(n => n.metadata?.parentNode === nodeId).length
  }, [workflowNodes])

  // Helper to toggle collapse state
  const toggleNodeCollapse = useCallback((nodeId: string) => {
    setWorkflowNodes((prev) =>
      prev.map((n) => {
        if (n.id === nodeId) {
          const isCollapsed = !n.metadata?.isCollapsed
          return {
            ...n,
            metadata: {
              ...n.metadata,
              isCollapsed,
            },
          }
        }
        // Hide/show children
        if (n.metadata?.parentNode === nodeId) {
          return {
            ...n,
            metadata: {
              ...n.metadata,
              hidden: !n.metadata?.hidden,
            },
          }
        }
        return n
      })
    )
  }, [])

  // Helper to auto-resize parent to fit all children
  const autoResizeParent = useCallback((parentId: string, allNodes: WorkflowNode[]) => {
    const children = allNodes.filter(n => n.metadata?.parentNode === parentId)
    if (children.length === 0) return null

    // Calculate bounding box of all children
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity

    children.forEach(child => {
      const childWidth = (child.metadata?.width as number) || 100
      const childHeight = (child.metadata?.height as number) || 60

      minX = Math.min(minX, child.position.x)
      minY = Math.min(minY, child.position.y)
      maxX = Math.max(maxX, child.position.x + childWidth)
      maxY = Math.max(maxY, child.position.y + childHeight)
    })

    // Calculate actual occupied space (accounting for offset)
    const actualWidth = maxX - minX
    const actualHeight = maxY - minY

    // Add padding around children
    const padding = 30
    const requiredWidth = actualWidth + (padding * 2)
    const requiredHeight = actualHeight + (padding * 2)

    return {
      width: Math.max(requiredWidth, 200), // Minimum width
      height: Math.max(requiredHeight, 150), // Minimum height
    }
  }, [])

  // Transform WorkflowNode to React Flow Node
  const transformedNodes: Node[] = useMemo(() => {
    return workflowNodes.map((node) => {
      const childCount = getChildCount(node.id)
      const hasChildren = childCount > 0
      const width = node.metadata?.width || 120
      const height = node.metadata?.height || 60

      return {
        id: node.id,
        type: node.type,
        position: node.position,
        data: {
          label: node.label,
          description: node.description,
          status: node.status,
          metadata: node.metadata,
          width,
          height,
          isCollapsed: node.metadata?.isCollapsed || false,
          hasChildren,
          childCount,
          onToggleCollapse: () => toggleNodeCollapse(node.id),
        },
        // Don't set style.width/height here - let NodeResizer handle dynamic sizing
        // The node components use data.width and data.height for their internal sizing
        parentNode: node.metadata?.parentNode as string | undefined,
        extent: node.metadata?.parentNode ? 'parent' : undefined,
        hidden: node.metadata?.hidden || false,
        draggable: true,
        selectable: true,
      }
    })
  }, [workflowNodes, getChildCount, toggleNodeCollapse])

  // Transform WorkflowEdge to React Flow Edge with ArchiMate 3.2 relationship styling
  const transformedEdges: Edge[] = useMemo(() => {
    return workflowEdges.map((edge) => {
      // Default style
      let strokeDasharray = undefined
      let markerEnd = {
        type: MarkerType.ArrowClosed,
        color: "#6b7280",
      }
      let strokeColor = "#6b7280"

      // Apply ArchiMate 3.2 relationship styling
      if (edge.archimateRelationType) {
        switch (edge.archimateRelationType) {
          // Structural relationships - Solid lines
          case "composition":
            // Solid line with filled diamond (using ArrowClosed as approximation)
            markerEnd = {
              type: MarkerType.ArrowClosed,
              color: "#3b82f6",
            }
            strokeColor = "#3b82f6"
            break
          case "aggregation":
            // Solid line with open diamond (using Arrow as approximation)
            markerEnd = {
              type: MarkerType.Arrow,
              color: "#8b5cf6",
            }
            strokeColor = "#8b5cf6"
            break
          case "assignment":
            // Solid line with filled circle (using ArrowClosed as approximation)
            markerEnd = {
              type: MarkerType.ArrowClosed,
              color: "#10b981",
            }
            strokeColor = "#10b981"
            break
          case "realization":
            // Dashed line with open arrowhead
            strokeDasharray = "5,5"
            markerEnd = {
              type: MarkerType.Arrow,
              color: "#f59e0b",
            }
            strokeColor = "#f59e0b"
            break

          // Dependency relationships
          case "serving":
            // Solid line with open arrowhead
            markerEnd = {
              type: MarkerType.Arrow,
              color: "#06b6d4",
            }
            strokeColor = "#06b6d4"
            break
          case "access":
            // Dashed line with open arrowhead
            strokeDasharray = "5,5"
            markerEnd = {
              type: MarkerType.Arrow,
              color: "#84cc16",
            }
            strokeColor = "#84cc16"
            break
          case "influence":
            // Dashed line with open arrowhead
            strokeDasharray = "5,5"
            markerEnd = {
              type: MarkerType.Arrow,
              color: "#ec4899",
            }
            strokeColor = "#ec4899"
            break
          case "association":
            // Solid line (no marker)
            markerEnd = {
              type: MarkerType.Arrow,
              color: "#64748b",
            }
            strokeColor = "#64748b"
            break

          // Dynamic relationships
          case "triggering":
            // Solid line with open arrowhead
            markerEnd = {
              type: MarkerType.Arrow,
              color: "#f97316",
            }
            strokeColor = "#f97316"
            break
          case "flow":
            // Dashed line with open arrowhead
            strokeDasharray = "5,5"
            markerEnd = {
              type: MarkerType.Arrow,
              color: "#6366f1",
            }
            strokeColor = "#6366f1"
            break

          // Other relationships
          case "specialization":
            // Solid line with open triangle
            markerEnd = {
              type: MarkerType.Arrow,
              color: "#a855f7",
            }
            strokeColor = "#a855f7"
            break
        }
      }

      return {
        id: edge.id,
        source: edge.source,
        target: edge.target,
        label: edge.label || edge.archimateRelationType,
        type: "default",
        animated: false,
        markerEnd,
        style: {
          stroke: strokeColor,
          strokeWidth: 2,
          strokeDasharray,
        },
        labelStyle: {
          fontSize: 10,
          fontWeight: 600,
        },
        labelBgStyle: {
          fill: "#ffffff",
          fillOpacity: 0.9,
        },
      }
    })
  }, [workflowEdges])

  const [nodes, setNodes, onNodesChange] = useNodesState(transformedNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(transformedEdges)

  // Keep nodesRef in sync with nodes state (for handlers that need current selection)
  useEffect(() => {
    nodesRef.current = nodes
  }, [nodes])

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

  // Sync position and dimension changes from React Flow back to workflowNodes
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
        setWorkflowNodes((prev) => {
          const updated = prev.map((wn) => {
            const change = positionChanges.find((c) => c.id === wn.id)
            if (change && change.position) {
              return { ...wn, position: change.position }
            }
            return wn
          })

          // Auto-resize any affected parents when children are moved
          const affectedParents = new Set(
            positionChanges
              .map(c => updated.find(wn => wn.id === c.id)?.metadata?.parentNode as string)
              .filter(Boolean)
          )

          let result = updated
          affectedParents.forEach(parentId => {
            const newSize = autoResizeParent(parentId, result)
            if (newSize) {
              result = result.map(wn => {
                if (wn.id === parentId) {
                  return {
                    ...wn,
                    metadata: {
                      ...wn.metadata,
                      width: newSize.width,
                      height: newSize.height,
                    },
                  }
                }
                return wn
              })
            }
          })

          return result
        })

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
        setWorkflowNodes((prev) => {
          const updated = prev.map((wn) => {
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

          // Auto-resize any affected parents when children are resized
          const affectedParents = new Set(
            dimensionChanges
              .map(c => updated.find(wn => wn.id === c.id)?.metadata?.parentNode as string)
              .filter(Boolean)
          )

          let result = updated
          affectedParents.forEach(parentId => {
            const newSize = autoResizeParent(parentId, result)
            if (newSize) {
              result = result.map(wn => {
                if (wn.id === parentId) {
                  return {
                    ...wn,
                    metadata: {
                      ...wn.metadata,
                      width: newSize.width,
                      height: newSize.height,
                    },
                  }
                }
                return wn
              })
            }
          })

          return result
        })

        // Re-enable sync after state update completes
        setTimeout(() => {
          isDraggingRef.current = false
        }, 50)
      }
    },
    [onNodesChange, autoResizeParent]
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

  // Handle node drag over another node to create parent-child relationship
  const onNodeDragStop = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      // Get actual sizes from node data
      const nodeWidth = (node.data?.width as number) || 100
      const nodeHeight = (node.data?.height as number) || 60

      // Calculate node's center point
      const nodeCenterX = node.position.x + (nodeWidth / 2)
      const nodeCenterY = node.position.y + (nodeHeight / 2)

      // Check if node was dropped on ANY potential parent element (not just grouping/location)
      const parentNode = nodes.find(n => {
        if (n.id === node.id) return false // Skip self
        if (workflowNodes.find(wn => wn.id === n.id && wn.metadata?.parentNode === node.id)) return false // Skip own children

        // Get parent's actual size
        const parentWidth = (n.data?.width as number) || (n.width || 200)
        const parentHeight = (n.data?.height as number) || (n.height || 140)

        // Check if node's center point is within parent bounds
        return nodeCenterX >= n.position.x &&
               nodeCenterX <= n.position.x + parentWidth &&
               nodeCenterY >= n.position.y &&
               nodeCenterY <= n.position.y + parentHeight
      })

      if (parentNode) {
        // Set parent-child relationship and auto-resize parent
        setWorkflowNodes((prev) => {
          const updated = prev.map((wn) => {
            if (wn.id === node.id) {
              return {
                ...wn,
                metadata: {
                  ...wn.metadata,
                  parentNode: parentNode.id,
                },
                // Adjust position to be relative to parent
                position: {
                  x: node.position.x - parentNode.position.x,
                  y: node.position.y - parentNode.position.y,
                },
              }
            }
            return wn
          })

          // Auto-resize parent to fit all children
          const newSize = autoResizeParent(parentNode.id, updated)
          if (newSize) {
            return updated.map(wn => {
              if (wn.id === parentNode.id) {
                return {
                  ...wn,
                  metadata: {
                    ...wn.metadata,
                    width: newSize.width,
                    height: newSize.height,
                  },
                }
              }
              return wn
            })
          }
          return updated
        })
      }
    },
    [nodes, workflowNodes, autoResizeParent]
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
        label: `New ${type.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}`,
        status: "pending",
        position: {
          x: Math.random() * 400 + 100,
          y: Math.random() * 300 + 100,
        },
        metadata: {
          width: 120,
          height: 60,
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

  // Export workflow as image
  const exportAsImage = useCallback(async (format: 'png' | 'jpeg' | 'svg') => {
    // Use the wrapper element directly instead of viewport
    const reactFlowElement = reactFlowWrapper.current

    if (!reactFlowElement) {
      console.error('React Flow wrapper not found')
      return
    }

    const fileName = `${config.frameworkId}-workflow-${Date.now()}.${format === 'jpeg' ? 'jpg' : format}`

    try {
      let dataUrl: string

      // Capture the entire visible canvas area
      const exportOptions = {
        backgroundColor: '#ffffff',
        pixelRatio: 2, // Higher quality
      }

      if (format === 'png') {
        dataUrl = await toPng(reactFlowElement, exportOptions)
      } else if (format === 'jpeg') {
        dataUrl = await toJpeg(reactFlowElement, {
          ...exportOptions,
          quality: 0.95,
        })
      } else {
        dataUrl = await toSvg(reactFlowElement, exportOptions)
      }

      const a = document.createElement('a')
      a.href = dataUrl
      a.download = fileName
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    } catch (error) {
      console.error('Error exporting image:', error)
      alert(`Failed to export image: ${error instanceof Error ? error.message : 'Unknown error'}`)
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

            // Validate structure
            if (!data || typeof data !== 'object') {
              alert('Invalid workflow file: File must contain a JSON object')
              return
            }

            if (!Array.isArray(data.nodes)) {
              alert('Invalid workflow file: Missing or invalid "nodes" array')
              return
            }

            if (!Array.isArray(data.edges)) {
              alert('Invalid workflow file: Missing or invalid "edges" array')
              return
            }

            // Validate nodes have required properties
            const hasInvalidNodes = data.nodes.some((node: unknown) => {
              if (!node || typeof node !== 'object') return true
              const n = node as Record<string, unknown>
              return !n.id || !n.type || !n.label || !n.position || !n.status
            })

            if (hasInvalidNodes) {
              alert('Invalid workflow file: Some nodes are missing required properties (id, type, label, position, status)')
              return
            }

            // Validate edges have required properties
            const hasInvalidEdges = data.edges.some((edge: unknown) => {
              if (!edge || typeof edge !== 'object') return true
              const e = edge as Record<string, unknown>
              return !e.id || !e.source || !e.target
            })

            if (hasInvalidEdges) {
              alert('Invalid workflow file: Some edges are missing required properties (id, source, target)')
              return
            }

            // All validation passed - import the workflow
            setWorkflowNodes(data.nodes)
            setWorkflowEdges(data.edges)

            console.log(`Successfully imported ${data.nodes.length} nodes and ${data.edges.length} edges`)
          } catch (error) {
            console.error("Failed to parse workflow file:", error)
            alert(`Failed to import workflow: ${error instanceof Error ? error.message : 'Invalid JSON file'}`)
          }
        }
        reader.readAsText(file)
      }
    }
    input.click()
  }, [])

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
            <span className="font-medium">{stats.totalNodes}</span> elements
          </span>
          <span className="text-muted-foreground">
            <span className="font-medium">{stats.totalEdges}</span> relationships
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
          <span className="text-sm font-medium">Add Element:</span>
          <Select
            onValueChange={(value) => addNode(value as WorkflowNode["type"])}
          >
            <SelectTrigger className="w-[240px] h-8">
              <SelectValue placeholder="Select element type..." />
            </SelectTrigger>
            <SelectContent className="max-h-[500px]">
              <SelectGroup>
                <SelectLabel className="text-xs font-semibold">Motivation Layer</SelectLabel>
                <SelectItem value="goal">🎯 Goal</SelectItem>
                <SelectItem value="driver">💡 Driver</SelectItem>
                <SelectItem value="stakeholder">👥 Stakeholder</SelectItem>
                <SelectItem value="assessment">📊 Assessment</SelectItem>
                <SelectItem value="outcome">🏆 Outcome</SelectItem>
                <SelectItem value="principle">⚖️ Principle</SelectItem>
                <SelectItem value="requirement">📋 Requirement</SelectItem>
                <SelectItem value="constraint">🚫 Constraint</SelectItem>
                <SelectItem value="meaning">💭 Meaning</SelectItem>
                <SelectItem value="value">💎 Value</SelectItem>
              </SelectGroup>

              <SelectGroup>
                <SelectLabel className="text-xs font-semibold">Strategy Layer</SelectLabel>
                <SelectItem value="capability">⚡ Capability</SelectItem>
                <SelectItem value="course-of-action">→ Course of Action</SelectItem>
                <SelectItem value="resource">📦 Resource</SelectItem>
                <SelectItem value="value-stream">💰 Value Stream</SelectItem>
              </SelectGroup>

              <SelectGroup>
                <SelectLabel className="text-xs font-semibold">Business Layer</SelectLabel>
                <SelectItem value="business-actor">👤 Business Actor</SelectItem>
                <SelectItem value="business-role">👔 Business Role</SelectItem>
                <SelectItem value="business-collaboration">🤝 Business Collaboration</SelectItem>
                <SelectItem value="business-interface">⭕ Business Interface</SelectItem>
                <SelectItem value="business-process">📋 Business Process</SelectItem>
                <SelectItem value="business-function">⚙️ Business Function</SelectItem>
                <SelectItem value="business-interaction">💬 Business Interaction</SelectItem>
                <SelectItem value="business-event">⚡ Business Event</SelectItem>
                <SelectItem value="business-service">🔷 Business Service</SelectItem>
                <SelectItem value="business-object">📄 Business Object</SelectItem>
                <SelectItem value="contract">📜 Contract</SelectItem>
                <SelectItem value="representation">🖼️ Representation</SelectItem>
                <SelectItem value="product">📦 Product</SelectItem>
              </SelectGroup>

              <SelectGroup>
                <SelectLabel className="text-xs font-semibold">Application Layer</SelectLabel>
                <SelectItem value="application-component">📦 Application Component</SelectItem>
                <SelectItem value="application-collaboration">🤝 Application Collaboration</SelectItem>
                <SelectItem value="application-interface">⭕ Application Interface</SelectItem>
                <SelectItem value="application-function">⚙️ Application Function</SelectItem>
                <SelectItem value="application-interaction">💬 Application Interaction</SelectItem>
                <SelectItem value="application-process">📋 Application Process</SelectItem>
                <SelectItem value="application-event">⚡ Application Event</SelectItem>
                <SelectItem value="application-service">🔷 Application Service</SelectItem>
                <SelectItem value="data-object">💾 Data Object</SelectItem>
              </SelectGroup>

              <SelectGroup>
                <SelectLabel className="text-xs font-semibold">Technology Layer</SelectLabel>
                <SelectItem value="infrastructure-node">🖥️ Node</SelectItem>
                <SelectItem value="device">📱 Device</SelectItem>
                <SelectItem value="system-software">💿 System Software</SelectItem>
                <SelectItem value="technology-collaboration">🤝 Technology Collaboration</SelectItem>
                <SelectItem value="technology-interface">⭕ Technology Interface</SelectItem>
                <SelectItem value="path">🔗 Path</SelectItem>
                <SelectItem value="communication-network">🌐 Communication Network</SelectItem>
                <SelectItem value="technology-function">⚙️ Technology Function</SelectItem>
                <SelectItem value="technology-process">📋 Technology Process</SelectItem>
                <SelectItem value="technology-interaction">💬 Technology Interaction</SelectItem>
                <SelectItem value="technology-event">⚡ Technology Event</SelectItem>
                <SelectItem value="technology-service">🔷 Technology Service</SelectItem>
                <SelectItem value="artifact">📦 Artifact</SelectItem>
              </SelectGroup>

              <SelectGroup>
                <SelectLabel className="text-xs font-semibold">Physical Layer</SelectLabel>
                <SelectItem value="equipment">⚙️ Equipment</SelectItem>
                <SelectItem value="facility">🏢 Facility</SelectItem>
                <SelectItem value="distribution-network">🚚 Distribution Network</SelectItem>
                <SelectItem value="material">📦 Material</SelectItem>
                <SelectItem value="location">📍 Location</SelectItem>
              </SelectGroup>

              <SelectGroup>
                <SelectLabel className="text-xs font-semibold">Implementation & Migration</SelectLabel>
                <SelectItem value="work-package">📦 Work Package</SelectItem>
                <SelectItem value="deliverable">📦 Deliverable</SelectItem>
                <SelectItem value="implementation-event">⚡ Implementation Event</SelectItem>
                <SelectItem value="plateau">🎯 Plateau</SelectItem>
                <SelectItem value="gap">⚠️ Gap</SelectItem>
              </SelectGroup>

              <SelectGroup>
                <SelectLabel className="text-xs font-semibold">Composite & Other</SelectLabel>
                <SelectItem value="grouping">📁 Grouping</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          {/* Undo/Redo */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleUndo}
            disabled={!history.canUndo}
            className="h-8"
            title="Undo (Ctrl+Z)"
          >
            <Undo2 className="h-3 w-3" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRedo}
            disabled={!history.canRedo}
            className="h-8"
            title="Redo (Ctrl+Y)"
          >
            <Redo2 className="h-3 w-3" />
          </Button>

          {/* Copy/Paste */}
          <div className="w-px h-5 bg-border" />
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="h-8"
            title="Copy (Ctrl+C)"
          >
            <Copy className="h-3 w-3" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handlePaste}
            disabled={!clipboard}
            className="h-8"
            title="Paste (Ctrl+V)"
          >
            <Clipboard className="h-3 w-3" />
          </Button>

          {/* JSON Import/Export */}
          <div className="w-px h-5 bg-border" />
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportJSON}
            className="h-8"
            title="Save to JSON (Ctrl+S)"
          >
            <Save className="h-3 w-3 mr-1" />
            Save
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleImportJSON}
            className="h-8"
            title="Load from JSON"
          >
            <FileUp className="h-3 w-3 mr-1" />
            Load
          </Button>

          {/* Other actions */}
          <div className="w-px h-5 bg-border" />
          <Button
            variant={deleteMode ? "destructive" : "outline"}
            size="sm"
            onClick={() => setDeleteMode(!deleteMode)}
            className="h-8"
          >
            <Trash2 className="h-3 w-3 mr-1" />
            {deleteMode ? "Delete ON" : "Delete"}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8">
                <Download className="h-3 w-3 mr-1" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={exportWorkflow}>
                Export as JSON
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => exportAsImage('png')}>
                Export as PNG
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => exportAsImage('jpeg')}>
                Export as JPEG
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => exportAsImage('svg')}>
                Export as SVG
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" size="sm" onClick={importWorkflow} className="h-8">
            <Upload className="h-3 w-3 mr-1" />
            Import
          </Button>
        </div>
      </div>

      {/* Workflow Canvas */}
      <div ref={reactFlowWrapper} className="border rounded-lg overflow-hidden bg-background" style={{ height: "700px" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={handleNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={handleNodeClick}
          onEdgeClick={handleEdgeClick}
          onNodeDragStop={onNodeDragStop}
          fitView
          attributionPosition="bottom-left"
        >
          <Background />
          <Controls />
          <MiniMap
            nodeColor={(node) => {
              const workflowNode = workflowNodes.find((n) => n.id === node.id)
              if (workflowNode?.status === "active") return "#3b82f6"
              if (workflowNode?.status === "completed") return "#22c55e"
              if (workflowNode?.status === "error") return "#ef4444"
              return "#94a3b8"
            }}
            className="border rounded"
          />

          {/* Legend - ArchiMate 3.2 Layers & Relationships */}
          <Panel position="top-right" className="bg-background border rounded-lg p-3 shadow-md space-y-2 max-h-[600px] overflow-y-auto">
            <div className="text-xs font-semibold mb-2">ArchiMate 3.2 Legend</div>

            <div className="space-y-2 text-[10px]">
              <div className="font-semibold">Element Layers:</div>
              <div>
                <div className="font-medium mb-1">Strategy (Pink)</div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-4 h-4 rounded-full border-2" style={{ backgroundColor: "#CCCCFF" }}></div>
                  <span>Driver/Goal</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-3 rounded border-2" style={{ backgroundColor: "#FFD5D5" }}></div>
                  <span>Capability</span>
                </div>
              </div>
              <div>
                <div className="font-medium mb-1">Business (Yellow)</div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-5 h-3 rounded border-2" style={{ backgroundColor: "#FFFFB5" }}></div>
                  <span>Actor/Process</span>
                </div>
              </div>
              <div>
                <div className="font-medium mb-1">Application (Blue)</div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-3 rounded border-2" style={{ backgroundColor: "#B5FFFF" }}></div>
                  <span>Component/Service</span>
                </div>
              </div>
              <div>
                <div className="font-medium mb-1">Technology (Green)</div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-3 rounded border-2" style={{ backgroundColor: "#C9E7B7" }}></div>
                  <span>Node/Service</span>
                </div>
              </div>
              <div>
                <div className="font-medium mb-1">Implementation (Orange)</div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-3 rounded border-2" style={{ backgroundColor: "#FFE0C2" }}></div>
                  <span>Work Package</span>
                </div>
              </div>
            </div>

            <div className="border-t pt-2 mt-2">
              <div className="font-semibold mb-1">Relationship Types:</div>
              <div className="space-y-1 text-[9px]">
                <div>
                  <div className="font-medium mb-1">Structural (Solid):</div>
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-0.5" style={{ backgroundColor: "#3b82f6" }}></div>
                    <span className="text-blue-600">→ Composition</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-0.5" style={{ backgroundColor: "#8b5cf6" }}></div>
                    <span className="text-purple-600">→ Aggregation</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-0.5" style={{ backgroundColor: "#10b981" }}></div>
                    <span className="text-green-600">→ Assignment</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-0.5 border-b-2 border-dashed" style={{ borderColor: "#f59e0b" }}></div>
                    <span className="text-amber-600">→ Realization</span>
                  </div>
                </div>
                <div>
                  <div className="font-medium mb-1 mt-1">Dependency:</div>
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-0.5" style={{ backgroundColor: "#06b6d4" }}></div>
                    <span className="text-cyan-600">→ Serving</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-0.5 border-b-2 border-dashed" style={{ borderColor: "#84cc16" }}></div>
                    <span className="text-lime-600">→ Access</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-0.5 border-b-2 border-dashed" style={{ borderColor: "#ec4899" }}></div>
                    <span className="text-pink-600">→ Influence</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-0.5" style={{ backgroundColor: "#64748b" }}></div>
                    <span className="text-slate-600">→ Association</span>
                  </div>
                </div>
                <div>
                  <div className="font-medium mb-1 mt-1">Dynamic:</div>
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-0.5" style={{ backgroundColor: "#f97316" }}></div>
                    <span className="text-orange-600">→ Triggering</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-0.5 border-b-2 border-dashed" style={{ borderColor: "#6366f1" }}></div>
                    <span className="text-indigo-600">→ Flow</span>
                  </div>
                </div>
                <div>
                  <div className="font-medium mb-1 mt-1">Other:</div>
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-0.5" style={{ backgroundColor: "#a855f7" }}></div>
                    <span className="text-purple-500">→ Specialization</span>
                  </div>
                </div>
              </div>
            </div>
          </Panel>
        </ReactFlow>
      </div>

      {/* Help Text */}
      <div className="text-xs text-muted-foreground px-4 space-y-1">
        <div>
          <strong>💡 ArchiMate 3.2:</strong> Drag elements to rearrange. Click to edit properties. Connect elements by dragging. Official color scheme and notation standards applied.
        </div>
        <div>
          <strong>🔄 Resizing & Nesting:</strong> Select an element and drag resize handles to adjust size. Drop elements onto Grouping or Location nodes to nest them (parent-child). Click chevron icons to toggle between black box (collapsed) and white box (expanded) views.
        </div>
        <div>
          <strong>⌨️ Keyboard Shortcuts:</strong> Undo (Ctrl+Z), Redo (Ctrl+Y), Copy (Ctrl+C), Paste (Ctrl+V), Delete (Del/Backspace), Save (Ctrl+S). Multi-select with Shift+Click or drag selection box.
        </div>
      </div>

      {/* Edit Dialogs */}
      <WorkflowNodeEditDialog
        node={selectedNode}
        open={isNodeDialogOpen}
        onOpenChange={setIsNodeDialogOpen}
        onSave={handleNodeSave}
        config={config}
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
