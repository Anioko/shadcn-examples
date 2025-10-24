import { Metadata } from "next"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "../dashboard/components/app-sidebar"
import { SiteHeader } from "../dashboard/components/site-header"
import { FrameworksClient } from "./frameworks-client"

export const metadata: Metadata = {
  title: "Enterprise Frameworks | ReqArchitect",
  description: "Comprehensive support for enterprise frameworks across strategy, architecture, security, and project management",
}

function FrameworksPageContent() {
  return (
    <div className="container mx-auto py-6">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Enterprise Frameworks</h1>
          <p className="text-muted-foreground">
            Native support for 50+ industry-standard frameworks including SAFe, NIST, TOGAF, ISO 27001, and more. 
            Select and customize frameworks that align with your organizational maturity and industry requirements.
          </p>
        </div>
        <FrameworksClient />
      </div>
    </div>
  )
}

export default function FrameworksPage() {
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
          <FrameworksPageContent />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}