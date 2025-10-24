"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CodeTemplates } from "./components/code-templates"
import { GeneratorWorkflows } from "./components/generator-workflows"
import { GenerationHistory } from "./components/generation-history"
import { CodeQuality } from "./components/code-quality"
import { DocumentationGen } from "./components/documentation-gen"

export function CodeGenerationClient() {
  const codeGenStats = [
    {
      label: "Templates",
      value: "156",
      description: "Available templates",
      trend: "+12 this month"
    },
    {
      label: "Generated Files",
      value: "2,847",
      description: "Total generated",
      trend: "+342 this week"
    },
    {
      label: "Code Quality",
      value: "94%",
      description: "Quality score",
      trend: "Excellent rating"
    },
    {
      label: "Time Saved",
      value: "347h",
      description: "Development hours",
      trend: "+23% efficiency"
    }
  ]

  return (
    <main className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Code Generation</h1>
          <p className="text-muted-foreground">
            AI-powered code templates, generators, and automated documentation
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Import Templates</Button>
          <Button>New Generator</Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {codeGenStats.map((stat, index) => (
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
      <Tabs defaultValue="templates" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="workflows">Workflows</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="quality">Quality</TabsTrigger>
          <TabsTrigger value="docs">Documentation</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-4">
          <CodeTemplates />
        </TabsContent>

        <TabsContent value="workflows" className="space-y-4">
          <GeneratorWorkflows />
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <GenerationHistory />
        </TabsContent>

        <TabsContent value="quality" className="space-y-4">
          <CodeQuality />
        </TabsContent>

        <TabsContent value="docs" className="space-y-4">
          <DocumentationGen />
        </TabsContent>
      </Tabs>
    </main>
  )
}