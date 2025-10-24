import { Metadata } from "next"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "../dashboard/components/app-sidebar"
import { SiteHeader } from "../dashboard/components/site-header"
import { ControlsPoliciesClient } from "./controls-policies-client"

export const metadata: Metadata = {
  title: "Controls & Policies | ReqArchitect",
  description: "Risk assessment, compliance tracking, and governance management",
}

function ControlsPoliciesPageContent() {
  return (
    <div className="container mx-auto py-6">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Controls & Policies</h1>
          <p className="text-muted-foreground">
            Manage risk assessments, compliance frameworks, policy governance, and audit trails across your organization.
          </p>
        </div>
        <ControlsPoliciesClient />
      </div>
    </div>
  )
}

export default function ControlsPoliciesPage() {
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
          <ControlsPoliciesPageContent />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}