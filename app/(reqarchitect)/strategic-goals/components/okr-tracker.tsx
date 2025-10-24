"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays, TrendingUp, Target, AlertTriangle, CheckCircle, Clock } from "lucide-react"

interface OKR {
  id: string
  quarter: string
  year: number
  objective: string
  keyResults: KeyResult[]
  owner: string
  status: "draft" | "active" | "completed" | "cancelled"
  confidence: number
}

interface KeyResult {
  id: string
  description: string
  target: number
  current: number
  unit: string
  status: "on-track" | "at-risk" | "behind" | "achieved"
  lastUpdated: string
  checkIns: CheckIn[]
}

interface CheckIn {
  id: string
  date: string
  value: number
  confidence: number
  comment: string
  risks?: string
}

export function OKRTracker() {
  const currentQuarter = "Q4 2025"
  
  const okrs: OKR[] = [
    {
      id: "okr-1",
      quarter: "Q4 2025",
      year: 2025,
      objective: "Accelerate Product Market Fit",
      owner: "CEO",
      status: "active",
      confidence: 75,
      keyResults: [
        {
          id: "kr-1",
          description: "Increase Monthly Active Users",
          target: 10000,
          current: 3500,
          unit: "users",
          status: "on-track",
          lastUpdated: "2025-10-20",
          checkIns: [
            {
              id: "ci-1",
              date: "2025-10-01",
              value: 2800,
              confidence: 70,
              comment: "Good growth from product hunt launch"
            },
            {
              id: "ci-2",
              date: "2025-10-15",
              value: 3200,
              confidence: 75,
              comment: "Organic growth accelerating"
            },
            {
              id: "ci-3",
              date: "2025-10-20",
              value: 3500,
              confidence: 80,
              comment: "New onboarding flow showing results"
            }
          ]
        },
        {
          id: "kr-2",
          description: "Achieve Net Revenue Retention",
          target: 120,
          current: 95,
          unit: "%",
          status: "behind",
          lastUpdated: "2025-10-18",
          checkIns: [
            {
              id: "ci-4",
              date: "2025-10-01",
              value: 85,
              confidence: 60,
              comment: "Churn higher than expected",
              risks: "Need to improve onboarding"
            },
            {
              id: "ci-5",
              date: "2025-10-15",
              value: 90,
              confidence: 65,
              comment: "Customer success initiatives helping"
            },
            {
              id: "ci-6",
              date: "2025-10-18",
              value: 95,
              confidence: 70,
              comment: "Improvement trend established"
            }
          ]
        },
        {
          id: "kr-3",
          description: "Reduce Customer Acquisition Cost",
          target: 150,
          current: 220,
          unit: "$",
          status: "at-risk",
          lastUpdated: "2025-10-19",
          checkIns: [
            {
              id: "ci-7",
              date: "2025-10-01",
              value: 280,
              confidence: 50,
              comment: "CAC still too high"
            },
            {
              id: "ci-8",
              date: "2025-10-15",
              value: 240,
              confidence: 60,
              comment: "SEO starting to contribute"
            },
            {
              id: "ci-9",
              date: "2025-10-19",
              value: 220,
              confidence: 65,
              comment: "Referral program launched"
            }
          ]
        }
      ]
    },
    {
      id: "okr-2",
      quarter: "Q4 2025",
      year: 2025,
      objective: "Build Scalable Technology Foundation",
      owner: "CTO",
      status: "active",
      confidence: 85,
      keyResults: [
        {
          id: "kr-4",
          description: "Achieve 99.9% System Uptime",
          target: 99.9,
          current: 99.7,
          unit: "%",
          status: "on-track",
          lastUpdated: "2025-10-21",
          checkIns: [
            {
              id: "ci-10",
              date: "2025-10-01",
              value: 99.5,
              confidence: 80,
              comment: "Infrastructure improvements deployed"
            },
            {
              id: "ci-11",
              date: "2025-10-15",
              value: 99.7,
              confidence: 85,
              comment: "Monitoring enhancements working"
            }
          ]
        },
        {
          id: "kr-5",
          description: "Reduce Page Load Time",
          target: 2.0,
          current: 2.8,
          unit: "seconds",
          status: "on-track",
          lastUpdated: "2025-10-20",
          checkIns: [
            {
              id: "ci-12",
              date: "2025-10-01",
              value: 3.5,
              confidence: 70,
              comment: "CDN implementation started"
            },
            {
              id: "ci-13",
              date: "2025-10-15",
              value: 3.0,
              confidence: 80,
              comment: "Image optimization deployed"
            },
            {
              id: "ci-14",
              date: "2025-10-20",
              value: 2.8,
              confidence: 85,
              comment: "Code splitting implemented"
            }
          ]
        }
      ]
    }
  ]

  const getStatusIcon = (status: KeyResult['status']) => {
    switch (status) {
      case 'on-track': return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'at-risk': return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case 'behind': return <Clock className="h-4 w-4 text-red-500" />
      case 'achieved': return <Target className="h-4 w-4 text-blue-500" />
      default: return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusVariant = (status: KeyResult['status']) => {
    switch (status) {
      case 'on-track': return 'default'
      case 'at-risk': return 'secondary'
      case 'behind': return 'destructive'
      case 'achieved': return 'default'
      default: return 'outline'
    }
  }

  const calculateProgress = (current: number, target: number) => {
    return Math.min(100, Math.max(0, (current / target) * 100))
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return "text-green-500"
    if (confidence >= 60) return "text-yellow-500"
    return "text-red-500"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">OKR Tracker</h2>
          <p className="text-sm text-muted-foreground">
            Track objectives and key results for {currentQuarter}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Import OKRs</Button>
          <Button>Create OKR</Button>
        </div>
      </div>

      <Tabs defaultValue="current" className="space-y-4">
        <TabsList>
          <TabsTrigger value="current">Current Quarter</TabsTrigger>
          <TabsTrigger value="previous">Previous Quarters</TabsTrigger>
          <TabsTrigger value="planning">Planning</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-4">
          {okrs.map((okr) => (
            <Card key={okr.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      {okr.objective}
                    </CardTitle>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <span>Owner: <strong>{okr.owner}</strong></span>
                      <span>Quarter: <strong>{okr.quarter}</strong></span>
                      <span className={`font-medium ${getConfidenceColor(okr.confidence)}`}>
                        Confidence: {okr.confidence}%
                      </span>
                    </div>
                  </div>
                  <Badge variant={okr.status === 'active' ? 'default' : 'secondary'}>
                    {okr.status.toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {okr.keyResults.map((kr) => (
                    <div key={kr.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(kr.status)}
                            <h4 className="font-medium">{kr.description}</h4>
                          </div>
                          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                            <span>
                              Progress: <strong>{kr.current.toLocaleString()} / {kr.target.toLocaleString()} {kr.unit}</strong>
                            </span>
                            <span>Last updated: {new Date(kr.lastUpdated).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <Badge variant={getStatusVariant(kr.status)}>
                          {kr.status.replace('-', ' ')}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Progress</span>
                          <span className="font-medium">{calculateProgress(kr.current, kr.target).toFixed(1)}%</span>
                        </div>
                        <Progress value={calculateProgress(kr.current, kr.target)} className="h-2" />
                      </div>

                      {kr.checkIns.length > 0 && (
                        <div className="space-y-2">
                          <h5 className="text-sm font-medium">Recent Check-ins</h5>
                          <div className="space-y-2">
                            {kr.checkIns.slice(-2).map((checkIn) => (
                              <div key={checkIn.id} className="flex items-start gap-3 text-sm bg-muted/50 rounded p-2">
                                <CalendarDays className="h-4 w-4 mt-0.5 text-muted-foreground" />
                                <div className="flex-1">
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium">{new Date(checkIn.date).toLocaleDateString()}</span>
                                    <span>Value: {checkIn.value.toLocaleString()} {kr.unit}</span>
                                    <span className={`font-medium ${getConfidenceColor(checkIn.confidence)}`}>
                                      {checkIn.confidence}% confidence
                                    </span>
                                  </div>
                                  <p className="text-muted-foreground mt-1">{checkIn.comment}</p>
                                  {checkIn.risks && (
                                    <p className="text-yellow-600 mt-1">⚠️ {checkIn.risks}</p>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Update Progress</Button>
                        <Button variant="outline" size="sm">
                          <TrendingUp className="h-4 w-4 mr-1" />
                          View Trend
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="previous" className="space-y-4">
          <Card>
            <CardContent className="flex items-center justify-center h-32">
              <p className="text-muted-foreground">Previous quarter OKRs will be displayed here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="planning" className="space-y-4">
          <Card>
            <CardContent className="flex items-center justify-center h-32">
              <p className="text-muted-foreground">OKR planning tools will be displayed here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}