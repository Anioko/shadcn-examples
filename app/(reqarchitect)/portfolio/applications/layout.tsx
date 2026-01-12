import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "../../dashboard/components/app-sidebar"
import { SiteHeader } from "../../dashboard/components/site-header"
import { Toaster } from "@/components/ui/toaster"

export default function ApplicationInventoryLayout({
  children,
}: {
  children: React.ReactNode
}) {
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
          title="Application Inventory Dashboard"
          frameworkName="Application Inventory"
          frameworkSlug="applications"
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
