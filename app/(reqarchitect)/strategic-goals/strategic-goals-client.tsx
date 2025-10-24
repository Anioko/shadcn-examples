"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { GoalHierarchy } from "./components/goal-hierarchy"
import { OKRTracker } from "./components/okr-tracker"
import { PortfolioOverview } from "./components/portfolio-overview"
import { DependencyMapping } from "./components/dependency-mapping"
import { StrategicAlignment } from "./components/strategic-alignment"
import { GoalMetrics } from "./components/goal-metrics"

export function StrategicGoalsClient() {
  const goalStats = [
    {
      label: "Active Goals",
      value: "24",
      description: "Across all levels",
      trend: "+3 this quarter"
    },
    {
      label: "On Track",
      value: "18",
      description: "Goals meeting targets",
      trend: "75% success rate"
    },
    {
      label: "At Risk",
      value: "4",
      description: "Require attention",
      trend: "Down from 6 last month"
    },
    {
      label: "Alignment Score",
      value: "92%",
      description: "Strategic alignment",
      trend: "+5% this quarter"
    }
  ]

  return (
    <main className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Strategic Goals & OKRs</h1>
          <p className="text-muted-foreground">
            Manage strategic objectives, track key results, and ensure organizational alignment
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Import OKRs</Button>
          <Button>Create Goal</Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {goalStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
              <div className="text-xs text-green-600 mt-1">{stat.trend}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="hierarchy" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="hierarchy">Goal Hierarchy</TabsTrigger>
          <TabsTrigger value="okrs">OKR Tracker</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="dependencies">Dependencies</TabsTrigger>
          <TabsTrigger value="alignment">Alignment</TabsTrigger>
          <TabsTrigger value="metrics">Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="hierarchy" className="space-y-4">
          <GoalHierarchy />
        </TabsContent>

        <TabsContent value="okrs" className="space-y-4">
          <OKRTracker />
        </TabsContent>

        <TabsContent value="portfolio" className="space-y-4">
          <PortfolioOverview />
        </TabsContent>

        <TabsContent value="dependencies" className="space-y-4">
          <DependencyMapping />
        </TabsContent>

        <TabsContent value="alignment" className="space-y-4">
          <StrategicAlignment />
        </TabsContent>

        <TabsContent value="metrics" className="space-y-4">
          <GoalMetrics />
        </TabsContent>
      </Tabs>
    </main>
  )
}