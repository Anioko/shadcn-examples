import { Metadata } from "next"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "../dashboard/components/app-sidebar"
import { SiteHeader } from "../dashboard/components/site-header"
import { AiCapabilitiesClient } from "./ai-capabilities-client"

export const metadata: Metadata = {
  title: "AI-Powered Capabilities | ReqArchitect",
  description: "Intelligent guidance, automated modeling, and AI-driven insights",
}

function AiCapabilitiesPageContent() {
  return (
    <div className="container mx-auto py-6">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI-Powered Capabilities</h1>
          <p className="text-muted-foreground">
            Leverage artificial intelligence for intelligent guidance, automated financial modeling, risk monitoring, and predictive analytics.
          </p>
        </div>
        <AiCapabilitiesClient />
      </div>
    </div>
  )
}

export default function AiCapabilitiesPage() {
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
          <AiCapabilitiesPageContent />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}