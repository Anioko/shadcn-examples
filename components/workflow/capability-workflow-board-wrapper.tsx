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
} from "reactflow"
import "reactflow/dist/style.css"
import { toPng, toJpeg, toSvg } from 'html-to-image'
import { WorkflowBoardConfig, WorkflowNode, WorkflowEdge } from "@/lib/types/workflow"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Plus, Download, Upload, Trash2, Undo2, Redo2, Copy, Clipboard, Save, FileUp,
  TrendingUp, DollarSign, BarChart3, Target, Flame, Activity, Calendar, X
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useHistory } from "@/lib/use-history"
import { useKeyboardShortcuts } from "@/lib/use-keyboard-shortcuts"
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
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  CapabilityNode,
  SubCapabilityNode,
  ResourceNode,
  ApplicationNode,
  ProcessNode,
  OrganizationNode,
} from "./capability-nodes"
import {
  HeatMapMode,
  CapabilityRelationType,
  RELATIONSHIP_TYPES,
  MaturityLevel,
  InvestmentLevel,
  CriticalityLevel,
  MATURITY_LEVELS,
  INVESTMENT_LEVELS,
  CRITICALITY_LEVELS,
  getMaturityColor,
  getCriticalityColor,
  getInvestmentColor,
  getHealthColor,
  calculateCapabilityHealth,
  calculateMaturityGap,
  DEFAULT_ASSESSMENT_QUESTIONS,
  CapabilityMetadata,
} from "@/lib/frameworks/capability-model"

interface CapabilityWorkflowBoardWrapperProps {
  config: WorkflowBoardConfig
  initialNodes: WorkflowNode[]
  initialEdges: WorkflowEdge[]
  onNodeClick?: (nodeId: string) => void
  onEdgeClick?: (edgeId: string) => void
}

// Map capability node types to React Flow custom node types
const nodeTypes = {
  "capability": CapabilityNode,
  "sub-capability": SubCapabilityNode,
  "resource": ResourceNode,
  "application": ApplicationNode,
  "process": ProcessNode,
  "organization": OrganizationNode,
}

