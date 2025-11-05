"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Cell, Pie, PieChart, Legend } from "recharts"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { CapabilityMap } from "@/lib/types/capability-map"

interface CapabilityChartsProps {
  capabilityMap: CapabilityMap
}

const chartConfig = {
  strategic: {
    label: "Strategic",
    color: "hsl(217, 91%, 60%)", // blue
  },
  operational: {
    label: "Operational",
    color: "hsl(142, 71%, 45%)", // green
  },
  supporting: {
    label: "Supporting",
    color: "hsl(38, 92%, 50%)", // amber
  },
} satisfies ChartConfig

export function CapabilityCharts({ capabilityMap }: CapabilityChartsProps) {
  const [chartType, setChartType] = React.useState("byType")

  // Group capabilities by type
  const strategic = capabilityMap.capabilities.filter((c) => c.type === 'strategic')
  const operational = capabilityMap.capabilities.filter((c) => c.type === 'operational')
  const supporting = capabilityMap.capabilities.filter((c) => c.type === 'supporting')

  // Data for capability count by type
  const capabilityCountData = [
    {
      type: "Strategic",
      count: strategic.length,
      fill: chartConfig.strategic.color,
    },
    {
      type: "Operational",
      count: operational.length,
      fill: chartConfig.operational.color,
    },
    {
      type: "Supporting",
      count: supporting.length,
      fill: chartConfig.supporting.color,
    },
  ]

  // Data for maturity distribution
  const maturityData = [
    {
      level: "Level 1",
      strategic: strategic.filter((c) => c.metrics.maturity === 1).length,
      operational: operational.filter((c) => c.metrics.maturity === 1).length,
      supporting: supporting.filter((c) => c.metrics.maturity === 1).length,
    },
    {
      level: "Level 2",
      strategic: strategic.filter((c) => c.metrics.maturity === 2).length,
      operational: operational.filter((c) => c.metrics.maturity === 2).length,
      supporting: supporting.filter((c) => c.metrics.maturity === 2).length,
    },
    {
      level: "Level 3",
      strategic: strategic.filter((c) => c.metrics.maturity === 3).length,
      operational: operational.filter((c) => c.metrics.maturity === 3).length,
      supporting: supporting.filter((c) => c.metrics.maturity === 3).length,
    },
    {
      level: "Level 4",
      strategic: strategic.filter((c) => c.metrics.maturity === 4).length,
      operational: operational.filter((c) => c.metrics.maturity === 4).length,
      supporting: supporting.filter((c) => c.metrics.maturity === 4).length,
    },
    {
      level: "Level 5",
      strategic: strategic.filter((c) => c.metrics.maturity === 5).length,
      operational: operational.filter((c) => c.metrics.maturity === 5).length,
      supporting: supporting.filter((c) => c.metrics.maturity === 5).length,
    },
  ]

  // Data for strategic importance
  const importanceData = [
    {
      importance: "Critical",
      strategic: strategic.filter((c) => c.metrics.strategicImportance === 'critical').length,
      operational: operational.filter((c) => c.metrics.strategicImportance === 'critical').length,
      supporting: supporting.filter((c) => c.metrics.strategicImportance === 'critical').length,
    },
    {
      importance: "High",
      strategic: strategic.filter((c) => c.metrics.strategicImportance === 'high').length,
      operational: operational.filter((c) => c.metrics.strategicImportance === 'high').length,
      supporting: supporting.filter((c) => c.metrics.strategicImportance === 'high').length,
    },
    {
      importance: "Medium",
      strategic: strategic.filter((c) => c.metrics.strategicImportance === 'medium').length,
      operational: operational.filter((c) => c.metrics.strategicImportance === 'medium').length,
      supporting: supporting.filter((c) => c.metrics.strategicImportance === 'medium').length,
    },
    {
      importance: "Low",
      strategic: strategic.filter((c) => c.metrics.strategicImportance === 'low').length,
      operational: operational.filter((c) => c.metrics.strategicImportance === 'low').length,
      supporting: supporting.filter((c) => c.metrics.strategicImportance === 'low').length,
    },
  ]

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Capability Analysis</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Distribution and analysis of capabilities across types
          </span>
          <span className="@[540px]/card:hidden">Capability distribution</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={chartType}
            onValueChange={setChartType}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem value="byType">By Type</ToggleGroupItem>
            <ToggleGroupItem value="maturity">Maturity</ToggleGroupItem>
            <ToggleGroupItem value="importance">Importance</ToggleGroupItem>
          </ToggleGroup>
        </CardAction>
      </CardHeader>
      <CardContent>
        {chartType === "byType" && (
          <ChartContainer config={chartConfig}>
            <BarChart data={capabilityCountData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="type"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <YAxis tickLine={false} axisLine={false} tickMargin={8} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                {capabilityCountData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
        )}

        {chartType === "maturity" && (
          <ChartContainer config={chartConfig}>
            <BarChart data={maturityData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="level"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <YAxis tickLine={false} axisLine={false} tickMargin={8} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="strategic" fill={chartConfig.strategic.color} radius={[4, 4, 0, 0]} />
              <Bar dataKey="operational" fill={chartConfig.operational.color} radius={[4, 4, 0, 0]} />
              <Bar dataKey="supporting" fill={chartConfig.supporting.color} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        )}

        {chartType === "importance" && (
          <ChartContainer config={chartConfig}>
            <BarChart data={importanceData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="importance"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <YAxis tickLine={false} axisLine={false} tickMargin={8} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="strategic" fill={chartConfig.strategic.color} radius={[4, 4, 0, 0]} />
              <Bar dataKey="operational" fill={chartConfig.operational.color} radius={[4, 4, 0, 0]} />
              <Bar dataKey="supporting" fill={chartConfig.supporting.color} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}
