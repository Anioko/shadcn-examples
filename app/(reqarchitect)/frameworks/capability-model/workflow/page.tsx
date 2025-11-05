"use client"

import { useState, useEffect } from "react"
import { CapabilityWorkflowBoardWrapper } from "@/components/workflow/capability-workflow-board-wrapper"
import { WorkflowBoardConfig, WorkflowNode, WorkflowEdge } from "@/lib/types/workflow"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Save, Info } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

const config: WorkflowBoardConfig = {
  frameworkId: "capability-model",
  frameworkName: "Capability Model",
  nodeTypes: [
    "capability",
    "sub-capability",
    "resource",
    "application",
    "process",
    "organization",
  ],
  defaultView: "all",
}

// Sample initial data for new users
const sampleNodes: WorkflowNode[] = [
  {
    id: "cap-1",
    type: "capability",
    label: "Customer Management",
    description: "Manage customer relationships and data",
    status: "active",
    position: { x: 100, y: 100 },
    metadata: {
      width: 200,
      height: 120,
      currentMaturity: 3,
      targetMaturity: 4,
      investmentLevel: "high",
      criticality: "high",
      owner: "Sales & Marketing",
      healthScore: 75,
    },
  },
  {
    id: "cap-2",
    type: "capability",
    label: "Order Processing",
    description: "Process customer orders end-to-end",
    status: "active",
    position: { x: 400, y: 100 },
    metadata: {
      width: 200,
      height: 120,
      currentMaturity: 4,
      targetMaturity: 5,
      investmentLevel: "critical",
      criticality: "mission-critical",
      owner: "Operations",
      healthScore: 85,
    },
  },
  {
    id: "cap-3",
    type: "capability",
    label: "Inventory Management",
    description: "Track and manage inventory levels",
    status: "pending",
    position: { x: 700, y: 100 },
    metadata: {
      width: 200,
      height: 120,
      currentMaturity: 2,
      targetMaturity: 4,
      investmentLevel: "medium",
      criticality: "high",
      owner: "Supply Chain",
      healthScore: 55,
    },
  },
  {
    id: "sub-1",
    type: "sub-capability",
    label: "Lead Management",
    description: "Capture and nurture leads",
    status: "active",
    position: { x: 120, y: 280 },
    metadata: {
      width: 160,
      height: 90,
      currentMaturity: 3,
      investmentLevel: "medium",
      criticality: "medium",
      parentNode: "cap-1",
    },
  },
  {
    id: "app-1",
    type: "application",
    label: "CRM System",
    status: "active",
    position: { x: 100, y: 420 },
    metadata: {
      width: 150,
      height: 85,
      version: "2.5",
      vendor: "Salesforce",
      licenseCost: 150000,
      renewalDate: "2024-12-31",
    },
  },
  {
    id: "resource-1",
    type: "resource",
    label: "Sales Team",
    status: "active",
    position: { x: 400, y: 420 },
    metadata: {
      width: 140,
      height: 80,
      resourceType: "people",
      allocationPercentage: 100,
      costCenter: "CC-1001",
    },
  },
  {
    id: "process-1",
    type: "process",
    label: "Order Fulfillment",
    status: "active",
    position: { x: 700, y: 420 },
    metadata: {
      width: 160,
      height: 85,
      processMaturity: 4,
      efficiencyScore: 80,
      automationLevel: 60,
    },
  },
]

const sampleEdges: WorkflowEdge[] = [
  {
    id: "edge-1",
    source: "cap-1",
    target: "cap-2",
    label: "enables",
  },
  {
    id: "edge-2",
    source: "cap-2",
    target: "cap-3",
    label: "depends-on",
  },
  {
    id: "edge-3",
    source: "cap-1",
    target: "sub-1",
    label: "supports",
  },
  {
    id: "edge-4",
    source: "cap-1",
    target: "app-1",
    label: "uses",
  },
  {
    id: "edge-5",
    source: "cap-1",
    target: "resource-1",
    label: "uses",
  },
  {
    id: "edge-6",
    source: "cap-2",
    target: "process-1",
    label: "uses",
  },
]

export default function CapabilityModelWorkflowPage() {
  const [nodes, setNodes] = useState<WorkflowNode[]>([])
  const [edges, setEdges] = useState<WorkflowEdge[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showWelcome, setShowWelcome] = useState(false)
  const { toast } = useToast()

  // Load saved data from localStorage
  useEffect(() => {
    try {
      const savedNodes = localStorage.getItem('capability-model-nodes')
      const savedEdges = localStorage.getItem('capability-model-edges')

      if (savedNodes && savedEdges) {
        setNodes(JSON.parse(savedNodes))
        setEdges(JSON.parse(savedEdges))
        setShowWelcome(false)
      } else {
        // First time user - show sample data
        setNodes(sampleNodes)
        setEdges(sampleEdges)
        setShowWelcome(true)
      }
    } catch (error) {
      console.error('Failed to load capability model:', error)
      setNodes(sampleNodes)
      setEdges(sampleEdges)
      setShowWelcome(true)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Auto-save to localStorage when data changes
  useEffect(() => {
    if (nodes.length > 0 || edges.length > 0) {
      try {
        localStorage.setItem('capability-model-nodes', JSON.stringify(nodes))
        localStorage.setItem('capability-model-edges', JSON.stringify(edges))
      } catch (error) {
        console.error('Failed to save capability model:', error)
      }
    }
  }, [nodes, edges])

  const handleSave = () => {
    try {
      localStorage.setItem('capability-model-nodes', JSON.stringify(nodes))
      localStorage.setItem('capability-model-edges', JSON.stringify(edges))
      toast({
        title: "Saved",
        description: "Capability model saved successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save capability model",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
          <p className="text-sm text-muted-foreground">Loading capability model...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6 px-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/frameworks/capability-model/dashboard">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Capability Model Workflow</h1>
            <p className="text-sm text-muted-foreground">
              Enterprise capability-based planning and visualization
            </p>
          </div>
        </div>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Save
        </Button>
      </div>

      {/* Welcome Alert */}
      {showWelcome && (
        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>Welcome to Capability Model!</AlertTitle>
          <AlertDescription>
            You're viewing sample data to help you get started. Add, edit, or remove capabilities to build your own model.
            Your changes will be saved automatically.
          </AlertDescription>
          <Button
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => setShowWelcome(false)}
          >
            Got it
          </Button>
        </Alert>
      )}

      {/* Workflow Board */}
      <CapabilityWorkflowBoardWrapper
        config={config}
        initialNodes={nodes}
        initialEdges={edges}
      />
    </div>
  )
}
