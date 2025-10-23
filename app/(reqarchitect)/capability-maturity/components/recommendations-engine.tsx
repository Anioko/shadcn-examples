"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Lightbulb, Target, DollarSign, Clock, TrendingUp, Zap } from "lucide-react"

interface Recommendation {
  id: string
  type: 'tool' | 'process' | 'integration' | 'automation' | 'governance'
  capability: string
  title: string
  description: string
  impact: {
    maturityIncrease: number
    effort: string
    cost: string
    timeline: string
  }
  priority: 'high' | 'medium' | 'low'
  rationale: string
  actionSteps: string[]
  evidenceLinks: string[]
}

export function RecommendationsEngine() {
  const recommendations: Recommendation[] = [
    {
      id: "data-governance-tool",
      type: "tool",
      capability: "Data Management",
      title: "Implement Data Governance Platform",
      description: "Deploy Collibra or similar data governance tool to establish data lineage, quality monitoring, and compliance management",
      impact: {
        maturityIncrease: 2,
        effort: "Medium",
        cost: "$15K-25K/year",
        timeline: "6-8 weeks"
      },
      priority: "high",
      rationale: "Currently at Level 1 with manual processes. This would immediately move to Level 3 with standardized governance.",
      actionSteps: [
        "Evaluate data governance platforms",
        "Define data governance policies",
        "Implement data cataloging",
        "Establish data quality rules",
        "Train team on new processes"
      ],
      evidenceLinks: ["Data governance best practices", "Vendor comparison guide"]
    },
    {
      id: "bi-self-service",
      type: "process",
      capability: "Analytics & BI",
      title: "Enable Self-Service Analytics",
      description: "Establish self-service BI capabilities with Power BI or Tableau, including user training and governance",
      impact: {
        maturityIncrease: 1,
        effort: "Low",
        cost: "$5K-10K/year",
        timeline: "3-4 weeks"
      },
      priority: "medium",
      rationale: "Moving from Level 2 to Level 3 requires empowering business users with self-service capabilities.",
      actionSteps: [
        "Deploy self-service BI tool",
        "Create data models and dashboards",
        "Develop user training program",
        "Establish BI governance policies",
        "Monitor usage and adoption"
      ],
      evidenceLinks: ["Self-service BI implementation guide", "Training materials"]
    },
    {
      id: "security-automation",
      type: "automation",
      capability: "Security",
      title: "Automate Security Incident Response",
      description: "Implement SOAR (Security Orchestration, Automation & Response) to automate incident detection and response workflows",
      impact: {
        maturityIncrease: 1,
        effort: "High",
        cost: "$25K-50K/year",
        timeline: "8-12 weeks"
      },
      priority: "medium",
      rationale: "Current Level 3 can reach Level 4 with automated incident response and continuous monitoring.",
      actionSteps: [
        "Assess current security tools",
        "Select SOAR platform",
        "Design automation workflows",
        "Integrate with existing security stack",
        "Test and refine playbooks"
      ],
      evidenceLinks: ["SOAR platform comparison", "Security automation playbooks"]
    },
    {
      id: "product-analytics-integration",
      type: "integration",
      capability: "Product Management",
      title: "Integrate Product Analytics Pipeline",
      description: "Connect product analytics tools (Mixpanel, Amplitude) with customer data and business metrics for unified insights",
      impact: {
        maturityIncrease: 1,
        effort: "Medium",
        cost: "$10K-20K/year",
        timeline: "4-6 weeks"
      },
      priority: "low",
      rationale: "Level 3 to Level 4 transition requires quantitative product management with integrated analytics.",
      actionSteps: [
        "Audit current product analytics setup",
        "Design integrated data pipeline",
        "Implement data connections",
        "Create unified dashboards",
        "Establish KPI monitoring"
      ],
      evidenceLinks: ["Product analytics best practices", "Integration architecture guide"]
    }
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'tool': return <Target className="h-4 w-4" />
      case 'process': return <Lightbulb className="h-4 w-4" />
      case 'integration': return <Zap className="h-4 w-4" />
      case 'automation': return <TrendingUp className="h-4 w-4" />
      case 'governance': return <Clock className="h-4 w-4" />
      default: return <Lightbulb className="h-4 w-4" />
    }
  }

  const totalImpact = recommendations.reduce((sum, rec) => sum + rec.impact.maturityIncrease, 0)
  const highPriorityCount = recommendations.filter(rec => rec.priority === 'high').length

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Lightbulb className="h-5 w-5 text-yellow-500" />
          <span>AI-Powered Recommendations</span>
        </CardTitle>
        <CardDescription>
          Prioritized actions to improve capability maturity based on analysis of your current state
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Summary Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="text-center space-y-2">
            <div className="text-2xl font-bold text-blue-600">{recommendations.length}</div>
            <div className="text-sm text-muted-foreground">Total Recommendations</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-2xl font-bold text-green-600">+{totalImpact}</div>
            <div className="text-sm text-muted-foreground">Potential Maturity Gain</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-2xl font-bold text-red-600">{highPriorityCount}</div>
            <div className="text-sm text-muted-foreground">High Priority</div>
          </div>
        </div>

        {/* Recommendations List */}
        <div className="space-y-4">
          {recommendations.map((rec) => (
            <div key={rec.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      {getTypeIcon(rec.type)}
                      <Badge variant="outline">{rec.capability}</Badge>
                    </div>
                    <Badge className={getPriorityColor(rec.priority)}>
                      {rec.priority} priority
                    </Badge>
                  </div>
                  <h3 className="font-medium text-lg">{rec.title}</h3>
                  <p className="text-sm text-muted-foreground">{rec.description}</p>
                </div>
                <Button size="sm" variant="outline">
                  Start Implementation
                </Button>
              </div>

              {/* Impact Metrics */}
              <div className="grid gap-4 md:grid-cols-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <div className="text-sm">
                    <div className="font-medium">+{rec.impact.maturityIncrease} levels</div>
                    <div className="text-muted-foreground">Maturity boost</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-blue-500" />
                  <div className="text-sm">
                    <div className="font-medium">{rec.impact.timeline}</div>
                    <div className="text-muted-foreground">Implementation</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-yellow-500" />
                  <div className="text-sm">
                    <div className="font-medium">{rec.impact.cost}</div>
                    <div className="text-muted-foreground">Investment</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Target className="h-4 w-4 text-purple-500" />
                  <div className="text-sm">
                    <div className="font-medium">{rec.impact.effort}</div>
                    <div className="text-muted-foreground">Effort level</div>
                  </div>
                </div>
              </div>

              {/* Rationale */}
              <div className="space-y-2">
                <div className="text-sm font-medium">Why This Matters</div>
                <p className="text-sm text-muted-foreground">{rec.rationale}</p>
              </div>

              {/* Action Steps Preview */}
              <div className="space-y-2">
                <div className="text-sm font-medium">Implementation Steps</div>
                <div className="space-y-1">
                  {rec.actionSteps.slice(0, 3).map((step, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-sm">
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      <span>{step}</span>
                    </div>
                  ))}
                  {rec.actionSteps.length > 3 && (
                    <div className="text-xs text-muted-foreground">
                      +{rec.actionSteps.length - 3} more steps...
                    </div>
                  )}
                </div>
              </div>

              {/* Progress Indicator */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Implementation Progress</span>
                  <span>Not started</span>
                </div>
                <Progress value={0} />
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex space-x-4">
          <Button className="flex items-center space-x-2">
            <Target className="h-4 w-4" />
            <span>Generate Implementation Roadmap</span>
          </Button>
          <Button variant="outline">
            Export Recommendations
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}