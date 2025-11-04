"use client"

import dynamic from "next/dynamic"
import { WorkflowBoardConfig, WorkflowNode, WorkflowEdge } from "@/lib/types/workflow"

const WorkflowBoardWrapper = dynamic(
  () => import("@/components/workflow/workflow-board-wrapper").then((mod) => ({ default: mod.WorkflowBoardWrapper })),
  { ssr: false }
)

const ArchimateWorkflowBoardWrapper = dynamic(
  () => import("@/components/workflow/archimate-workflow-board-wrapper").then((mod) => ({ default: mod.ArchimateWorkflowBoardWrapper })),
  { ssr: false }
)

const ERDWorkflowBoardWrapper = dynamic(
  () => import("@/components/workflow/erd-workflow-board-wrapper").then((mod) => ({ default: mod.ERDWorkflowBoardWrapper })),
  { ssr: false }
)

interface WorkflowPageClientProps {
  config: WorkflowBoardConfig
  nodes: WorkflowNode[]
  edges: WorkflowEdge[]
}

export function WorkflowPageClient({ config, nodes, edges }: WorkflowPageClientProps) {
  // Use ArchiMate-specific wrapper for ArchiMate 3.2
  if (config.frameworkId === "archimate3.2") {
    return (
      <ArchimateWorkflowBoardWrapper
        config={config}
        initialNodes={nodes}
        initialEdges={edges}
      />
    )
  }

  // Use ERD-specific wrapper for Data Architecture
  if (config.frameworkId === "data-architecture") {
    return (
      <ERDWorkflowBoardWrapper
        config={config}
        initialNodes={nodes}
        initialEdges={edges}
      />
    )
  }

  // Use standard BPMN wrapper for other frameworks
  return (
    <WorkflowBoardWrapper
      config={config}
      initialNodes={nodes}
      initialEdges={edges}
    />
  )
}
