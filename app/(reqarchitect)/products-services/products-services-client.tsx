"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { 
  ProductCatalog, 
  PricingModels, 
  ProductRoadmap, 
  FeatureRequests, 
  ProductAnalytics 
} from "./components/product-catalog"

export function ProductsServicesClient() {
  const productStats = [
    {
      label: "Active Products",
      value: "8",
      description: "In production",
      trend: "+2 this quarter"
    },
    {
      label: "Feature Requests",
      value: "124",
      description: "Customer requests",
      trend: "+18 this month"
    },
    {
      label: "Revenue Per Product",
      value: "$125K",
      description: "Average ARR",
      trend: "+15% growth"
    },
    {
      label: "Customer Adoption",
      value: "78%",
      description: "Feature utilization",
      trend: "Up 8% from last quarter"
    }
  ]

  return (
    <main className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products & Services</h1>
          <p className="text-muted-foreground">
            Manage product catalog, pricing models, features, and roadmap planning
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Import Products</Button>
          <Button>Create Product</Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {productStats.map((stat, index) => (
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
      <Tabs defaultValue="catalog" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="catalog">Product Catalog</TabsTrigger>
          <TabsTrigger value="pricing">Pricing Models</TabsTrigger>
          <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
          <TabsTrigger value="features">Feature Requests</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="catalog" className="space-y-4">
          <ProductCatalog />
        </TabsContent>

        <TabsContent value="pricing" className="space-y-4">
          <PricingModels />
        </TabsContent>

        <TabsContent value="roadmap" className="space-y-4">
          <ProductRoadmap />
        </TabsContent>

        <TabsContent value="features" className="space-y-4">
          <FeatureRequests />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <ProductAnalytics />
        </TabsContent>
      </Tabs>
    </main>
  )
}