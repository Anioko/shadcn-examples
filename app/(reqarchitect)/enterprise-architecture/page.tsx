import { Metadata } from "next"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "../dashboard/components/app-sidebar"
import { SiteHeader } from "../dashboard/components/site-header"
import { EnterpriseArchitectureClient } from "./enterprise-architecture-client"

export const metadata: Metadata = {
  title: "Enterprise Architecture | ReqArchitect",
  description: "Comprehensive enterprise architecture planning and management",
}

function EnterpriseArchitecturePageContent() {
  return (
    <div className="container mx-auto py-6">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Enterprise Architecture</h1>
          <p className="text-muted-foreground">
            Design and manage your enterprise architecture with capability mapping, value streams, and service catalogs.
          </p>
        </div>
        <EnterpriseArchitectureClient />
      </div>
    </div>
  )
}

export default function EnterpriseArchitecturePage() {
  return (
    <SidebarProvider
      className="min-h-auto"
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 64)",
          "--header-height": "calc(var(--spacing) * 12 + 1px)"
        } as React.CSSProperties
      }>
      <AppSidebar variant="sidebar" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <EnterpriseArchitecturePageContent />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}