import { Metadata } from "next"
import { notFound } from "next/navigation"
import { SectionCards } from "@/app/(reqarchitect)/frameworks/[slug]/dashboard/components/section-cards"
import { ChartAreaInteractive } from "@/app/(reqarchitect)/frameworks/[slug]/dashboard/components/chart-area-interactive"
import { DataTable } from "@/app/(reqarchitect)/frameworks/[slug]/dashboard/components/data-table"
import { getFrameworkDashboardConfig } from "@/lib/framework-config"
import { getMockFrameworkData } from "@/lib/mock-framework-data"

interface CustomerDashboardPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({
  params,
}: CustomerDashboardPageProps): Promise<Metadata> {
  const { slug } = await params
  const config = getFrameworkDashboardConfig(slug)

  if (!config) {
    return {
      title: "Customer Dashboard | ReqArchitect",
    }
  }

  return {
    title: `${config.frameworkName} Dashboard | ReqArchitect`,
    description: `Comprehensive dashboard for ${config.frameworkName} implementation tracking`,
  }
}

export default async function CustomerDashboardPage({
  params,
}: CustomerDashboardPageProps) {
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
