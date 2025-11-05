import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getFrameworkDashboardConfig } from "@/lib/framework-config"
import { getMockFrameworkData } from "@/lib/mock-framework-data"
import { GrandchildDashboard } from "./components/grandchild-dashboard"

interface GrandchildPageProps {
  params: Promise<{
    slug: string
    grandchild: string
  }>
}

export async function generateMetadata({
  params,
}: GrandchildPageProps): Promise<Metadata> {
  const { slug, grandchild } = await params
  const config = getFrameworkDashboardConfig(slug)

  if (!config) {
    return {
      title: "Framework | ReqArchitect",
    }
  }

  // Find the grandchild
  const grandchildConfig = config.grandchildren.find(
    (gc) => gc.id === grandchild
  )

  if (!grandchildConfig) {
    return {
      title: `${config.frameworkName} | ReqArchitect`,
    }
  }

  return {
    title: `${grandchildConfig.name} - ${config.frameworkName} | ReqArchitect`,
    description: `Manage ${grandchildConfig.name.toLowerCase()} for ${config.frameworkName}`,
  }
}

export default async function GrandchildPage({
  params,
}: GrandchildPageProps) {
  const { slug, grandchild } = await params
  const config = getFrameworkDashboardConfig(slug)

  if (!config) {
    notFound()
  }

  // Find the grandchild configuration
  const grandchildConfig = config.grandchildren.find(
    (gc) => gc.id === grandchild
  )

  if (!grandchildConfig) {
    notFound()
  }

  // Generate mock data for ALL grandchildren, then filter
  const allData = getMockFrameworkData(slug, config.grandchildren)
  const filteredData = allData.filter(
    (item) => item.grandchildId === grandchild
  )

  return (
    <GrandchildDashboard
      frameworkSlug={slug}
      frameworkName={config.frameworkName}
      grandchild={grandchildConfig}
      data={filteredData}
    />
  )
}
