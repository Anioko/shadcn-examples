import { Metadata } from "next"
import { notFound } from "next/navigation"
import { SectionCards } from "./components/section-cards"
import { ChartAreaInteractive } from "./components/chart-area-interactive"
import { DataTable } from "./components/data-table"
import { getFrameworkDashboardConfig } from "@/lib/framework-config"
import { getMockFrameworkData } from "@/lib/mock-framework-data"

interface FrameworkDashboardPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({
  params,
}: FrameworkDashboardPageProps): Promise<Metadata> {
  const { slug } = await params
  const config = getFrameworkDashboardConfig(slug)

  if (!config) {
    return {
      title: "Framework Dashboard | ReqArchitect",
    }
  }

  return {
    title: `${config.frameworkName} Dashboard | ReqArchitect`,
    description: `Comprehensive dashboard for ${config.frameworkName} implementation tracking`,
  }
}

export default async function FrameworkDashboardPage({
  params,
}: FrameworkDashboardPageProps) {
  const { slug } = await params
  const config = getFrameworkDashboardConfig(slug)

  if (!config) {
    notFound()
  }

  // Generate mock data for all grandchildren
  const data = getMockFrameworkData(slug, config.grandchildren)

  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <SectionCards frameworkSlug={slug} grandchildren={config.grandchildren} data={data} />
        <div className="px-4 lg:px-6">
          <ChartAreaInteractive frameworkSlug={slug} grandchildren={config.grandchildren} data={data} />
        </div>
        <DataTable frameworkSlug={slug} grandchildren={config.grandchildren} data={data} />
      </div>
    </div>
  )
}
