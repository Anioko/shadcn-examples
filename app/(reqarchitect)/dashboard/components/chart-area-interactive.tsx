"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useIsMobile } from "@/hooks/use-mobile";

export const description = "An interactive area chart";

const chartData = [
  { date: "2024-04-01", applications: 22, capabilities: 15 },
  { date: "2024-04-02", applications: 19, capabilities: 18 },
  { date: "2024-04-03", applications: 16, capabilities: 12 },
  { date: "2024-04-04", applications: 24, capabilities: 26 },
  { date: "2024-04-05", applications: 37, capabilities: 29 },
  { date: "2024-04-06", applications: 30, capabilities: 34 },
  { date: "2024-04-07", applications: 24, capabilities: 18 },
  { date: "2024-04-08", applications: 40, capabilities: 32 },
  { date: "2024-04-09", applications: 5, capabilities: 11 },
  { date: "2024-04-10", applications: 26, capabilities: 19 },
  { date: "2024-04-11", applications: 32, capabilities: 35 },
  { date: "2024-04-12", applications: 29, capabilities: 21 },
  { date: "2024-04-13", applications: 34, capabilities: 38 },
  { date: "2024-04-14", applications: 13, capabilities: 22 },
  { date: "2024-04-15", applications: 12, capabilities: 17 },
  { date: "2024-04-16", applications: 13, capabilities: 19 },
  { date: "2024-04-17", applications: 44, capabilities: 36 },
  { date: "2024-04-18", applications: 36, capabilities: 41 },
  { date: "2024-04-19", applications: 24, capabilities: 18 },
  { date: "2024-04-20", applications: 8, capabilities: 15 },
  { date: "2024-04-21", applications: 13, capabilities: 20 },
  { date: "2024-04-22", applications: 22, capabilities: 17 },
  { date: "2024-04-23", applications: 13, capabilities: 23 },
  { date: "2024-04-24", applications: 38, capabilities: 29 },
  { date: "2024-04-25", applications: 21, capabilities: 25 },
  { date: "2024-04-26", applications: 7, capabilities: 13 },
  { date: "2024-04-27", applications: 38, capabilities: 42 },
  { date: "2024-04-28", applications: 12, capabilities: 18 },
  { date: "2024-04-29", applications: 31, capabilities: 24 },
  { date: "2024-04-30", applications: 45, capabilities: 38 },
  { date: "2024-05-01", applications: 16, capabilities: 22 },
  { date: "2024-05-02", applications: 29, capabilities: 31 },
  { date: "2024-05-03", applications: 24, capabilities: 19 },
  { date: "2024-05-04", applications: 38, capabilities: 42 },
  { date: "2024-05-05", applications: 48, capabilities: 39 },
  { date: "2024-05-06", applications: 49, capabilities: 52 },
  { date: "2024-05-07", applications: 38, capabilities: 30 },
  { date: "2024-05-08", applications: 14, capabilities: 21 },
  { date: "2024-05-09", applications: 22, capabilities: 18 },
  { date: "2024-05-10", applications: 29, capabilities: 33 },
  { date: "2024-05-11", applications: 33, capabilities: 27 },
  { date: "2024-05-12", applications: 19, capabilities: 24 },
  { date: "2024-05-13", applications: 19, capabilities: 16 },
  { date: "2024-05-14", applications: 44, capabilities: 49 },
  { date: "2024-05-15", applications: 47, capabilities: 38 },
  { date: "2024-05-16", applications: 33, capabilities: 40 },
  { date: "2024-05-17", applications: 49, capabilities: 42 },
  { date: "2024-05-18", applications: 31, capabilities: 35 },
  { date: "2024-05-19", applications: 23, capabilities: 18 },
  { date: "2024-05-20", applications: 17, capabilities: 23 },
  { date: "2024-05-21", applications: 8, capabilities: 14 },
  { date: "2024-05-22", applications: 8, capabilities: 12 },
  { date: "2024-05-23", applications: 25, capabilities: 29 },
  { date: "2024-05-24", applications: 29, capabilities: 22 },
  { date: "2024-05-25", applications: 20, capabilities: 25 },
  { date: "2024-05-26", applications: 21, capabilities: 17 },
  { date: "2024-05-27", applications: 42, capabilities: 46 },
  { date: "2024-05-28", applications: 23, capabilities: 19 },
  { date: "2024-05-29", applications: 7, capabilities: 13 },
  { date: "2024-05-30", applications: 34, capabilities: 28 },
  { date: "2024-05-31", applications: 17, capabilities: 23 },
  { date: "2024-06-01", applications: 17, capabilities: 20 },
  { date: "2024-06-02", applications: 47, capabilities: 41 },
  { date: "2024-06-03", applications: 10, capabilities: 16 },
  { date: "2024-06-04", applications: 43, capabilities: 38 },
  { date: "2024-06-05", applications: 8, capabilities: 14 },
  { date: "2024-06-06", applications: 29, capabilities: 25 },
  { date: "2024-06-07", applications: 32, capabilities: 37 },
  { date: "2024-06-08", applications: 38, capabilities: 32 },
  { date: "2024-06-09", applications: 43, capabilities: 48 },
  { date: "2024-06-10", applications: 15, capabilities: 20 },
  { date: "2024-06-11", applications: 9, capabilities: 15 },
  { date: "2024-06-12", applications: 49, capabilities: 42 },
  { date: "2024-06-13", applications: 8, capabilities: 13 },
  { date: "2024-06-14", applications: 42, capabilities: 38 },
  { date: "2024-06-15", applications: 30, capabilities: 35 },
  { date: "2024-06-16", applications: 37, capabilities: 31 },
  { date: "2024-06-17", applications: 47, capabilities: 52 },
  { date: "2024-06-18", applications: 10, capabilities: 17 },
  { date: "2024-06-19", applications: 34, capabilities: 29 },
  { date: "2024-06-20", applications: 40, capabilities: 45 },
  { date: "2024-06-21", applications: 16, capabilities: 21 },
  { date: "2024-06-22", applications: 31, capabilities: 27 },
  { date: "2024-06-23", applications: 48, capabilities: 53 },
  { date: "2024-06-24", applications: 13, capabilities: 18 },
  { date: "2024-06-25", applications: 14, capabilities: 19 },
  { date: "2024-06-26", applications: 43, capabilities: 38 },
  { date: "2024-06-27", applications: 44, capabilities: 49 },
  { date: "2024-06-28", applications: 14, capabilities: 20 },
  { date: "2024-06-29", applications: 10, capabilities: 16 },
  { date: "2024-06-30", applications: 44, capabilities: 40 }
];

const chartConfig = {
  architecture: {
    label: "Architecture"
  },
  applications: {
    label: "Applications",
    color: "var(--primary)"
  },
  capabilities: {
    label: "Capabilities",
    color: "var(--primary)"
  }
} satisfies ChartConfig;

export function ChartAreaInteractive() {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState("90d");

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d");
    }
  }, [isMobile]);

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2024-06-30");
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Architecture Growth</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">Application and capability tracking over last 3 months</span>
          <span className="@[540px]/card:hidden">Last 3 months</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex">
            <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
            <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
            <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value">
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillApplications" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-applications)" stopOpacity={1.0} />
                <stop offset="95%" stopColor="var(--color-applications)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillCapabilities" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-capabilities)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-capabilities)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric"
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              defaultIndex={isMobile ? -1 : 10}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric"
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="capabilities"
              type="natural"
              fill="url(#fillCapabilities)"
              stroke="var(--color-capabilities)"
              stackId="a"
            />
            <Area
              dataKey="applications"
              type="natural"
              fill="url(#fillApplications)"
              stroke="var(--color-applications)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}