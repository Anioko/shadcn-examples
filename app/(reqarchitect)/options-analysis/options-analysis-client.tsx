"use client"

import { useState } from "react"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../dashboard/components/app-sidebar";
import { SiteHeader } from "../dashboard/components/site-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Scale, TrendingUp, DollarSign, Shield, Target, Brain, BarChart } from "lucide-react"

import { AnalysisOverview } from "./components/analysis-overview"
import { OptionComparison } from "./components/option-comparison"
import { CriteriaFramework } from "./components/criteria-framework"
import { FinancialModeling } from "./components/financial-modeling"
import { RiskAssessment } from "./components/risk-assessment"
import { SensitivityAnalysis } from "./components/sensitivity-analysis"
import { AIRecommendations } from "./components/ai-recommendations"

function OptionsAnalysisPageContent() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock analysis status data
  const analysisStatus = {
    optionsEvaluated: 4,
    criteriaConfigured: 5,
    financialModelingComplete: 85,
    riskAssessmentComplete: 92,
    sensitivityTestsRun: 15,
    aiConfidenceScore: 87,
    overallProgress: 89
  }

  const tabs = [
    {
      id: "overview",
      label: "Overview",
      icon: <Target className="h-4 w-4" />,
      component: <AnalysisOverview />
    },
    {
      id: "comparison",
      label: "Compare Options",
      icon: <Scale className="h-4 w-4" />,
      component: <OptionComparison />
    },
    {
      id: "criteria",
      label: "Criteria Framework",
      icon: <Target className="h-4 w-4" />,
      component: <CriteriaFramework />
    },
    {
      id: "financial",
      label: "Financial Modeling",
      icon: <DollarSign className="h-4 w-4" />,
      component: <FinancialModeling />
    },
    {
      id: "risk",
      label: "Risk Assessment",
      icon: <Shield className="h-4 w-4" />,
      component: <RiskAssessment />
    },
    {
      id: "sensitivity",
      label: "Sensitivity Analysis",
      icon: <BarChart className="h-4 w-4" />,
      component: <SensitivityAnalysis />
    },
    {
      id: "recommendations",
      label: "AI Recommendations",
      icon: <Brain className="h-4 w-4" />,
      component: <AIRecommendations />
    }
  ]

  return (
    <div className="container mx-auto p-4 lg:p-6">
      <div className="flex-1 space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Scale className="h-6 w-6 text-blue-600" />
          <h1 className="text-3xl font-bold">Options Analysis Interface</h1>
          <Badge variant="secondary">Enterprise Decision Support</Badge>
        </div>
        <p className="text-muted-foreground text-lg">
          Multi-criteria decision analysis tool for evaluating complex business decisions with AI-powered insights
        </p>
      </div>

      {/* Analysis Status Dashboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <span>Analysis Status</span>
          </CardTitle>
          <CardDescription>
            Current progress of your multi-criteria decision analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Overall Progress</span>
                <span className="text-sm font-medium">{analysisStatus.overallProgress}%</span>
              </div>
              <Progress value={analysisStatus.overallProgress} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Financial Modeling</span>
                <span className="text-sm font-medium">{analysisStatus.financialModelingComplete}%</span>
              </div>
              <Progress value={analysisStatus.financialModelingComplete} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Risk Assessment</span>
                <span className="text-sm font-medium">{analysisStatus.riskAssessmentComplete}%</span>
              </div>
              <Progress value={analysisStatus.riskAssessmentComplete} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">AI Confidence</span>
                <span className="text-sm font-medium">{analysisStatus.aiConfidenceScore}%</span>
              </div>
              <Progress value={analysisStatus.aiConfidenceScore} className="h-2" />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-4 mt-4 pt-4 border-t">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{analysisStatus.optionsEvaluated}</div>
              <div className="text-sm text-muted-foreground">Options Evaluated</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{analysisStatus.criteriaConfigured}</div>
              <div className="text-sm text-muted-foreground">Criteria Configured</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{analysisStatus.sensitivityTestsRun}</div>
              <div className="text-sm text-muted-foreground">Sensitivity Tests</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">87%</div>
              <div className="text-sm text-muted-foreground">Confidence Score</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Analysis Interface */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-7">
          {tabs.map((tab) => (
            <TabsTrigger 
              key={tab.id} 
              value={tab.id}
              className="flex items-center space-x-1 text-xs"
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((tab) => (
          <TabsContent key={tab.id} value={tab.id}>
            {tab.component}
          </TabsContent>
        ))}
      </Tabs>

      {/* Quick Insights Footer */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-1">
              <div className="text-sm font-medium text-blue-900">Current Leader</div>
              <div className="text-lg font-bold text-blue-700">Containerization + Kubernetes</div>
              <div className="text-sm text-blue-600">Score: 84.2/100</div>
            </div>
            <div className="space-y-1">
              <div className="text-sm font-medium text-purple-900">Key Risk Factor</div>
              <div className="text-lg font-bold text-purple-700">Team Skill Gaps</div>
              <div className="text-sm text-purple-600">65% skill gap identified</div>
            </div>
            <div className="space-y-1">
              <div className="text-sm font-medium text-green-900">Primary Opportunity</div>
              <div className="text-lg font-bold text-green-700">Cloud-Native Ecosystem</div>
              <div className="text-sm text-green-600">Strategic advantage potential</div>
            </div>
          </div>
        </CardContent>
      </Card>
      </div>
    </div>
  );
}

export function OptionsAnalysisClient() {
  return (
    <SidebarProvider
      className="min-h-auto"
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 64)",
          "--header-height": "calc(var(--spacing) * 12 + 1px)"
        } as React.CSSProperties
      }>
      <AppSidebar variant="sidebar" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <OptionsAnalysisPageContent />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}