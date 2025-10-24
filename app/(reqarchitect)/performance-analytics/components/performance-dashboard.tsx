"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign, 
  Target, 
  Clock,
  BarChart3,
  Activity,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Calendar,
  Download,
  Filter,
  RefreshCw
} from "lucide-react"

interface KPIMetric {
  id: string
  title: string
  value: string | number
  change: number
  changeType: 'increase' | 'decrease'
  target?: number
  unit?: string
  status: 'good' | 'warning' | 'critical'
  category: 'financial' | 'operational' | 'quality' | 'customer'
  trend: number[]
}

export function KPIDashboard() {
  const kpiMetrics: KPIMetric[] = [
    {
      id: "revenue",
      title: "Monthly Recurring Revenue",
      value: "$2,847,529",
      change: 12.5,
      changeType: 'increase',
      target: 85,
      unit: "USD",
      status: 'good',
      category: 'financial',
      trend: [65, 78, 82, 88, 85, 92, 89, 95]
    },
    {
      id: "customers",
      title: "Active Customers",
      value: 15742,
      change: 8.2,
      changeType: 'increase',
      target: 90,
      status: 'good',
      category: 'customer',
      trend: [78, 82, 85, 88, 89, 91, 87, 90]
    },
    {
      id: "churn",
      title: "Customer Churn Rate",
      value: "2.1%",
      change: -0.3,
      changeType: 'decrease',
      target: 95,
      status: 'good',
      category: 'customer',
      trend: [3.2, 2.8, 2.5, 2.3, 2.1, 2.4, 2.0, 2.1]
    },
    {
      id: "satisfaction",
      title: "Customer Satisfaction",
      value: "4.7/5",
      change: 0.2,
      changeType: 'increase',
      target: 88,
      status: 'good',
      category: 'quality',
      trend: [4.3, 4.4, 4.5, 4.6, 4.7, 4.6, 4.8, 4.7]
    },
    {
      id: "response",
      title: "Avg Response Time",
      value: "1.2h",
      change: -15.3,
      changeType: 'decrease',
      target: 92,
      status: 'good',
      category: 'operational',
      trend: [2.1, 1.8, 1.5, 1.3, 1.2, 1.4, 1.1, 1.2]
    },
    {
      id: "uptime",
      title: "System Uptime",
      value: "99.97%",
      change: 0.02,
      changeType: 'increase',
      target: 98,
      status: 'good',
      category: 'operational',
      trend: [99.8, 99.9, 99.95, 99.97, 99.96, 99.98, 99.97, 99.97]
    },
    {
      id: "conversion",
      title: "Lead Conversion Rate",
      value: "24.8%",
      change: 3.1,
      changeType: 'increase',
      target: 75,
      status: 'warning',
      category: 'operational',
      trend: [18, 21, 23, 24, 25, 22, 26, 24.8]
    },
    {
      id: "deployment",
      title: "Deployment Success Rate",
      value: "96.3%",
      change: -1.2,
      changeType: 'decrease',
      target: 80,
      status: 'warning',
      category: 'quality',
      trend: [92, 94, 96, 98, 97, 95, 97, 96.3]
    }
  ]

  const getStatusColor = (status: KPIMetric['status']) => {
    switch (status) {
      case 'good': return 'text-green-600 bg-green-50'
      case 'warning': return 'text-yellow-600 bg-yellow-50'
      case 'critical': return 'text-red-600 bg-red-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getStatusIcon = (status: KPIMetric['status']) => {
    switch (status) {
      case 'good': return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case 'critical': return <XCircle className="h-4 w-4 text-red-600" />
      default: return <Activity className="h-4 w-4 text-gray-600" />
    }
  }

  const getCategoryIcon = (category: KPIMetric['category']) => {
    switch (category) {
      case 'financial': return <DollarSign className="h-5 w-5" />
      case 'operational': return <Activity className="h-5 w-5" />
      case 'quality': return <Target className="h-5 w-5" />
      case 'customer': return <Users className="h-5 w-5" />
      default: return <BarChart3 className="h-5 w-5" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">KPI Dashboard</h2>
          <p className="text-sm text-muted-foreground">
            Real-time key performance indicators and business metrics
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpiMetrics.map((metric) => (
          <Card key={metric.id} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center gap-2">
                {getCategoryIcon(metric.category)}
                <CardTitle className="text-sm font-medium">
                  {metric.title}
                </CardTitle>
              </div>
              {getStatusIcon(metric.status)}
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-baseline gap-2">
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <div className={`flex items-center text-xs ${
                    metric.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.changeType === 'increase' ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                    {Math.abs(metric.change)}%
                  </div>
                </div>

                {metric.target && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Target Progress</span>
                      <span>{metric.target}%</span>
                    </div>
                    <Progress value={metric.target} className="h-1" />
                  </div>
                )}

                <Badge 
                  variant="outline" 
                  className={`text-xs ${getStatusColor(metric.status)}`}
                >
                  {metric.status.toUpperCase()}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Metrics */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Financial Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {kpiMetrics
                .filter(m => m.category === 'financial')
                .map((metric) => (
                  <div key={metric.id} className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <div className="font-medium">{metric.title}</div>
                      <div className="text-sm text-muted-foreground">
                        Current: {metric.value}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-medium ${
                        metric.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {metric.changeType === 'increase' ? '+' : ''}{metric.change}%
                      </div>
                      {getStatusIcon(metric.status)}
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Customer Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {kpiMetrics
                .filter(m => m.category === 'customer')
                .map((metric) => (
                  <div key={metric.id} className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <div className="font-medium">{metric.title}</div>
                      <div className="text-sm text-muted-foreground">
                        Current: {metric.value}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-medium ${
                        metric.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {metric.changeType === 'increase' ? '+' : ''}{metric.change}%
                      </div>
                      {getStatusIcon(metric.status)}
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Operational Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {kpiMetrics
                .filter(m => m.category === 'operational')
                .map((metric) => (
                  <div key={metric.id} className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <div className="font-medium">{metric.title}</div>
                      <div className="text-sm text-muted-foreground">
                        Current: {metric.value}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-medium ${
                        metric.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {metric.changeType === 'increase' ? '+' : ''}{metric.change}%
                      </div>
                      {getStatusIcon(metric.status)}
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Quality Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {kpiMetrics
                .filter(m => m.category === 'quality')
                .map((metric) => (
                  <div key={metric.id} className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <div className="font-medium">{metric.title}</div>
                      <div className="text-sm text-muted-foreground">
                        Current: {metric.value}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-medium ${
                        metric.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {metric.changeType === 'increase' ? '+' : ''}{metric.change}%
                      </div>
                      {getStatusIcon(metric.status)}
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export function BenchmarkAnalysis() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Benchmark Analysis</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Industry benchmarks and comparative performance analysis</p>
      </CardContent>
    </Card>
  )
}

export function AutomatedReporting() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Automated Reporting</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Scheduled reports with customizable templates and distribution</p>
      </CardContent>
    </Card>
  )
}

export function MetricsMonitoring() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Metrics Monitoring</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Real-time monitoring with alerts and threshold management</p>
      </CardContent>
    </Card>
  )
}

export function PerformanceInsights() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Insights</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">AI-powered insights and recommendations for performance optimization</p>
      </CardContent>
    </Card>
  )
}