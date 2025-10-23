import { Metadata } from "next";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../dashboard/components/app-sidebar";
import { SiteHeader } from "../dashboard/components/site-header";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ConnectorMarketplace } from "./components/connector-marketplace";
import { ImportWizard } from "./components/import-wizard";
import { SyncMonitoring } from "./components/sync-monitoring";
import { IntegrationStats } from "./components/integration-stats";
import { ConnectionManager } from "./components/connection-manager";

export const metadata: Metadata = {
  title: "Enterprise Integrations & Data Import",
  description: "Comprehensive enterprise integration platform with 100+ pre-built connectors, automated import wizards, and real-time synchronization",
};

function EnterpriseIntegrationsPageContent() {
  return (
    <div className="container mx-auto p-4 lg:p-6">
      <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-lg font-medium">Enterprise Integrations & Data Import</h3>
        <p className="text-sm text-muted-foreground">
          Connect to existing enterprise systems, import data automatically, and keep your architecture repository synchronized in real-time.
        </p>
      </div>
      <Separator />

      {/* Integration Overview Stats */}
      <IntegrationStats />

      {/* Main Content */}
      <Tabs defaultValue="marketplace" className="space-y-4">
        <TabsList>
          <TabsTrigger value="marketplace">Connector Marketplace</TabsTrigger>
          <TabsTrigger value="connections">My Connections</TabsTrigger>
          <TabsTrigger value="import">Import Wizard</TabsTrigger>
          <TabsTrigger value="monitoring">Sync Monitoring</TabsTrigger>
        </TabsList>

        <TabsContent value="marketplace" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Pre-Built Connectors
                <Badge variant="secondary">100+ Available</Badge>
              </CardTitle>
              <CardDescription>
                Browse and install connectors for popular enterprise systems. 
                Get up and running in minutes with pre-configured integrations.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ConnectorMarketplace />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="connections" className="space-y-4">
          <ConnectionManager />
        </TabsContent>

        <TabsContent value="import" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Import Wizard</CardTitle>
              <CardDescription>
                Step-by-step guided import process with intelligent field mapping and data validation.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ImportWizard />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-4">
          <SyncMonitoring />
        </TabsContent>
      </Tabs>
      </div>
    </div>
  );
}

export default function EnterpriseIntegrationsPage() {
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
          <EnterpriseIntegrationsPageContent />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}