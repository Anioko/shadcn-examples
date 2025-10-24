"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Briefcase, DollarSign, Users, Clock, TrendingUp, AlertTriangle } from "lucide-react"

interface Initiative {
  id: string
  name: string
  description: string
  type: "strategic" | "operational" | "compliance" | "innovation"
  status: "planning" | "in-progress" | "on-hold" | "completed" | "cancelled"
  priority: "critical" | "high" | "medium" | "low"
  progress: number
  budget: {
    allocated: number
    spent: number
    remaining: number
  }
  timeline: {
    startDate: string
    endDate: string
    actualStart?: string
    projectedEnd?: string
  }
  resources: {
    teamMembers: number
    allocatedFTE: number
    utilization: number
  }
  strategicAlignment: {
    goals: string[]
    businessValue: number
    riskLevel: "low" | "medium" | "high"
  }
  outcomes: {
    delivered: string[]
    pending: string[]
    risks: string[]
  }
}

export function PortfolioOverview() {
  const initiatives: Initiative[] = [
    {
      id: "init-1",
      name: "AI-Powered Capability Assessment",
      description: "Develop automated capability maturity assessment using machine learning",
      type: "strategic",
      status: "in-progress",
      priority: "critical",
      progress: 65,
      budget: {
        allocated: 250000,
        spent: 162500,
        remaining: 87500
      },
      timeline: {
        startDate: "2025-08-01",
        endDate: "2025-12-31",
        actualStart: "2025-08-15",
        projectedEnd: "2025-12-31"
      },
      resources: {
        teamMembers: 8,
        allocatedFTE: 6.5,
        utilization: 85
      },
      strategicAlignment: {
        goals: ["Market Leadership", "Product Innovation"],
        businessValue: 92,
        riskLevel: "medium"
      },
      outcomes: {
        delivered: ["ML model training pipeline", "Assessment UI components"],
        pending: ["Model accuracy optimization", "Integration testing"],
        risks: ["Data quality concerns", "Model interpretability"]
      }
    },
    {
      id: "init-2",
      name: "Enterprise Integration Platform",
      description: "Build comprehensive integration platform for enterprise customers",
      type: "strategic",
      status: "in-progress",
      priority: "high",
      progress: 40,
      budget: {
        allocated: 400000,
        spent: 120000,
        remaining: 280000
      },
      timeline: {
        startDate: "2025-09-01",
        endDate: "2026-03-31",
        actualStart: "2025-09-01",
        projectedEnd: "2026-04-15"
      },
      resources: {
        teamMembers: 12,
        allocatedFTE: 10.0,
        utilization: 90
      },
      strategicAlignment: {
        goals: ["Revenue Growth", "Enterprise Market"],
        businessValue: 95,
        riskLevel: "high"
      },
      outcomes: {
        delivered: ["Architecture design", "Core connector framework"],
        pending: ["SAP integration", "Salesforce connector", "Security audit"],
        risks: ["Third-party API limitations", "Security certification delays"]
      }
    },
    {
      id: "init-3",
      name: "Customer Success Platform",
      description: "Implement proactive customer success and retention platform",
      type: "operational",
      status: "planning",
      priority: "high",
      progress: 10,
      budget: {
        allocated: 150000,
        spent: 15000,
        remaining: 135000
      },
      timeline: {
        startDate: "2025-11-01",
        endDate: "2026-02-28",
        projectedEnd: "2026-02-28"
      },
      resources: {
        teamMembers: 5,
        allocatedFTE: 4.0,
        utilization: 60
      },
      strategicAlignment: {
        goals: ["Customer Retention", "Revenue Growth"],
        businessValue: 78,
        riskLevel: "low"
      },
      outcomes: {
        delivered: ["Requirements gathering"],
        pending: ["Vendor selection", "Implementation planning"],
        risks: ["Integration complexity"]
      }
    },
    {
      id: "init-4",
      name: "SOC 2 Compliance",
      description: "Achieve SOC 2 Type II certification for enterprise sales",
      type: "compliance",
      status: "in-progress",
      priority: "critical",
      progress: 75,
      budget: {
        allocated: 100000,
        spent: 68000,
        remaining: 32000
      },
      timeline: {
        startDate: "2025-07-01",
        endDate: "2025-11-30",
        actualStart: "2025-07-01",
        projectedEnd: "2025-11-30"
      },
      resources: {
        teamMembers: 6,
        allocatedFTE: 3.5,
        utilization: 70
      },
      strategicAlignment: {
        goals: ["Enterprise Market", "Risk Management"],
        businessValue: 85,
        riskLevel: "medium"
      },
      outcomes: {
        delivered: ["Security policies", "Access controls", "Monitoring"],
        pending: ["Auditor review", "Remediation items"],
        risks: ["Audit timeline", "Resource availability"]
      }
    },
    {
      id: "init-5",
      name: "Mobile Application",
      description: "Develop native mobile applications for iOS and Android",
      type: "innovation",
      status: "on-hold",
      priority: "medium",
      progress: 25,
      budget: {
        allocated: 300000,
        spent: 45000,
        remaining: 255000
      },
      timeline: {
        startDate: "2025-10-01",
        endDate: "2026-06-30",
        actualStart: "2025-10-01"
      },
      resources: {
        teamMembers: 4,
        allocatedFTE: 0,
        utilization: 0
      },
      strategicAlignment: {
        goals: ["User Experience", "Market Expansion"],
        businessValue: 65,
        riskLevel: "medium"
      },
      outcomes: {
        delivered: ["Market research", "Technical architecture"],
        pending: ["Development team hiring", "Framework selection"],
        risks: ["Resource constraints", "Competing priorities"]
      }
    }
  ]

  const getStatusColor = (status: Initiative['status']) => {
    switch (status) {
      case 'planning': return 'bg-blue-500'
      case 'in-progress': return 'bg-green-500'
      case 'on-hold': return 'bg-yellow-500'
      case 'completed': return 'bg-gray-500'
      case 'cancelled': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusVariant = (status: Initiative['status']) => {
    switch (status) {
      case 'planning': return 'secondary'
      case 'in-progress': return 'default'
      case 'on-hold': return 'secondary'
      case 'completed': return 'default'
      case 'cancelled': return 'destructive'
      default: return 'outline'
    }
  }

  const getPriorityVariant = (priority: Initiative['priority']) => {
    switch (priority) {
      case 'critical': return 'destructive'
      case 'high': return 'default'
      case 'medium': return 'secondary'
      case 'low': return 'outline'
      default: return 'outline'
    }
  }

  const getRiskColor = (risk: Initiative['strategicAlignment']['riskLevel']) => {
    switch (risk) {
      case 'low': return 'text-green-600'
      case 'medium': return 'text-yellow-600'
      case 'high': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getTypeIcon = (type: Initiative['type']) => {
    switch (type) {
      case 'strategic': return <TrendingUp className="h-4 w-4" />
      case 'operational': return <Briefcase className="h-4 w-4" />
      case 'compliance': return <AlertTriangle className="h-4 w-4" />
      case 'innovation': return <Users className="h-4 w-4" />
      default: return <Briefcase className="h-4 w-4" />
    }
  }

  const portfolioStats = {
    totalBudget: initiatives.reduce((sum, init) => sum + init.budget.allocated, 0),
    totalSpent: initiatives.reduce((sum, init) => sum + init.budget.spent, 0),
    totalResources: initiatives.reduce((sum, init) => sum + init.resources.teamMembers, 0),
    avgProgress: Math.round(initiatives.reduce((sum, init) => sum + init.progress, 0) / initiatives.length),
    activeInitiatives: initiatives.filter(init => init.status === 'in-progress').length,
    atRiskInitiatives: initiatives.filter(init => init.strategicAlignment.riskLevel === 'high').length
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Portfolio Overview</h2>
          <p className="text-sm text-muted-foreground">
            Strategic initiative portfolio management and resource allocation
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Export Report</Button>
          <Button>New Initiative</Button>
        </div>
      </div>

      {/* Portfolio Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(portfolioStats.totalBudget / 1000000).toFixed(1)}M</div>
            <p className="text-xs text-muted-foreground">
              ${(portfolioStats.totalSpent / 1000000).toFixed(1)}M spent
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{portfolioStats.totalResources}</div>
            <p className="text-xs text-muted-foreground">Across all initiatives</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{portfolioStats.avgProgress}%</div>
            <p className="text-xs text-muted-foreground">Portfolio completion</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{portfolioStats.activeInitiatives}</div>
            <p className="text-xs text-muted-foreground">In progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">At Risk</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{portfolioStats.atRiskInitiatives}</div>
            <p className="text-xs text-muted-foreground">High risk</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Budget Util</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round((portfolioStats.totalSpent / portfolioStats.totalBudget) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">Budget utilized</p>
          </CardContent>
        </Card>
      </div>

      {/* Initiative Cards */}
      <div className="space-y-4">
        {initiatives.map((initiative) => (
          <Card key={initiative.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  {getTypeIcon(initiative.type)}
                  <div>
                    <CardTitle className="text-lg">{initiative.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {initiative.description}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge variant={getPriorityVariant(initiative.priority)}>
                    {initiative.priority.toUpperCase()}
                  </Badge>
                  <Badge variant={getStatusVariant(initiative.status)}>
                    {initiative.status.replace('-', ' ').toUpperCase()}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Progress */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Progress</span>
                  <span className="font-medium">{initiative.progress}%</span>
                </div>
                <Progress value={initiative.progress} className="h-2" />
              </div>

              {/* Key Metrics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">Budget</div>
                  <div className="font-medium">
                    ${(initiative.budget.allocated / 1000).toFixed(0)}K
                  </div>
                  <div className="text-xs text-muted-foreground">
                    ${(initiative.budget.spent / 1000).toFixed(0)}K spent
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground">Team Size</div>
                  <div className="font-medium">{initiative.resources.teamMembers} people</div>
                  <div className="text-xs text-muted-foreground">
                    {initiative.resources.utilization}% utilization
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground">Timeline</div>
                  <div className="font-medium">
                    {new Date(initiative.timeline.endDate).toLocaleDateString()}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Target end date
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground">Business Value</div>
                  <div className="font-medium">{initiative.strategicAlignment.businessValue}%</div>
                  <div className={`text-xs font-medium ${getRiskColor(initiative.strategicAlignment.riskLevel)}`}>
                    {initiative.strategicAlignment.riskLevel.toUpperCase()} risk
                  </div>
                </div>
              </div>

              {/* Strategic Goals */}
              <div>
                <div className="text-sm text-muted-foreground mb-2">Strategic Alignment</div>
                <div className="flex flex-wrap gap-1">
                  {initiative.strategicAlignment.goals.map((goal, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {goal}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Recent Outcomes */}
              <div className="grid gap-3 md:grid-cols-2">
                <div>
                  <div className="text-sm text-muted-foreground mb-2">Recent Deliveries</div>
                  <div className="space-y-1">
                    {initiative.outcomes.delivered.slice(-2).map((outcome, index) => (
                      <div key={index} className="text-sm flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        {outcome}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-2">Key Risks</div>
                  <div className="space-y-1">
                    {initiative.outcomes.risks.slice(0, 2).map((risk, index) => (
                      <div key={index} className="text-sm flex items-center gap-2">
                        <AlertTriangle className="w-3 h-3 text-yellow-500" />
                        {risk}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm">View Details</Button>
                <Button variant="outline" size="sm">
                  <Clock className="h-4 w-4 mr-1" />
                  Update Status
                </Button>
                <Button variant="outline" size="sm">
                  <DollarSign className="h-4 w-4 mr-1" />
                  Budget Review
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}