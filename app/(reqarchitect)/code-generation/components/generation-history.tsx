"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function GenerationHistory() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Generation History</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Audit trail of all code generation activities with rollback capabilities</p>
      </CardContent>
    </Card>
  )
}