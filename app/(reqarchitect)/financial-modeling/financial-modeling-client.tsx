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
import { 
  TrendingUp, 
  DollarSign, 
  Calculator, 
  BarChart3,
  LineChart,
  PieChart,
  Target,
  AlertTriangle,
  Download,
  Upload,
  Plus,
  Minus,
  Settings,
  Calendar,
  Users,
  Building2,
  Zap,
  Brain,
  Globe,
  Shield,
  Activity,
  Eye,
  RefreshCw,
  PlayCircle,
  CheckCircle,
  Clock
} from "lucide-react"

interface FinancialModel {
  id: string
  name: string
  type: "dcf" | "comparables" | "lbo" | "sum_of_parts" | "custom"
  status: "draft" | "active" | "archived"
  lastModified: string
  assumptions: FinancialAssumptions
  projections: FinancialProjections
  scenarios: FinancialScenario[]
  valuation: ValuationMetrics
}

interface FinancialAssumptions {
  revenueGrowth: number[]
  marginAssumptions: {
    grossMargin: number[]
    operatingMargin: number[]
    netMargin: number[]
  }
  capexAsPercRevenue: number[]
  workingCapitalChanges: number[]
  discountRate: number
  terminalGrowthRate: number
  taxRate: number
}

interface FinancialProjections {
  revenue: number[]
  ebitda: number[]
  freeCashFlow: number[]
  netIncome: number[]
  totalAssets: number[]
  totalDebt: number[]
  equity: number[]
}

interface FinancialScenario {
  name: string
  probability: number
  adjustments: Partial<FinancialAssumptions>
  results: Partial<ValuationMetrics>
}

interface ValuationMetrics {
  enterpriseValue: number
  equityValue: number
  sharePrice: number
  multiples: {
    evRevenue: number
    evEbitda: number
    peRatio: number
  }
  impliedReturns: {
    irr: number
    moic: number
  }
}

