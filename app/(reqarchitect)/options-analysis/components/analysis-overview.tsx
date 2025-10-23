"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { FileText, Users, Clock, DollarSign, AlertTriangle, CheckCircle, Target } from "lucide-react"

interface AnalysisInfo {
  id: string
  name: string
  type: string
  status: 'draft' | 'under_analysis' | 'in_review' | 'recommended' | 'approved'
  owner: string
  collaborators: string[]
  createdAt: string
  strategicObjective: string
  completionPercentage: number
}

interface OptionSummary {
  id: string
  name: string
  totalScore: number
  rank: number
  status: 'draft' | 'evaluated' | 'recommended' | 'selected'
  recommendationConfidence: number
}

export function AnalysisOverview() {
  const analysisInfo: AnalysisInfo = {
    id: "cloud-migration-2026",
    name: "Cloud Migration Strategy Analysis",
    type: "Cloud Migration",
    status: "under_analysis",
    owner: "Sarah Chen",
    collaborators: ["Mike Rodriguez", "Jennifer Kim", "David Park"],
    createdAt: "2025-10-15",
    strategicObjective: "Migrate core applications to cloud infrastructure to improve scalability, reduce operational costs by 30%, and enable faster feature deployment",
    completionPercentage: 73
  }

  const optionsSummary: OptionSummary[] = [
    {
      id: "lift-and-shift",
      name: "Lift and Shift (IaaS)",
      totalScore: 72.4,
      rank: 2,
      status: "evaluated",
      recommendationConfidence: 85
    },
    {
      id: "containerization",
      name: "Containerization + Kubernetes",
      totalScore: 84.2,
      rank: 1,
      status: "recommended",
      recommendationConfidence: 92
    },
    {
      id: "serverless",
      name: "Serverless Architecture",
      totalScore: 61.8,
      rank: 4,
      status: "evaluated",
      recommendationConfidence: 67
    },
    {
      id: "hybrid-approach",
      name: "Hybrid Cloud Approach",
      totalScore: 69.1,
      rank: 3,
      status: "evaluated",
      recommendationConfidence: 78
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800'
      case 'under_analysis': return 'bg-blue-100 text-blue-800'
      case 'in_review': return 'bg-yellow-100 text-yellow-800'
      case 'recommended': return 'bg-green-100 text-green-800'
      case 'approved': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getOptionStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800'
      case 'evaluated': return 'bg-blue-100 text-blue-800'
      case 'recommended': return 'bg-green-100 text-green-800'
      case 'selected': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return "🥇"
      case 2: return "🥈"
      case 3: return "🥉"
      default: return `#${rank}`
    }
  }

  return (
    <div className="space-y-6">
      {/* Analysis Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-blue-500" />
                <span>{analysisInfo.name}</span>
              </CardTitle>
              <div className="flex items-center space-x-4">
                <Badge variant="outline">{analysisInfo.type}</Badge>
                <Badge className={getStatusColor(analysisInfo.status)}>
                  {analysisInfo.status.replace('_', ' ')}
                </Badge>
              </div>
            </div>
            <div className="text-right space-y-2">
              <div className="text-2xl font-bold text-green-600">{analysisInfo.completionPercentage}%</div>
              <div className="text-sm text-muted-foreground">Complete</div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Strategic Objective */}
          <div className="space-y-2">
            <div className="text-sm font-medium">Strategic Objective</div>
            <p className="text-sm text-muted-foreground">{analysisInfo.strategicObjective}</p>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Analysis Progress</span>
              <span>{analysisInfo.completionPercentage}%</span>
            </div>
            <Progress value={analysisInfo.completionPercentage} />
          </div>

          {/* Metadata */}
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <div className="text-sm">
                <div className="font-medium">Owner: {analysisInfo.owner}</div>
                <div className="text-muted-foreground">{analysisInfo.collaborators.length} collaborators</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div className="text-sm">
                <div className="font-medium">Created</div>
                <div className="text-muted-foreground">{analysisInfo.createdAt}</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Target className="h-4 w-4 text-muted-foreground" />
              <div className="text-sm">
                <div className="font-medium">{optionsSummary.length} Options</div>
                <div className="text-muted-foreground">Under evaluation</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Options Summary */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Options Rankings</CardTitle>
            <CardDescription>
              Current ranking based on weighted criteria scores
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {optionsSummary
                .sort((a, b) => a.rank - b.rank)
                .map((option) => (
                  <div key={option.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{getRankIcon(option.rank)}</div>
                      <div>
                        <div className="font-medium">{option.name}</div>
                        <div className="text-sm text-muted-foreground">
                          Score: {option.totalScore.toFixed(1)}/100
                        </div>
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <Badge className={getOptionStatusColor(option.status)}>
                        {option.status}
                      </Badge>
                      <div className="text-xs text-muted-foreground">
                        {option.recommendationConfidence}% confidence
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Analysis Health Check</CardTitle>
            <CardDescription>
              Assessment completeness and quality indicators
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">All options evaluated</span>
                </div>
                <Badge variant="outline" className="text-green-600">Complete</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Financial models complete</span>
                </div>
                <Badge variant="outline" className="text-green-600">Complete</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm">Risk mitigation plans</span>
                </div>
                <Badge variant="outline" className="text-yellow-600">Partial</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Stakeholder input</span>
                </div>
                <Badge variant="outline" className="text-green-600">Complete</Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm">Evidence documentation</span>
                </div>
                <Badge variant="outline" className="text-yellow-600">In Progress</Badge>
              </div>
            </div>

            <div className="pt-4 border-t">
              <Button className="w-full" variant="outline">
                Review Analysis Quality
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <Button className="flex items-center space-x-2">
              <Target className="h-4 w-4" />
              <span>Add New Option</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4" />
              <span>Update Financials</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4" />
              <span>Review Risks</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Generate Report</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}