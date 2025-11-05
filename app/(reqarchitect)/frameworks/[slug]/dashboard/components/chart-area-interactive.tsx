"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
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
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useIsMobile } from "@/hooks/use-mobile"
import { FrameworkItem, generateFrameworkChartData } from "@/lib/mock-framework-data"
import { FrameworkGrandchild } from "@/lib/framework-config"

interface ChartAreaInteractiveProps {
  frameworkSlug: string
  grandchildren: FrameworkGrandchild[]
  data: FrameworkItem[]
}

const chartConfig = {
  total: {
    label: "Total",
    color: "hsl(var(--chart-1))",
  },
  done: {
    label: "Done",
    color: "hsl(var(--chart-2))",
  },
  inProgress: {
    label: "In Progress",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig

export function ChartAreaInteractive({
  frameworkSlug,
  grandchildren,
  data,
}: ChartAreaInteractiveProps) {
  const isMobile = useIsMobile()
  const [chartType, setChartType] = React.useState("total")

  const chartData = generateFrameworkChartData(grandchildren, data)

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Items by Category</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Distribution of items across framework categories
          </span>
          <span className="@[540px]/card:hidden">Item distribution</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={chartType}
            onValueChange={setChartType}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem value="total">Total</ToggleGroupItem>
            <ToggleGroupItem value="done">Done</ToggleGroupItem>
            <ToggleGroupItem value="inProgress">In Progress</ToggleGroupItem>
          </ToggleGroup>
          <Select value={chartType} onValueChange={setChartType}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Total" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="total" className="rounded-lg">
                Total
              </SelectItem>
              <SelectItem value="done" className="rounded-lg">
                Done
              </SelectItem>
              <SelectItem value="inProgress" className="rounded-lg">
                In Progress
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[300px] w-full">
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              angle={-45}
              textAnchor="end"
              height={100}
              tickFormatter={(value) => value}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Bar
              dataKey={chartType}
              fill={`var(--color-${chartType})`}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
