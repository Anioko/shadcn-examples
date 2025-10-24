"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function GeneratorWorkflows() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Generator Workflows</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Visual workflow designer for automated code generation pipelines</p>
      </CardContent>
    </Card>
  )
}