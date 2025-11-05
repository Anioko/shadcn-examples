"use client"

import * as React from "react"
import { IconTrendingUp } from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CapabilityMap } from "@/lib/types/capability-map"
import { Target, Cog, Shield, Eye } from "lucide-react"
import Link from "next/link"

interface CapabilityDashboardCardsProps {
  capabilityMap: CapabilityMap
}

export function CapabilityDashboardCards({ capabilityMap }: CapabilityDashboardCardsProps) {
  // Calculate statistics for each capability type
  const strategic = capabilityMap.capabilities.filter((c) => c.type === 'strategic')
  const operational = capabilityMap.capabilities.filter((c) => c.type === 'operational')
  const supporting = capabilityMap.capabilities.filter((c) => c.type === 'supporting')

  // Calculate average maturity for each type
  const calculateAvgMaturity = (caps: typeof strategic) => {
    if (caps.length === 0) return 0
    const sum = caps.reduce((acc, c) => acc + c.metrics.maturity, 0)
    return Math.round((sum / caps.length) * 20) // Convert to percentage (maturity 1-5 = 20-100%)
  }

  // Calculate critical count for each type
  const calculateCriticalCount = (caps: typeof strategic) => {
    return caps.filter((c) => c.metrics.strategicImportance === 'critical').length
  }

  const stats = [
    {
      id: 'strategic',
      name: 'Strategic Capabilities',
      icon: Target,
      count: strategic.length,
      avgMaturity: calculateAvgMaturity(strategic),
      criticalCount: calculateCriticalCount(strategic),
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      description: 'High-level capabilities that differentiate the organization',
    },
    {
      id: 'operational',
      name: 'Operational Capabilities',
      icon: Cog,
      count: operational.length,
      avgMaturity: calculateAvgMaturity(operational),
      criticalCount: calculateCriticalCount(operational),
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      description: 'Core business operations that deliver value',
    },
    {
      id: 'supporting',
      name: 'Supporting Capabilities',
      icon: Shield,
      count: supporting.length,
      avgMaturity: calculateAvgMaturity(supporting),
      criticalCount: calculateCriticalCount(supporting),
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      description: 'Foundational capabilities that enable operations',
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-3">
      {stats.map((stat) => {
        const Icon = stat.icon

        return (
          <Card key={stat.id} className="@container/card">
            <CardHeader>
              <CardDescription className="flex items-center gap-2">
                <Icon className={`h-4 w-4 ${stat.color}`} />
                {stat.name}
              </CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {stat.count}
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  {stat.avgMaturity > 0 && <IconTrendingUp />}
                  {stat.avgMaturity}% Avg Maturity
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-2 text-sm">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="font-medium">{stat.criticalCount} critical</span>
                <span>•</span>
                <span>{stat.description}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                asChild
              >
                <Link href="/frameworks/capability-model/capability-map">
                  <Eye className="h-4 w-4 mr-2" />
                  View {stat.name}
                </Link>
              </Button>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}
