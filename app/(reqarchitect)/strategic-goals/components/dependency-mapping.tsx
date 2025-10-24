"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, AlertTriangle, Link as LinkIcon, Clock, CheckCircle } from "lucide-react"

interface Dependency {
  id: string
  from: {
    id: string
    name: string
    type: "goal" | "initiative" | "project" | "capability"
  }
  to: {
    id: string
    name: string
    type: "goal" | "initiative" | "project" | "capability"
  }
  relationship: "depends-on" | "enables" | "blocks" | "supports"
  status: "healthy" | "at-risk" | "blocked" | "resolved"
  criticality: "critical" | "high" | "medium" | "low"
  description: string
  owner: string
  lastUpdated: string
  mitigationPlan?: string
}

export function DependencyMapping() {
  const dependencies: Dependency[] = [
    {
      id: "dep-1",
      from: {
        id: "goal-enterprise",
        name: "Launch Enterprise Features",
        type: "goal"
      },
      to: {
        id: "cap-sso",
        name: "Single Sign-On Capability",
        type: "capability"
      },
      relationship: "depends-on",
      status: "at-risk",
      criticality: "critical",
      description: "Enterprise customers require SSO before they can adopt our platform",
      owner: "VP Product",
      lastUpdated: "2025-10-20",
      mitigationPlan: "Accelerate SSO development with external contractor"
    },
    {
      id: "dep-2",
      from: {
        id: "init-compliance",
        name: "SOC 2 Compliance Initiative",
        type: "initiative"
      },
      to: {
        id: "goal-enterprise",
        name: "Launch Enterprise Features",
        type: "goal"
      },
      relationship: "enables",
      status: "healthy",
      criticality: "high",
      description: "SOC 2 certification is prerequisite for enterprise sales",
      owner: "CISO",
      lastUpdated: "2025-10-18"
    },
    {
      id: "dep-3",
      from: {
        id: "goal-user-growth",
        name: "Reach 10K Active Users",
        type: "goal"
      },
      to: {
        id: "cap-onboarding",
        name: "User Onboarding System",
        type: "capability"
      },
      relationship: "depends-on",
      status: "healthy",
      criticality: "high",
      description: "Improved onboarding directly impacts user acquisition and retention",
      owner: "VP Growth",
      lastUpdated: "2025-10-19"
    },
    {
      id: "dep-4",
      from: {
        id: "init-mobile",
        name: "Mobile Application Initiative",
        type: "initiative"
      },
      to: {
        id: "goal-user-growth",
        name: "Reach 10K Active Users",
        type: "goal"
      },
      relationship: "supports",
      status: "blocked",
      criticality: "medium",
      description: "Mobile app would accelerate user growth but currently on hold",
      owner: "VP Product",
      lastUpdated: "2025-10-15",
      mitigationPlan: "Focus on web platform optimization to maintain growth momentum"
    },
    {
      id: "dep-5",
      from: {
        id: "cap-analytics",
        name: "Product Analytics Capability",
        type: "capability"
      },
      to: {
        id: "goal-product-fit",
        name: "Accelerate Product Market Fit",
        type: "goal"
      },
      relationship: "enables",
      status: "healthy",
      criticality: "high",
      description: "Analytics provide insights needed to optimize product-market fit",
      owner: "VP Product",
      lastUpdated: "2025-10-21"
    },
    {
      id: "dep-6",
      from: {
        id: "goal-revenue",
        name: "Reach $2M ARR",
        type: "goal"
      },
      to: {
        id: "cap-billing",
        name: "Advanced Billing System",
        type: "capability"
      },
      relationship: "depends-on",
      status: "at-risk",
      criticality: "critical",
      description: "Current billing system cannot handle complex enterprise pricing",
      owner: "VP Sales",
      lastUpdated: "2025-10-17",
      mitigationPlan: "Implement billing system upgrade as priority"
    }
  ]

  const getStatusColor = (status: Dependency['status']) => {
    switch (status) {
      case 'healthy': return 'bg-green-500'
      case 'at-risk': return 'bg-yellow-500'
      case 'blocked': return 'bg-red-500'
      case 'resolved': return 'bg-blue-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusVariant = (status: Dependency['status']) => {
    switch (status) {
      case 'healthy': return 'default'
      case 'at-risk': return 'secondary'
      case 'blocked': return 'destructive'
      case 'resolved': return 'default'
      default: return 'outline'
    }
  }

  const getCriticalityVariant = (criticality: Dependency['criticality']) => {
    switch (criticality) {
      case 'critical': return 'destructive'
      case 'high': return 'default'
      case 'medium': return 'secondary'
      case 'low': return 'outline'
      default: return 'outline'
    }
  }

  const getRelationshipIcon = (relationship: Dependency['relationship']) => {
    switch (relationship) {
      case 'depends-on': return <ArrowRight className="h-4 w-4" />
      case 'enables': return <CheckCircle className="h-4 w-4" />
      case 'blocks': return <AlertTriangle className="h-4 w-4" />
      case 'supports': return <LinkIcon className="h-4 w-4" />
      default: return <LinkIcon className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'goal': return 'text-blue-600'
      case 'initiative': return 'text-green-600'
      case 'project': return 'text-purple-600'
      case 'capability': return 'text-orange-600'
      default: return 'text-gray-600'
    }
  }

  const dependencyStats = {
    total: dependencies.length,
    healthy: dependencies.filter(d => d.status === 'healthy').length,
    atRisk: dependencies.filter(d => d.status === 'at-risk').length,
    blocked: dependencies.filter(d => d.status === 'blocked').length,
    critical: dependencies.filter(d => d.criticality === 'critical').length
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Dependency Mapping</h2>
          <p className="text-sm text-muted-foreground">
            Visualize and manage dependencies between goals, initiatives, and capabilities
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Dependency Analysis</Button>
          <Button>Add Dependency</Button>
        </div>
      </div>

      {/* Dependency Stats */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <LinkIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dependencyStats.total}</div>
            <p className="text-xs text-muted-foreground">Dependencies</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Healthy</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{dependencyStats.healthy}</div>
            <p className="text-xs text-muted-foreground">On track</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">At Risk</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{dependencyStats.atRisk}</div>
            <p className="text-xs text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blocked</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{dependencyStats.blocked}</div>
            <p className="text-xs text-muted-foreground">Urgent action</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{dependencyStats.critical}</div>
            <p className="text-xs text-muted-foreground">High impact</p>
          </CardContent>
        </Card>
      </div>

      {/* Dependency List */}
      <div className="space-y-4">
        {dependencies.map((dependency) => (
          <Card key={dependency.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    {getRelationshipIcon(dependency.relationship)}
                    <span className="font-medium text-sm uppercase tracking-wide">
                      {dependency.relationship.replace('-', ' ')}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className={`font-medium ${getTypeColor(dependency.from.type)}`}>
                      {dependency.from.name}
                    </span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    <span className={`font-medium ${getTypeColor(dependency.to.type)}`}>
                      {dependency.to.name}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge variant={getCriticalityVariant(dependency.criticality)}>
                    {dependency.criticality.toUpperCase()}
                  </Badge>
                  <Badge variant={getStatusVariant(dependency.status)}>
                    {dependency.status.replace('-', ' ').toUpperCase()}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{dependency.description}</p>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <div className="text-sm font-medium mb-2">Details</div>
                  <div className="space-y-1 text-sm">
                    <div>
                      <span className="text-muted-foreground">Owner:</span>{' '}
                      <span className="font-medium">{dependency.owner}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Last Updated:</span>{' '}
                      <span>{new Date(dependency.lastUpdated).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">From:</span>
                      <Badge variant="outline" className="text-xs">
                        {dependency.from.type.toUpperCase()}
                      </Badge>
                      <span className="text-muted-foreground">To:</span>
                      <Badge variant="outline" className="text-xs">
                        {dependency.to.type.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                {dependency.mitigationPlan && (
                  <div>
                    <div className="text-sm font-medium mb-2">Mitigation Plan</div>
                    <p className="text-sm text-muted-foreground">{dependency.mitigationPlan}</p>
                  </div>
                )}
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm">
                  <LinkIcon className="h-4 w-4 mr-1" />
                  View Details
                </Button>
                <Button variant="outline" size="sm">
                  <Clock className="h-4 w-4 mr-1" />
                  Update Status
                </Button>
                {dependency.status === 'at-risk' || dependency.status === 'blocked' ? (
                  <Button variant="outline" size="sm">
                    <AlertTriangle className="h-4 w-4 mr-1" />
                    Resolve Issue
                  </Button>
                ) : null}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dependency Graph Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Dependency Graph</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64 border-2 border-dashed border-muted rounded-lg">
          <div className="text-center space-y-2">
            <LinkIcon className="h-12 w-12 text-muted-foreground mx-auto" />
            <p className="text-lg font-medium text-muted-foreground">Interactive Dependency Graph</p>
            <p className="text-sm text-muted-foreground">
              Visual representation of goal and initiative dependencies
            </p>
            <Button variant="outline">View Graph</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}