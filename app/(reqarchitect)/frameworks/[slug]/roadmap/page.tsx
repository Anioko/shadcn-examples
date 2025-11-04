import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getFrameworkRoadmapConfig, supportsRoadmap } from "@/lib/roadmap-config"
import { getMockRoadmapItems } from "@/lib/mock-roadmap-data"
import { getRoadmapItemsServer } from "@/lib/roadmap-helpers"
import { RoadmapClient } from "./roadmap-client"

interface FrameworkRoadmapPageProps {
  params: Promise<{
    slug: string
  }>
  searchParams: Promise<{
    organizationId?: string
    userId?: string
    projectId?: string
    status?: string
  }>
}

export async function generateMetadata({
  params,
}: FrameworkRoadmapPageProps): Promise<Metadata> {
  const { slug } = await params
  const config = getFrameworkRoadmapConfig(slug)

  if (!config) {
    return {
      title: "Roadmap | ReqArchitect",
    }
  }

  return {
    title: `${config.frameworkName} Roadmap | ReqArchitect`,
    description: `Strategic timeline and planning view for ${config.frameworkName} implementation`,
  }
}

export default async function FrameworkRoadmapPage({ params, searchParams }: FrameworkRoadmapPageProps) {
  const { slug } = await params
  const queryParams = await searchParams

  // Check if framework supports Roadmap
  if (!supportsRoadmap(slug)) {
    notFound()
  }

  // Get framework configuration
  const config = getFrameworkRoadmapConfig(slug)

  if (!config) {
    notFound()
  }

  // Feature flag: Use database or mock data
  // Set ROADMAP_USE_DATABASE=true in .env to use database
  // Otherwise falls back to mock data for development
  const useDatabase = process.env.ROADMAP_USE_DATABASE === 'true'

  let items

  if (useDatabase) {
    // Fetch from database
    const organizationId = queryParams.organizationId || process.env.DEFAULT_ORG_ID

    if (organizationId) {
      items = await getRoadmapItemsServer(slug, {
        organizationId,
        userId: queryParams.userId,
        projectId: queryParams.projectId,
        status: queryParams.status,
      })
    } else {
      // Fallback to mock data if no organizationId
      console.warn('No organizationId provided, falling back to mock data')
      items = getMockRoadmapItems(slug)
    }
  } else {
    // Use mock data (default for development)
    items = getMockRoadmapItems(slug)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">
          {config.frameworkName} Roadmap
        </h1>
        <p className="text-muted-foreground">
          Strategic timeline and planning view for {config.frameworkName} implementation
          {useDatabase && <span className="ml-2 text-xs text-green-600">(Database Mode)</span>}
          {!useDatabase && <span className="ml-2 text-xs text-amber-600">(Mock Data Mode)</span>}
        </p>
      </div>

      {/* Roadmap View */}
      <RoadmapClient
        config={config}
        items={items}
      />
    </div>
  )
}
