"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function DocumentationGen() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Documentation Generation</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Automated API docs, architecture diagrams, and deployment guides</p>
      </CardContent>
    </Card>
  )
}