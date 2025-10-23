"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, TrendingUp, AlertTriangle, RefreshCw, Target, Zap } from "lucide-react"

interface SensitivityTest {
  criterionName: string
  originalWeight: number
  testWeight: number
  originalRanking: OptionRanking[]
  newRanking: OptionRanking[]
  rankingChanged: boolean
  stabilityScore: number
}

interface OptionRanking {
  optionId: string
  optionName: string
  rank: number
  score: number
}

interface Breakpoint {
  criterionName: string
  thresholdWeight: number
  description: string
  impact: string
}

export function SensitivityAnalysis() {
  const [selectedCriterion, setSelectedCriterion] = useState<string>("all")
  const [sensitivityLevel, setSensitivityLevel] = useState<number[]>([20])

  const baselineRanking: OptionRanking[] = [
    { optionId: "containerization", optionName: "Containerization + Kubernetes", rank: 1, score: 84.2 },
    { optionId: "lift-and-shift", optionName: "Lift and Shift (IaaS)", rank: 2, score: 72.4 },
    { optionId: "hybrid-approach", optionName: "Hybrid Cloud Approach", rank: 3, score: 69.1 },
    { optionId: "serverless", optionName: "Serverless Architecture", rank: 4, score: 61.8 }
  ]

  const sensitivityTests: SensitivityTest[] = [
    {
      criterionName: "Technical Feasibility",
      originalWeight: 30,
      testWeight: 50,
      originalRanking: baselineRanking,
      newRanking: [
        { optionId: "containerization", optionName: "Containerization + Kubernetes", rank: 1, score: 87.5 },
        { optionId: "lift-and-shift", optionName: "Lift and Shift (IaaS)", rank: 2, score: 78.2 },
        { optionId: "hybrid-approach", optionName: "Hybrid Cloud Approach", rank: 3, score: 71.8 },
        { optionId: "serverless", optionName: "Serverless Architecture", rank: 4, score: 58.4 }
      ],
      rankingChanged: false,
      stabilityScore: 95
    },
    {
      criterionName: "Financial Impact",
      originalWeight: 25,
      testWeight: 45,
      originalRanking: baselineRanking,
      newRanking: [
        { optionId: "lift-and-shift", optionName: "Lift and Shift (IaaS)", rank: 1, score: 79.8 },
        { optionId: "containerization", optionName: "Containerization + Kubernetes", rank: 2, score: 78.6 },
        { optionId: "hybrid-approach", optionName: "Hybrid Cloud Approach", rank: 3, score: 65.4 },
        { optionId: "serverless", optionName: "Serverless Architecture", rank: 4, score: 64.2 }
      ],
      rankingChanged: true,
      stabilityScore: 65
    },
    {
      criterionName: "Strategic Alignment",
      originalWeight: 20,
      testWeight: 35,
      originalRanking: baselineRanking,
      newRanking: [
        { optionId: "containerization", optionName: "Containerization + Kubernetes", rank: 1, score: 86.8 },
        { optionId: "serverless", optionName: "Serverless Architecture", rank: 2, score: 73.2 },
        { optionId: "lift-and-shift", optionName: "Lift and Shift (IaaS)", rank: 3, score: 68.9 },
        { optionId: "hybrid-approach", optionName: "Hybrid Cloud Approach", rank: 4, score: 67.5 }
      ],
      rankingChanged: true,
      stabilityScore: 40
    },
    {
      criterionName: "Risk Level",
      originalWeight: 15,
      testWeight: 30,
      originalRanking: baselineRanking,
      newRanking: [
        { optionId: "lift-and-shift", optionName: "Lift and Shift (IaaS)", rank: 1, score: 76.8 },
        { optionId: "containerization", optionName: "Containerization + Kubernetes", rank: 2, score: 81.5 },
        { optionId: "hybrid-approach", optionName: "Hybrid Cloud Approach", rank: 3, score: 71.2 },
        { optionId: "serverless", optionName: "Serverless Architecture", rank: 4, score: 55.6 }
      ],
      rankingChanged: true,
      stabilityScore: 55
    },
    {
      criterionName: "Operational Impact",
      originalWeight: 10,
      testWeight: 25,
      originalRanking: baselineRanking,
      newRanking: baselineRanking, // No change in this test
      rankingChanged: false,
      stabilityScore: 88
    }
  ]

  const breakpoints: Breakpoint[] = [
    {
      criterionName: "Financial Impact",
      thresholdWeight: 38,
      description: "Lift & Shift overtakes Containerization as #1",
      impact: "HIGH"
    },
    {
      criterionName: "Strategic Alignment",
      thresholdWeight: 32,
      description: "Serverless moves to #2 position",
      impact: "MEDIUM"
    },
    {
      criterionName: "Risk Level",
      thresholdWeight: 28,
      description: "Lift & Shift becomes top choice",
      impact: "HIGH"
    }
  ]

  const overallStability = sensitivityTests.reduce((sum, test) => sum + test.stabilityScore, 0) / sensitivityTests.length
  const criticalBreakpoints = breakpoints.filter(bp => bp.impact === "HIGH").length
  const rankingChanges = sensitivityTests.filter(test => test.rankingChanged).length

  const getStabilityColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'HIGH': return 'bg-red-100 text-red-800'
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800'
      case 'LOW': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getRankingChangeIcon = (changed: boolean) => {
    return changed ? 
      <AlertTriangle className="h-4 w-4 text-red-500" /> : 
      <Target className="h-4 w-4 text-green-500" />
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BarChart className="h-5 w-5 text-orange-500" />
          <span>Sensitivity Analysis</span>
        </CardTitle>
        <CardDescription>
          Test how changes in criteria weights affect option rankings and identify decision breakpoints
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Analysis Controls */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Focus Criterion</label>
            <Select value={selectedCriterion} onValueChange={setSelectedCriterion}>
              <SelectTrigger>
                <SelectValue placeholder="Select criterion to analyze" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Criteria</SelectItem>
                <SelectItem value="technical">Technical Feasibility</SelectItem>
                <SelectItem value="financial">Financial Impact</SelectItem>
                <SelectItem value="strategic">Strategic Alignment</SelectItem>
                <SelectItem value="risk">Risk Level</SelectItem>
                <SelectItem value="operational">Operational Impact</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Sensitivity Range: ±{sensitivityLevel[0]}%
            </label>
            <Slider
              value={sensitivityLevel}
              onValueChange={setSensitivityLevel}
              max={50}
              min={10}
              step={5}
              className="w-full"
            />
          </div>
        </div>

        {/* Stability Overview */}
        <div className="grid gap-4 md:grid-cols-4">
          <div className="text-center space-y-2">
            <div className={`text-2xl font-bold ${getStabilityColor(overallStability)}`}>
              {overallStability.toFixed(0)}%
            </div>
            <div className="text-sm text-muted-foreground">Overall Stability</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-2xl font-bold text-red-600">{rankingChanges}</div>
            <div className="text-sm text-muted-foreground">Ranking Changes</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-2xl font-bold text-orange-600">{criticalBreakpoints}</div>
            <div className="text-sm text-muted-foreground">Critical Breakpoints</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-2xl font-bold text-blue-600">{sensitivityTests.length}</div>
            <div className="text-sm text-muted-foreground">Tests Performed</div>
          </div>
        </div>

        {/* Sensitivity Test Results */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Weight Sensitivity Tests</h3>
          {sensitivityTests.map((test, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <h4 className="font-medium">{test.criterionName}</h4>
                  {getRankingChangeIcon(test.rankingChanged)}
                  <Badge variant="outline">
                    {test.originalWeight}% → {test.testWeight}%
                  </Badge>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-bold ${getStabilityColor(test.stabilityScore)}`}>
                    {test.stabilityScore}%
                  </div>
                  <div className="text-sm text-muted-foreground">Stability</div>
                </div>
              </div>

              {/* Ranking Comparison */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <div className="text-sm font-medium">Original Ranking</div>
                  <div className="space-y-1">
                    {test.originalRanking.map((option) => (
                      <div key={option.optionId} className="flex items-center justify-between text-sm p-2 bg-gray-50 rounded">
                        <div className="flex items-center space-x-2">
                          <span className="text-muted-foreground">#{option.rank}</span>
                          <span>{option.optionName}</span>
                        </div>
                        <span className="font-medium">{option.score.toFixed(1)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">
                    New Ranking 
                    {test.rankingChanged && (
                      <Badge className="ml-2 bg-red-100 text-red-800">Changed</Badge>
                    )}
                  </div>
                  <div className="space-y-1">
                    {test.newRanking.map((option) => {
                      const originalOption = test.originalRanking.find(o => o.optionId === option.optionId)
                      const rankChanged = originalOption && originalOption.rank !== option.rank
                      
                      return (
                        <div key={option.optionId} className={`flex items-center justify-between text-sm p-2 rounded ${
                          rankChanged ? 'bg-yellow-50 border border-yellow-200' : 'bg-gray-50'
                        }`}>
                          <div className="flex items-center space-x-2">
                            <span className="text-muted-foreground">#{option.rank}</span>
                            <span>{option.optionName}</span>
                            {rankChanged && (
                              <span className="text-xs text-yellow-600">
                                (was #{originalOption?.rank})
                              </span>
                            )}
                          </div>
                          <span className="font-medium">{option.score.toFixed(1)}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Impact Analysis */}
              {test.rankingChanged && (
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="text-sm text-yellow-800">
                    <div className="font-medium">Impact Analysis</div>
                    <div>
                      Increasing {test.criterionName} weight from {test.originalWeight}% to {test.testWeight}% 
                      causes ranking changes. This criterion has significant influence on the decision.
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Critical Breakpoints */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Critical Decision Breakpoints</h3>
          <div className="space-y-3">
            {breakpoints.map((breakpoint, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-3">
                      <h4 className="font-medium">{breakpoint.criterionName}</h4>
                      <Badge className={getImpactColor(breakpoint.impact)}>
                        {breakpoint.impact} Impact
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{breakpoint.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-orange-600">
                      {breakpoint.thresholdWeight}%
                    </div>
                    <div className="text-sm text-muted-foreground">Threshold</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="border rounded-lg p-4 bg-blue-50 border-blue-200">
          <div className="space-y-2">
            <div className="font-medium text-blue-900 flex items-center space-x-2">
              <Zap className="h-4 w-4" />
              <span>Sensitivity Insights & Recommendations</span>
            </div>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Decision is most sensitive to Financial Impact and Strategic Alignment criteria</li>
              <li>• Containerization maintains top position in most scenarios (high robustness)</li>
              <li>• If cost concerns increase significantly, Lift & Shift becomes competitive</li>
              <li>• Serverless ranking is highly volatile - requires careful strategic consideration</li>
              <li>• Overall stability of 68% suggests moderate confidence in current ranking</li>
            </ul>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-4">
          <Button className="flex items-center space-x-2">
            <RefreshCw className="h-4 w-4" />
            <span>Run New Analysis</span>
          </Button>
          <Button variant="outline" className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4" />
            <span>Monte Carlo Simulation</span>
          </Button>
          <Button variant="outline">
            Export Sensitivity Report
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}