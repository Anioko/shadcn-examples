"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { 
  Target, 
  TrendingUp, 
  BarChart3,
  LineChart,
  Users,
  Building2,
  Lightbulb,
  Globe,
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  Eye,
  Download,
  Upload,
  Plus,
  Minus,
  Settings,
  Search,
  Filter,
  RefreshCw,
  PlayCircle,
  PauseCircle,
  Zap,
  Brain,
  Activity,
  Award,
  Flag,
  Map,
  Compass,
  Star,
  TrendingDown
} from "lucide-react"

interface StrategicObjective {
  id: string
  title: string
  description: string
  category: "growth" | "operational" | "financial" | "innovation"
  status: "not-started" | "in-progress" | "at-risk" | "completed"
  priority: "low" | "medium" | "high" | "critical"
  keyResults: KeyResult[]
  owner: string
  dueDate: string
  progress: number
  timeframe: "quarter" | "annual" | "3-year"
}

interface KeyResult {
  id: string
  description: string
  targetValue: number
  currentValue: number
  unit: string
  measurable: boolean
  achievable: boolean
  relevant: boolean
  timeBound: boolean
}

interface CompetitiveAnalysis {
  competitor: string
  strengths: string[]
  weaknesses: string[]
  marketPosition: number
  marketShare: number
  threats: string[]
  opportunities: string[]
}

interface MarketResearch {
  segment: string
  size: number
  growth: number
  trends: string[]
  customerNeeds: string[]
  barriers: string[]
  opportunities: string[]
}

interface StrategicInitiative {
  id: string
  name: string
  description: string
  status: "planning" | "active" | "on-hold" | "completed"
  impact: "low" | "medium" | "high"
  effort: "low" | "medium" | "high"
  startDate: string
  endDate: string
  budget: number
  resources: string[]
  milestones: Milestone[]
}

interface Milestone {
  id: string
  title: string
  dueDate: string
  status: "pending" | "in-progress" | "completed" | "overdue"
  dependencies: string[]
}