export function CapabilityWorkflowBoardWrapper({
  config,
  initialNodes,
  initialEdges,
  onNodeClick,
  onEdgeClick,
}: CapabilityWorkflowBoardWrapperProps) {
  // State for workflow data
  const [workflowNodes, setWorkflowNodes] = useState<WorkflowNode[]>(initialNodes)
  const [workflowEdges, setWorkflowEdges] = useState<WorkflowEdge[]>(initialEdges)

  // State for UI features
  const [deleteMode, setDeleteMode] = useState(false)
  const [heatMapMode, setHeatMapMode] = useState<HeatMapMode>("none")
  const [showRoadmap, setShowRoadmap] = useState(false)
  const [showAnalytics, setShowAnalytics] = useState(false)

  // Refs
  const reactFlowWrapper = useRef<HTMLDivElement>(null)
  const nodesRef = useRef<Node[]>([])
  const isDraggingRef = useRef(false)
  const { toast } = useToast()

  // History management for undo/redo
  const history = useHistory({ nodes: workflowNodes, edges: workflowEdges })

  // Clipboard for copy/paste
  const [clipboard, setClipboard] = useState<{ nodes: WorkflowNode[], edges: WorkflowEdge[] } | null>(null)

  // Update history when nodes/edges change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      history.setState({ nodes: workflowNodes, edges: workflowEdges })
    }, 500)
    return () => clearTimeout(timeoutId)
  }, [workflowNodes, workflowEdges])

  // ============================================================================
  // TIER 2 FEATURES - Undo/Redo/Copy/Paste/Keyboard Shortcuts/JSON Import/Export
  // ============================================================================

  const handleUndo = useCallback(() => {
    if (history.canUndo) {
      history.undo()
      const prevState = history.state
      setWorkflowNodes(prevState.nodes)
      setWorkflowEdges(prevState.edges)
      toast({ title: "Undo", description: "Reverted last change" })
    }
  }, [history, toast])

  const handleRedo = useCallback(() => {
    if (history.canRedo) {
      history.redo()
      const nextState = history.state
      setWorkflowNodes(nextState.nodes)
      setWorkflowEdges(nextState.edges)
      toast({ title: "Redo", description: "Reapplied change" })
    }
  }, [history, toast])

  const handleCopy = useCallback(() => {
    const selectedNodeIds = new Set(nodesRef.current.filter(n => n.selected).map(n => n.id))

    if (selectedNodeIds.size === 0) {
      toast({ title: "Nothing to copy", description: "Select capabilities first" })
      return
    }

    const selectedNodes = workflowNodes.filter(n => selectedNodeIds.has(n.id))
    const selectedEdges = workflowEdges.filter(e =>
      selectedNodeIds.has(e.source) && selectedNodeIds.has(e.target)
    )

    setClipboard({ nodes: selectedNodes, edges: selectedEdges })
    toast({ title: "Copied", description: `Copied ${selectedNodes.length} capability(ies)` })
  }, [workflowNodes, workflowEdges, toast])

  const handlePaste = useCallback(() => {
    if (!clipboard) {
      toast({ title: "Nothing to paste", description: "Copy capabilities first" })
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
    toast({ title: "Pasted", description: `Pasted ${newNodes.length} capability(ies)` })
  }, [clipboard, toast])

  const handleDeleteSelected = useCallback(() => {
    const selectedNodeIds = nodesRef.current.filter(n => n.selected).map(n => n.id)

    if (selectedNodeIds.length === 0) return

    setWorkflowNodes(prev => prev.filter(n => !selectedNodeIds.includes(n.id)))
    setWorkflowEdges(prev => prev.filter(e =>
      !selectedNodeIds.includes(e.source) && !selectedNodeIds.includes(e.target)
    ))
    toast({ title: "Deleted", description: `Deleted ${selectedNodeIds.length} capability(ies)` })
  }, [toast])

  const handleExportJSON = useCallback(() => {
    const data = {
      nodes: workflowNodes,
      edges: workflowEdges,
      metadata: {
        version: '1.0',
        type: 'capability-model',
        frameworkId: config.frameworkId,
        exportedAt: new Date().toISOString()
      }
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `capability-model-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
    toast({ title: "Exported", description: "Capability model saved to JSON file" })
  }, [workflowNodes, workflowEdges, config.frameworkId, toast])

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
          toast({ title: "Invalid file", description: "JSON file is not a valid capability model", variant: "destructive" })
          return
        }

        setWorkflowNodes(data.nodes)
        setWorkflowEdges(data.edges)
        toast({ title: "Imported", description: "Capability model loaded from JSON file" })
      } catch (error) {
        toast({ title: "Error", description: "Failed to import capability model", variant: "destructive" })
      }
    }
    input.click()
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

  // ============================================================================
  // NODE MANAGEMENT - Collapse, Resize, Parent-Child
  // ============================================================================

  const getChildCount = useCallback((nodeId: string) => {
    return workflowNodes.filter(n => n.metadata?.parentNode === nodeId).length
  }, [workflowNodes])

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

  const autoResizeParent = useCallback((parentId: string, allNodes: WorkflowNode[]) => {
    const children = allNodes.filter(n => n.metadata?.parentNode === parentId)
    if (children.length === 0) return null

    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity

    children.forEach(child => {
      const childWidth = (child.metadata?.width as number) || 100
      const childHeight = (child.metadata?.height as number) || 60

      minX = Math.min(minX, child.position.x)
      minY = Math.min(minY, child.position.y)
      maxX = Math.max(maxX, child.position.x + childWidth)
      maxY = Math.max(maxY, child.position.y + childHeight)
    })

    const actualWidth = maxX - minX
    const actualHeight = maxY - minY

    const padding = 30
    const requiredWidth = actualWidth + (padding * 2)
    const requiredHeight = actualHeight + (padding * 2)

    return {
      width: Math.max(requiredWidth, 200),
      height: Math.max(requiredHeight, 150),
    }
  }, [])

  // ============================================================================
  // HEAT MAP VISUALIZATION
  // ============================================================================

  const getHeatMapColor = useCallback((node: WorkflowNode): string | undefined => {
    if (heatMapMode === "none") return undefined

    const metadata = node.metadata as CapabilityMetadata | undefined

    switch (heatMapMode) {
      case "maturity":
        return getMaturityColor(metadata?.currentMaturity)
      case "investment":
        return getInvestmentColor(metadata?.investmentLevel)
      case "criticality":
        return getCriticalityColor(metadata?.criticality)
      case "health":
        const healthScore = metadata?.healthScore || calculateCapabilityHealth(metadata || {})
        return getHealthColor(healthScore)
      default:
        return undefined
    }
  }, [heatMapMode])

  // ============================================================================
  // ANALYTICS CALCULATIONS
  // ============================================================================

  const analytics = useMemo(() => {
    const capabilities = workflowNodes.filter(n => n.type === "capability" || n.type === "sub-capability")

    let totalMaturity = 0
    let maturityCount = 0
    let totalInvestment = 0
    let totalHealth = 0
    let healthCount = 0

    const maturityDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    const investmentDistribution = { low: 0, medium: 0, high: 0, critical: 0 }
    const criticalityDistribution = { low: 0, medium: 0, high: 0, "mission-critical": 0 }

    capabilities.forEach(cap => {
      const metadata = cap.metadata as CapabilityMetadata | undefined

      if (metadata?.currentMaturity) {
        totalMaturity += metadata.currentMaturity
        maturityCount++
        maturityDistribution[metadata.currentMaturity]++
      }

      if (metadata?.investmentLevel) {
        investmentDistribution[metadata.investmentLevel]++
        const investmentValue = {
          low: 25000,
          medium: 150000,
          high: 625000,
          critical: 1500000,
        }[metadata.investmentLevel]
        totalInvestment += investmentValue
      }

      if (metadata?.criticality) {
        criticalityDistribution[metadata.criticality]++
      }

      const healthScore = metadata?.healthScore || calculateCapabilityHealth(metadata || {})
      totalHealth += healthScore
      healthCount++
    })

    const avgMaturity = maturityCount > 0 ? totalMaturity / maturityCount : 0
    const avgHealth = healthCount > 0 ? totalHealth / healthCount : 0

    // Gap analysis
    const gaps = capabilities
      .map(cap => {
        const metadata = cap.metadata as CapabilityMetadata | undefined
        const gap = calculateMaturityGap(metadata?.currentMaturity, metadata?.targetMaturity)
        return { label: cap.label, gap, current: metadata?.currentMaturity, target: metadata?.targetMaturity }
      })
      .filter(g => g.gap > 0)
      .sort((a, b) => b.gap - a.gap)
      .slice(0, 5)

    return {
      totalCapabilities: capabilities.length,
      avgMaturity: avgMaturity.toFixed(1),
      totalInvestment,
      avgHealth: Math.round(avgHealth),
      maturityDistribution,
      investmentDistribution,
      criticalityDistribution,
      topGaps: gaps,
    }
  }, [workflowNodes])

  // ============================================================================
  // REACT FLOW TRANSFORMATION
  // ============================================================================

  const transformedNodes: Node[] = useMemo(() => {
    return workflowNodes.map((node) => {
      const childCount = getChildCount(node.id)
      const hasChildren = childCount > 0
      const width = node.metadata?.width || 120
      const height = node.metadata?.height || 60

      // Apply heat map overlay if active
      let overlayColor = getHeatMapColor(node)

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
        style: overlayColor ? {
          opacity: 0.8,
          border: `3px solid ${overlayColor}`,
        } : undefined,
        parentNode: node.metadata?.parentNode as string | undefined,
        extent: node.metadata?.parentNode ? 'parent' : undefined,
        hidden: node.metadata?.hidden || false,
        draggable: true,
        selectable: true,
      }
    })
  }, [workflowNodes, getChildCount, toggleNodeCollapse, getHeatMapColor])

  const transformedEdges: Edge[] = useMemo(() => {
    return workflowEdges.map((edge) => {
      const relationType = edge.label as CapabilityRelationType | undefined
      let strokeColor = "#6b7280"
      let strokeDasharray = undefined

      if (relationType && RELATIONSHIP_TYPES[relationType]) {
        strokeColor = RELATIONSHIP_TYPES[relationType].color
      }

      return {
        id: edge.id,
        source: edge.source,
        target: edge.target,
        label: edge.label,
        type: "default",
        animated: false,
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: strokeColor,
        },
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

  useEffect(() => {
    nodesRef.current = nodes
  }, [nodes])

  useEffect(() => {
    if (!isDraggingRef.current) {
      setNodes(transformedNodes)
    }
  }, [transformedNodes, setNodes])

  useEffect(() => {
    setEdges(transformedEdges)
  }, [transformedEdges, setEdges])

  const handleNodesChange = useCallback(
    (changes: NodeChange[]) => {
      onNodesChange(changes)

      const hasDragging = changes.some(
        (c): c is NodeChange & { type: 'position'; dragging: boolean } =>
          c.type === 'position' && 'dragging' in c && c.dragging === true
      )
      if (hasDragging) {
        isDraggingRef.current = true
        return
      }

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

        setTimeout(() => {
          isDraggingRef.current = false
        }, 50)
      }

      const hasResizing = changes.some(
        (c): c is NodeChange & { type: 'dimensions'; resizing: boolean } =>
          c.type === 'dimensions' && 'resizing' in c && c.resizing === true
      )
      if (hasResizing) {
        isDraggingRef.current = true
        return
      }

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
        label: "supports",
      }
      setWorkflowEdges((prev) => [...prev, newEdge])
    },
    []
  )

  const onNodeDragStop = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      const nodeWidth = (node.data?.width as number) || 100
      const nodeHeight = (node.data?.height as number) || 60

      const nodeCenterX = node.position.x + (nodeWidth / 2)
      const nodeCenterY = node.position.y + (nodeHeight / 2)

      const parentNode = nodes.find(n => {
        if (n.id === node.id) return false
        if (workflowNodes.find(wn => wn.id === n.id && wn.metadata?.parentNode === node.id)) return false

        const parentWidth = (n.data?.width as number) || (n.width || 200)
        const parentHeight = (n.data?.height as number) || (n.height || 140)

        return nodeCenterX >= n.position.x &&
               nodeCenterX <= n.position.x + parentWidth &&
               nodeCenterY >= n.position.y &&
               nodeCenterY <= n.position.y + parentHeight
      })

      if (parentNode) {
        setWorkflowNodes((prev) => {
          const updated = prev.map((wn) => {
            if (wn.id === node.id) {
              return {
                ...wn,
                metadata: {
                  ...wn.metadata,
                  parentNode: parentNode.id,
                },
                position: {
                  x: node.position.x - parentNode.position.x,
                  y: node.position.y - parentNode.position.y,
                },
              }
            }
            return wn
          })

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

  const handleNodeClick = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      if (deleteMode) {
        setWorkflowNodes((prev) => prev.filter((n) => n.id !== node.id))
        setNodes((prev) => prev.filter((n) => n.id !== node.id))
        setWorkflowEdges((prev) =>
          prev.filter((e) => e.source !== node.id && e.target !== node.id)
        )
        setEdges((prev) =>
          prev.filter((e) => e.source !== node.id && e.target !== node.id)
        )
      }
      onNodeClick?.(node.id)
    },
    [deleteMode, onNodeClick, setNodes, setEdges]
  )

  const handleEdgeClick = useCallback(
    (_event: React.MouseEvent, edge: Edge) => {
      if (deleteMode) {
        setWorkflowEdges((prev) => prev.filter((e) => e.id !== edge.id))
        setEdges((prev) => prev.filter((e) => e.id !== edge.id))
      }
      onEdgeClick?.(edge.id)
    },
    [deleteMode, onEdgeClick, setEdges]
  )

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
          width: type === "capability" ? 200 : 150,
          height: type === "capability" ? 120 : 85,
          currentMaturity: 3 as MaturityLevel,
          investmentLevel: "medium" as InvestmentLevel,
          criticality: "medium" as CriticalityLevel,
        },
      }
      setWorkflowNodes((prev) => [...prev, newNode])
    },
    []
  )

  const exportAsImage = useCallback(async (format: 'png' | 'jpeg' | 'svg') => {
    const reactFlowElement = reactFlowWrapper.current

    if (!reactFlowElement) {
      console.error('React Flow wrapper not found')
      return
    }

    const fileName = `capability-model-${Date.now()}.${format === 'jpeg' ? 'jpg' : format}`

    try {
      let dataUrl: string

      const exportOptions = {
        backgroundColor: '#ffffff',
        pixelRatio: 2,
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
  }, [])

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <div className="flex flex-col gap-4">
      {/* Stats Bar */}
      <div className="flex items-center justify-between py-2 px-4 bg-muted/50 rounded-lg">
        <div className="flex items-center gap-4 text-sm">
          <span className="text-muted-foreground">
            <span className="font-medium">{analytics.totalCapabilities}</span> capabilities
          </span>
          <span className="text-muted-foreground">
            Avg Maturity: <span className="font-medium">{analytics.avgMaturity}</span>
          </span>
          <span className="text-muted-foreground">
            Avg Health: <span className="font-medium">{analytics.avgHealth}%</span>
          </span>
          <span className="text-muted-foreground">
            Total Investment: <span className="font-medium">${(analytics.totalInvestment / 1000000).toFixed(1)}M</span>
          </span>
        </div>

        {/* Analytics Panel Toggle */}
        <Sheet open={showAnalytics} onOpenChange={setShowAnalytics}>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm">
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[500px] sm:w-[600px] overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Capability Analytics</SheetTitle>
              <SheetDescription>
                Comprehensive insights and metrics for your capability model
              </SheetDescription>
            </SheetHeader>

            <div className="mt-6 space-y-6">
              {/* Overview Cards */}
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Average Maturity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{analytics.avgMaturity}</div>
                    <Progress value={parseFloat(analytics.avgMaturity) * 20} className="mt-2" />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Average Health</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{analytics.avgHealth}%</div>
                    <Progress value={analytics.avgHealth} className="mt-2" />
                  </CardContent>
                </Card>
              </div>

              {/* Maturity Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Maturity Distribution</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {Object.entries(analytics.maturityDistribution).map(([level, count]) => (
                    <div key={level} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span>Level {level} - {MATURITY_LEVELS[parseInt(level) as MaturityLevel].name}</span>
                        <span className="font-semibold">{count}</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div
                          className="h-2 rounded-full transition-all"
                          style={{
                            width: `${(count / analytics.totalCapabilities) * 100}%`,
                            backgroundColor: MATURITY_LEVELS[parseInt(level) as MaturityLevel].color,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Investment Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Investment Distribution</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {Object.entries(analytics.investmentDistribution).map(([level, count]) => (
                    <div key={level} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span>{INVESTMENT_LEVELS[level as InvestmentLevel].name} ({INVESTMENT_LEVELS[level as InvestmentLevel].budget})</span>
                        <span className="font-semibold">{count}</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div
                          className="h-2 rounded-full transition-all"
                          style={{
                            width: `${(count / analytics.totalCapabilities) * 100}%`,
                            backgroundColor: INVESTMENT_LEVELS[level as InvestmentLevel].color,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Criticality Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Criticality Distribution</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {Object.entries(analytics.criticalityDistribution).map(([level, count]) => (
                    <div key={level} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span>{CRITICALITY_LEVELS[level as CriticalityLevel].name}</span>
                        <span className="font-semibold">{count}</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div
                          className="h-2 rounded-full transition-all"
                          style={{
                            width: `${(count / analytics.totalCapabilities) * 100}%`,
                            backgroundColor: CRITICALITY_LEVELS[level as CriticalityLevel].color,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Top Maturity Gaps */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Top Maturity Gaps</CardTitle>
                  <CardDescription>Capabilities with largest gap between current and target maturity</CardDescription>
                </CardHeader>
                <CardContent>
                  {analytics.topGaps.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No maturity gaps found</p>
                  ) : (
                    <div className="space-y-2">
                      {analytics.topGaps.map((gap, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs border-b pb-2">
                          <span className="flex-1 truncate">{gap.label}</span>
                          <Badge variant="outline" className="ml-2">
                            L{gap.current} → L{gap.target} (Gap: {gap.gap})
                          </Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between py-2 px-4 border rounded-lg bg-background">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Add Element:</span>
          <Select
            onValueChange={(value) => addNode(value as WorkflowNode["type"])}
          >
            <SelectTrigger className="w-[200px] h-8">
              <SelectValue placeholder="Select type..." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Capability Model</SelectLabel>
                <SelectItem value="capability">Capability</SelectItem>
                <SelectItem value="sub-capability">Sub-Capability</SelectItem>
                <SelectItem value="resource">Resource</SelectItem>
                <SelectItem value="application">Application</SelectItem>
                <SelectItem value="process">Process</SelectItem>
                <SelectItem value="organization">Organization</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          {/* Heat Map Toggle */}
          <Separator orientation="vertical" className="h-6" />
          <span className="text-sm font-medium">Heat Map:</span>
          <Select
            value={heatMapMode}
            onValueChange={(value) => setHeatMapMode(value as HeatMapMode)}
          >
            <SelectTrigger className="w-[140px] h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="maturity">
                <div className="flex items-center gap-2">
                  <Flame className="h-3 w-3" />
                  Maturity
                </div>
              </SelectItem>
              <SelectItem value="investment">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-3 w-3" />
                  Investment
                </div>
              </SelectItem>
              <SelectItem value="criticality">
                <div className="flex items-center gap-2">
                  <Target className="h-3 w-3" />
                  Criticality
                </div>
              </SelectItem>
              <SelectItem value="health">
                <div className="flex items-center gap-2">
                  <Activity className="h-3 w-3" />
                  Health
                </div>
              </SelectItem>
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
          <Separator orientation="vertical" className="h-6" />
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
          <Separator orientation="vertical" className="h-6" />
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
          <Separator orientation="vertical" className="h-6" />
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
              if (heatMapMode !== "none" && workflowNode) {
                return getHeatMapColor(workflowNode) || "#94a3b8"
              }
              return "#3b82f6"
            }}
            className="border rounded"
          />

          {/* Legend */}
          <Panel position="top-right" className="bg-background border rounded-lg p-3 shadow-md space-y-2">
            <div className="text-xs font-semibold mb-2">Capability Model Legend</div>

            {heatMapMode !== "none" && (
              <div className="space-y-1 text-[10px] border-b pb-2 mb-2">
                <div className="font-medium">Heat Map: {heatMapMode.charAt(0).toUpperCase() + heatMapMode.slice(1)}</div>
                {heatMapMode === "maturity" && (
                  <div className="space-y-1">
                    {Object.entries(MATURITY_LEVELS).map(([level, info]) => (
                      <div key={level} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded" style={{ backgroundColor: info.color }}></div>
                        <span>L{level} - {info.name}</span>
                      </div>
                    ))}
                  </div>
                )}
                {heatMapMode === "investment" && (
                  <div className="space-y-1">
                    {Object.entries(INVESTMENT_LEVELS).map(([key, info]) => (
                      <div key={key} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded" style={{ backgroundColor: info.color }}></div>
                        <span>{info.name}</span>
                      </div>
                    ))}
                  </div>
                )}
                {heatMapMode === "criticality" && (
                  <div className="space-y-1">
                    {Object.entries(CRITICALITY_LEVELS).map(([key, info]) => (
                      <div key={key} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded" style={{ backgroundColor: info.color }}></div>
                        <span>{info.name}</span>
                      </div>
                    ))}
                  </div>
                )}
                {heatMapMode === "health" && (
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded bg-green-500"></div>
                      <span>80-100% Excellent</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded bg-lime-500"></div>
                      <span>60-79% Good</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded bg-yellow-500"></div>
                      <span>40-59% Fair</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded bg-orange-500"></div>
                      <span>20-39% Poor</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded bg-red-500"></div>
                      <span>0-19% Critical</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="space-y-1 text-[10px]">
              <div className="font-medium">Node Types:</div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-3 rounded" style={{ background: "linear-gradient(135deg, #3b82f6, #2563eb)" }}></div>
                <span>Capability</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-3 rounded" style={{ background: "linear-gradient(135deg, #8b5cf6, #7c3aed)" }}></div>
                <span>Sub-Capability</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-3 rounded" style={{ background: "linear-gradient(135deg, #10b981, #059669)" }}></div>
                <span>Resource</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-3 rounded" style={{ background: "linear-gradient(135deg, #f97316, #ea580c)" }}></div>
                <span>Application</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-3 rounded" style={{ background: "linear-gradient(135deg, #14b8a6, #0d9488)" }}></div>
                <span>Process</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-3 rounded" style={{ background: "linear-gradient(135deg, #64748b, #475569)" }}></div>
                <span>Organization</span>
              </div>
            </div>

            <div className="border-t pt-2 mt-2">
              <div className="font-medium mb-1 text-[10px]">Relationships:</div>
              <div className="space-y-1 text-[9px]">
                {Object.entries(RELATIONSHIP_TYPES).map(([key, info]) => (
                  <div key={key} className="flex items-center gap-1">
                    <div className="w-4 h-0.5" style={{ backgroundColor: info.color }}></div>
                    <span>{info.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </Panel>
        </ReactFlow>
      </div>

      {/* Help Text */}
      <div className="text-xs text-muted-foreground px-4 space-y-1">
        <div>
          <strong>Enterprise Capability Model:</strong> Drag capabilities to rearrange. Click to edit properties. Connect with relationships. Use heat maps to visualize maturity, investment, criticality, or health.
        </div>
        <div>
          <strong>Keyboard Shortcuts:</strong> Undo (Ctrl+Z), Redo (Ctrl+Y), Copy (Ctrl+C), Paste (Ctrl+V), Delete (Del), Save (Ctrl+S)
        </div>
      </div>
    </div>
  )
}
