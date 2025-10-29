import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "../../dashboard/components/app-sidebar"
import { SiteHeader } from "../../dashboard/components/site-header"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { getFrameworkKanbanConfig } from "@/lib/kanban-config"

export default async function FrameworkLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const config = getFrameworkKanbanConfig(slug)
  const frameworkName = config?.frameworkName || slug

  return (
    <SidebarProvider
      className="min-h-auto"
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 64)",
          "--header-height": "calc(var(--spacing) * 12 + 1px)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="sidebar" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="container mx-auto py-6">
            {/* Framework Navigation Tabs */}
            <div className="mb-6">
              <Tabs defaultValue="kanban" className="w-full">
                <TabsList className="grid w-full max-w-md grid-cols-4">
                  <TabsTrigger value="overview" asChild>
                    <Link href={`/frameworks/${slug}`}>Overview</Link>
                  </TabsTrigger>
                  <TabsTrigger value="kanban" asChild>
                    <Link href={`/frameworks/${slug}/kanban`}>Kanban</Link>
                  </TabsTrigger>
                  <TabsTrigger value="assessment" disabled>
                    Assessment
                  </TabsTrigger>
                  <TabsTrigger value="reports" disabled>
                    Reports
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Page Content */}
            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
