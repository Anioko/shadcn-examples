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
import { ApplicationCapabilityMap, ApplicationCapabilityDomain } from "@/lib/types/capability-map"
import { Monitor, Server, Database, Lock, Cloud, Bot, MessageCircle } from "lucide-react"
import Link from "next/link"

interface ApplicationCapabilityDashboardCardsProps {
  capabilityMap: ApplicationCapabilityMap
}

const DOMAIN_CONFIG = {
  'user-experience': {
    name: 'User Experience',
    icon: Monitor,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    description: 'Frontend interfaces and user interactions',
  },
  'application-services': {
    name: 'Application Services',
    icon: Server,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    description: 'APIs, business logic, and integration',
  },
  'data-storage': {
    name: 'Data & Storage',
    icon: Database,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    description: 'Data management and storage solutions',
  },
  'security-identity': {
    name: 'Security & Identity',
    icon: Lock,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    description: 'Authentication and security',
  },
  'devops-platform': {
    name: 'DevOps & Platform',
    icon: Cloud,
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-50',
    description: 'CI/CD and infrastructure',
  },
  'ai-analytics': {
    name: 'AI & Analytics',
    icon: Bot,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    description: 'Machine learning and analytics',
  },
  'communication': {
    name: 'Communication',
    icon: MessageCircle,
    color: 'text-pink-600',
    bgColor: 'bg-pink-50',
    description: 'Notifications and messaging',
  },
}

export function ApplicationCapabilityDashboardCards({ capabilityMap }: ApplicationCapabilityDashboardCardsProps) {
  // Calculate average maturity for a domain
  const calculateAvgMaturity = (domain: ApplicationCapabilityDomain) => {
    const caps = capabilityMap.capabilities.filter((c) => c.domain === domain)
    if (caps.length === 0) return 0
    const sum = caps.reduce((acc, c) => acc + c.metrics.maturity, 0)
    return Math.round((sum / caps.length) * 20) // Convert to percentage (maturity 1-5 = 20-100%)
  }

  // Calculate critical count for a domain
  const calculateCriticalCount = (domain: ApplicationCapabilityDomain) => {
    return capabilityMap.capabilities.filter(
      (c) => c.domain === domain && c.metrics.strategicImportance === 'critical'
    ).length
  }

  const stats = (Object.keys(DOMAIN_CONFIG) as ApplicationCapabilityDomain[]).map((domain) => {
    const config = DOMAIN_CONFIG[domain]
    const count = capabilityMap.capabilities.filter((c) => c.domain === domain).length

    return {
      id: domain,
      ...config,
      count,
      avgMaturity: calculateAvgMaturity(domain),
      criticalCount: calculateCriticalCount(domain),
    }
  })

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
                {stat.description}
              </div>
              {stat.criticalCount > 0 && (
                <Badge variant="destructive" className="text-xs">
                  {stat.criticalCount} Critical
                </Badge>
              )}
            </CardFooter>
          </Card>
        )
      })}

      {/* Overview Card */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Capabilities</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {capabilityMap.capabilities.length}
          </CardTitle>
          <CardAction>
            <Button variant="outline" size="sm" asChild>
              <Link href="/frameworks/application-capability-model/capability-map">
                View Map
              </Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="text-xs text-muted-foreground">
            Across {Object.keys(DOMAIN_CONFIG).length} application domains
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
