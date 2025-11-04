import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getFrameworkWorkflowConfig, supportsWorkflow } from "@/lib/workflow-config"
import { getMockWorkflowData } from "@/lib/mock-workflow-data"
import { getWorkflowDataServer } from "@/lib/workflow-helpers"
import { WorkflowPageClient } from "./workflow-page-client"

interface FrameworkWorkflowPageProps {
  params: Promise<{
    slug: string
  }>
  searchParams: Promise<{
    organizationId?: string
    userId?: string
  }>
}

export async function generateMetadata({
  params,
}: FrameworkWorkflowPageProps): Promise<Metadata> {
  const { slug } = await params
  const config = getFrameworkWorkflowConfig(slug)

  if (!config) {
    return {
      title: "Workflow Builder | ReqArchitect",
    }
  }

  return {
    title: `${config.frameworkName} Workflow | ReqArchitect`,
    description: `Design and visualize ${config.frameworkName} workflows with interactive process builder`,
  }
}

export default async function FrameworkWorkflowPage({ params, searchParams }: FrameworkWorkflowPageProps) {
  const { slug } = await params
  const queryParams = await searchParams

  // Check if framework supports Workflow
  if (!supportsWorkflow(slug)) {
    notFound()
  }

  // Get framework configuration
  const config = getFrameworkWorkflowConfig(slug)

  if (!config) {
    notFound()
  }

  // Feature flag: Use database or mock data
  // Set WORKFLOW_USE_DATABASE=true in .env to use database
  // Otherwise falls back to mock data for development
  const useDatabase = process.env.WORKFLOW_USE_DATABASE === 'true'

  let workflowData = getMockWorkflowData(slug)

  if (useDatabase) {
    // Fetch from database
    const organizationId = queryParams.organizationId || process.env.DEFAULT_ORG_ID

    if (organizationId) {
      const dbData = await getWorkflowDataServer(slug, {
        organizationId,
        userId: queryParams.userId,
      })
      if (dbData && dbData.nodes && dbData.edges) {
        workflowData = dbData
      }
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">
          {config.frameworkName} Workflow
        </h1>
        <p className="text-muted-foreground">
          Visual process flow for {config.frameworkName} implementation
          {useDatabase && <span className="ml-2 text-xs text-green-600">(Database Mode)</span>}
          {!useDatabase && <span className="ml-2 text-xs text-amber-600">(Mock Data Mode)</span>}
        </p>
      </div>

      {/* Workflow Builder */}
      <div className="h-[calc(100vh-12rem)]">
        <WorkflowPageClient
          config={config}
          nodes={workflowData.nodes}
          edges={workflowData.edges}
        />
      </div>
    </div>
  )
}
