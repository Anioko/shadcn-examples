'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Radar, TrendingUp, Zap, Star } from 'lucide-react'
import Link from 'next/link'

export default function TechRadarDashboard() {
  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        {/* Header */}
        <div className="px-4 lg:px-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Technology Radar</h1>
            <p className="text-muted-foreground">
              Technology stack adoption, trends, and strategic direction
            </p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 px-4 lg:px-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Adopt</CardTitle>
              <Star className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Coming Soon</div>
              <p className="text-xs text-muted-foreground">
                Production ready
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Trial</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Coming Soon</div>
              <p className="text-xs text-muted-foreground">
                Under evaluation
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Assess</CardTitle>
              <Zap className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Coming Soon</div>
              <p className="text-xs text-muted-foreground">
                Worth exploring
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Hold</CardTitle>
              <Radar className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Coming Soon</div>
              <p className="text-xs text-muted-foreground">
                Proceed with caution
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Coming Soon Message */}
        <div className="px-4 lg:px-6">
          <Card>
            <CardHeader>
              <CardTitle>Technology Radar</CardTitle>
              <CardDescription>This feature is under development</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                The Technology Radar dashboard will help you track and manage technology adoption across your organization, identifying strategic technology choices and trends.
              </p>
              <div className="space-y-2">
                <h4 className="font-semibold">Planned Features:</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>Visual technology radar with quadrants (Tools, Techniques, Platforms, Languages & Frameworks)</li>
                  <li>Technology maturity tracking (Adopt, Trial, Assess, Hold)</li>
                  <li>Strategic technology recommendations</li>
                  <li>Technology lifecycle management</li>
                  <li>Industry trend analysis and benchmarking</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Back Links */}
        <div className="px-4 lg:px-6 flex gap-2">
          <Link href="/portfolio/dashboard">
            <Button variant="outline">Back to Portfolio</Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="ghost">Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