export function FinancialModelingClient() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedModel, setSelectedModel] = useState<string>("primary-model")
  
  const [models] = useState<FinancialModel[]>([
    {
      id: "primary-model",
      name: "Primary Company Valuation",
      type: "dcf",
      status: "active",
      lastModified: "2024-01-15",
      assumptions: {
        revenueGrowth: [0.15, 0.12, 0.10, 0.08, 0.06],
        marginAssumptions: {
          grossMargin: [0.65, 0.67, 0.68, 0.69, 0.70],
          operatingMargin: [0.18, 0.20, 0.22, 0.23, 0.24],
          netMargin: [0.12, 0.14, 0.15, 0.16, 0.17]
        },
        capexAsPercRevenue: [0.08, 0.06, 0.05, 0.04, 0.04],
        workingCapitalChanges: [0.02, 0.015, 0.01, 0.01, 0.01],
        discountRate: 0.12,
        terminalGrowthRate: 0.03,
        taxRate: 0.25
      },
      projections: {
        revenue: [100, 115, 129, 139, 150],
        ebitda: [25, 31, 36, 40, 45],
        freeCashFlow: [18, 24, 29, 33, 38],
        netIncome: [12, 16, 19, 22, 26],
        totalAssets: [80, 92, 105, 118, 132],
        totalDebt: [20, 18, 15, 12, 10],
        equity: [60, 74, 90, 106, 122]
      },
      scenarios: [
        {
          name: "Base Case",
          probability: 0.50,
          adjustments: {},
          results: { enterpriseValue: 425, equityValue: 405, sharePrice: 45.2 }
        },
        {
          name: "Optimistic",
          probability: 0.25,
          adjustments: { revenueGrowth: [0.20, 0.18, 0.15, 0.12, 0.10] },
          results: { enterpriseValue: 520, equityValue: 500, sharePrice: 55.6 }
        },
        {
          name: "Conservative",
          probability: 0.25,
          adjustments: { revenueGrowth: [0.10, 0.08, 0.06, 0.05, 0.04] },
          results: { enterpriseValue: 350, equityValue: 330, sharePrice: 36.7 }
        }
      ],
      valuation: {
        enterpriseValue: 425.0,
        equityValue: 405.0,
        sharePrice: 45.2,
        multiples: {
          evRevenue: 2.8,
          evEbitda: 9.4,
          peRatio: 15.6
        },
        impliedReturns: {
          irr: 0.22,
          moic: 2.8
        }
      }
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
          <TabsTrigger value="modeling" className="flex items-center gap-2">
            <Calculator className="h-4 w-4" />
            Modeling
          </TabsTrigger>
          <TabsTrigger value="scenarios" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Scenarios
          </TabsTrigger>
          <TabsTrigger value="sensitivity" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Sensitivity
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <PieChart className="h-4 w-4" />
            Reports
          </TabsTrigger>
          <TabsTrigger value="ai-insights" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            AI Insights
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <FinancialOverview models={models} selectedModel={selectedModel} />
        </TabsContent>

        <TabsContent value="modeling" className="space-y-6">
          <FinancialModelingWorkspace models={models} selectedModel={selectedModel} />
        </TabsContent>

        <TabsContent value="scenarios" className="space-y-6">
          <ScenarioAnalysis models={models} selectedModel={selectedModel} />
        </TabsContent>

        <TabsContent value="sensitivity" className="space-y-6">
          <SensitivityAnalysis models={models} selectedModel={selectedModel} />
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <FinancialReports models={models} selectedModel={selectedModel} />
        </TabsContent>

        <TabsContent value="ai-insights" className="space-y-6">
          <AiFinancialInsights models={models} selectedModel={selectedModel} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function FinancialOverview({ models, selectedModel }: { models: FinancialModel[], selectedModel: string }) {
  const model = models.find(m => m.id === selectedModel)
  if (!model) return null

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Financial Modeling Dashboard</h2>
          <p className="text-muted-foreground">Advanced financial analysis and valuation modeling</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Import Data
          </Button>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Configure
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Model
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Enterprise Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${model.valuation.enterpriseValue}M</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-600" />
              +12.5% vs last model
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Equity Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${model.valuation.equityValue}M</div>
            <p className="text-xs text-muted-foreground">
              ${model.valuation.sharePrice}/share
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">IRR</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{(model.valuation.impliedReturns.irr * 100).toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              {model.valuation.impliedReturns.moic.toFixed(1)}x MOIC
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">EV/EBITDA</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{model.valuation.multiples.evEbitda.toFixed(1)}x</div>
            <p className="text-xs text-muted-foreground">
              {model.valuation.multiples.peRatio.toFixed(1)}x P/E
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Financial Projections (5-Year)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <LineChart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Interactive Financial Charts</h3>
                <p className="text-muted-foreground mb-4">
                  Revenue, EBITDA, and FCF projections with scenario analysis
                </p>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="font-medium">2024E Revenue</div>
                    <div className="text-lg font-bold text-blue-600">${model.projections.revenue[0]}M</div>
                  </div>
                  <div>
                    <div className="font-medium">2028E Revenue</div>
                    <div className="text-lg font-bold text-green-600">${model.projections.revenue[4]}M</div>
                  </div>
                  <div>
                    <div className="font-medium">CAGR</div>
                    <div className="text-lg font-bold text-purple-600">10.7%</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Scenario Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {model.scenarios.map((scenario, index) => (
                <div key={index} className="p-3 border rounded">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">{scenario.name}</div>
                    <Badge variant="outline">{(scenario.probability * 100).toFixed(0)}%</Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Enterprise Value</div>
                      <div className="font-medium">${scenario.results.enterpriseValue}M</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Share Price</div>
                      <div className="font-medium">${scenario.results.sharePrice}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Range</div>
                      <div className={`font-medium ${
                        scenario.name === "Optimistic" ? "text-green-600" : 
                        scenario.name === "Conservative" ? "text-red-600" : "text-blue-600"
                      }`}>
                        {scenario.name === "Base Case" ? "Base" :
                         scenario.name === "Optimistic" ? "+23%" : "-19%"}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Model Assumptions Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium mb-3">Growth Assumptions</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>2024E Revenue Growth</span>
                  <span className="font-medium">{(model.assumptions.revenueGrowth[0] * 100).toFixed(0)}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Terminal Growth Rate</span>
                  <span className="font-medium">{(model.assumptions.terminalGrowthRate * 100).toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Discount Rate (WACC)</span>
                  <span className="font-medium">{(model.assumptions.discountRate * 100).toFixed(1)}%</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-3">Margin Profile</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Gross Margin (2024E)</span>
                  <span className="font-medium">{(model.assumptions.marginAssumptions.grossMargin[0] * 100).toFixed(0)}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Operating Margin (2024E)</span>
                  <span className="font-medium">{(model.assumptions.marginAssumptions.operatingMargin[0] * 100).toFixed(0)}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Net Margin (2024E)</span>
                  <span className="font-medium">{(model.assumptions.marginAssumptions.netMargin[0] * 100).toFixed(0)}%</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-3">Capital Structure</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Tax Rate</span>
                  <span className="font-medium">{(model.assumptions.taxRate * 100).toFixed(0)}%</span>
                </div>
                <div className="flex justify-between">
                  <span>CapEx (% Revenue)</span>
                  <span className="font-medium">{(model.assumptions.capexAsPercRevenue[0] * 100).toFixed(0)}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Working Capital (% Revenue)</span>
                  <span className="font-medium">{(model.assumptions.workingCapitalChanges[0] * 100).toFixed(1)}%</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function FinancialModelingWorkspace({ models, selectedModel }: { models: FinancialModel[], selectedModel: string }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Financial Modeling Workspace</h2>
          <p className="text-muted-foreground">Build and customize financial models with dynamic assumptions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Recalculate
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Model
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Assumptions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>2024E Revenue Growth</Label>
              <Input type="number" defaultValue="15" className="mt-1" />
            </div>
            <div>
              <Label>2025E Revenue Growth</Label>
              <Input type="number" defaultValue="12" className="mt-1" />
            </div>
            <div>
              <Label>2026E Revenue Growth</Label>
              <Input type="number" defaultValue="10" className="mt-1" />
            </div>
            <div>
              <Label>Terminal Growth Rate</Label>
              <Input type="number" defaultValue="3" className="mt-1" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Margin Assumptions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Gross Margin (%)</Label>
              <Input type="number" defaultValue="65" className="mt-1" />
            </div>
            <div>
              <Label>Operating Margin (%)</Label>
              <Input type="number" defaultValue="18" className="mt-1" />
            </div>
            <div>
              <Label>Net Margin (%)</Label>
              <Input type="number" defaultValue="12" className="mt-1" />
            </div>
            <div>
              <Label>Tax Rate (%)</Label>
              <Input type="number" defaultValue="25" className="mt-1" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Valuation Inputs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Discount Rate (WACC) (%)</Label>
              <Input type="number" defaultValue="12" className="mt-1" />
            </div>
            <div>
              <Label>CapEx (% of Revenue)</Label>
              <Input type="number" defaultValue="8" className="mt-1" />
            </div>
            <div>
              <Label>Working Capital (% of Revenue)</Label>
              <Input type="number" defaultValue="2" className="mt-1" />
            </div>
            <div>
              <Label>Net Cash Position</Label>
              <Input type="number" defaultValue="20" className="mt-1" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Financial Statements Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Calculator className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Dynamic Financial Model</h3>
              <p className="text-muted-foreground mb-4">
                Interactive P&L, Balance Sheet, and Cash Flow projections with real-time calculations
              </p>
              <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
                <div className="p-3 border rounded">
                  <div className="font-medium">Income Statement</div>
                  <div className="text-2xl font-bold text-blue-600">5Y</div>
                </div>
                <div className="p-3 border rounded">
                  <div className="font-medium">Balance Sheet</div>
                  <div className="text-2xl font-bold text-green-600">5Y</div>
                </div>
                <div className="p-3 border rounded">
                  <div className="font-medium">Cash Flow</div>
                  <div className="text-2xl font-bold text-purple-600">5Y</div>
                </div>
                <div className="p-3 border rounded">
                  <div className="font-medium">DCF Valuation</div>
                  <div className="text-2xl font-bold text-orange-600">Auto</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function ScenarioAnalysis({ models, selectedModel }: { models: FinancialModel[], selectedModel: string }) {
  const model = models.find(m => m.id === selectedModel)
  if (!model) return null

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Scenario Analysis</h2>
          <p className="text-muted-foreground">Monte Carlo simulation and stress testing</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <PlayCircle className="h-4 w-4 mr-2" />
            Run Simulation
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Scenario
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {model.scenarios.map((scenario, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {scenario.name}
                <Badge variant={
                  scenario.name === "Optimistic" ? "default" :
                  scenario.name === "Conservative" ? "destructive" : "secondary"
                }>
                  {(scenario.probability * 100).toFixed(0)}%
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-muted-foreground">Enterprise Value</div>
                  <div className="text-2xl font-bold">${scenario.results.enterpriseValue}M</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Share Price</div>
                  <div className="text-xl font-medium">${scenario.results.sharePrice}</div>
                </div>
                <div className="pt-2">
                  <Button variant="outline" size="sm" className="w-full">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Monte Carlo Simulation Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Probability Distribution</h3>
              <p className="text-muted-foreground mb-4">
                10,000 simulation runs showing valuation probability distribution
              </p>
              <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                <div className="p-3 border rounded">
                  <div className="font-medium">P10</div>
                  <div className="text-lg font-bold text-red-600">$32.1</div>
                </div>
                <div className="p-3 border rounded">
                  <div className="font-medium">P50</div>
                  <div className="text-lg font-bold text-blue-600">$45.2</div>
                </div>
                <div className="p-3 border rounded">
                  <div className="font-medium">P90</div>
                  <div className="text-lg font-bold text-green-600">$58.7</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function SensitivityAnalysis({ models, selectedModel }: { models: FinancialModel[], selectedModel: string }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Sensitivity Analysis</h2>
          <p className="text-muted-foreground">Analyze impact of key variable changes on valuation</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>One-Way Sensitivity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label>Variable to Test</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select variable" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="revenue-growth">Revenue Growth</SelectItem>
                    <SelectItem value="operating-margin">Operating Margin</SelectItem>
                    <SelectItem value="discount-rate">Discount Rate</SelectItem>
                    <SelectItem value="terminal-growth">Terminal Growth</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Min Value</Label>
                  <Input type="number" defaultValue="5" />
                </div>
                <div>
                  <Label>Max Value</Label>
                  <Input type="number" defaultValue="25" />
                </div>
              </div>
              <Button className="w-full">Run Analysis</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Two-Way Sensitivity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label>X-Axis Variable</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select X variable" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="revenue-growth">Revenue Growth</SelectItem>
                    <SelectItem value="operating-margin">Operating Margin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Y-Axis Variable</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Y variable" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="discount-rate">Discount Rate</SelectItem>
                    <SelectItem value="terminal-growth">Terminal Growth</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full">Generate Matrix</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sensitivity Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Sensitivity Heatmap</h3>
              <p className="text-muted-foreground mb-4">
                Visual representation of valuation sensitivity to key variables
              </p>
              <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                <div className="p-3 border rounded bg-red-50">
                  <div className="font-medium">High Risk</div>
                  <div className="text-sm text-red-600">-25% to -15%</div>
                </div>
                <div className="p-3 border rounded bg-yellow-50">
                  <div className="font-medium">Medium Risk</div>
                  <div className="text-sm text-yellow-600">-15% to +15%</div>
                </div>
                <div className="p-3 border rounded bg-green-50">
                  <div className="font-medium">Low Risk</div>
                  <div className="text-sm text-green-600">+15% to +35%</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function FinancialReports({ models, selectedModel }: { models: FinancialModel[], selectedModel: string }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Financial Reports & Analytics</h2>
          <p className="text-muted-foreground">Professional investment reports and presentations</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Report Settings
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Executive Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Comprehensive investment thesis and valuation summary
            </p>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Status</span>
                <Badge variant="default">Ready</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Pages</span>
                <span className="font-medium">8</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Last Updated</span>
                <span className="font-medium">Today</span>
              </div>
            </div>
            <Button size="sm" className="w-full mt-4">
              <Eye className="h-4 w-4 mr-2" />
              Preview Report
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Detailed Model</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Full financial model with assumptions and calculations
            </p>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Status</span>
                <Badge variant="secondary">Building</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Sheets</span>
                <span className="font-medium">12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Size</span>
                <span className="font-medium">4.2 MB</span>
              </div>
            </div>
            <Button size="sm" variant="outline" className="w-full mt-4">
              <Download className="h-4 w-4 mr-2" />
              Export Excel
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Investor Deck</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Professional presentation for stakeholders
            </p>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Status</span>
                <Badge variant="outline">Draft</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Slides</span>
                <span className="font-medium">24</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Template</span>
                <span className="font-medium">Corporate</span>
              </div>
            </div>
            <Button size="sm" variant="outline" className="w-full mt-4">
              <Settings className="h-4 w-4 mr-2" />
              Customize
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Key Metrics Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <PieChart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Interactive Financial Dashboard</h3>
              <p className="text-muted-foreground mb-4">
                Real-time charts and KPIs for presentations and analysis
              </p>
              <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
                <div className="p-4 border rounded">
                  <div className="font-medium">Revenue CAGR</div>
                  <div className="text-2xl font-bold text-blue-600">10.7%</div>
                  <div className="text-sm text-muted-foreground">2024-2028E</div>
                </div>
                <div className="p-4 border rounded">
                  <div className="font-medium">FCF Margin</div>
                  <div className="text-2xl font-bold text-green-600">25.3%</div>
                  <div className="text-sm text-muted-foreground">2028E Target</div>
                </div>
                <div className="p-4 border rounded">
                  <div className="font-medium">ROIC</div>
                  <div className="text-2xl font-bold text-purple-600">18.4%</div>
                  <div className="text-sm text-muted-foreground">Steady State</div>
                </div>
                <div className="p-4 border rounded">
                  <div className="font-medium">Risk Score</div>
                  <div className="text-2xl font-bold text-orange-600">6.2/10</div>
                  <div className="text-sm text-muted-foreground">Medium Risk</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function AiFinancialInsights({ models, selectedModel }: { models: FinancialModel[], selectedModel: string }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">AI Financial Insights</h2>
          <p className="text-muted-foreground">Machine learning-powered financial analysis and recommendations</p>
        </div>
        <Button variant="outline">
          <Brain className="h-4 w-4 mr-2" />
          Generate Insights
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              Model Risk Assessment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              AI analysis has identified potential risks and optimizations in your financial model:
            </p>
            <div className="space-y-3">
              <div className="p-3 border rounded border-orange-200 bg-orange-50">
                <div className="font-medium text-sm">High Revenue Growth Sensitivity</div>
                <div className="text-xs text-muted-foreground">
                  Model valuation shows high sensitivity to revenue growth assumptions. 
                  Consider stress testing with lower growth scenarios.
                </div>
              </div>
              <div className="p-3 border rounded border-yellow-200 bg-yellow-50">
                <div className="font-medium text-sm">Working Capital Assumptions</div>
                <div className="text-xs text-muted-foreground">
                  Working capital assumptions appear optimistic compared to industry benchmarks. 
                  Review with historical data and peer comparison.
                </div>
              </div>
              <div className="p-3 border rounded border-blue-200 bg-blue-50">
                <div className="font-medium text-sm">Margin Expansion Profile</div>
                <div className="text-xs text-muted-foreground">
                  Projected margin expansion aligns with best-in-class companies. 
                  Consider operational initiatives to support assumptions.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Value Creation Opportunities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 border rounded">
                <div className="font-medium text-sm mb-2">Operating Leverage</div>
                <div className="text-xs text-muted-foreground">
                  High fixed cost structure creates significant operating leverage. 
                  Revenue upside could drive disproportionate EBITDA growth.
                </div>
                <div className="mt-2">
                  <Badge variant="default" className="text-xs">+$45M Value Impact</Badge>
                </div>
              </div>
              <div className="p-3 border rounded">
                <div className="font-medium text-sm mb-2">Capital Efficiency</div>
                <div className="text-xs text-muted-foreground">
                  Asset-light business model with declining CapEx intensity. 
                  FCF conversion expected to improve materially.
                </div>
                <div className="mt-2">
                  <Badge variant="default" className="text-xs">+$32M Value Impact</Badge>
                </div>
              </div>
              <div className="p-3 border rounded">
                <div className="font-medium text-sm mb-2">Market Expansion</div>
                <div className="text-xs text-muted-foreground">
                  Addressable market analysis suggests potential for geographic expansion. 
                  International revenue could drive premium multiples.
                </div>
                <div className="mt-2">
                  <Badge variant="secondary" className="text-xs">Explore Scenario</Badge>
                </div>
              </div>
              <div className="p-3 border rounded">
                <div className="font-medium text-sm mb-2">Cost Synergies</div>
                <div className="text-xs text-muted-foreground">
                  Platform consolidation and automation could reduce OpEx by 8-12%. 
                  Technology investments showing strong ROI potential.
                </div>
                <div className="mt-2">
                  <Badge variant="secondary" className="text-xs">Model Impact</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-blue-600" />
              Benchmarking Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground">
                Comparison with similar companies and industry benchmarks:
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 border rounded">
                  <div className="text-sm text-muted-foreground">EV/Revenue Multiple</div>
                  <div className="text-2xl font-bold">2.8x</div>
                  <div className="text-xs text-green-600">+15% vs. Peers</div>
                </div>
                <div className="text-center p-3 border rounded">
                  <div className="text-sm text-muted-foreground">Growth Rate</div>
                  <div className="text-2xl font-bold">15%</div>
                  <div className="text-xs text-blue-600">In-line</div>
                </div>
                <div className="text-center p-3 border rounded">
                  <div className="text-sm text-muted-foreground">FCF Margin</div>
                  <div className="text-2xl font-bold">18%</div>
                  <div className="text-xs text-green-600">+280bps vs. Peers</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}