'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, Target, TrendingUp, Users, FileText } from 'lucide-react'
import Link from 'next/link'

export default function StrategyDashboard() {
  const strategySections = [
    {
      id: 'okr',
      title: 'OKRs',
      description: 'Objectives and Key Results framework for goal alignment',
      icon: Target,
      href: '/frameworks/okr/dashboard',
      color: 'bg-blue-500'
    },
    {
      id: 'swot',
      title: 'SWOT Analysis',
      description: 'Strengths, Weaknesses, Opportunities, and Threats assessment',
      icon: TrendingUp,
      href: '/strategy/swot/dashboard',
      color: 'bg-green-500'
    },
    {
      id: 'pestle',
      title: 'PESTLE Analysis',
      description: 'Political, Economic, Social, Technological, Legal, Environmental factors',
      icon: FileText,
      href: '/strategy/pestle/dashboard',
      color: 'bg-purple-500'
    },
    {
      id: 'balanced-scorecard',
      title: 'Balanced Scorecard',
      description: 'Strategic planning and management system',
      icon: Users,
      href: '/strategy/balanced-scorecard/dashboard',
      color: 'bg-orange-500'
    }
  ]

  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        {/* Header */}
        <div className="px-4 lg:px-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Strategy & Goals</h1>
            <p className="text-muted-foreground">
              Strategic planning, analysis, and goal management frameworks
            </p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 px-4 lg:px-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Frameworks</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">10</div>
              <p className="text-xs text-muted-foreground">
                Strategy frameworks available
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Objectives</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">
                Across all strategic initiatives
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78%</div>
              <p className="text-xs text-muted-foreground">
                Average across all goals
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Analysis Reports</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                Strategic analysis completed
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Strategy Sections */}
        <div className="grid gap-6 px-4 lg:px-6 md:grid-cols-2">
          {strategySections.map((section) => (
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
