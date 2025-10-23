"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Calendar, DollarSign, Users, CheckCircle, Clock, MapPin, ArrowRight } from "lucide-react"

interface RoadmapPhase {
  phase: number
  name: string
  duration: string
  startDate: string
  endDate: string
  budget: string
  status: 'planned' | 'in-progress' | 'completed'
  initiatives: RoadmapInitiative[]
}

interface RoadmapInitiative {
  id: string
  capability: string
  title: string
  description: string
  maturityIncrease: number
  effort: string
  cost: string
  owner: string
  dependencies: string[]
  status: 'not-started' | 'in-progress' | 'completed' | 'blocked'
  completionPercentage: number
}

export function MaturityRoadmap() {
  const roadmapPhases: RoadmapPhase[] = [
    {
      phase: 1,
      name: "Foundation Building",
      duration: "Q1 2026",
      startDate: "2026-01-01",
      endDate: "2026-03-31",
      budget: "$45K",
      status: "in-progress",
      initiatives: [
        {
          id: "data-governance",
          capability: "Data Management",
          title: "Implement Data Governance Framework",
          description: "Deploy data governance platform and establish policies",
          maturityIncrease: 2,
          effort: "8 weeks",
          cost: "$25K",
          owner: "Data Team",
          dependencies: [],
          status: "in-progress",
          completionPercentage: 35
        },
        {
          id: "security-policies",
          capability: "Security",
          title: "Document Security Policies",
          description: "Formalize security policies and incident response procedures",
          maturityIncrease: 0.5,
          effort: "3 weeks",
          cost: "$5K",
          owner: "Security Team",
          dependencies: [],
          status: "completed",
          completionPercentage: 100
        },
        {
          id: "process-documentation",
          capability: "Customer Service",
          title: "Document Customer Service Processes",
          description: "Create formal SOPs for customer service workflows",
          maturityIncrease: 0.5,
          effort: "2 weeks",
          cost: "$3K",
          owner: "Customer Success",
          dependencies: [],
          status: "completed",
          completionPercentage: 100
        }
      ]
    },
    {
      phase: 2,
      name: "Integration & Automation",
      duration: "Q2 2026",
      startDate: "2026-04-01",
      endDate: "2026-06-30",
      budget: "$35K",
      status: "planned",
      initiatives: [
        {
          id: "bi-self-service",
          capability: "Analytics & BI",
          title: "Deploy Self-Service BI Platform",
          description: "Implement Power BI with self-service capabilities",
          maturityIncrease: 1,
          effort: "6 weeks",
          cost: "$15K",
          owner: "Data Team",
          dependencies: ["data-governance"],
          status: "not-started",
          completionPercentage: 0
        },
        {
          id: "automation-workflows",
          capability: "Operations",
          title: "Automate Core Business Workflows",
          description: "Implement workflow automation for key processes",
          maturityIncrease: 1,
          effort: "4 weeks",
          cost: "$12K",
          owner: "Operations Team",
          dependencies: ["process-documentation"],
          status: "not-started",
          completionPercentage: 0
        },
        {
          id: "integration-platform",
          capability: "Technology",
          title: "Deploy Integration Platform",
          description: "Implement iPaaS for system integrations",
          maturityIncrease: 1,
          effort: "5 weeks",
          cost: "$18K",
          owner: "Engineering",
          dependencies: [],
          status: "not-started",
          completionPercentage: 0
        }
      ]
    },
    {
      phase: 3,
      name: "Optimization & Intelligence",
      duration: "Q3 2026",
      startDate: "2026-07-01",
      endDate: "2026-09-30",
      budget: "$55K",
      status: "planned",
      initiatives: [
        {
          id: "advanced-analytics",
          capability: "Analytics & BI",
          title: "Implement Advanced Analytics",
          description: "Deploy predictive analytics and AI-powered insights",
          maturityIncrease: 1,
          effort: "8 weeks",
          cost: "$30K",
          owner: "Data Team",
          dependencies: ["bi-self-service", "integration-platform"],
          status: "not-started",
          completionPercentage: 0
        },
        {
          id: "security-automation",
          capability: "Security",
          title: "Automate Security Operations",
          description: "Implement SOAR platform for automated incident response",
          maturityIncrease: 1,
          effort: "6 weeks",
          cost: "$25K",
          owner: "Security Team",
          dependencies: ["integration-platform"],
          status: "not-started",
          completionPercentage: 0
        }
      ]
    },
    {
      phase: 4,
      name: "Continuous Improvement",
      duration: "Q4 2026",
      startDate: "2026-10-01",
      endDate: "2026-12-31",
      budget: "$40K",
      status: "planned",
      initiatives: [
        {
          id: "ai-optimization",
          capability: "All Capabilities",
          title: "AI-Powered Process Optimization",
          description: "Implement AI-driven continuous improvement across all capabilities",
          maturityIncrease: 0.5,
          effort: "12 weeks",
          cost: "$40K",
          owner: "Innovation Team",
          dependencies: ["advanced-analytics", "automation-workflows"],
          status: "not-started",
          completionPercentage: 0
        }
      ]
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'in-progress': return 'bg-blue-100 text-blue-800'
      case 'planned': return 'bg-gray-100 text-gray-800'
      case 'blocked': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPhaseStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'border-green-500 bg-green-50'
      case 'in-progress': return 'border-blue-500 bg-blue-50'
      case 'planned': return 'border-gray-300 bg-gray-50'
      default: return 'border-gray-300 bg-gray-50'
    }
  }

  const totalBudget = roadmapPhases.reduce((sum, phase) => {
    const budget = parseInt(phase.budget.replace('$', '').replace('K', '')) * 1000
    return sum + budget
  }, 0)

  const totalMaturityGain = roadmapPhases.reduce((sum, phase) => {
    return sum + phase.initiatives.reduce((phaseSum, init) => phaseSum + init.maturityIncrease, 0)
  }, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MapPin className="h-5 w-5 text-purple-500" />
          <span>Strategic Maturity Roadmap</span>
        </CardTitle>
        <CardDescription>
          Phased implementation plan to reach target maturity levels across all capabilities
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Roadmap Summary */}
        <div className="grid gap-4 md:grid-cols-4">
          <div className="text-center space-y-2">
            <div className="text-2xl font-bold text-purple-600">{roadmapPhases.length}</div>
            <div className="text-sm text-muted-foreground">Phases</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-2xl font-bold text-green-600">
              ${(totalBudget / 1000).toFixed(0)}K
            </div>
            <div className="text-sm text-muted-foreground">Total Investment</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-2xl font-bold text-blue-600">+{totalMaturityGain}</div>
            <div className="text-sm text-muted-foreground">Maturity Gain</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-2xl font-bold text-orange-600">12</div>
            <div className="text-sm text-muted-foreground">Months</div>
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-6">
          {roadmapPhases.map((phase, phaseIndex) => (
            <div key={phase.phase} className={`border rounded-lg p-6 ${getPhaseStatusColor(phase.status)}`}>
              {/* Phase Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {phase.phase}
                      </div>
                      <h3 className="text-lg font-semibold">{phase.name}</h3>
                    </div>
                    <Badge className={getStatusColor(phase.status)}>
                      {phase.status.replace('-', ' ')}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{phase.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <DollarSign className="h-4 w-4" />
                      <span>{phase.budget}</span>
                    </div>
                  </div>
                </div>
                
                {phase.status === 'in-progress' && (
                  <div className="text-right">
                    <div className="text-sm font-medium">Overall Progress</div>
                    <div className="text-xs text-muted-foreground">
                      {Math.round(
                        phase.initiatives.reduce((sum, init) => sum + init.completionPercentage, 0) / 
                        phase.initiatives.length
                      )}% complete
                    </div>
                  </div>
                )}
              </div>

              {/* Phase Progress */}
              {phase.status === 'in-progress' && (
                <div className="mb-4">
                  <Progress 
                    value={
                      phase.initiatives.reduce((sum, init) => sum + init.completionPercentage, 0) / 
                      phase.initiatives.length
                    } 
                  />
                </div>
              )}

              {/* Initiatives */}
              <div className="space-y-3">
                {phase.initiatives.map((initiative, initIndex) => (
                  <div key={initiative.id} className="bg-white border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center space-x-3">
                          <Badge variant="outline">{initiative.capability}</Badge>
                          <Badge className={getStatusColor(initiative.status)}>
                            {initiative.status.replace('-', ' ')}
                          </Badge>
                          {initiative.status === 'completed' && (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                        </div>
                        
                        <div>
                          <h4 className="font-medium">{initiative.title}</h4>
                          <p className="text-sm text-muted-foreground">{initiative.description}</p>
                        </div>

                        <div className="grid gap-2 md:grid-cols-4 text-sm">
                          <div className="flex items-center space-x-1">
                            <ArrowRight className="h-3 w-3 text-green-500" />
                            <span>+{initiative.maturityIncrease} levels</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3 text-blue-500" />
                            <span>{initiative.effort}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <DollarSign className="h-3 w-3 text-yellow-500" />
                            <span>{initiative.cost}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="h-3 w-3 text-purple-500" />
                            <span>{initiative.owner}</span>
                          </div>
                        </div>

                        {initiative.dependencies.length > 0 && (
                          <div className="text-xs text-muted-foreground">
                            <span className="font-medium">Dependencies:</span> {initiative.dependencies.join(', ')}
                          </div>
                        )}

                        {initiative.status === 'in-progress' && (
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span>Progress</span>
                              <span>{initiative.completionPercentage}%</span>
                            </div>
                            <Progress value={initiative.completionPercentage} className="h-2" />
                          </div>
                        )}
                      </div>

                      <Button size="sm" variant="outline" className="ml-4">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Phase Connection */}
              {phaseIndex < roadmapPhases.length - 1 && (
                <div className="flex justify-center mt-6">
                  <ArrowRight className="h-6 w-6 text-muted-foreground" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex space-x-4">
          <Button className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>Update Timeline</span>
          </Button>
          <Button variant="outline">
            Export Roadmap
          </Button>
          <Button variant="outline">
            Create Project Plans
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}