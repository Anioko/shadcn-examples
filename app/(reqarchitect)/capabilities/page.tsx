import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../dashboard/components/app-sidebar";
import { SiteHeader } from "../dashboard/components/site-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Plus } from "lucide-react";
import { CapabilitiesDataTable } from "./components/capabilities-data-table";

import capabilitiesData from "./capabilities-data.json";

function CapabilitiesPageContent() {
  return (
    <div className="container mx-auto p-4 lg:p-6">
      <div className="flex flex-col gap-4 md:gap-6">
        {/* Header section following exact admin-dashboard pattern */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Business Capabilities</h1>
          <p className="text-muted-foreground">
            Manage and monitor your organization&apos;s business capabilities and supporting applications
          </p>
        </div>

        {/* Stats cards section - using exact same structure as admin-dashboard SectionCards */}
        <div className="grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl:grid-cols-2 @5xl:grid-cols-4">
          <Card>
            <CardHeader>
              <CardDescription>Total Capabilities</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums">
                {capabilitiesData.length}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                Active business capabilities mapped
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Active Status</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums">
                {capabilitiesData.filter(c => c.status === 'Active').length}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                Capabilities in active use
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Average Health Score</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums">
                {Math.round(capabilitiesData.reduce((acc, c) => acc + c.healthScore, 0) / capabilitiesData.length)}%
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                Overall capability health
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Supporting Applications</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums">
                23
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                Total applications mapped
              </div>
            </CardContent>
          </Card>
        </div>

        {/* DataTable section - using exact admin-dashboard pattern with drawer functionality */}
        <CapabilitiesDataTable data={capabilitiesData} />
      </div>
    </div>
  );
}

function CapabilitiesContent() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
          <CapabilitiesPageContent />
        </div>
      </div>
    </div>
  );
}

export default function Page() {
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
        <SiteHeader 
          title="Business Capabilities" 
          buttonText="Add Capability"
          buttonIcon={<Plus />}
        />
        <CapabilitiesContent />
      </SidebarInset>
    </SidebarProvider>
  );
}