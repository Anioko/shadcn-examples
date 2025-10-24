"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { 
  KPIDashboard,
  BenchmarkAnalysis, 
  AutomatedReporting,
  MetricsMonitoring,
  PerformanceInsights
} from "./components/performance-dashboard"

export default function PerformanceAnalyticsClient() {
  const [activeTab, setActiveTab] = useState("dashboard")

  return (
    <div className="flex h-screen bg-background">
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Performance & Analytics</h1>
                <p className="text-muted-foreground">
                  Comprehensive KPIs, benchmarks, and automated reporting for data-driven insights
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">Real-time</Badge>
                <Button>Export Report</Button>
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="dashboard">KPI Dashboard</TabsTrigger>
                <TabsTrigger value="benchmarks">Benchmarks</TabsTrigger>
                <TabsTrigger value="reporting">Reporting</TabsTrigger>
                <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
                <TabsTrigger value="insights">Insights</TabsTrigger>
              </TabsList>

              <TabsContent value="dashboard" className="space-y-6">
                <KPIDashboard />
              </TabsContent>

              <TabsContent value="benchmarks" className="space-y-6">
                <BenchmarkAnalysis />
              </TabsContent>

              <TabsContent value="reporting" className="space-y-6">
                <AutomatedReporting />
              </TabsContent>

              <TabsContent value="monitoring" className="space-y-6">
                <MetricsMonitoring />
              </TabsContent>

              <TabsContent value="insights" className="space-y-6">
                <PerformanceInsights />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}