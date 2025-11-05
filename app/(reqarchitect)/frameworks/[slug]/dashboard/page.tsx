import { Metadata } from "next"
import { notFound } from "next/navigation"
import { DataTableWrapper } from "./components/data-table-wrapper"
import { getFrameworkDashboardConfig } from "@/lib/framework-config"

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

  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <DataTableWrapper frameworkSlug={slug} grandchildren={config.grandchildren} />
      </div>
    </div>
  )
}
