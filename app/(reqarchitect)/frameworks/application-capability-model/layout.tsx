import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "../../dashboard/components/app-sidebar"
import { SiteHeader } from "../../dashboard/components/site-header"
import { getFrameworkDashboardConfig } from "@/lib/framework-config"
import { Toaster } from "@/components/ui/toaster"

export default function ApplicationCapabilityModelLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const slug = 'application-capability-model'
  const dashboardConfig = getFrameworkDashboardConfig(slug)
  const frameworkName = dashboardConfig?.frameworkName || 'Application Capability Model'

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
        <SiteHeader
          title={`${frameworkName} Dashboard`}
          frameworkName={frameworkName}
          frameworkSlug={slug}
          grandchildren={dashboardConfig?.grandchildren}
        />
        <div className="flex flex-1 flex-col">
          <div className="container mx-auto py-6">
            {/* Page Content */}
            {children}
          </div>
        </div>
      </SidebarInset>
      <Toaster />
    </SidebarProvider>
  )
}
