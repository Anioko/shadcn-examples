import { Metadata } from "next";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../dashboard/components/app-sidebar";
import { SiteHeader } from "../dashboard/components/site-header";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraphVisualization } from "./components/graph-visualization";
import { ImpactAnalysisPanel } from "./components/impact-analysis-panel";
import { RelationshipRecommendations } from "./components/relationship-recommendations";
import { CentralityMetrics } from "./components/centrality-metrics";
import { QueryBuilder } from "./components/query-builder";
import { GraphStats } from "./components/graph-stats";

export const metadata: Metadata = {
  title: "Context Graph & Relationship Intelligence",
  description: "Interactive graph visualization and analysis of entity relationships in your architecture",
};

function ContextGraphPageContent() {
  return (
    <div className="container mx-auto p-4 lg:p-6">
      <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-lg font-medium">Context Graph & Relationship Intelligence</h3>
        <p className="text-sm text-muted-foreground">
          Visualize and analyze relationships between all architecture entities. 
          Discover dependencies, assess impact, and get AI-powered relationship recommendations.
        </p>
      </div>
      <Separator />

      {/* Quick Stats */}
      <GraphStats />

      {/* Main Content */}
      <Tabs defaultValue="visualization" className="space-y-4">
        <TabsList>
          <TabsTrigger value="visualization">Graph Visualization</TabsTrigger>
          <TabsTrigger value="impact-analysis">Impact Analysis</TabsTrigger>
          <TabsTrigger value="recommendations">AI Recommendations</TabsTrigger>
          <TabsTrigger value="analytics">Graph Analytics</TabsTrigger>
          <TabsTrigger value="query">Query Builder</TabsTrigger>
        </TabsList>

        <TabsContent value="visualization" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Interactive Architecture Graph
                <Badge variant="secondary">198 Entities</Badge>
                <Badge variant="outline">457 Relationships</Badge>
              </CardTitle>
              <CardDescription>
                Interactive network visualization of your complete architecture. 
                Click nodes for details, drag to explore, and use filters to focus on specific areas.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <GraphVisualization />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="impact-analysis" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>What-If Impact Analysis</CardTitle>
                  <CardDescription>
                    Analyze the impact of proposed changes before implementation.
                    Select an entity and change type to see the ripple effects.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ImpactAnalysisPanel />
                </CardContent>
              </Card>
            </div>
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Impact Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Blast Radius</span>
                      <span className="text-sm font-medium">23 entities</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Critical Dependencies</span>
                      <span className="text-sm font-medium">7 entities</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Risk Level</span>
                      <Badge variant="destructive">High</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Estimated Effort</span>
                      <span className="text-sm font-medium">32 hours</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <RelationshipRecommendations />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <CentralityMetrics />
        </TabsContent>

        <TabsContent value="query" className="space-y-4">
          <QueryBuilder />
        </TabsContent>
      </Tabs>
      </div>
    </div>
  );
}

export default function ContextGraphPage() {
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
          <ContextGraphPageContent />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}