"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Brain, 
  Sparkles, 
  MessageSquare, 
  TrendingUp, 
  Shield, 
  Bot,
  Target,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  LineChart,
  Lightbulb,
  Cpu,
  Database,
  FileText,
  Search,
  Filter,
  Settings,
  PlayCircle,
  PauseCircle,
  RefreshCw,
  Download,
  Upload,
  Eye,
  Edit3,
  Plus,
  MoreHorizontal,
  Zap,
  Users,
  Globe,
  Lock,
  Key,
  Activity
} from "lucide-react"

interface AiRecommendation {
  id: string
  type: "strategic" | "financial" | "operational" | "risk" | "compliance"
  title: string
  description: string
  confidence: number
  impact: "low" | "medium" | "high" | "critical"
  effort: "low" | "medium" | "high"
  priority: number
  reasoning: string[]
  suggestedActions: string[]
  relatedModules: string[]
  createdAt: string
  status: "new" | "reviewing" | "accepted" | "declined" | "implemented"
}

interface FinancialModel {
  id: string
  name: string
  type: "revenue" | "costs" | "cash-flow" | "valuation" | "scenario"
  description: string
  assumptions: Assumption[]
  projections: Record<string, number[]>
  scenarios: Scenario[]
  lastUpdated: string
  status: "draft" | "active" | "archived"
  aiGenerated: boolean
  accuracy: number
}

interface Assumption {
  name: string
  value: number | string
  type: "percentage" | "currency" | "number" | "text"
  source: "user" | "ai" | "market-data"
  confidence: number
}

interface Scenario {
  name: string
  description: string
  probability: number
  assumptions: Record<string, number | string>
  projections: Record<string, number[]>
}

interface RiskAlert {
  id: string
  title: string
  description: string
  severity: "low" | "medium" | "high" | "critical"
  category: "financial" | "operational" | "strategic" | "compliance" | "technical"
  probability: number
  impact: number
  riskScore: number
  mitigation: string[]
  owner: string
  dueDate: string
  status: "open" | "monitoring" | "mitigated" | "closed"
  aiDetected: boolean
  relatedMetrics: string[]
}

interface AiInsight {
  id: string
  title: string
  description: string
  type: "trend" | "anomaly" | "opportunity" | "warning" | "prediction"
  confidence: number
  dataPoints: string[]
  visualization: string
  recommendations: string[]
  createdAt: string
}

