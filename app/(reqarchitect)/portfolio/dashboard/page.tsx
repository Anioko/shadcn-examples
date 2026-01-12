'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, Server, Database, GitBranch, Radar } from 'lucide-react'
import Link from 'next/link'
import {
  mockCMDBApplications,
  getApplicationsByStatus,
  getApplicationsByCriticality,
  getTotalCosts
} from '@/lib/mock-cmdb-data'

export default function TechnologyPortfolioDashboard() {
  const statusData = getApplicationsByStatus()
  const criticalityData = getApplicationsByCriticality()
  const costData = getTotalCosts()

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const portfolioSections = [
    {
      id: 'applications',
      title: 'Application Inventory',
      description: 'CMDB-based application portfolio with lifecycle, costs, and criticality',
      icon: Server,
      href: '/portfolio/applications/dashboard',
      stats: {
        total: mockCMDBApplications.length,
        active: statusData.deployed,
        critical: criticalityData.mission_critical,
        cost: formatCurrency(costData.totalTCO)
      },
      color: 'bg-blue-500'
    },
    {
      id: 'infrastructure',
      title: 'Infrastructure Inventory',
      description: 'Servers, databases, networks, and infrastructure components',
      icon: Database,
      href: '/portfolio/infrastructure/dashboard',
      stats: {
        total: 'Coming Soon',
        active: '',
        critical: '',
        cost: ''
      },
      color: 'bg-green-500'
    },
    {
      id: 'integrations',
      title: 'Integration Architecture',
      description: 'APIs, integrations, data flows, and system interconnections',
      icon: GitBranch,
      href: '/portfolio/integrations/dashboard',
      stats: {
        total: 'Coming Soon',
        active: '',
        critical: '',
        cost: ''
      },
      color: 'bg-purple-500'
    },
    {
      id: 'tech-radar',
      title: 'Technology Radar',
      description: 'Technology stack adoption, trends, and strategic direction',
      icon: Radar,
      href: '/portfolio/tech-radar/dashboard',
      stats: {
        total: 'Coming Soon',
        active: '',
        critical: '',
        cost: ''
      },
      color: 'bg-orange-500'
    }
  ]

  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        {/* Summary Cards */}
        <div className="grid gap-4 px-4 lg:px-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
              <Server className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockCMDBApplications.length}</div>
              <p className="text-xs text-muted-foreground">
                {statusData.deployed} deployed in production
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Mission Critical</CardTitle>
              <Server className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{criticalityData.mission_critical}</div>
              <p className="text-xs text-muted-foreground">
                {criticalityData.important} important applications
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Portfolio TCO</CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(costData.totalTCO)}</div>
              <p className="text-xs text-muted-foreground">
                Annual: {formatCurrency(costData.totalOpex + costData.totalCapex)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Development</CardTitle>
              <GitBranch className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statusData.development + statusData.testing}</div>
              <p className="text-xs text-muted-foreground">
                {statusData.planned} planned initiatives
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Portfolio Sections */}
        <div className="grid gap-6 px-4 lg:px-6 md:grid-cols-2">
          {portfolioSections.map((section) => (
            <Card key={section.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg ${section.color} bg-opacity-10`}>
                    <section.icon className={`h-6 w-6 ${section.color.replace('bg-', 'text-')}`} />
                  </div>
                  <Link href={section.href}>
                    <Button variant="ghost" size="sm">
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
                <CardTitle className="mt-4">{section.title}</CardTitle>
                <CardDescription>{section.description}</CardDescription>
              </CardHeader>
              <CardContent>
                {section.stats.total !== 'Coming Soon' ? (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Assets</p>
                      <p className="text-2xl font-bold">{section.stats.total}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Active</p>
                      <p className="text-2xl font-bold">{section.stats.active}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Mission Critical</p>
                      <p className="text-2xl font-bold">{section.stats.critical}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total TCO</p>
                      <p className="text-lg font-bold">{section.stats.cost}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center py-8">
                    <div className="text-center">
                      <p className="text-lg font-semibold text-muted-foreground">{section.stats.total}</p>
                      <p className="text-xs text-muted-foreground mt-1">This section will be available soon</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Links */}
        <div className="px-4 lg:px-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common portfolio management tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-4">
                <Link href="/portfolio/applications/dashboard">
                  <Button variant="outline" className="w-full justify-start">
                    <Server className="mr-2 h-4 w-4" />
                    View All Applications
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-start" disabled>
                  <Database className="mr-2 h-4 w-4" />
                  Infrastructure Map
                </Button>
                <Button variant="outline" className="w-full justify-start" disabled>
                  <GitBranch className="mr-2 h-4 w-4" />
                  Integration Flows
                </Button>
                <Button variant="outline" className="w-full justify-start" disabled>
                  <Radar className="mr-2 h-4 w-4" />
                  Technology Radar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