export function StrategicPlanningClient() {
  const [activeTab, setActiveTab] = useState("overview")
  
  const [objectives] = useState<StrategicObjective[]>([
    {
      id: "obj-1",
      title: "Increase Market Share",
      description: "Grow market share from 12% to 18% through product expansion and geographic growth",
      category: "growth",
      status: "in-progress",
      priority: "high",
      keyResults: [
        {
          id: "kr-1",
          description: "Achieve 18% market share",
          targetValue: 18,
          currentValue: 14.2,
          unit: "%",
          measurable: true,
          achievable: true,
          relevant: true,
          timeBound: true
        },
        {
          id: "kr-2", 
          description: "Launch in 3 new markets",
          targetValue: 3,
          currentValue: 1,
          unit: "markets",
          measurable: true,
          achievable: true,
          relevant: true,
          timeBound: true
        }
      ],
      owner: "VP Growth",
      dueDate: "2024-12-31",
      progress: 67,
      timeframe: "annual"
    },
    {
      id: "obj-2",
      title: "Operational Excellence",
      description: "Improve operational efficiency and reduce costs by 15%",
      category: "operational",
      status: "in-progress",
      priority: "high",
      keyResults: [
        {
          id: "kr-3",
          description: "Reduce operational costs by 15%",
          targetValue: 15,
          currentValue: 8.5,
          unit: "%",
          measurable: true,
          achievable: true,
          relevant: true,
          timeBound: true
        }
      ],
      owner: "COO",
      dueDate: "2024-12-31",
      progress: 57,
      timeframe: "annual"
    },
    {
      id: "obj-3",
      title: "Innovation Leadership",
      description: "Establish market leadership in product innovation and R&D capabilities",
      category: "innovation",
      status: "in-progress",
      priority: "medium",
      keyResults: [
        {
          id: "kr-4",
          description: "Launch 2 breakthrough products",
          targetValue: 2,
          currentValue: 1,
          unit: "products",
          measurable: true,
          achievable: true,
          relevant: true,
          timeBound: true
        }
      ],
      owner: "CTO",
      dueDate: "2024-12-31",
      progress: 45,
      timeframe: "annual"
    }
  ])

  const [competitiveAnalysis] = useState<CompetitiveAnalysis[]>([
    {
      competitor: "Market Leader A",
      strengths: ["Strong brand recognition", "Extensive distribution", "R&D capabilities"],
      weaknesses: ["High prices", "Legacy technology", "Slow innovation"],
      marketPosition: 1,
      marketShare: 32.5,
      threats: ["Price competition", "Market disruption"],
      opportunities: ["Digital transformation", "Emerging markets"]
    },
    {
      competitor: "Competitor B",
      strengths: ["Cost leadership", "Operational efficiency", "Global presence"],
      weaknesses: ["Limited innovation", "Brand perception", "Product quality"],
      marketPosition: 2,
      marketShare: 24.8,
      threats: ["Quality issues", "Talent retention"],
      opportunities: ["Premium segment", "Technology partnerships"]
    }
  ])

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="okrs" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            OKRs
          </TabsTrigger>
          <TabsTrigger value="competitive" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Competitive
          </TabsTrigger>
          <TabsTrigger value="market" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Market Research
          </TabsTrigger>
          <TabsTrigger value="roadmap" className="flex items-center gap-2">
            <Map className="h-4 w-4" />
            Roadmap
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center gap-2">
            <Award className="h-4 w-4" />
            Performance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <StrategicOverview objectives={objectives} />
        </TabsContent>

        <TabsContent value="okrs" className="space-y-6">
          <OkrManagement objectives={objectives} />
        </TabsContent>

        <TabsContent value="competitive" className="space-y-6">
          <CompetitiveAnalysisView analysis={competitiveAnalysis} />
        </TabsContent>

        <TabsContent value="market" className="space-y-6">
          <MarketResearchView />
        </TabsContent>

        <TabsContent value="roadmap" className="space-y-6">
          <StrategicRoadmap />
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <PerformanceDashboard objectives={objectives} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function StrategicOverview({ objectives }: { objectives: StrategicObjective[] }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "text-green-600 bg-green-50"
      case "in-progress": return "text-blue-600 bg-blue-50"
      case "at-risk": return "text-orange-600 bg-orange-50"
      case "not-started": return "text-gray-600 bg-gray-50"
      default: return "text-gray-600 bg-gray-50"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "text-red-600 bg-red-50"
      case "high": return "text-orange-600 bg-orange-50"
      case "medium": return "text-yellow-600 bg-yellow-50"
      case "low": return "text-green-600 bg-green-50"
      default: return "text-gray-600 bg-gray-50"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Strategic Planning Dashboard</h2>
          <p className="text-muted-foreground">Comprehensive strategy management and execution tracking</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Import Strategy
          </Button>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Configure
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Objective
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Objectives</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{objectives.length}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-600" />
              3 in progress
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(objectives.reduce((acc, obj) => acc + obj.progress, 0) / objectives.length)}%
            </div>
            <p className="text-xs text-muted-foreground">
              On track for Q4
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Key Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {objectives.reduce((acc, obj) => acc + obj.keyResults.length, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              {objectives.reduce((acc, obj) => acc + obj.keyResults.filter(kr => kr.currentValue >= kr.targetValue).length, 0)} achieved
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Strategic Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Good</div>
            <p className="text-xs text-muted-foreground">
              85% alignment score
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Strategic Objectives</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {objectives.map((objective) => (
                <div key={objective.id} className="p-4 border rounded">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">{objective.title}</div>
                    <div className="flex gap-2">
                      <Badge className={getPriorityColor(objective.priority)}>
                        {objective.priority}
                      </Badge>
                      <Badge className={getStatusColor(objective.status)}>
                        {objective.status.replace('-', ' ')}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{objective.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{objective.progress}%</span>
                    </div>
                    <Progress value={objective.progress} className="h-2" />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>Owner: {objective.owner}</span>
                    <span>Due: {new Date(objective.dueDate).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Strategy Execution Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Strategic Timeline View</h3>
                <p className="text-muted-foreground mb-4">
                  Interactive Gantt chart showing objective timelines and dependencies
                </p>
                <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
                  <div className="p-3 border rounded">
                    <div className="font-medium">Q1 Objectives</div>
                    <div className="text-2xl font-bold text-blue-600">2</div>
                  </div>
                  <div className="p-3 border rounded">
                    <div className="font-medium">Q4 Targets</div>
                    <div className="text-2xl font-bold text-green-600">8</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Strategic Updates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 border rounded">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div className="flex-1">
                <div className="font-medium text-sm">Market Share Objective Updated</div>
                <div className="text-xs text-muted-foreground">Progress increased to 67% - on track for annual target</div>
              </div>
              <div className="text-xs text-muted-foreground">2 hours ago</div>
            </div>
            <div className="flex items-center gap-3 p-3 border rounded">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              <div className="flex-1">
                <div className="font-medium text-sm">Innovation Timeline Risk</div>
                <div className="text-xs text-muted-foreground">Product launch may be delayed due to regulatory approval</div>
              </div>
              <div className="text-xs text-muted-foreground">4 hours ago</div>
            </div>
            <div className="flex items-center gap-3 p-3 border rounded">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <div className="flex-1">
                <div className="font-medium text-sm">Competitive Analysis Updated</div>
                <div className="text-xs text-muted-foreground">New market insights added for Q4 planning</div>
              </div>
              <div className="text-xs text-muted-foreground">1 day ago</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function OkrManagement({ objectives }: { objectives: StrategicObjective[] }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">OKR Management</h2>
          <p className="text-muted-foreground">Objectives and Key Results tracking and management</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Sync Progress
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add OKR
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {objectives.map((objective) => (
          <Card key={objective.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  {objective.title}
                </CardTitle>
                <div className="flex gap-2">
                  <Badge variant="outline">{objective.category}</Badge>
                  <Badge variant="outline">{objective.timeframe}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">{objective.description}</p>
                
                <div className="space-y-3">
                  <h4 className="font-medium">Key Results</h4>
                  {objective.keyResults.map((kr) => (
                    <div key={kr.id} className="p-3 border rounded">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium text-sm">{kr.description}</div>
                        <div className="text-sm">
                          {kr.currentValue} / {kr.targetValue} {kr.unit}
                        </div>
                      </div>
                      <Progress 
                        value={(kr.currentValue / kr.targetValue) * 100} 
                        className="h-2"
                      />
                      <div className="flex gap-2 mt-2">
                        {kr.measurable && <Badge variant="outline" className="text-xs">Measurable</Badge>}
                        {kr.achievable && <Badge variant="outline" className="text-xs">Achievable</Badge>}
                        {kr.relevant && <Badge variant="outline" className="text-xs">Relevant</Badge>}
                        {kr.timeBound && <Badge variant="outline" className="text-xs">Time-bound</Badge>}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                  <div>
                    <div className="text-sm text-muted-foreground">Owner</div>
                    <div className="font-medium">{objective.owner}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Due Date</div>
                    <div className="font-medium">{new Date(objective.dueDate).toLocaleDateString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Overall Progress</div>
                    <div className="font-medium">{objective.progress}%</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function CompetitiveAnalysisView({ analysis }: { analysis: CompetitiveAnalysis[] }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Competitive Analysis</h2>
          <p className="text-muted-foreground">Market positioning and competitive intelligence</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Competitor
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {analysis.map((competitor, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {competitor.competitor}
                <div className="flex gap-2">
                  <Badge variant="outline">#{competitor.marketPosition}</Badge>
                  <Badge variant="secondary">{competitor.marketShare}% share</Badge>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-green-600 mb-2">Strengths</h4>
                  <ul className="space-y-1">
                    {competitor.strengths.map((strength, i) => (
                      <li key={i} className="text-sm flex items-center gap-2">
                        <div className="w-1 h-1 bg-green-600 rounded-full" />
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-red-600 mb-2">Weaknesses</h4>
                  <ul className="space-y-1">
                    {competitor.weaknesses.map((weakness, i) => (
                      <li key={i} className="text-sm flex items-center gap-2">
                        <div className="w-1 h-1 bg-red-600 rounded-full" />
                        {weakness}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div>
                    <h4 className="font-medium text-orange-600 mb-2">Threats</h4>
                    <ul className="space-y-1">
                      {competitor.threats.map((threat, i) => (
                        <li key={i} className="text-xs">{threat}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-600 mb-2">Opportunities</h4>
                    <ul className="space-y-1">
                      {competitor.opportunities.map((opportunity, i) => (
                        <li key={i} className="text-xs">{opportunity}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Competitive Landscape</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Market Position Matrix</h3>
              <p className="text-muted-foreground mb-4">
                Interactive competitive positioning chart based on market share and performance
              </p>
              <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
                <div className="p-3 border rounded">
                  <div className="font-medium">Our Position</div>
                  <div className="text-2xl font-bold text-blue-600">#3</div>
                  <div className="text-sm text-muted-foreground">12% share</div>
                </div>
                <div className="p-3 border rounded">
                  <div className="font-medium">Target Position</div>
                  <div className="text-2xl font-bold text-green-600">#2</div>
                  <div className="text-sm text-muted-foreground">18% share</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function MarketResearchView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Market Research & Intelligence</h2>
          <p className="text-muted-foreground">Market trends, customer insights, and growth opportunities</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Update Data
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Research
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Addressable Market</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45.2B</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-600" />
              +12.5% CAGR
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Serviceable Market</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12.8B</div>
            <p className="text-xs text-muted-foreground">
              28% of TAM
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Market Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">15.4%</div>
            <p className="text-xs text-muted-foreground">
              Annual growth rate
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Market Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 border rounded">
                <div className="font-medium text-sm">Digital Transformation</div>
                <div className="text-xs text-muted-foreground mb-2">
                  Enterprise adoption of cloud-native solutions accelerating
                </div>
                <Badge variant="default" className="text-xs">High Impact</Badge>
              </div>
              <div className="p-3 border rounded">
                <div className="font-medium text-sm">AI Integration</div>
                <div className="text-xs text-muted-foreground mb-2">
                  Demand for AI-powered business solutions growing rapidly
                </div>
                <Badge variant="default" className="text-xs">High Impact</Badge>
              </div>
              <div className="p-3 border rounded">
                <div className="font-medium text-sm">Sustainability Focus</div>
                <div className="text-xs text-muted-foreground mb-2">
                  ESG considerations becoming key buying criteria
                </div>
                <Badge variant="secondary" className="text-xs">Medium Impact</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Customer Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="font-medium text-sm mb-2">Top Customer Needs</div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Cost reduction</span>
                    <span className="font-medium">89%</span>
                  </div>
                  <Progress value={89} className="h-2" />
                  
                  <div className="flex justify-between text-sm">
                    <span>Improved efficiency</span>
                    <span className="font-medium">76%</span>
                  </div>
                  <Progress value={76} className="h-2" />
                  
                  <div className="flex justify-between text-sm">
                    <span>Better integration</span>
                    <span className="font-medium">68%</span>
                  </div>
                  <Progress value={68} className="h-2" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Market Opportunity Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Globe className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Geographic Market Analysis</h3>
              <p className="text-muted-foreground mb-4">
                Interactive market size and opportunity mapping by region
              </p>
              <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
                <div className="p-3 border rounded">
                  <div className="font-medium">North America</div>
                  <div className="text-2xl font-bold text-blue-600">$18.2B</div>
                  <div className="text-sm text-muted-foreground">40% of TAM</div>
                </div>
                <div className="p-3 border rounded">
                  <div className="font-medium">Europe</div>
                  <div className="text-2xl font-bold text-green-600">$15.1B</div>
                  <div className="text-sm text-muted-foreground">33% of TAM</div>
                </div>
                <div className="p-3 border rounded">
                  <div className="font-medium">Asia Pacific</div>
                  <div className="text-2xl font-bold text-purple-600">$11.9B</div>
                  <div className="text-sm text-muted-foreground">27% of TAM</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function StrategicRoadmap() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Strategic Roadmap</h2>
          <p className="text-muted-foreground">Multi-year strategic initiatives and milestone planning</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Roadmap
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Initiative
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Strategic Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Map className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Interactive Strategic Roadmap</h3>
              <p className="text-muted-foreground mb-4">
                Visual timeline of strategic initiatives, milestones, and dependencies
              </p>
              <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
                <div className="p-3 border rounded">
                  <div className="font-medium">2024 Q1</div>
                  <div className="text-lg font-bold text-blue-600">3</div>
                  <div className="text-sm text-muted-foreground">Initiatives</div>
                </div>
                <div className="p-3 border rounded">
                  <div className="font-medium">2024 Q2</div>
                  <div className="text-lg font-bold text-green-600">5</div>
                  <div className="text-sm text-muted-foreground">Initiatives</div>
                </div>
                <div className="p-3 border rounded">
                  <div className="font-medium">2024 Q3</div>
                  <div className="text-lg font-bold text-purple-600">4</div>
                  <div className="text-sm text-muted-foreground">Initiatives</div>
                </div>
                <div className="p-3 border rounded">
                  <div className="font-medium">2024 Q4</div>
                  <div className="text-lg font-bold text-orange-600">2</div>
                  <div className="text-sm text-muted-foreground">Initiatives</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Active Initiatives</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 border rounded">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium text-sm">Market Expansion Program</div>
                  <Badge variant="default">High Impact</Badge>
                </div>
                <div className="text-xs text-muted-foreground mb-2">
                  Enter 3 new geographic markets with localized product offerings
                </div>
                <div className="flex justify-between text-xs">
                  <span>Q1 2024 - Q4 2024</span>
                  <span className="font-medium">65% Complete</span>
                </div>
                <Progress value={65} className="h-1 mt-1" />
              </div>
              
              <div className="p-3 border rounded">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium text-sm">Digital Platform Upgrade</div>
                  <Badge variant="secondary">Medium Impact</Badge>
                </div>
                <div className="text-xs text-muted-foreground mb-2">
                  Modernize core platform with cloud-native architecture
                </div>
                <div className="flex justify-between text-xs">
                  <span>Q2 2024 - Q1 2025</span>
                  <span className="font-medium">30% Complete</span>
                </div>
                <Progress value={30} className="h-1 mt-1" />
              </div>

              <div className="p-3 border rounded">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium text-sm">AI Innovation Lab</div>
                  <Badge variant="default">High Impact</Badge>
                </div>
                <div className="text-xs text-muted-foreground mb-2">
                  Establish dedicated AI research and development center
                </div>
                <div className="flex justify-between text-xs">
                  <span>Q3 2024 - Q2 2025</span>
                  <span className="font-medium">15% Complete</span>
                </div>
                <Progress value={15} className="h-1 mt-1" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Milestones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 border rounded">
                <Flag className="h-5 w-5 text-blue-600" />
                <div className="flex-1">
                  <div className="font-medium text-sm">European Market Launch</div>
                  <div className="text-xs text-muted-foreground">Complete regulatory approval and local partnerships</div>
                </div>
                <div className="text-xs text-muted-foreground">Mar 15</div>
              </div>
              
              <div className="flex items-center gap-3 p-3 border rounded">
                <Flag className="h-5 w-5 text-green-600" />
                <div className="flex-1">
                  <div className="font-medium text-sm">Platform Beta Release</div>
                  <div className="text-xs text-muted-foreground">Launch beta version to select customers</div>
                </div>
                <div className="text-xs text-muted-foreground">Apr 30</div>
              </div>
              
              <div className="flex items-center gap-3 p-3 border rounded">
                <Flag className="h-5 w-5 text-purple-600" />
                <div className="flex-1">
                  <div className="font-medium text-sm">AI Lab Staffing Complete</div>
                  <div className="text-xs text-muted-foreground">Hire key AI researchers and engineers</div>
                </div>
                <div className="text-xs text-muted-foreground">Jun 30</div>
              </div>

              <div className="flex items-center gap-3 p-3 border rounded">
                <Flag className="h-5 w-5 text-orange-600" />
                <div className="flex-1">
                  <div className="font-medium text-sm">Q3 Strategic Review</div>
                  <div className="text-xs text-muted-foreground">Comprehensive strategy and progress assessment</div>
                </div>
                <div className="text-xs text-muted-foreground">Sep 15</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function PerformanceDashboard({ objectives }: { objectives: StrategicObjective[] }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Performance Dashboard</h2>
          <p className="text-muted-foreground">Strategic performance metrics and KPI tracking</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Data
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Strategy Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">85</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-600" />
              +5 vs last quarter
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Execution Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">
              On-time completion
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Risk Level</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">Medium</div>
            <p className="text-xs text-muted-foreground">
              2 high-risk initiatives
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">ROI Projection</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">2.4x</div>
            <p className="text-xs text-muted-foreground">
              3-year strategic ROI
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Strategic Performance Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Award className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Performance Analytics</h3>
              <p className="text-muted-foreground mb-4">
                Interactive charts showing strategic KPIs, trends, and forecasts
              </p>
              <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
                <div className="p-3 border rounded">
                  <div className="font-medium">Strategy Alignment</div>
                  <div className="text-2xl font-bold text-blue-600">92%</div>
                  <div className="text-sm text-green-600">↗ +3%</div>
                </div>
                <div className="p-3 border rounded">
                  <div className="font-medium">Initiative Success</div>
                  <div className="text-2xl font-bold text-green-600">87%</div>
                  <div className="text-sm text-green-600">↗ +12%</div>
                </div>
                <div className="p-3 border rounded">
                  <div className="font-medium">Resource Efficiency</div>
                  <div className="text-2xl font-bold text-purple-600">74%</div>
                  <div className="text-sm text-red-600">↘ -2%</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}