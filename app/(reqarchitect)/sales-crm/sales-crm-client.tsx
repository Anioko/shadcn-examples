"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { 
  ContactsCompanies,
  SalesPipeline,
  OpportunityManagement,
  ActivityTracking,
  SalesAnalytics
} from "./components/sales-pipeline"

export function SalesCrmClient() {
  const salesStats = [
    {
      label: "Pipeline Value",
      value: "$2.4M",
      description: "Total opportunities",
      trend: "+18% from last month"
    },
    {
      label: "Win Rate",
      value: "34%",
      description: "Closed won ratio",
      trend: "+5% improvement"
    },
    {
      label: "Active Contacts",
      value: "1,247",
      description: "Qualified contacts",
      trend: "+89 this month"
    },
    {
      label: "Avg Deal Size",
      value: "$28K",
      description: "Average contract value",
      trend: "+12% vs last quarter"
    }
  ]

  return (
    <main className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sales & CRM</h1>
          <p className="text-muted-foreground">
            Customer relationship management, sales pipeline, and revenue tracking
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Import Contacts</Button>
          <Button>Create Opportunity</Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {salesStats.map((stat, index) => (
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
      <Tabs defaultValue="pipeline" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="pipeline">Sales Pipeline</TabsTrigger>
          <TabsTrigger value="contacts">Contacts</TabsTrigger>
          <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="pipeline" className="space-y-4">
          <SalesPipeline />
        </TabsContent>

        <TabsContent value="contacts" className="space-y-4">
          <ContactsCompanies />
        </TabsContent>

        <TabsContent value="opportunities" className="space-y-4">
          <OpportunityManagement />
        </TabsContent>

        <TabsContent value="activities" className="space-y-4">
          <ActivityTracking />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <SalesAnalytics />
        </TabsContent>
      </Tabs>
    </main>
  )
}