export function AiCapabilitiesClient() {
  const [activeTab, setActiveTab] = useState("guidance")
  
  const [recommendations] = useState<AiRecommendation[]>([
    {
      id: "rec-1",
      type: "strategic",
      title: "Expand Customer Acquisition Channels",
      description: "AI analysis suggests diversifying customer acquisition beyond current digital channels",
      confidence: 0.87,
      impact: "high",
      effort: "medium",
      priority: 1,
      reasoning: [
        "Current CAC is 23% higher than industry average",
        "Over-reliance on paid search (78% of acquisitions)",
        "Strong organic growth potential identified in content marketing",
        "Competitor analysis shows untapped channel opportunities"
      ],
      suggestedActions: [
        "Develop content marketing strategy targeting long-tail keywords",
        "Implement referral program with 15% revenue sharing",
        "Explore partnership channels with complementary SaaS tools",
        "Invest in organic social media presence"
      ],
      relatedModules: ["Business Model", "Marketing Strategy", "Financial Planning"],
      createdAt: "2024-10-24T09:15:00Z",
      status: "new"
    },
    {
      id: "rec-2",
      type: "financial",
      title: "Optimize Pricing Strategy",
      description: "Price elasticity analysis suggests revenue optimization opportunities",
      confidence: 0.92,
      impact: "critical",
      effort: "low",
      priority: 2,
      reasoning: [
        "Low price sensitivity detected in enterprise segment",
        "23% revenue increase possible with tier restructuring",
        "Competitor pricing analysis shows positioning gap",
        "Customer feedback indicates value underestimation"
      ],
      suggestedActions: [
        "Increase enterprise tier pricing by 18%",
        "Add premium features to justify pricing",
        "Implement usage-based pricing for large accounts",
        "A/B test new pricing with 10% of prospects"
      ],
      relatedModules: ["Business Model", "Financial Modeling", "Sales Strategy"],
      createdAt: "2024-10-24T08:45:00Z",
      status: "reviewing"
    }
  ])

  const [financialModels] = useState<FinancialModel[]>([
    {
      id: "model-1",
      name: "5-Year Revenue Projection",
      type: "revenue",
      description: "AI-generated revenue projections based on historical data and market trends",
      assumptions: [
        { name: "Monthly Growth Rate", value: 8.5, type: "percentage", source: "ai", confidence: 0.78 },
        { name: "Churn Rate", value: 5.2, type: "percentage", source: "user", confidence: 0.95 },
        { name: "Average Revenue Per User", value: 89, type: "currency", source: "ai", confidence: 0.82 }
      ],
      projections: {
        "revenue": [245000, 312000, 425000, 580000, 795000],
        "customers": [2750, 3500, 4775, 6515, 8930],
        "mrr": [20416, 26000, 35416, 48333, 66250]
      },
      scenarios: [
        {
          name: "Conservative",
          description: "Lower growth assumptions",
          probability: 0.25,
          assumptions: { "Monthly Growth Rate": 5.5 },
          projections: { "revenue": [210000, 250000, 315000, 395000, 495000] }
        },
        {
          name: "Aggressive",
          description: "Higher growth with market expansion",
          probability: 0.15,
          assumptions: { "Monthly Growth Rate": 12.0 },
          projections: { "revenue": [280000, 420000, 630000, 945000, 1420000] }
        }
      ],
      lastUpdated: "2024-10-24T10:30:00Z",
      status: "active",
      aiGenerated: true,
      accuracy: 0.84
    }
  ])

  const [riskAlerts] = useState<RiskAlert[]>([
    {
      id: "risk-1",
      title: "Customer Concentration Risk",
      description: "Top 3 customers represent 47% of total revenue",
      severity: "high",
      category: "financial",
      probability: 0.35,
      impact: 8.5,
      riskScore: 85,
      mitigation: [
        "Diversify customer base through SMB acquisition",
        "Implement customer success programs for top accounts",
        "Develop enterprise contracts with longer terms",
        "Create customer advisory board"
      ],
      owner: "Revenue Operations",
      dueDate: "2024-11-30T00:00:00Z",
      status: "open",
      aiDetected: true,
      relatedMetrics: ["Revenue Concentration", "Customer Lifetime Value", "Churn Rate"]
    },
    {
      id: "risk-2",
      title: "Technical Debt Accumulation",
      description: "Code complexity metrics indicate potential scalability issues",
      severity: "medium",
      category: "technical",
      probability: 0.65,
      impact: 6.0,
      riskScore: 65,
      mitigation: [
        "Allocate 20% of engineering capacity to refactoring",
        "Implement automated code quality gates",
        "Conduct architecture review with external consultant",
        "Create technical debt reduction roadmap"
      ],
      owner: "Engineering",
      dueDate: "2024-12-15T00:00:00Z",
      status: "monitoring",
      aiDetected: true,
      relatedMetrics: ["Code Complexity", "Deployment Frequency", "System Performance"]
    }
  ])

  const [aiInsights] = useState<AiInsight[]>([
    {
      id: "insight-1",
      title: "Seasonal Revenue Pattern Detected",
      description: "Revenue shows 23% increase in Q4, suggesting seasonal business opportunities",
      type: "trend",
      confidence: 0.91,
      dataPoints: ["Monthly Revenue", "Customer Acquisition", "Product Usage"],
      visualization: "line-chart",
      recommendations: [
        "Plan Q4 marketing campaigns early",
        "Prepare infrastructure for seasonal load",
        "Develop Q4-specific product features",
        "Align sales team for end-of-year push"
      ],
      createdAt: "2024-10-24T07:30:00Z"
    },
    {
      id: "insight-2",
      title: "Feature Usage Anomaly",
      description: "Advanced analytics feature usage dropped 34% despite positive feedback",
      type: "anomaly",
      confidence: 0.86,
      dataPoints: ["Feature Usage", "User Feedback", "Support Tickets"],
      visualization: "bar-chart",
      recommendations: [
        "Investigate UI/UX issues in analytics module",
        "Provide additional user training resources",
        "Simplify analytics workflow",
        "Consider feature placement in navigation"
      ],
      createdAt: "2024-10-24T06:45:00Z"
    }
  ])

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="guidance" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            AI Guidance
          </TabsTrigger>
          <TabsTrigger value="financial" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Financial Modeling
          </TabsTrigger>
          <TabsTrigger value="risk" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Risk Monitoring
          </TabsTrigger>
          <TabsTrigger value="insights" className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            AI Insights
          </TabsTrigger>
          <TabsTrigger value="chat" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            AI Assistant
          </TabsTrigger>
        </TabsList>

        <TabsContent value="guidance" className="space-y-6">
          <IntelligentGuidance recommendations={recommendations} />
        </TabsContent>

        <TabsContent value="financial" className="space-y-6">
          <FinancialModeling models={financialModels} />
        </TabsContent>

        <TabsContent value="risk" className="space-y-6">
          <RiskMonitoring alerts={riskAlerts} />
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <AiInsightsDashboard insights={aiInsights} />
        </TabsContent>

        <TabsContent value="chat" className="space-y-6">
          <AiChatInterface />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function IntelligentGuidance({ recommendations }: { recommendations: AiRecommendation[] }) {
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "critical": return "bg-red-100 text-red-800 border-red-200"
      case "high": return "bg-orange-100 text-orange-800 border-orange-200"
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low": return "bg-green-100 text-green-800 border-green-200"
      default: return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new": return "bg-blue-100 text-blue-800"
      case "reviewing": return "bg-yellow-100 text-yellow-800"
      case "accepted": return "bg-green-100 text-green-800"
      case "declined": return "bg-red-100 text-red-800"
      case "implemented": return "bg-purple-100 text-purple-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Intelligent Guidance</h2>
          <p className="text-muted-foreground">AI-powered recommendations for strategic decisions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Generate New
          </Button>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Configure AI
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        {recommendations.map((rec) => (
          <Card key={rec.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Sparkles className="h-5 w-5 text-blue-600" />
                  <CardTitle className="text-lg">{rec.title}</CardTitle>
                  <Badge className={getImpactColor(rec.impact)}>
                    {rec.impact} impact
                  </Badge>
                  <Badge variant="outline">
                    {rec.effort} effort
                  </Badge>
                  <Badge className={getStatusColor(rec.status)}>
                    {rec.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {Math.round(rec.confidence * 100)}% confidence
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Priority {rec.priority}
                  </Badge>
                </div>
              </div>
              <p className="text-muted-foreground">{rec.description}</p>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">AI Reasoning</h4>
                  <ul className="space-y-2">
                    {rec.reasoning.map((reason, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <Brain className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        {reason}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Suggested Actions</h4>
                  <ul className="space-y-2">
                    {rec.suggestedActions.map((action, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <Target className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Related Modules</h4>
                <div className="flex gap-2">
                  {rec.relatedModules.map((module, i) => (
                    <Badge key={i} variant="secondary">
                      {module}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between border-t pt-4">
                <span className="text-xs text-muted-foreground">
                  Generated: {new Date(rec.createdAt).toLocaleString()}
                </span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    Details
                  </Button>
                  <Button variant="outline" size="sm">
                    Accept
                  </Button>
                  <Button variant="outline" size="sm">
                    Decline
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function FinancialModeling({ models }: { models: FinancialModel[] }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">AI Financial Modeling</h2>
          <p className="text-muted-foreground">Automated financial projections and scenario planning</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            New Model
          </Button>
          <Button variant="outline">
            <Bot className="h-4 w-4 mr-2" />
            AI Generate
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        {models.map((model) => (
          <Card key={model.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <BarChart3 className="h-5 w-5" />
                  <CardTitle className="text-lg">{model.name}</CardTitle>
                  <Badge variant="outline">{model.type}</Badge>
                  {model.aiGenerated && (
                    <Badge className="bg-blue-100 text-blue-800">
                      <Bot className="h-3 w-3 mr-1" />
                      AI Generated
                    </Badge>
                  )}
                  <Badge variant="secondary">{model.status}</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {Math.round(model.accuracy * 100)}% accuracy
                  </Badge>
                </div>
              </div>
              <p className="text-muted-foreground">{model.description}</p>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Key Assumptions</h4>
                  <div className="space-y-3">
                    {model.assumptions.map((assumption, i) => (
                      <div key={i} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-sm">{assumption.name}</span>
                          <div className="flex gap-1">
                            {assumption.source === "ai" && (
                              <Badge variant="outline" className="text-xs">AI</Badge>
                            )}
                            <Badge variant="outline" className="text-xs">
                              {Math.round(assumption.confidence * 100)}%
                            </Badge>
                          </div>
                        </div>
                        <div className="text-sm">
                          {assumption.type === "percentage" ? `${assumption.value}%` : 
                           assumption.type === "currency" ? `$${assumption.value}` : 
                           assumption.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">5-Year Projections</h4>
                  <div className="space-y-3">
                    {Object.entries(model.projections).map(([metric, values]) => (
                      <div key={metric} className="p-3 border rounded-lg">
                        <div className="font-medium text-sm mb-2 capitalize">
                          {metric.replace(/([A-Z])/g, ' $1').trim()}
                        </div>
                        <div className="flex gap-2 text-xs">
                          {values.map((value, i) => (
                            <div key={i} className="flex flex-col items-center">
                              <span className="text-muted-foreground">Y{i + 1}</span>
                              <span className="font-medium">
                                {metric === "revenue" || metric === "mrr" ? 
                                  `$${(value / 1000).toFixed(0)}k` : 
                                  value.toLocaleString()}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Scenarios</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {model.scenarios.map((scenario, i) => (
                    <div key={i} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">{scenario.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {Math.round(scenario.probability * 100)}%
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{scenario.description}</p>
                      <div className="text-xs">
                        Revenue Y5: ${(scenario.projections.revenue?.[4] || 0) / 1000}k
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between border-t pt-4">
                <span className="text-xs text-muted-foreground">
                  Last updated: {new Date(model.lastUpdated).toLocaleString()}
                </span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit3 className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function RiskMonitoring({ alerts }: { alerts: RiskAlert[] }) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-red-100 text-red-800 border-red-200"
      case "high": return "bg-orange-100 text-orange-800 border-orange-200"
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low": return "bg-green-100 text-green-800 border-green-200"
      default: return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "financial": return DollarSign
      case "operational": return Settings
      case "strategic": return Target
      case "compliance": return Shield
      case "technical": return Cpu
      default: return AlertTriangle
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">AI Risk Monitoring</h2>
          <p className="text-muted-foreground">Intelligent risk detection and monitoring</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Scan Risks
          </Button>
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Risk
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Critical Risks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">3</div>
            <p className="text-xs text-muted-foreground">Require immediate attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">High Priority</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">7</div>
            <p className="text-xs text-muted-foreground">Action needed within 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">AI Detected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">12</div>
            <p className="text-xs text-muted-foreground">Automatically identified</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg Risk Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68</div>
            <p className="text-xs text-muted-foreground">Down 8 points this month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4">
        {alerts.map((alert) => {
          const CategoryIcon = getCategoryIcon(alert.category)
          
          return (
            <Card key={alert.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CategoryIcon className="h-5 w-5" />
                    <CardTitle className="text-lg">{alert.title}</CardTitle>
                    <Badge className={getSeverityColor(alert.severity)}>
                      {alert.severity}
                    </Badge>
                    <Badge variant="outline">{alert.category}</Badge>
                    {alert.aiDetected && (
                      <Badge className="bg-blue-100 text-blue-800">
                        <Bot className="h-3 w-3 mr-1" />
                        AI Detected
                      </Badge>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">{alert.riskScore}</div>
                    <div className="text-xs text-muted-foreground">Risk Score</div>
                  </div>
                </div>
                <p className="text-muted-foreground">{alert.description}</p>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-medium text-sm mb-2">Risk Assessment</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Probability:</span>
                        <span className="font-medium">{Math.round(alert.probability * 100)}%</span>
                      </div>
                      <Progress value={alert.probability * 100} className="h-2" />
                      <div className="flex justify-between text-sm">
                        <span>Impact:</span>
                        <span className="font-medium">{alert.impact}/10</span>
                      </div>
                      <Progress value={alert.impact * 10} className="h-2" />
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm mb-2">Mitigation Actions</h4>
                    <ul className="space-y-1">
                      {alert.mitigation.slice(0, 3).map((action, i) => (
                        <li key={i} className="text-sm flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                          {action}
                        </li>
                      ))}
                      {alert.mitigation.length > 3 && (
                        <li className="text-xs text-muted-foreground">
                          +{alert.mitigation.length - 3} more actions
                        </li>
                      )}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm mb-2">Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Owner:</span>
                        <span className="font-medium">{alert.owner}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Due Date:</span>
                        <span className="font-medium">
                          {new Date(alert.dueDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Status:</span>
                        <Badge variant="outline" className="text-xs">
                          {alert.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-sm mb-2">Related Metrics</h4>
                  <div className="flex gap-2">
                    {alert.relatedMetrics.map((metric, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {metric}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

function AiInsightsDashboard({ insights }: { insights: AiInsight[] }) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "trend": return TrendingUp
      case "anomaly": return AlertTriangle
      case "opportunity": return Target
      case "warning": return AlertTriangle
      case "prediction": return Brain
      default: return Lightbulb
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "trend": return "bg-blue-100 text-blue-800"
      case "anomaly": return "bg-red-100 text-red-800"
      case "opportunity": return "bg-green-100 text-green-800"
      case "warning": return "bg-yellow-100 text-yellow-800"
      case "prediction": return "bg-purple-100 text-purple-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">AI Insights Dashboard</h2>
          <p className="text-muted-foreground">Data-driven insights and predictive analytics</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        {insights.map((insight) => {
          const TypeIcon = getTypeIcon(insight.type)
          
          return (
            <Card key={insight.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <TypeIcon className="h-5 w-5" />
                    <CardTitle className="text-lg">{insight.title}</CardTitle>
                    <Badge className={getTypeColor(insight.type)}>
                      {insight.type}
                    </Badge>
                    <Badge variant="outline">
                      {Math.round(insight.confidence * 100)}% confidence
                    </Badge>
                  </div>
                </div>
                <p className="text-muted-foreground">{insight.description}</p>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Data Sources</h4>
                    <div className="space-y-2">
                      {insight.dataPoints.map((point, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                          <Database className="h-3 w-3 text-blue-600" />
                          {point}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Recommendations</h4>
                    <ul className="space-y-2">
                      {insight.recommendations.map((rec, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <Lightbulb className="h-3 w-3 text-yellow-600 mt-0.5 flex-shrink-0" />
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart3 className="h-4 w-4" />
                    <span className="font-medium text-sm">Visualization</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {insight.visualization} - Interactive chart showing data trends and patterns
                  </div>
                </div>

                <div className="flex items-center justify-between border-t pt-4">
                  <span className="text-xs text-muted-foreground">
                    Generated: {new Date(insight.createdAt).toLocaleString()}
                  </span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View Chart
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

function AiChatInterface() {
  const [messages, setMessages] = useState([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm your AI assistant for ReqArchitect. I can help you with strategic planning, financial analysis, risk assessment, and more. What would you like to explore today?",
      timestamp: new Date().toISOString()
    }
  ])
  const [inputValue, setInputValue] = useState("")

  const sendMessage = () => {
    if (!inputValue.trim()) return

    const newMessage = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date().toISOString()
    }

    setMessages(prev => [...prev, newMessage])
    setInputValue("")

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I understand you're asking about " + inputValue + ". Let me analyze your data and provide insights...",
        timestamp: new Date().toISOString()
      }
      setMessages(prev => [...prev, aiResponse])
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">AI Assistant</h2>
          <p className="text-muted-foreground">Natural language interface for business intelligence</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      <Card className="h-[600px] flex flex-col">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-blue-600" />
            <CardTitle className="text-lg">ReqArchitect AI</CardTitle>
            <Badge variant="outline" className="text-xs">
              <Activity className="h-3 w-3 mr-1" />
              Online
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col gap-4">
          <div className="flex-1 overflow-auto space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  <div className="text-sm">{message.content}</div>
                  <div className="text-xs opacity-70 mt-1">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask me about your business metrics, strategies, or risks..."
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1"
            />
            <Button onClick={sendMessage}>
              <MessageSquare className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <Button variant="outline" size="sm" className="text-xs">
              Show revenue trends
            </Button>
            <Button variant="outline" size="sm" className="text-xs">
              Analyze customer churn
            </Button>
            <Button variant="outline" size="sm" className="text-xs">
              Risk assessment summary
            </Button>
            <Button variant="outline" size="sm" className="text-xs">
              Strategic recommendations
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}