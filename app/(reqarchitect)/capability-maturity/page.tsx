import { Metadata } from "next"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../dashboard/components/app-sidebar";
import { SiteHeader } from "../dashboard/components/site-header";

import { MaturityDashboard } from "./components/maturity-dashboard"
import { AssessmentWizard } from "./components/assessment-wizard"
import { MaturityTrends } from "./components/maturity-trends"
import { RecommendationsEngine } from "./components/recommendations-engine"
import { BenchmarkComparison } from "./components/benchmark-comparison"
import { MaturityRoadmap } from "./components/maturity-roadmap"

export const metadata: Metadata = {
  title: "Capability Maturity Assessment Interface",
  description: "AI-powered maturity scoring system with automated assessments, recommendations, and benchmarking for organizational capabilities.",
}

function CapabilityMaturityPageContent() {
  return (
    <div className="container mx-auto p-4 lg:p-6">
      <div className="flex-1 space-y-8">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Capability Maturity Assessment</h2>
          <p className="text-muted-foreground">
            AI-powered maturity scoring system with continuous monitoring and actionable recommendations
          </p>
        </div>
      </div>

      <div className="grid gap-6">
        {/* Main Dashboard */}
        <MaturityDashboard />

        <div className="grid gap-6 md:grid-cols-2">
          {/* Assessment Wizard */}
          <AssessmentWizard />
          
          {/* Trends Analysis */}
          <MaturityTrends />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* AI Recommendations */}
          <RecommendationsEngine />
          
          {/* Benchmark Comparison */}
          <BenchmarkComparison />
        </div>

        {/* Strategic Roadmap */}
        <MaturityRoadmap />
      </div>
      </div>
    </div>
  );
}

export default function CapabilityMaturityPage() {
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
          <CapabilityMaturityPageContent />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}