"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BarChart, Users, Award, Target, TrendingUp, AlertCircle } from "lucide-react"

interface BenchmarkData {
  capability: string
  yourLevel: number
  peerAverage: number
  topQuartile: number
  industryLeading: number
  sampleSize: number
  yourPercentile: number
  trend: 'above' | 'below' | 'at'
}

interface PeerGroup {
  name: string
  size: string
  stage: string
  industry: string
  count: number
}

export function BenchmarkComparison() {
  const peerGroup: PeerGroup = {
    name: "Series A SaaS Companies",
    size: "11-50 employees",
    stage: "Series A",
    industry: "SaaS",
    count: 147
  }

  const benchmarkData: BenchmarkData[] = [
    {
      capability: "Engineering",
      yourLevel: 4.0,
      peerAverage: 3.2,
      topQuartile: 3.8,
      industryLeading: 4.5,
      sampleSize: 147,
      yourPercentile: 78,
      trend: 'above'
    },
    {
      capability: "Customer Service",
      yourLevel: 4.0,
      peerAverage: 3.1,
      topQuartile: 3.7,
      industryLeading: 4.3,
      sampleSize: 147,
      yourPercentile: 81,
      trend: 'above'
    },
    {
      capability: "Analytics & BI",
      yourLevel: 2.0,
      peerAverage: 2.8,
      topQuartile: 3.5,
      industryLeading: 4.2,
      sampleSize: 147,
      yourPercentile: 35,
      trend: 'below'
    },
    {
      capability: "Security",
      yourLevel: 3.0,
      peerAverage: 2.9,
      topQuartile: 3.4,
      industryLeading: 4.1,
      sampleSize: 147,
      yourPercentile: 52,
      trend: 'at'
    },
    {
      capability: "Data Management",
      yourLevel: 1.0,
      peerAverage: 2.3,
      topQuartile: 3.1,
      industryLeading: 3.9,
      sampleSize: 147,
      yourPercentile: 12,
      trend: 'below'
    },
    {
      capability: "Product Management",
      yourLevel: 3.0,
      peerAverage: 3.2,
      topQuartile: 3.8,
      industryLeading: 4.4,
      sampleSize: 147,
      yourPercentile: 47,
      trend: 'at'
    }
  ]

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'above': return 'text-green-600'
      case 'below': return 'text-red-600'
      case 'at': return 'text-yellow-600'
      default: return 'text-gray-600'
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'above': return <TrendingUp className="h-4 w-4 text-green-500" />
      case 'below': return <AlertCircle className="h-4 w-4 text-red-500" />
      case 'at': return <Target className="h-4 w-4 text-yellow-500" />
      default: return null
    }
  }

  const overallPercentile = Math.round(
    benchmarkData.reduce((sum, data) => sum + data.yourPercentile, 0) / benchmarkData.length
  )

  const capabilitiesAbovePeers = benchmarkData.filter(data => data.trend === 'above').length
  const capabilitiesBelowPeers = benchmarkData.filter(data => data.trend === 'below').length

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BarChart className="h-5 w-5 text-green-500" />
          <span>Peer Benchmarking</span>
        </CardTitle>
        <CardDescription>
          Compare your maturity against similar organizations
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Peer Group Info */}
        <div className="border rounded-lg p-4 bg-blue-50 border-blue-200">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="font-medium text-blue-900">{peerGroup.name}</div>
              <div className="text-sm text-blue-700">
                {peerGroup.size} • {peerGroup.stage} • {peerGroup.industry}
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-900">{peerGroup.count}</div>
              <div className="text-xs text-blue-700">organizations</div>
            </div>
          </div>
        </div>

        {/* Overall Benchmark Summary */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="text-center space-y-2">
            <div className="text-2xl font-bold text-blue-600">{overallPercentile}th</div>
            <div className="text-sm text-muted-foreground">Overall Percentile</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-2xl font-bold text-green-600">{capabilitiesAbovePeers}</div>
            <div className="text-sm text-muted-foreground">Above Peers</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-2xl font-bold text-red-600">{capabilitiesBelowPeers}</div>
            <div className="text-sm text-muted-foreground">Below Peers</div>
          </div>
        </div>

        {/* Detailed Comparisons */}
        <div className="space-y-4">
          {benchmarkData.map((data, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="font-medium">{data.capability}</div>
                  {getTrendIcon(data.trend)}
                  <Badge 
                    variant="outline" 
                    className={getTrendColor(data.trend)}
                  >
                    {data.yourPercentile}th percentile
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">Your Level: {data.yourLevel}</div>
                  <div className="text-xs text-muted-foreground">
                    Peer Avg: {data.peerAverage}
                  </div>
                </div>
              </div>

              {/* Comparison Chart */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Level 1</span>
                  <span>Level 5</span>
                </div>
                <div className="relative">
                  {/* Background bar */}
                  <div className="h-4 bg-gray-200 rounded-full">
                    {/* Industry leading */}
                    <div 
                      className="absolute h-4 bg-gray-300 rounded-full"
                      style={{ width: `${(data.industryLeading / 5) * 100}%` }}
                    />
                    {/* Top quartile */}
                    <div 
                      className="absolute h-4 bg-yellow-300 rounded-full"
                      style={{ width: `${(data.topQuartile / 5) * 100}%` }}
                    />
                    {/* Peer average */}
                    <div 
                      className="absolute h-4 bg-blue-400 rounded-full"
                      style={{ width: `${(data.peerAverage / 5) * 100}%` }}
                    />
                    {/* Your level */}
                    <div 
                      className="absolute h-4 bg-green-500 rounded-full"
                      style={{ width: `${(data.yourLevel / 5) * 100}%` }}
                    />
                  </div>
                  
                  {/* Your position marker */}
                  <div 
                    className="absolute top-0 w-1 h-4 bg-black"
                    style={{ left: `${(data.yourLevel / 5) * 100}%` }}
                  />
                </div>
                
                {/* Legend */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span>You ({data.yourLevel})</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-blue-400 rounded-full" />
                      <span>Peers ({data.peerAverage})</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-yellow-300 rounded-full" />
                      <span>Top 25% ({data.topQuartile})</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-gray-300 rounded-full" />
                      <span>Leading ({data.industryLeading})</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Gap Analysis */}
              {data.trend === 'below' && (
                <div className="bg-red-50 border border-red-200 rounded p-3">
                  <div className="text-sm text-red-800">
                    <div className="font-medium">Attention Needed</div>
                    <div>
                      You&apos;re {(data.peerAverage - data.yourLevel).toFixed(1)} levels below peer average. 
                      Consider prioritizing improvements in this area.
                    </div>
                  </div>
                </div>
              )}
              
              {data.trend === 'above' && (
                <div className="bg-green-50 border border-green-200 rounded p-3">
                  <div className="text-sm text-green-800">
                    <div className="font-medium">Competitive Advantage</div>
                    <div>
                      You&apos;re {(data.yourLevel - data.peerAverage).toFixed(1)} levels above peer average. 
                      This is a strength to maintain.
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Key Insights */}
        <div className="border rounded-lg p-4 bg-yellow-50 border-yellow-200">
          <div className="space-y-2">
            <div className="font-medium text-yellow-900">Key Benchmark Insights</div>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>• You excel in Engineering and Customer Service compared to peers</li>
              <li>• Data Management is significantly below peer average - highest priority</li>
              <li>• Analytics & BI gap represents competitive risk in data-driven decision making</li>
              <li>• Security and Product Management are at peer level but could improve</li>
            </ul>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-4">
          <Button className="flex items-center space-x-2">
            <Target className="h-4 w-4" />
            <span>Focus on Gaps</span>
          </Button>
          <Button variant="outline" className="flex items-center space-x-2">
            <Award className="h-4 w-4" />
            <span>Leverage Strengths</span>
          </Button>
          <Button variant="outline">
            Change Peer Group
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}