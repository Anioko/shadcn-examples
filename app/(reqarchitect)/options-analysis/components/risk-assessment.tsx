"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Shield, AlertTriangle, CheckCircle, Clock, Users, Target } from "lucide-react"

interface Risk {
  id: string
  optionId: string
  optionName: string
  title: string
  description: string
  category: 'technical' | 'implementation' | 'organizational' | 'financial' | 'vendor' | 'regulatory'
  probability: number // 0-100
  impact: number // 1-5
  riskRating: number // probability * impact
  mitigationStrategy: 'avoid' | 'reduce' | 'transfer' | 'accept' | null
  mitigationActions: string[]
  mitigationCost: number
  residualRisk: number
  owner: string
  status: 'identified' | 'assessed' | 'mitigated' | 'accepted' | 'closed'
}

export function RiskAssessment() {
  const risks: Risk[] = [
    // Containerization risks
    {
      id: "container-complexity",
      optionId: "containerization",
      optionName: "Containerization + Kubernetes",
      title: "Kubernetes Learning Curve",
      description: "Team lacks experience with Kubernetes orchestration and container management",
      category: "technical",
      probability: 70,
      impact: 3,
      riskRating: 21,
      mitigationStrategy: "reduce",
      mitigationActions: [
        "Hire Kubernetes consultant for 3 months",
        "Send 3 team members to K8s certification training",
        "Start with managed Kubernetes service (EKS/GKE)",
        "Implement phased migration approach"
      ],
      mitigationCost: 45000,
      residualRisk: 8,
      owner: "Engineering Team",
      status: "assessed"
    },
    {
      id: "container-monitoring",
      optionId: "containerization",
      optionName: "Containerization + Kubernetes",
      title: "Monitoring & Observability Complexity",
      description: "Container environments require sophisticated monitoring and debugging tools",
      category: "technical",
      probability: 60,
      impact: 2,
      riskRating: 12,
      mitigationStrategy: "reduce",
      mitigationActions: [
        "Implement comprehensive logging strategy",
        "Deploy service mesh for observability",
        "Set up distributed tracing",
        "Establish monitoring runbooks"
      ],
      mitigationCost: 25000,
      residualRisk: 4,
      owner: "DevOps Team",
      status: "mitigated"
    },
    // Lift and Shift risks
    {
      id: "lift-technical-debt",
      optionId: "lift-and-shift",
      optionName: "Lift and Shift (IaaS)",
      title: "Technical Debt Accumulation",
      description: "Moving legacy architecture to cloud without modernization increases technical debt",
      category: "technical",
      probability: 85,
      impact: 3,
      riskRating: 26,
      mitigationStrategy: "accept",
      mitigationActions: [
        "Plan modernization roadmap post-migration",
        "Allocate 20% capacity for technical debt reduction",
        "Implement monitoring for performance degradation"
      ],
      mitigationCost: 15000,
      residualRisk: 20,
      owner: "Architecture Team",
      status: "accepted"
    },
    {
      id: "lift-costs",
      optionId: "lift-and-shift",
      optionName: "Lift and Shift (IaaS)",
      title: "Higher Than Expected Cloud Costs",
      description: "Cloud costs may exceed estimates due to inefficient resource utilization",
      category: "financial",
      probability: 50,
      impact: 2,
      riskRating: 10,
      mitigationStrategy: "reduce",
      mitigationActions: [
        "Implement cloud cost monitoring",
        "Right-size instances during migration",
        "Set up automated cost alerts",
        "Regular cost optimization reviews"
      ],
      mitigationCost: 8000,
      residualRisk: 4,
      owner: "FinOps Team",
      status: "mitigated"
    },
    // Serverless risks
    {
      id: "serverless-refactoring",
      optionId: "serverless",
      optionName: "Serverless Architecture",
      title: "Extensive Application Refactoring Required",
      description: "Current monolithic applications require significant refactoring for serverless",
      category: "implementation",
      probability: 90,
      impact: 4,
      riskRating: 36,
      mitigationStrategy: "reduce",
      mitigationActions: [
        "Conduct detailed application assessment",
        "Start with new features in serverless",
        "Gradual decomposition of monoliths",
        "Hire serverless architecture experts"
      ],
      mitigationCost: 75000,
      residualRisk: 18,
      owner: "Development Team",
      status: "identified"
    },
    {
      id: "serverless-vendor-lock",
      optionId: "serverless",
      optionName: "Serverless Architecture",
      title: "Vendor Lock-in Risk",
      description: "Heavy reliance on cloud-specific serverless services creates vendor dependency",
      category: "vendor",
      probability: 80,
      impact: 3,
      riskRating: 24,
      mitigationStrategy: "reduce",
      mitigationActions: [
        "Use multi-cloud abstraction frameworks",
        "Implement portable serverless patterns",
        "Maintain containerized alternatives",
        "Regular vendor strategy reviews"
      ],
      mitigationCost: 35000,
      residualRisk: 12,
      owner: "Architecture Team",
      status: "assessed"
    },
    // Hybrid risks
    {
      id: "hybrid-complexity",
      optionId: "hybrid-approach",
      optionName: "Hybrid Cloud Approach",
      title: "Network & Integration Complexity",
      description: "Managing connectivity and data consistency between on-premises and cloud",
      category: "technical",
      probability: 75,
      impact: 3,
      riskRating: 23,
      mitigationStrategy: "reduce",
      mitigationActions: [
        "Implement robust VPN/direct connect",
        "Design clear data governance policies",
        "Establish integration testing procedures",
        "Create network monitoring dashboards"
      ],
      mitigationCost: 40000,
      residualRisk: 12,
      owner: "Infrastructure Team",
      status: "assessed"
    }
  ]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'technical': return 'bg-blue-100 text-blue-800'
      case 'implementation': return 'bg-orange-100 text-orange-800'
      case 'organizational': return 'bg-purple-100 text-purple-800'
      case 'financial': return 'bg-green-100 text-green-800'
      case 'vendor': return 'bg-yellow-100 text-yellow-800'
      case 'regulatory': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getRiskRatingColor = (rating: number) => {
    if (rating >= 25) return 'bg-red-100 text-red-800'
    if (rating >= 15) return 'bg-orange-100 text-orange-800'
    if (rating >= 8) return 'bg-yellow-100 text-yellow-800'
    return 'bg-green-100 text-green-800'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'identified': return 'bg-gray-100 text-gray-800'
      case 'assessed': return 'bg-blue-100 text-blue-800'
      case 'mitigated': return 'bg-green-100 text-green-800'
      case 'accepted': return 'bg-yellow-100 text-yellow-800'
      case 'closed': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getMitigationIcon = (strategy: string | null) => {
    switch (strategy) {
      case 'avoid': return <Shield className="h-4 w-4 text-blue-500" />
      case 'reduce': return <Target className="h-4 w-4 text-green-500" />
      case 'transfer': return <Users className="h-4 w-4 text-purple-500" />
      case 'accept': return <CheckCircle className="h-4 w-4 text-orange-500" />
      default: return <AlertTriangle className="h-4 w-4 text-red-500" />
    }
  }

  // Risk statistics
  const totalRisks = risks.length
  const highRisks = risks.filter(r => r.riskRating >= 20).length
  const mitigatedRisks = risks.filter(r => r.status === 'mitigated').length
  const totalMitigationCost = risks.reduce((sum, r) => sum + r.mitigationCost, 0)

  // Group risks by option
  const risksByOption = risks.reduce((acc, risk) => {
    if (!acc[risk.optionId]) {
      acc[risk.optionId] = []
    }
    acc[risk.optionId].push(risk)
    return acc
  }, {} as Record<string, Risk[]>)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Shield className="h-5 w-5 text-red-500" />
          <span>Risk Assessment & Mitigation</span>
        </CardTitle>
        <CardDescription>
          Comprehensive risk analysis with mitigation strategies and residual risk calculations
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Risk Summary */}
        <div className="grid gap-4 md:grid-cols-4">
          <div className="text-center space-y-2">
            <div className="text-2xl font-bold text-blue-600">{totalRisks}</div>
            <div className="text-sm text-muted-foreground">Total Risks</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-2xl font-bold text-red-600">{highRisks}</div>
            <div className="text-sm text-muted-foreground">High Risk (≥20)</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-2xl font-bold text-green-600">{mitigatedRisks}</div>
            <div className="text-sm text-muted-foreground">Mitigated</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-2xl font-bold text-purple-600">
              ${(totalMitigationCost / 1000).toFixed(0)}K
            </div>
            <div className="text-sm text-muted-foreground">Mitigation Cost</div>
          </div>
        </div>

        {/* Risk Heatmap by Option */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Risk Profile by Option</h3>
          {Object.entries(risksByOption).map(([optionId, optionRisks]) => {
            const avgRiskRating = optionRisks.reduce((sum, r) => sum + r.riskRating, 0) / optionRisks.length
            const avgResidualRisk = optionRisks.reduce((sum, r) => sum + r.residualRisk, 0) / optionRisks.length
            const mitigationCost = optionRisks.reduce((sum, r) => sum + r.mitigationCost, 0)

            return (
              <div key={optionId} className="border rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="font-semibold">{optionRisks[0].optionName}</h4>
                    <div className="flex items-center space-x-2">
                      <Badge className={getRiskRatingColor(avgRiskRating)}>
                        Avg Risk: {avgRiskRating.toFixed(1)}
                      </Badge>
                      <Badge variant="outline">
                        {optionRisks.length} risks identified
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <div className="text-lg font-bold text-green-600">
                      {avgResidualRisk.toFixed(1)}
                    </div>
                    <div className="text-sm text-muted-foreground">Residual Risk</div>
                  </div>
                </div>

                {/* Risk List */}
                <div className="space-y-3">
                  {optionRisks
                    .sort((a, b) => b.riskRating - a.riskRating)
                    .map((risk) => (
                      <div key={risk.id} className="bg-gray-50 rounded-lg p-3 space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2 flex-1">
                            <div className="flex items-center space-x-3">
                              <h5 className="font-medium">{risk.title}</h5>
                              <Badge className={getCategoryColor(risk.category)}>
                                {risk.category}
                              </Badge>
                              <Badge className={getRiskRatingColor(risk.riskRating)}>
                                Risk: {risk.riskRating}
                              </Badge>
                              <Badge className={getStatusColor(risk.status)}>
                                {risk.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{risk.description}</p>
                          </div>
                        </div>

                        {/* Risk Metrics */}
                        <div className="grid gap-4 md:grid-cols-3">
                          <div className="space-y-2">
                            <div className="text-sm font-medium">Probability: {risk.probability}%</div>
                            <Progress value={risk.probability} className="h-2" />
                          </div>
                          <div className="space-y-2">
                            <div className="text-sm font-medium">Impact: {risk.impact}/5</div>
                            <Progress value={(risk.impact / 5) * 100} className="h-2" />
                          </div>
                          <div className="space-y-2">
                            <div className="text-sm font-medium">Residual: {risk.residualRisk}</div>
                            <Progress value={(risk.residualRisk / risk.riskRating) * 100} className="h-2" />
                          </div>
                        </div>

                        {/* Mitigation Strategy */}
                        {risk.mitigationStrategy && (
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              {getMitigationIcon(risk.mitigationStrategy)}
                              <span className="text-sm font-medium capitalize">
                                {risk.mitigationStrategy} Strategy
                              </span>
                              {risk.mitigationCost > 0 && (
                                <Badge variant="outline">
                                  ${(risk.mitigationCost / 1000).toFixed(0)}K cost
                                </Badge>
                              )}
                            </div>
                            <div className="space-y-1">
                              {risk.mitigationActions.slice(0, 3).map((action, idx) => (
                                <div key={idx} className="flex items-center space-x-2 text-sm">
                                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                                  <span>{action}</span>
                                </div>
                              ))}
                              {risk.mitigationActions.length > 3 && (
                                <div className="text-xs text-muted-foreground">
                                  +{risk.mitigationActions.length - 3} more actions...
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Risk Owner & Timeline */}
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span>Owner: {risk.owner}</span>
                          </div>
                          <Button size="sm" variant="outline">
                            Update Mitigation
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>

                {/* Option Risk Summary */}
                <div className="border-t pt-3">
                  <div className="grid gap-4 md:grid-cols-3 text-sm">
                    <div className="text-center">
                      <div className="font-medium text-orange-600">
                        ${(mitigationCost / 1000).toFixed(0)}K
                      </div>
                      <div className="text-muted-foreground">Mitigation Investment</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-red-600">
                        {((avgRiskRating - avgResidualRisk) / avgRiskRating * 100).toFixed(0)}%
                      </div>
                      <div className="text-muted-foreground">Risk Reduction</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-green-600">
                        {optionRisks.filter(r => r.status === 'mitigated').length}/{optionRisks.length}
                      </div>
                      <div className="text-muted-foreground">Risks Mitigated</div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Actions */}
        <div className="flex space-x-4">
          <Button className="flex items-center space-x-2">
            <Shield className="h-4 w-4" />
            <span>Add New Risk</span>
          </Button>
          <Button variant="outline" className="flex items-center space-x-2">
            <Target className="h-4 w-4" />
            <span>Update Mitigations</span>
          </Button>
          <Button variant="outline">
            Generate Risk Report
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}