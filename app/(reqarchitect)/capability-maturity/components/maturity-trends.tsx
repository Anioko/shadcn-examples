"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, Minus, Calendar, Target } from "lucide-react"

interface TrendData {
  capability: string
  category: string
  currentLevel: number
  previousLevel: number
  change: number
  timeframe: string
  milestones: string[]
  projection: {
    targetLevel: number
    estimatedDate: string
    confidence: number
  }
}

export function MaturityTrends() {
  const trendData: TrendData[] = [
    {
      capability: "Engineering",
      category: "Technology",
      currentLevel: 4,
      previousLevel: 3.5,
      change: 0.5,
      timeframe: "Last Quarter",
      milestones: ["Implemented CI/CD", "Added automated testing", "Code review process"],
      projection: {
        targetLevel: 5,
        estimatedDate: "Q2 2026",
        confidence: 87
      }
    },
    {
      capability: "Customer Service",
      category: "Operations",
      currentLevel: 4,
      previousLevel: 4.2,
      change: -0.2,
      timeframe: "Last Month",
      milestones: ["Minor workflow issues", "Team turnover"],
      projection: {
        targetLevel: 4,
        estimatedDate: "Q1 2026",
        confidence: 72
      }
    },
    {
      capability: "Analytics & BI",
      category: "Technology",
      currentLevel: 2,
      previousLevel: 1.5,
      change: 0.5,
      timeframe: "Last Quarter",
      milestones: ["Added Power BI", "Automated reports", "Self-service dashboards"],
      projection: {
        targetLevel: 4,
        estimatedDate: "Q3 2026",
        confidence: 79
      }
    },
    {
      capability: "Data Management",
      category: "Technology",
      currentLevel: 1,
      previousLevel: 1,
      change: 0,
      timeframe: "Last 6 Months",
      milestones: ["No significant changes"],
      projection: {
        targetLevel: 3,
        estimatedDate: "Q4 2026",
        confidence: 45
      }
    }
  ]

  const getTrendIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="h-4 w-4 text-green-500" />
    if (change < 0) return <TrendingDown className="h-4 w-4 text-red-500" />
    return <Minus className="h-4 w-4 text-gray-500" />
  }

  const getTrendColor = (change: number) => {
    if (change > 0) return "text-green-600"
    if (change < 0) return "text-red-600"
    return "text-gray-600"
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return "bg-green-100 text-green-800"
    if (confidence >= 60) return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TrendingUp className="h-5 w-5 text-blue-500" />
          <span>Maturity Trends & Projections</span>
        </CardTitle>
        <CardDescription>
          Historical progress and future projections for capability maturity
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Trend Summary */}
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-green-600">
                {trendData.filter(t => t.change > 0).length}
              </div>
              <div className="text-sm text-muted-foreground">Improving</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-gray-600">
                {trendData.filter(t => t.change === 0).length}
              </div>
              <div className="text-sm text-muted-foreground">Stable</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-red-600">
                {trendData.filter(t => t.change < 0).length}
              </div>
              <div className="text-sm text-muted-foreground">Declining</div>
            </div>
          </div>

          {/* Individual Trends */}
          <div className="space-y-4">
            {trendData.map((trend, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="font-medium">{trend.capability}</div>
                    <Badge variant="outline">{trend.category}</Badge>
                  </div>
                  <div className="text-right space-y-1">
                    <div className="flex items-center space-x-2">
                      {getTrendIcon(trend.change)}
                      <span className={`font-medium ${getTrendColor(trend.change)}`}>
                        {trend.change > 0 ? '+' : ''}{trend.change}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">{trend.timeframe}</div>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Current Progress</div>
                    <div className="flex items-center space-x-2">
                      <div className="text-sm">Level {trend.previousLevel}</div>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full">
                        <div 
                          className="h-2 bg-blue-500 rounded-full"
                          style={{ width: `${(trend.currentLevel / 5) * 100}%` }}
                        />
                      </div>
                      <div className="text-sm font-medium">Level {trend.currentLevel}</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium flex items-center space-x-2">
                      <Target className="h-4 w-4" />
                      <span>Projection to Level {trend.projection.targetLevel}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{trend.projection.estimatedDate}</span>
                      <Badge 
                        variant="secondary" 
                        className={getConfidenceColor(trend.projection.confidence)}
                      >
                        {trend.projection.confidence}% confident
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">Key Milestones</div>
                  <div className="flex flex-wrap gap-2">
                    {trend.milestones.map((milestone, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {milestone}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex space-x-4">
            <Button variant="outline" className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>View Historical Timeline</span>
            </Button>
            <Button variant="outline">
              Export Trend Report
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}