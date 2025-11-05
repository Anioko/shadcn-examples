'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, Calculator, TrendingDown, DollarSign, PieChart } from 'lucide-react'
import Link from 'next/link'

export default function CostDashboard() {
  const costSections = [
    {
      id: 'finops',
      title: 'FinOps Framework',
      description: 'Cloud financial management and optimization practices',
      icon: Calculator,
      href: '/cost/finops/dashboard',
      color: 'bg-blue-500'
    },
    {
      id: 'software-spend',
      title: 'Software Spend Analysis',
      description: 'Track and optimize software licensing and subscription costs',
      icon: DollarSign,
      href: '/cost/software-spend/dashboard',
      color: 'bg-green-500'
    },
    {
      id: 'infrastructure-costs',
      title: 'Infrastructure Costs',
      description: 'Infrastructure and hosting cost management',
      icon: TrendingDown,
      href: '/cost/infrastructure/dashboard',
      color: 'bg-purple-500'
    },
    {
      id: 'abc-costing',
      title: 'Activity-Based Costing',
      description: 'Allocate costs based on activities and resources',
      icon: PieChart,
      href: '/cost/abc/dashboard',
      color: 'bg-orange-500'
    }
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        {/* Header */}
        <div className="px-4 lg:px-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Cost & FinOps</h1>
            <p className="text-muted-foreground">
              Financial operations, cost optimization, and spend management
            </p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 px-4 lg:px-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Monthly Spend</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(847500)}</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cloud Costs</CardTitle>
              <Calculator className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(425000)}</div>
              <p className="text-xs text-muted-foreground">
                50.2% of total spend
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Optimization Opportunities</CardTitle>
              <TrendingDown className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(127000)}</div>
              <p className="text-xs text-muted-foreground">
                Potential monthly savings
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cost Centers</CardTitle>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <p className="text-xs text-muted-foreground">
                Active cost allocation units
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Cost Sections */}
        <div className="grid gap-6 px-4 lg:px-6 md:grid-cols-2">
          {costSections.map((section) => (
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
            </Card>
          ))}
        </div>

        {/* Back Link */}
        <div className="px-4 lg:px-6">
          <Link href="/dashboard">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
