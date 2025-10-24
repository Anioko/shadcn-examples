import { Metadata } from "next"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "../dashboard/components/app-sidebar"
import { SiteHeader } from "../dashboard/components/site-header"
import { IntegrationsClient } from "./integrations-client"

export const metadata: Metadata = {
  title: "Integrations | ReqArchitect",
  description: "Enterprise integration management and API orchestration",
}

function IntegrationsPageContent() {
  return (
    <div className="container mx-auto py-6">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Integrations</h1>
          <p className="text-muted-foreground">
            Manage APIs, webhooks, data connectors, and integration workflows across your enterprise ecosystem.
          </p>
        </div>
        <IntegrationsClient />
      </div>
    </div>
  )
}

export default function IntegrationsPage() {
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
          <IntegrationsPageContent />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}