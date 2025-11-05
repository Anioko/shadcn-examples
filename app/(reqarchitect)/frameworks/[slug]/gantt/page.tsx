import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getFrameworkGanttConfig, supportsGantt } from "@/lib/gantt-config"
import { getMockGanttTasks } from "@/lib/mock-gantt-data"
import { getGanttTasksServer } from "@/lib/gantt-helpers"
import { GanttPageClient } from "./gantt-page-client"

interface FrameworkGanttPageProps {
  params: Promise<{
    slug: string
  }>
  searchParams: Promise<{
    organizationId?: string
    userId?: string
    source?: 'task' | 'frameworkTask' | 'workflow' | 'all'
    sprintId?: string
    projectId?: string
  }>
}

export async function generateMetadata({
  params,
}: FrameworkGanttPageProps): Promise<Metadata> {
  const { slug } = await params
  const config = getFrameworkGanttConfig(slug)

  if (!config) {
    return {
      title: "Gantt Timeline | ReqArchitect",
    }
  }

  return {
    title: `${config.frameworkName} Gantt Timeline | ReqArchitect`,
    description: `Manage ${config.frameworkName} project timeline with visual Gantt chart`,
  }
}

export default async function FrameworkGanttPage({ params, searchParams }: FrameworkGanttPageProps) {
  const { slug } = await params
  const queryParams = await searchParams

  // Check if framework supports Gantt
  if (!supportsGantt(slug)) {
    notFound()
  }

  // Get framework configuration
  const config = getFrameworkGanttConfig(slug)

  if (!config) {
    notFound()
  }

  // Feature flag: Use database or mock data
  // Set GANTT_USE_DATABASE=true in .env to use database
  // Otherwise falls back to mock data for development
  const useDatabase = process.env.GANTT_USE_DATABASE === 'true'

  let tasks

  if (useDatabase) {
    // Fetch from database
    // TODO: Get organizationId from authenticated session
    // For now, use query params or fallback to mock data
    const organizationId = queryParams.organizationId || process.env.DEFAULT_ORG_ID

    if (organizationId) {
      tasks = await getGanttTasksServer(slug, {
        organizationId,
        userId: queryParams.userId,
        source: queryParams.source,
        sprintId: queryParams.sprintId,
        projectId: queryParams.projectId,
      })
    } else {
      // Fallback to mock data if no organizationId
      console.warn('No organizationId provided, falling back to mock data')
      tasks = getMockGanttTasks(slug)
    }
  } else {
    // Use mock data (default for development)
    tasks = getMockGanttTasks(slug)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">
          {config.frameworkName} Gantt Timeline
        </h1>
        <p className="text-muted-foreground">
          Visual project timeline for {config.frameworkName} implementation
          {useDatabase && <span className="ml-2 text-xs text-green-600">(Database Mode)</span>}
          {!useDatabase && <span className="ml-2 text-xs text-amber-600">(Mock Data Mode)</span>}
        </p>
      </div>

      {/* Gantt Timeline */}
      <GanttPageClient
        config={config}
        tasks={tasks}
      />
    </div>
  )
}
