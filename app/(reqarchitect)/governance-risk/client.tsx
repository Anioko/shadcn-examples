"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { 
  ComplianceFrameworks,
  RiskAssessment, 
  ControlsManagement,
  AuditManagement,
  PolicyGovernance
} from "./components/governance-dashboard"

export default function GovernanceRiskClient() {
  const [activeTab, setActiveTab] = useState("compliance")

  return (
    <div className="flex h-screen bg-background">
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Governance & Risk</h1>
                <p className="text-muted-foreground">
                  Comprehensive compliance frameworks, risk assessment, and controls management
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">SOC 2 Type II</Badge>
                <Badge variant="outline">ISO 27001</Badge>
                <Button>Risk Report</Button>
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="compliance">Compliance</TabsTrigger>
                <TabsTrigger value="risk">Risk Assessment</TabsTrigger>
                <TabsTrigger value="controls">Controls</TabsTrigger>
                <TabsTrigger value="audit">Audit</TabsTrigger>
                <TabsTrigger value="policy">Policy</TabsTrigger>
              </TabsList>

              <TabsContent value="compliance" className="space-y-6">
                <ComplianceFrameworks />
              </TabsContent>

              <TabsContent value="risk" className="space-y-6">
                <RiskAssessment />
              </TabsContent>

              <TabsContent value="controls" className="space-y-6">
                <ControlsManagement />
              </TabsContent>

              <TabsContent value="audit" className="space-y-6">
                <AuditManagement />
              </TabsContent>

              <TabsContent value="policy" className="space-y-6">
                <PolicyGovernance />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}