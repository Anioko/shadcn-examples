'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Capability,
  CapabilityMap,
  CapabilityGapAnalysis,
  CapabilityRoadmapItem,
  MaturityLevel,
} from '@/lib/types/capability-map'
import { Progress } from '@/components/ui/progress'

interface CapabilityPlanningProps {
  capabilityMap: CapabilityMap
}

export function CapabilityPlanning({ capabilityMap }: CapabilityPlanningProps) {
  const [selectedTab, setSelectedTab] = useState('gap-analysis')

  // Calculate gap analysis
  const calculateGapAnalysis = (): CapabilityGapAnalysis[] => {
    return capabilityMap.capabilities
      .filter((c) => c.metrics.maturity < 4) // Focus on capabilities below "Managed" level
      .map((c) => {
        const targetState: MaturityLevel = 5 // Target: Optimized
        const gap = targetState - c.metrics.maturity
        const priority =
          c.metrics.strategicImportance === 'critical'
            ? 'critical'
            : gap >= 3
            ? 'high'
            : gap >= 2
            ? 'medium'
            : 'low'

        return {
          capabilityId: c.id,
          currentState: c.metrics.maturity,
          targetState,
          gap,
          priority,
          initiatives: generateInitiatives(c, gap),
        }
      })
      .sort((a, b) => {
        const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 }
        return priorityOrder[a.priority] - priorityOrder[b.priority]
      })
  }

  // Generate suggested initiatives based on gap
  const generateInitiatives = (capability: Capability, gap: number): string[] => {
    const initiatives: string[] = []

    if (gap >= 4) {
      initiatives.push(`Establish ${capability.name} framework and processes`)
      initiatives.push(`Hire or train ${capability.name} specialists`)
      initiatives.push(`Implement ${capability.name} tools and systems`)
    } else if (gap >= 3) {
      initiatives.push(`Standardize ${capability.name} processes`)
      initiatives.push(`Enhance ${capability.name} measurement and monitoring`)
      initiatives.push(`Invest in ${capability.name} automation`)
    } else if (gap >= 2) {
      initiatives.push(`Optimize ${capability.name} workflows`)
      initiatives.push(`Implement continuous improvement for ${capability.name}`)
    } else if (gap >= 1) {
      initiatives.push(`Achieve excellence in ${capability.name}`)
      initiatives.push(`Establish ${capability.name} center of excellence`)
    }

    return initiatives
  }

  // Generate sample roadmap items
  const generateRoadmap = (): CapabilityRoadmapItem[] => {
    const gapAnalysis = calculateGapAnalysis()
    const roadmapItems: CapabilityRoadmapItem[] = []
    let itemId = 1

    gapAnalysis.slice(0, 10).forEach((gap) => {
      const capability = capabilityMap.capabilities.find((c) => c.id === gap.capabilityId)
      if (!capability) return

      gap.initiatives.forEach((initiative, idx) => {
        const startDate = new Date()
        startDate.setMonth(startDate.getMonth() + idx * 3)
        const endDate = new Date(startDate)
        endDate.setMonth(endDate.getMonth() + 6)

        roadmapItems.push({
          id: `roadmap-${itemId++}`,
          capabilityId: gap.capabilityId,
          initiative,
          description: `Implementation of ${initiative} to improve ${capability.name} maturity`,
          startDate: startDate.toISOString().split('T')[0],
          endDate: endDate.toISOString().split('T')[0],
          status: idx === 0 ? 'in-progress' : idx === 1 ? 'planned' : 'planned',
          investmentRequired: gap.priority === 'critical' ? 'high' : gap.priority === 'high' ? 'medium' : 'low',
        })
      })
    })

    return roadmapItems.slice(0, 15) // Limit to 15 items
  }

  const gapAnalysis = calculateGapAnalysis()
  const roadmap = generateRoadmap()

  const getCapabilityName = (id: string): string => {
    return capabilityMap.capabilities.find((c) => c.id === id)?.name || 'Unknown'
  }

  const getPriorityColor = (priority: string): string => {
    switch (priority) {
      case 'critical':
        return 'bg-red-600 text-white'
      case 'high':
        return 'bg-orange-500 text-white'
      case 'medium':
        return 'bg-yellow-500 text-black'
      case 'low':
        return 'bg-green-500 text-white'
      default:
        return 'bg-gray-400'
    }
  }

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'completed':
        return 'bg-green-600 text-white'
      case 'in-progress':
        return 'bg-blue-500 text-white'
      case 'planned':
        return 'bg-gray-500 text-white'
      case 'on-hold':
        return 'bg-yellow-600 text-white'
      default:
        return 'bg-gray-400'
    }
  }

  return (
    <div className="w-full space-y-6">

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="gap-analysis">Gap Analysis</TabsTrigger>
          <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
          <TabsTrigger value="investment">Investment</TabsTrigger>
        </TabsList>

        {/* Gap Analysis Tab */}
        <TabsContent value="gap-analysis" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Capability Gap Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Capability</TableHead>
                    <TableHead>Current</TableHead>
                    <TableHead>Target</TableHead>
                    <TableHead>Gap</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Recommended Initiatives</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {gapAnalysis.map((gap) => (
                    <TableRow key={gap.capabilityId}>
                      <TableCell className="font-medium">
                        {getCapabilityName(gap.capabilityId)}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{gap.currentState}/5</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{gap.targetState}/5</Badge>
                      </TableCell>
                      <TableCell>
                        <Progress value={(gap.gap / 5) * 100} className="w-20" />
                        <span className="ml-2 text-sm">{gap.gap}</span>
                      </TableCell>
                      <TableCell>
                        <Badge className={getPriorityColor(gap.priority)}>
                          {gap.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <ul className="text-sm space-y-1">
                          {gap.initiatives.slice(0, 2).map((initiative, idx) => (
                            <li key={idx} className="text-gray-700">
                              • {initiative}
                            </li>
                          ))}
                        </ul>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">
                  {gapAnalysis.filter((g) => g.priority === 'critical').length}
                </div>
                <p className="text-sm text-gray-600">Critical Gaps</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">
                  {gapAnalysis.filter((g) => g.priority === 'high').length}
                </div>
                <p className="text-sm text-gray-600">High Priority Gaps</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">
                  {gapAnalysis.reduce((sum, g) => sum + g.gap, 0)}
                </div>
                <p className="text-sm text-gray-600">Total Gap Points</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">
                  {Math.round(
                    (capabilityMap.capabilities.reduce(
                      (sum, c) => sum + c.metrics.maturity,
                      0
                    ) /
                      capabilityMap.capabilities.length /
                      5) *
                      100
                  )}
                  %
                </div>
                <p className="text-sm text-gray-600">Avg Maturity</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Roadmap Tab */}
        <TabsContent value="roadmap" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Capability Improvement Roadmap</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Initiative</TableHead>
                    <TableHead>Capability</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Investment</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {roadmap.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium max-w-xs">
                        {item.initiative}
                      </TableCell>
                      <TableCell>{getCapabilityName(item.capabilityId)}</TableCell>
                      <TableCell>{item.startDate}</TableCell>
                      <TableCell>{item.endDate}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(item.status)}>
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{item.investmentRequired}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button>Export to PDF</Button>
            <Button variant="outline">Export to CSV</Button>
            <Button variant="outline">Share Roadmap</Button>
          </div>
        </TabsContent>

        {/* Investment Tab */}
        <TabsContent value="investment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Investment Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Investment by Priority */}
                <div>
                  <h3 className="font-semibold mb-4">Investment by Priority</h3>
                  <div className="space-y-3">
                    {['critical', 'high', 'medium', 'low'].map((priority) => {
                      const count = roadmap.filter(
                        (item) => {
                          const gap = gapAnalysis.find(
                            (g) => g.capabilityId === item.capabilityId
                          )
                          return gap?.priority === priority
                        }
                      ).length
                      const percentage = (count / roadmap.length) * 100

                      return (
                        <div key={priority}>
                          <div className="flex justify-between mb-1">
                            <Badge className={getPriorityColor(priority)}>
                              {priority}
                            </Badge>
                            <span className="text-sm">{count} initiatives</span>
                          </div>
                          <Progress value={percentage} />
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Investment by Level */}
                <div>
                  <h3 className="font-semibold mb-4">Investment Required</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {['high', 'medium', 'low'].map((investment) => {
                      const count = roadmap.filter(
                        (item) => item.investmentRequired === investment
                      ).length
                      return (
                        <Card key={investment}>
                          <CardContent className="pt-6">
                            <div className="text-2xl font-bold">{count}</div>
                            <p className="text-sm text-gray-600 capitalize">
                              {investment} Investment
                            </p>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                </div>

                {/* Timeline Distribution */}
                <div>
                  <h3 className="font-semibold mb-4">Timeline Distribution</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-4">
                      <Badge className="bg-blue-500">In Progress</Badge>
                      <span className="text-sm">
                        {roadmap.filter((i) => i.status === 'in-progress').length}{' '}
                        initiatives
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge className="bg-gray-500">Planned</Badge>
                      <span className="text-sm">
                        {roadmap.filter((i) => i.status === 'planned').length}{' '}
                        initiatives
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
