"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { AlertTriangle, TrendingUp, Target, Activity } from "lucide-react"

interface CapabilityMaturity {
  id: string
  name: string
  category: string
  currentLevel: number
  targetLevel: number
  confidence: number
  lastAssessed: string
  evidencePoints: string[]
  trend: 'up' | 'down' | 'stable'
}

export function MaturityDashboard() {
  const capabilities: CapabilityMaturity[] = [
    {
      id: "customer-service",
      name: "Customer Service",
      category: "Operations",
      currentLevel: 4,
      targetLevel: 4,
      confidence: 92,
      lastAssessed: "2 hours ago",
      evidencePoints: ["Using Zendesk + Salesforce, integrated", "CSAT tracked weekly", "Automated workflows"],
      trend: 'up'
    },
    {
      id: "data-management",
      name: "Data Management",
      category: "Technology",
      currentLevel: 1,
      targetLevel: 3,
      confidence: 67,
      lastAssessed: "1 day ago",
      evidencePoints: ["Manual spreadsheet processes", "No data governance", "Multiple disconnected sources"],
      trend: 'stable'
    },
    {
      id: "analytics",
      name: "Analytics & BI",
      category: "Technology",
      currentLevel: 2,
      targetLevel: 4,
      confidence: 84,
      lastAssessed: "5 hours ago",
      evidencePoints: ["Basic reporting tools", "Some automation", "Limited self-service"],
      trend: 'up'
    },
    {
      id: "security",
      name: "Security",
      category: "Technology",
      currentLevel: 3,
      targetLevel: 4,
      confidence: 76,
      lastAssessed: "3 hours ago",
      evidencePoints: ["SSO implemented", "Basic monitoring", "Policies documented"],
      trend: 'stable'
    },
    {
      id: "product-mgmt",
      name: "Product Management",
      category: "Product",
      currentLevel: 3,
      targetLevel: 4,
      confidence: 88,
      lastAssessed: "6 hours ago",
      evidencePoints: ["Roadmap planning", "User feedback loops", "Analytics tracking"],
      trend: 'up'
    },
    {
      id: "engineering",
      name: "Engineering",
      category: "Technology",
      currentLevel: 4,
      targetLevel: 5,
      confidence: 95,
      lastAssessed: "1 hour ago",
      evidencePoints: ["CI/CD pipeline", "Automated testing", "Code reviews", "Performance monitoring"],
      trend: 'up'
    }
  ]

  const overallMaturity = capabilities.reduce((sum, cap) => sum + cap.currentLevel, 0) / capabilities.length
  const capabilitiesNeedingAttention = capabilities.filter(cap => cap.currentLevel < cap.targetLevel - 1)
  const lowConfidenceAssessments = capabilities.filter(cap => cap.confidence < 80)

  const getMaturityLevelColor = (level: number) => {
    switch (level) {
      case 1: return "bg-red-500"
      case 2: return "bg-orange-500"
      case 3: return "bg-yellow-500"
      case 4: return "bg-green-500"
      case 5: return "bg-blue-500"
      default: return "bg-gray-500"
    }
  }

  const getMaturityLevelName = (level: number) => {
    switch (level) {
      case 1: return "Initial"
      case 2: return "Managed"
      case 3: return "Defined"
      case 4: return "Quantitatively Managed"
      case 5: return "Optimizing"
      default: return "Unknown"
    }
  }

  return (
    <div className="space-y-6">
      {/* Overall Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Maturity</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallMaturity.toFixed(1)} / 5.0</div>
            <p className="text-xs text-muted-foreground">
              +0.3 vs. last quarter
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Capabilities Assessed</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{capabilities.length}</div>
            <p className="text-xs text-muted-foreground">
              100% validation complete
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Need Attention</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{capabilitiesNeedingAttention.length}</div>
            <p className="text-xs text-muted-foreground">
              Below target maturity
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Improving</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {capabilities.filter(cap => cap.trend === 'up').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Capabilities trending up
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Maturity Heatmap */}
      <Card>
        <CardHeader>
          <CardTitle>Capability Maturity Heatmap</CardTitle>
          <CardDescription>
            Current maturity levels across all capabilities with confidence indicators
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {capabilities.map((capability) => (
              <div key={capability.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 rounded-full bg-blue-500 flex-shrink-0" />
                    <div>
                      <div className="font-medium">{capability.name}</div>
                      <div className="text-sm text-muted-foreground">{capability.category}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-sm font-medium">
                        Level {capability.currentLevel}
                        {capability.targetLevel > capability.currentLevel && (
                          <span className="text-muted-foreground"> → {capability.targetLevel}</span>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {capability.confidence}% confident
                      </div>
                    </div>
                    <Badge 
                      variant="secondary" 
                      className={`${getMaturityLevelColor(capability.currentLevel)} text-white`}
                    >
                      {getMaturityLevelName(capability.currentLevel)}
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-5 gap-1 h-2">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div
                      key={level}
                      className={`rounded-sm ${
                        level <= capability.currentLevel
                          ? getMaturityLevelColor(capability.currentLevel)
                          : level <= capability.targetLevel
                          ? "bg-gray-200 border-2 border-dashed border-gray-400"
                          : "bg-gray-100"
                      }`}
                    />
                  ))}
                </div>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Last assessed: {capability.lastAssessed}</span>
                  <span>
                    {capability.trend === 'up' && '↗ Improving'}
                    {capability.trend === 'down' && '↘ Declining'}
                    {capability.trend === 'stable' && '→ Stable'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Alerts & Action Items */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              <span>Capabilities Needing Attention</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {capabilitiesNeedingAttention.map((capability) => (
                <div key={capability.id} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{capability.name}</div>
                    <div className="text-sm text-muted-foreground">
                      Level {capability.currentLevel}, Target: {capability.targetLevel}
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    View Recommendations
                  </Button>
                </div>
              ))}
              {capabilitiesNeedingAttention.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  All capabilities meeting target maturity levels
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Low Confidence Assessments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {lowConfidenceAssessments.map((capability) => (
                <div key={capability.id} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{capability.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {capability.confidence}% confidence
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Validate
                  </Button>
                </div>
              ))}
              {lowConfidenceAssessments.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  All assessments have high confidence levels
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}