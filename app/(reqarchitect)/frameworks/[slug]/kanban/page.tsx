import { Metadata } from "next"
import { notFound } from "next/navigation"
import { KanbanBoardNew } from "@/components/kanban/kanban-board-new"
import { getFrameworkKanbanConfig, supportsKanban } from "@/lib/kanban-config"
import { getMockKanbanCards } from "@/lib/mock-kanban-data"
import { getKanbanCardsServer } from "@/lib/kanban-helpers"

interface FrameworkKanbanPageProps {
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
}: FrameworkKanbanPageProps): Promise<Metadata> {
  const { slug } = await params
  const config = getFrameworkKanbanConfig(slug)

  if (!config) {
    return {
      title: "Kanban Board | ReqArchitect",
    }
  }

  return {
    title: `${config.frameworkName} Kanban Board | ReqArchitect`,
    description: `Manage ${config.frameworkName} work items with visual Kanban board`,
  }
}

export default async function FrameworkKanbanPage({ params, searchParams }: FrameworkKanbanPageProps) {
  const { slug } = await params
  const queryParams = await searchParams

  // Check if framework supports Kanban
  if (!supportsKanban(slug)) {
    notFound()
  }

  // Get framework configuration
  const config = getFrameworkKanbanConfig(slug)

  if (!config) {
    notFound()
  }

  // Feature flag: Use database or mock data
  // Set KANBAN_USE_DATABASE=true in .env to use database
  // Otherwise falls back to mock data for development
  const useDatabase = process.env.KANBAN_USE_DATABASE === 'true'

  let cards

  if (useDatabase) {
    // Fetch from database
    // TODO: Get organizationId from authenticated session
    // For now, use query params or fallback to mock data
    const organizationId = queryParams.organizationId || process.env.DEFAULT_ORG_ID

    if (organizationId) {
      cards = await getKanbanCardsServer(slug, {
        organizationId,
        userId: queryParams.userId,
        source: queryParams.source,
        sprintId: queryParams.sprintId,
        projectId: queryParams.projectId,
      })
    } else {
      // Fallback to mock data if no organizationId
      console.warn('No organizationId provided, falling back to mock data')
      cards = getMockKanbanCards(slug)
    }
  } else {
    // Use mock data (default for development)
    cards = getMockKanbanCards(slug)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">
          {config.frameworkName} Kanban Board
        </h1>
        <p className="text-muted-foreground">
          Visual workflow management for {config.frameworkName} implementation
          {useDatabase && <span className="ml-2 text-xs text-green-600">(Database Mode)</span>}
          {!useDatabase && <span className="ml-2 text-xs text-amber-600">(Mock Data Mode)</span>}
        </p>
      </div>

      {/* Kanban Board */}
      <KanbanBoardNew
        config={config}
        initialCards={cards}
      />
    </div>
  )
}
