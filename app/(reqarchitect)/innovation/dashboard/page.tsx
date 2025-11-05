'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, Lightbulb, Sparkles, TrendingUp, Zap } from 'lucide-react'
import Link from 'next/link'

export default function InnovationDashboard() {
  const innovationSections = [
    {
      id: 'digital-transformation',
      title: 'Digital Transformation',
      description: 'Framework for enterprise digital transformation initiatives',
      icon: Zap,
      href: '/innovation/digital-transformation/dashboard',
      color: 'bg-blue-500'
    },
    {
      id: 'open-innovation',
      title: 'Open Innovation',
      description: 'Collaborative innovation with external partners',
      icon: Sparkles,
      href: '/innovation/open-innovation/dashboard',
      color: 'bg-green-500'
    },
    {
      id: 'disruptive-innovation',
      title: 'Disruptive Innovation',
      description: 'Create new markets and value networks',
      icon: TrendingUp,
      href: '/innovation/disruptive/dashboard',
      color: 'bg-purple-500'
    }
  ]

  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        {/* Header */}
        <div className="px-4 lg:px-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Innovation & Digital Transformation</h1>
            <p className="text-muted-foreground">
              Innovation management, digital transformation, and emerging technology frameworks
            </p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 px-4 lg:px-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Initiatives</CardTitle>
              <Lightbulb className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">
                Innovation projects in progress
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ideas Pipeline</CardTitle>
              <Sparkles className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87</div>
              <p className="text-xs text-muted-foreground">
                Ideas under evaluation
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Digital Maturity</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Level 3</div>
              <p className="text-xs text-muted-foreground">
                Advanced digital capabilities
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Partnerships</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                Innovation collaborations
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Innovation Sections */}
        <div className="grid gap-6 px-4 lg:px-6 md:grid-cols-2">
          {innovationSections.map((section) => (
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
