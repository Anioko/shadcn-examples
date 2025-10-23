import { Metadata } from "next";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../dashboard/components/app-sidebar";
import { SiteHeader } from "../dashboard/components/site-header";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ConnectorArchitecture } from "./components/connector-architecture";
import { UniversalInterface } from "./components/universal-interface";
import { FieldMapping } from "./components/field-mapping";
import { ImportPipeline } from "./components/import-pipeline";
import { PerformanceMetrics } from "./components/performance-metrics";

export const metadata: Metadata = {
  title: "Universal Connector Interface - 100+ Pre-Built Integrations",
  description: "Plug-and-play integration hub with unified interface, AI-powered field mapping, and 5-minute time to first import",
};

function UniversalConnectorPageContent() {
  return (
    <div className="container mx-auto p-4 lg:p-6">
      <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-lg font-medium">Universal Connector Interface</h3>
        <p className="text-sm text-muted-foreground">
          100+ pre-built connectors with unified interface, AI-powered field mapping, and enterprise-grade reliability.
        </p>
      </div>
      <Separator />

      {/* Performance Overview */}
      <PerformanceMetrics />

      {/* Main Content */}
      <Tabs defaultValue="architecture" className="space-y-4">
        <TabsList>
          <TabsTrigger value="architecture">Architecture</TabsTrigger>
          <TabsTrigger value="interface">Universal Interface</TabsTrigger>
          <TabsTrigger value="mapping">AI Field Mapping</TabsTrigger>
          <TabsTrigger value="pipeline">Import Pipeline</TabsTrigger>
        </TabsList>

        <TabsContent value="architecture" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Connector Architecture
                <Badge variant="secondary">100+ Connectors</Badge>
              </CardTitle>
              <CardDescription>
                Unified architecture supporting P0 (20), P1 (40), and P2 (40) connectors with 
                standardized interfaces and enterprise-grade reliability.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ConnectorArchitecture />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="interface" className="space-y-4">
          <UniversalInterface />
        </TabsContent>

        <TabsContent value="mapping" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI-Powered Field Mapping</CardTitle>
              <CardDescription>
                Intelligent field mapping with 95%+ accuracy, automated transformations, 
                and validation rules across all connector types.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FieldMapping />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pipeline" className="space-y-4">
          <ImportPipeline />
        </TabsContent>
      </Tabs>
      </div>
    </div>
  );
}

export default function UniversalConnectorPage() {
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
          <UniversalConnectorPageContent />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}