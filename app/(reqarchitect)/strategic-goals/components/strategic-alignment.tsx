"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Target, TrendingUp, AlertTriangle, CheckCircle, XCircle, Eye } from "lucide-react"

interface StrategicGoal {
  id: string
  name: string
  category: "revenue" | "product" | "operations" | "market" | "team"
  priority: "critical" | "high" | "medium" | "low"
  alignment: {
    bmcValue: string[]
    capabilities: string[]
    initiatives: string[]
  }
  progress: number
  status: "on-track" | "at-risk" | "behind" | "achieved"
  misalignments: Misalignment[]
  recommendations: Recommendation[]
}

interface Misalignment {
  id: string
  type: "initiative-goal" | "capability-goal" | "resource-goal" | "timeline-goal"
  severity: "high" | "medium" | "low"
  description: string
  impact: string
  suggestedActions: string[]
}

interface Recommendation {
  id: string
  type: "realign" | "prioritize" | "resource" | "timeline"
  title: string
  description: string
  impact: "high" | "medium" | "low"
  effort: "low" | "medium" | "high"
  timeline: string
}

export function StrategicAlignment() {
  const strategicGoals: StrategicGoal[] = [
    {
      id: "goal-1",
      name: "Achieve Market Leadership in SMB Segment",
      category: "market",
      priority: "critical",
      alignment: {
        bmcValue: ["AI-Powered Guidance", "Unified Platform"],
        capabilities: ["Product Analytics", "Customer Success", "Marketing Automation"],
        initiatives: ["AI Platform Development", "Customer Success Platform", "Marketing Campaign"]
      },
      progress: 65,
      status: "on-track",
      misalignments: [
        {
          id: "mis-1",
          type: "resource-goal",
          severity: "medium",
          description: "Marketing team capacity insufficient for aggressive growth targets",
          impact: "May delay customer acquisition by 2-3 months",
          suggestedActions: [
            "Hire 2 additional marketing specialists",
            "Increase marketing automation investment",
            "Partner with growth marketing agency"
          ]
        }
      ],
      recommendations: [
        {
          id: "rec-1",
          type: "resource",
          title: "Accelerate Marketing Hiring",
          description: "Fast-track hiring of marketing specialists to support growth targets",
          impact: "high",
          effort: "medium",
          timeline: "4-6 weeks"
        },
        {
          id: "rec-2",
          type: "prioritize",
          title: "Focus on High-Value Customer Segments",
          description: "Prioritize enterprise customers with higher LTV to maximize impact",
          impact: "high",
          effort: "low",
          timeline: "2 weeks"
        }
      ]
    },
    {
      id: "goal-2",
      name: "Build Sustainable Revenue Model",
      category: "revenue",
      priority: "critical",
      alignment: {
        bmcValue: ["Subscription Model", "Enterprise Features"],
        capabilities: ["Billing System", "Customer Support", "Product Features"],
        initiatives: ["Enterprise Platform", "Billing Upgrade", "Customer Success"]
      },
      progress: 45,
      status: "at-risk",
      misalignments: [
        {
          id: "mis-2",
          type: "capability-goal",
          severity: "high",
          description: "Advanced billing capability not mature enough for enterprise pricing",
          impact: "Cannot close enterprise deals, limiting revenue growth",
          suggestedActions: [
            "Accelerate billing system upgrade",
            "Implement interim manual billing for enterprise",
            "Partner with billing solution provider"
          ]
        },
        {
          id: "mis-3",
          type: "timeline-goal",
          severity: "medium",
          description: "Enterprise features timeline misaligned with sales pipeline",
          impact: "Risk of losing 3-4 major prospects in pipeline",
          suggestedActions: [
            "Reprioritize enterprise features",
            "Extend sales cycles to match development",
            "Offer early access program"
          ]
        }
      ],
      recommendations: [
        {
          id: "rec-3",
          type: "realign",
          title: "Accelerate Billing System Upgrade",
          description: "Make billing system upgrade the top engineering priority",
          impact: "high",
          effort: "high",
          timeline: "8-10 weeks"
        },
        {
          id: "rec-4",
          type: "timeline",
          title: "Phased Enterprise Release",
          description: "Release enterprise features in phases to accelerate time-to-market",
          impact: "medium",
          effort: "medium",
          timeline: "6 weeks"
        }
      ]
    },
    {
      id: "goal-3",
      name: "Scale Team and Operations",
      category: "team",
      priority: "high",
      alignment: {
        bmcValue: ["Scalable Operations"],
        capabilities: ["HR Systems", "Process Management", "Knowledge Management"],
        initiatives: ["HR Platform", "Process Documentation", "Team Expansion"]
      },
      progress: 30,
      status: "behind",
      misalignments: [
        {
          id: "mis-4",
          type: "initiative-goal",
          severity: "high",
          description: "HR platform initiative on hold while team growth accelerating",
          impact: "Manual processes causing bottlenecks in hiring and onboarding",
          suggestedActions: [
            "Resume HR platform initiative",
            "Implement interim HR tools",
            "Outsource HR operations"
          ]
        }
      ],
      recommendations: [
        {
          id: "rec-5",
          type: "prioritize",
          title: "Resume HR Platform Initiative",
          description: "Unblock HR platform initiative to support team scaling",
          impact: "high",
          effort: "medium",
          timeline: "3-4 weeks"
        }
      ]
    },
    {
      id: "goal-4",
      name: "Enhance Product Innovation",
      category: "product",
      priority: "medium",
      alignment: {
        bmcValue: ["AI-Powered Features", "User Experience"],
        capabilities: ["Product Development", "User Research", "AI/ML"],
        initiatives: ["AI Feature Development", "UX Research", "Product Analytics"]
      },
      progress: 70,
      status: "on-track",
      misalignments: [],
      recommendations: [
        {
          id: "rec-6",
          type: "realign",
          title: "Integrate User Feedback Loop",
          description: "Establish systematic user feedback collection and analysis",
          impact: "medium",
          effort: "low",
          timeline: "2-3 weeks"
        }
      ]
    }
  ]

  const getStatusIcon = (status: StrategicGoal['status']) => {
    switch (status) {
      case 'on-track': return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'at-risk': return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case 'behind': return <XCircle className="h-4 w-4 text-red-500" />
      case 'achieved': return <Target className="h-4 w-4 text-blue-500" />
      default: return <Target className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusVariant = (status: StrategicGoal['status']) => {
    switch (status) {
      case 'on-track': return 'default'
      case 'at-risk': return 'secondary'
      case 'behind': return 'destructive'
      case 'achieved': return 'default'
      default: return 'outline'
    }
  }

  const getSeverityVariant = (severity: Misalignment['severity']) => {
    switch (severity) {
      case 'high': return 'destructive'
      case 'medium': return 'secondary'
      case 'low': return 'outline'
      default: return 'outline'
    }
  }

  const getImpactColor = (impact: Recommendation['impact']) => {
    switch (impact) {
      case 'high': return 'text-green-600'
      case 'medium': return 'text-yellow-600'
      case 'low': return 'text-gray-600'
      default: return 'text-gray-600'
    }
  }

  const getEffortColor = (effort: Recommendation['effort']) => {
    switch (effort) {
      case 'low': return 'text-green-600'
      case 'medium': return 'text-yellow-600'
      case 'high': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const alignmentStats = {
    totalGoals: strategicGoals.length,
    onTrack: strategicGoals.filter(g => g.status === 'on-track').length,
    atRisk: strategicGoals.filter(g => g.status === 'at-risk').length,
    behind: strategicGoals.filter(g => g.status === 'behind').length,
    totalMisalignments: strategicGoals.reduce((sum, g) => sum + g.misalignments.length, 0),
    highSeverity: strategicGoals.reduce((sum, g) => sum + g.misalignments.filter(m => m.severity === 'high').length, 0),
    avgAlignment: Math.round(strategicGoals.reduce((sum, g) => sum + g.progress, 0) / strategicGoals.length)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Strategic Alignment</h2>
          <p className="text-sm text-muted-foreground">
            Monitor alignment between strategic goals, initiatives, and capabilities
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Alignment Report</Button>
          <Button>Run Analysis</Button>
        </div>
      </div>

      {/* Alignment Overview */}
      <div className="grid gap-4 md:grid-cols-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Goals</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{alignmentStats.totalGoals}</div>
            <p className="text-xs text-muted-foreground">Strategic goals</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On Track</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{alignmentStats.onTrack}</div>
            <p className="text-xs text-muted-foreground">Well aligned</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">At Risk</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{alignmentStats.atRisk}</div>
            <p className="text-xs text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Behind</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{alignmentStats.behind}</div>
            <p className="text-xs text-muted-foreground">Misaligned</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Issues</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{alignmentStats.totalMisalignments}</div>
            <p className="text-xs text-muted-foreground">{alignmentStats.highSeverity} high severity</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{alignmentStats.avgAlignment}%</div>
            <p className="text-xs text-muted-foreground">Alignment score</p>
          </CardContent>
        </Card>
      </div>

      {/* Strategic Goals with Alignment Analysis */}
      <div className="space-y-4">
        {strategicGoals.map((goal) => (
          <Card key={goal.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  {getStatusIcon(goal.status)}
                  <div>
                    <CardTitle className="text-lg">{goal.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="text-xs">
                        {goal.category.toUpperCase()}
                      </Badge>
                      <Badge variant={goal.priority === 'critical' ? 'destructive' : 'secondary'}>
                        {goal.priority.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </div>
                <Badge variant={getStatusVariant(goal.status)}>
                  {goal.status.replace('-', ' ').toUpperCase()}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Progress */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Strategic Progress</span>
                  <span className="font-medium">{goal.progress}%</span>
                </div>
                <Progress value={goal.progress} className="h-2" />
              </div>

              {/* Alignment Details */}
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <div className="text-sm font-medium mb-2">Business Model Alignment</div>
                  <div className="flex flex-wrap gap-1">
                    {goal.alignment.bmcValue.map((value, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {value}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium mb-2">Supporting Capabilities</div>
                  <div className="flex flex-wrap gap-1">
                    {goal.alignment.capabilities.map((capability, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {capability}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium mb-2">Active Initiatives</div>
                  <div className="flex flex-wrap gap-1">
                    {goal.alignment.initiatives.map((initiative, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {initiative}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Misalignments */}
              {goal.misalignments.length > 0 && (
                <div className="space-y-3">
                  <div className="text-sm font-medium text-red-600">Alignment Issues</div>
                  {goal.misalignments.map((misalignment) => (
                    <div key={misalignment.id} className="border border-red-200 rounded-lg p-3 bg-red-50">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4 text-red-500" />
                            <span className="text-sm font-medium">{misalignment.type.replace('-', ' ')}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{misalignment.description}</p>
                        </div>
                        <Badge variant={getSeverityVariant(misalignment.severity)}>
                          {misalignment.severity.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="text-sm">
                        <div className="font-medium mb-1">Impact:</div>
                        <p className="text-muted-foreground mb-2">{misalignment.impact}</p>
                        <div className="font-medium mb-1">Suggested Actions:</div>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                          {misalignment.suggestedActions.map((action, index) => (
                            <li key={index}>{action}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Recommendations */}
              {goal.recommendations.length > 0 && (
                <div className="space-y-3">
                  <div className="text-sm font-medium">AI Recommendations</div>
                  {goal.recommendations.map((recommendation) => (
                    <div key={recommendation.id} className="border rounded-lg p-3 bg-blue-50">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="text-sm font-medium">{recommendation.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{recommendation.description}</p>
                        </div>
                        <Badge variant="outline">{recommendation.type.toUpperCase()}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-xs">
                        <span className={`font-medium ${getImpactColor(recommendation.impact)}`}>
                          Impact: {recommendation.impact.toUpperCase()}
                        </span>
                        <span className={`font-medium ${getEffortColor(recommendation.effort)}`}>
                          Effort: {recommendation.effort.toUpperCase()}
                        </span>
                        <span className="text-muted-foreground">
                          Timeline: {recommendation.timeline}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-1" />
                  View Details
                </Button>
                <Button variant="outline" size="sm">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  Alignment Report
                </Button>
                {goal.misalignments.length > 0 && (
                  <Button variant="outline" size="sm">
                    <AlertTriangle className="h-4 w-4 mr-1" />
                    Resolve Issues
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}