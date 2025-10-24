"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { 
  BusinessModelCanvas,
  ValuePropositionCanvas,
  LeanCanvas,
  BMCTemplateLibrary,
  BMCVersionHistory
} from "./components/business-model-components"

export default function BusinessModelClient() {
  const [activeTab, setActiveTab] = useState("canvas")

  return (
    <div className="flex h-screen bg-background">
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Business Model Canvas</h1>
                <p className="text-muted-foreground">
                  Interactive, AI-powered business model design and validation
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">Auto-save enabled</Badge>
                <Button variant="outline">AI Validate</Button>
                <Button>Export</Button>
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="canvas">Business Model Canvas</TabsTrigger>
                <TabsTrigger value="value-prop">Value Proposition</TabsTrigger>
                <TabsTrigger value="lean">Lean Canvas</TabsTrigger>
                <TabsTrigger value="templates">Templates</TabsTrigger>
                <TabsTrigger value="history">Version History</TabsTrigger>
              </TabsList>

              <TabsContent value="canvas" className="space-y-6">
                <BusinessModelCanvas />
              </TabsContent>

              <TabsContent value="value-prop" className="space-y-6">
                <ValuePropositionCanvas />
              </TabsContent>

              <TabsContent value="lean" className="space-y-6">
                <LeanCanvas />
              </TabsContent>

              <TabsContent value="templates" className="space-y-6">
                <BMCTemplateLibrary />
              </TabsContent>

              <TabsContent value="history" className="space-y-6">
                <BMCVersionHistory />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}