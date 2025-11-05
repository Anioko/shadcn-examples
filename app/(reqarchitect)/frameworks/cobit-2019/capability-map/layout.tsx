import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "../../../dashboard/components/app-sidebar"
import { SiteHeader } from "../../../dashboard/components/site-header"
import { getFrameworkDashboardConfig } from "@/lib/framework-config"
import { Toaster } from "@/components/ui/toaster"

export default function COBIT2019CapabilityMapLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const slug = 'cobit-2019'
  const dashboardConfig = getFrameworkDashboardConfig(slug)
  const frameworkName = dashboardConfig?.frameworkName || 'COBIT 2019'

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
          {children}
        </div>
      </SidebarInset>
      <Toaster />
    </SidebarProvider>
  )
}
