"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BarChart, Target, TrendingUp, Zap, Shield, DollarSign } from "lucide-react"

interface Option {
  id: string
  name: string
  description: string
  totalScore: number
  rank: number
  categoryScores: {
    category: string
    score: number
    weight: number
    maxScore: number
  }[]
  strengths: string[]
  weaknesses: string[]
  status: 'draft' | 'evaluated' | 'recommended' | 'selected'
}

export function OptionComparison() {
  const options: Option[] = [
    {
      id: "containerization",
      name: "Containerization + Kubernetes",
      description: "Containerize applications and deploy on managed Kubernetes clusters",
      totalScore: 84.2,
      rank: 1,
      categoryScores: [
        { category: "Technical", score: 88, weight: 30, maxScore: 100 },
        { category: "Financial", score: 75, weight: 25, maxScore: 100 },
        { category: "Strategic", score: 92, weight: 20, maxScore: 100 },
        { category: "Risk", score: 82, weight: 15, maxScore: 100 },
        { category: "Operational", score: 86, weight: 10, maxScore: 100 }
      ],
      strengths: ["High scalability", "Modern architecture", "Strong community support"],
      weaknesses: ["Learning curve", "Initial complexity", "Monitoring overhead"],
      status: "recommended"
    },
    {
      id: "lift-and-shift",
      name: "Lift and Shift (IaaS)",
      description: "Direct migration of existing applications to cloud infrastructure",
      totalScore: 72.4,
      rank: 2,
      categoryScores: [
        { category: "Technical", score: 70, weight: 30, maxScore: 100 },
        { category: "Financial", score: 85, weight: 25, maxScore: 100 },
        { category: "Strategic", score: 60, weight: 20, maxScore: 100 },
        { category: "Risk", score: 88, weight: 15, maxScore: 100 },
        { category: "Operational", score: 75, weight: 10, maxScore: 100 }
      ],
      strengths: ["Quick migration", "Low risk", "Minimal changes required"],
      weaknesses: ["Limited cloud benefits", "Higher ongoing costs", "Technical debt"],
      status: "evaluated"
    },
    {
      id: "hybrid-approach",
      name: "Hybrid Cloud Approach",
      description: "Selective migration with on-premises integration",
      totalScore: 69.1,
      rank: 3,
      categoryScores: [
        { category: "Technical", score: 75, weight: 30, maxScore: 100 },
        { category: "Financial", score: 65, weight: 25, maxScore: 100 },
        { category: "Strategic", score: 70, weight: 20, maxScore: 100 },
        { category: "Risk", score: 78, weight: 15, maxScore: 100 },
        { category: "Operational", score: 68, weight: 10, maxScore: 100 }
      ],
      strengths: ["Gradual transition", "Flexibility", "Compliance friendly"],
      weaknesses: ["Complexity", "Integration challenges", "Dual management"],
      status: "evaluated"
    },
    {
      id: "serverless",
      name: "Serverless Architecture",
      description: "Refactor applications to serverless functions and managed services",
      totalScore: 61.8,
      rank: 4,
      categoryScores: [
        { category: "Technical", score: 65, weight: 30, maxScore: 100 },
        { category: "Financial", score: 70, weight: 25, maxScore: 100 },
        { category: "Strategic", score: 85, weight: 20, maxScore: 100 },
        { category: "Risk", score: 45, weight: 15, maxScore: 100 },
        { category: "Operational", score: 55, weight: 10, maxScore: 100 }
      ],
      strengths: ["Auto-scaling", "Pay-per-use", "No infrastructure management"],
      weaknesses: ["Major refactoring", "Vendor lock-in", "Cold start latency"],
      status: "evaluated"
    }
  ]

  const categories = ["Technical", "Financial", "Strategic", "Risk", "Operational"]
  
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Technical": return <Zap className="h-4 w-4" />
      case "Financial": return <DollarSign className="h-4 w-4" />
      case "Strategic": return <Target className="h-4 w-4" />
      case "Risk": return <Shield className="h-4 w-4" />
      case "Operational": return <TrendingUp className="h-4 w-4" />
      default: return <BarChart className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'recommended': return 'bg-green-100 text-green-800'
      case 'evaluated': return 'bg-blue-100 text-blue-800'
      case 'selected': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return 'bg-yellow-100 text-yellow-800'
      case 2: return 'bg-gray-100 text-gray-800'
      case 3: return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BarChart className="h-5 w-5 text-blue-500" />
          <span>Option Comparison Matrix</span>
        </CardTitle>
        <CardDescription>
          Detailed comparison of all evaluated options across weighted criteria
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Comparison Table Header */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2 font-medium">Option</th>
                {categories.map((category) => (
                  <th key={category} className="text-center p-2 font-medium text-sm">
                    <div className="flex items-center justify-center space-x-1">
                      {getCategoryIcon(category)}
                      <span>{category}</span>
                    </div>
                  </th>
                ))}
                <th className="text-center p-2 font-medium">Total Score</th>
              </tr>
            </thead>
            <tbody>
              {options
                .sort((a, b) => a.rank - b.rank)
                .map((option) => (
                  <tr key={option.id} className="border-b hover:bg-gray-50">
                    <td className="p-2">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <Badge className={getRankColor(option.rank)}>
                            #{option.rank}
                          </Badge>
                          <span className="font-medium">{option.name}</span>
                          <Badge className={getStatusColor(option.status)}>
                            {option.status}
                          </Badge>
                        </div>
                        <div className="text-xs text-muted-foreground max-w-xs">
                          {option.description}
                        </div>
                      </div>
                    </td>
                    {option.categoryScores.map((score) => (
                      <td key={score.category} className="p-2 text-center">
                        <div className="space-y-1">
                          <div className="text-sm font-medium">{score.score}</div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ width: `${score.score}%` }}
                            />
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {score.weight}% weight
                          </div>
                        </div>
                      </td>
                    ))}
                    <td className="p-2 text-center">
                      <div className="space-y-1">
                        <div className="text-lg font-bold text-blue-600">
                          {option.totalScore.toFixed(1)}
                        </div>
                        <div className="text-xs text-muted-foreground">/ 100</div>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Detailed Option Cards */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Detailed Analysis</h3>
          {options
            .sort((a, b) => a.rank - b.rank)
            .slice(0, 2) // Show top 2 options
            .map((option) => (
              <div key={option.id} className="border rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Badge className={getRankColor(option.rank)}>
                      Rank #{option.rank}
                    </Badge>
                    <h4 className="font-semibold text-lg">{option.name}</h4>
                    <Badge className={getStatusColor(option.status)}>
                      {option.status}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">
                      {option.totalScore.toFixed(1)}
                    </div>
                    <div className="text-sm text-muted-foreground">Total Score</div>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">{option.description}</p>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <h5 className="font-medium text-green-600 flex items-center space-x-1">
                      <TrendingUp className="h-4 w-4" />
                      <span>Strengths</span>
                    </h5>
                    <ul className="text-sm space-y-1">
                      {option.strengths.map((strength, idx) => (
                        <li key={idx} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                          <span>{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h5 className="font-medium text-red-600 flex items-center space-x-1">
                      <Shield className="h-4 w-4" />
                      <span>Challenges</span>
                    </h5>
                    <ul className="text-sm space-y-1">
                      {option.weaknesses.map((weakness, idx) => (
                        <li key={idx} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                          <span>{weakness}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                  <Button size="sm" variant="outline">
                    Edit Scores
                  </Button>
                  {option.status === 'recommended' && (
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      Select Option
                    </Button>
                  )}
                </div>
              </div>
            ))}
        </div>

        {/* Actions */}
        <div className="flex space-x-4">
          <Button className="flex items-center space-x-2">
            <Target className="h-4 w-4" />
            <span>Adjust Weights</span>
          </Button>
          <Button variant="outline">
            Add New Option
          </Button>
          <Button variant="outline">
            Export Comparison
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}