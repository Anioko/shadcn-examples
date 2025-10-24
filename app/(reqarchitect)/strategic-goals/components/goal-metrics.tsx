"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts"
import { TrendingUp, Target, AlertTriangle, Calendar, Download, Filter } from "lucide-react"

interface MetricData {
  month: string
  goalProgress: number
  initiativeProgress: number
  alignment: number
  risks: number
}

interface GoalMetric {
  id: string
  name: string
  currentValue: number
  targetValue: number
  unit: string
  trend: "up" | "down" | "stable"
  changePercent: number
  benchmark: number
  status: "on-track" | "at-risk" | "behind"
}

export function GoalMetrics() {
  const monthlyData: MetricData[] = [
    { month: "Jan", goalProgress: 45, initiativeProgress: 38, alignment: 82, risks: 6 },
    { month: "Feb", goalProgress: 52, initiativeProgress: 45, alignment: 85, risks: 4 },
    { month: "Mar", goalProgress: 58, initiativeProgress: 51, alignment: 87, risks: 5 },
    { month: "Apr", goalProgress: 63, initiativeProgress: 58, alignment: 84, risks: 7 },
    { month: "May", goalProgress: 68, initiativeProgress: 62, alignment: 86, risks: 6 },
    { month: "Jun", goalProgress: 71, initiativeProgress: 67, alignment: 89, risks: 4 },
    { month: "Jul", goalProgress: 75, initiativeProgress: 71, alignment: 91, risks: 3 },
    { month: "Aug", goalProgress: 78, initiativeProgress: 74, alignment: 88, risks: 5 },
    { month: "Sep", goalProgress: 82, initiativeProgress: 78, alignment: 90, risks: 4 },
    { month: "Oct", goalProgress: 85, initiativeProgress: 81, alignment: 92, risks: 2 }
  ]

  const goalMetrics: GoalMetric[] = [
    {
      id: "metric-1",
      name: "Monthly Active Users",
      currentValue: 3500,
      targetValue: 10000,
      unit: "users",
      trend: "up",
      changePercent: 15.2,
      benchmark: 4200,
      status: "on-track"
    },
    {
      id: "metric-2",
      name: "Annual Recurring Revenue",
      currentValue: 1200000,
      targetValue: 2000000,
      unit: "$",
      trend: "up",
      changePercent: 8.5,
      benchmark: 1500000,
      status: "behind"
    },
    {
      id: "metric-3",
      name: "Net Revenue Retention",
      currentValue: 95,
      targetValue: 120,
      unit: "%",
      trend: "up",
      changePercent: 5.3,
      benchmark: 110,
      status: "behind"
    },
    {
      id: "metric-4",
      name: "Customer Acquisition Cost",
      currentValue: 220,
      targetValue: 150,
      unit: "$",
      trend: "down",
      changePercent: -12.8,
      benchmark: 180,
      status: "at-risk"
    },
    {
      id: "metric-5",
      name: "System Uptime",
      currentValue: 99.7,
      targetValue: 99.9,
      unit: "%",
      trend: "up",
      changePercent: 0.2,
      benchmark: 99.5,
      status: "on-track"
    },
    {
      id: "metric-6",
      name: "Page Load Time",
      currentValue: 2.8,
      targetValue: 2.0,
      unit: "seconds",
      trend: "down",
      changePercent: -18.6,
      benchmark: 3.5,
      status: "on-track"
    },
    {
      id: "metric-7",
      name: "Employee Satisfaction",
      currentValue: 8.2,
      targetValue: 9.0,
      unit: "/10",
      trend: "stable",
      changePercent: 0.0,
      benchmark: 7.8,
      status: "on-track"
    },
    {
      id: "metric-8",
      name: "Enterprise Deals Closed",
      currentValue: 23,
      targetValue: 50,
      unit: "deals",
      trend: "up",
      changePercent: 21.1,
      benchmark: 30,
      status: "behind"
    }
  ]

  const statusDistribution = [
    { name: "On Track", value: goalMetrics.filter(m => m.status === "on-track").length, color: "#22c55e" },
    { name: "At Risk", value: goalMetrics.filter(m => m.status === "at-risk").length, color: "#eab308" },
    { name: "Behind", value: goalMetrics.filter(m => m.status === "behind").length, color: "#ef4444" }
  ]

  const getTrendIcon = (trend: GoalMetric['trend']) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-500" />
      case 'down': return <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />
      case 'stable': return <div className="h-4 w-4 bg-gray-400 rounded-full" />
      default: return <div className="h-4 w-4 bg-gray-400 rounded-full" />
    }
  }

  const getStatusVariant = (status: GoalMetric['status']) => {
    switch (status) {
      case 'on-track': return 'default'
      case 'at-risk': return 'secondary'
      case 'behind': return 'destructive'
      default: return 'outline'
    }
  }

  const formatValue = (value: number, unit: string) => {
    if (unit === '$') {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(value)
    }
    if (unit === 'users' || unit === 'deals') {
      return value.toLocaleString()
    }
    return `${value}${unit}`
  }

  const calculateProgress = (current: number, target: number, isReverse = false) => {
    if (isReverse) {
      // For metrics where lower is better (like CAC, page load time)
      const maxValue = Math.max(current, target) * 1.5 // Assume 150% of max as the scale
      return ((maxValue - current) / (maxValue - target)) * 100
    }
    return Math.min(100, (current / target) * 100)
  }

  const isReverseMetric = (unit: string) => {
    return unit === 'seconds' || (unit === '$' && unit.includes('Cost'))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Goal Metrics & Analytics</h2>
          <p className="text-sm text-muted-foreground">
            Track and analyze strategic goal performance with real-time metrics
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button>
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Report
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="metrics">Metrics</TabsTrigger>
          <TabsTrigger value="benchmarks">Benchmarks</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Progress Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Goal Progress Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="goalProgress" fill="#3b82f6" name="Goal Progress %" />
                  <Bar dataKey="initiativeProgress" fill="#06b6d4" name="Initiative Progress %" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Status Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Goal Status Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={statusDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      dataKey="value"
                      label={(entry) => `${entry.name}: ${entry.value}`}
                    >
                      {statusDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          {/* Alignment Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Strategic Alignment Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="alignment" stroke="#22c55e" name="Alignment Score %" strokeWidth={2} />
                  <Line type="monotone" dataKey="risks" stroke="#ef4444" name="Risk Count" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Progress Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Progress Trend Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="goalProgress" stroke="#3b82f6" name="Goal Progress %" strokeWidth={2} />
                  <Line type="monotone" dataKey="initiativeProgress" stroke="#06b6d4" name="Initiative Progress %" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-4">
          {/* Key Metrics Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {goalMetrics.map((metric) => (
              <Card key={metric.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{metric.name}</CardTitle>
                  {getTrendIcon(metric.trend)}
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="text-2xl font-bold">
                        {formatValue(metric.currentValue, metric.unit)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Target: {formatValue(metric.targetValue, metric.unit)}
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span>Progress</span>
                        <span>{Math.round(calculateProgress(metric.currentValue, metric.targetValue, isReverseMetric(metric.unit)))}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{
                            width: `${Math.min(100, calculateProgress(metric.currentValue, metric.targetValue, isReverseMetric(metric.unit)))}%`
                          }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className={`text-xs font-medium ${metric.changePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {metric.changePercent >= 0 ? '+' : ''}{metric.changePercent}%
                      </div>
                      <Badge variant={getStatusVariant(metric.status)} className="text-xs">
                        {metric.status.replace('-', ' ')}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="benchmarks" className="space-y-4">
          {/* Benchmark Comparison */}
          <Card>
            <CardHeader>
              <CardTitle>Benchmark Comparison</CardTitle>
              <p className="text-sm text-muted-foreground">
                Compare current performance against industry benchmarks
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {goalMetrics.map((metric) => (
                  <div key={metric.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{metric.name}</span>
                      <div className="flex items-center gap-4 text-sm">
                        <span>Current: <strong>{formatValue(metric.currentValue, metric.unit)}</strong></span>
                        <span>Benchmark: <strong>{formatValue(metric.benchmark, metric.unit)}</strong></span>
                        <span>Target: <strong>{formatValue(metric.targetValue, metric.unit)}</strong></span>
                      </div>
                    </div>
                    <div className="relative">
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        {/* Benchmark line */}
                        <div
                          className="absolute top-0 w-1 h-3 bg-yellow-500"
                          style={{
                            left: `${Math.min(100, (metric.benchmark / Math.max(metric.currentValue, metric.targetValue, metric.benchmark)) * 100)}%`
                          }}
                        />
                        {/* Current progress */}
                        <div
                          className={`h-3 rounded-full ${
                            metric.currentValue >= metric.benchmark ? 'bg-green-500' : 'bg-red-500'
                          }`}
                          style={{
                            width: `${Math.min(100, (metric.currentValue / Math.max(metric.currentValue, metric.targetValue, metric.benchmark)) * 100)}%`
                          }}
                        />
                        {/* Target line */}
                        <div
                          className="absolute top-0 w-1 h-3 bg-blue-500"
                          style={{
                            left: `${Math.min(100, (metric.targetValue / Math.max(metric.currentValue, metric.targetValue, metric.benchmark)) * 100)}%`
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs">
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-green-500 rounded" />
                        <span>Current</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-1 bg-yellow-500" />
                        <span>Industry Benchmark</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-1 bg-blue-500" />
                        <span>Target</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}