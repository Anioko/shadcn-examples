'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, Users, Heart, MessageSquare, Star } from 'lucide-react'
import Link from 'next/link'

export default function CustomerDashboard() {
  const customerSections = [
    {
      id: 'customer-journey',
      title: 'Customer Journey Mapping',
      description: 'Visualize and optimize customer experience touchpoints',
      icon: Users,
      href: '/customer/journey-mapping/dashboard',
      color: 'bg-blue-500'
    },
    {
      id: 'service-design',
      title: 'Service Design Thinking',
      description: 'Design customer-centric services and experiences',
      icon: Heart,
      href: '/customer/service-design/dashboard',
      color: 'bg-green-500'
    },
    {
      id: 'jtbd',
      title: 'Jobs-to-be-Done (JTBD)',
      description: 'Understand customer needs and motivations',
      icon: MessageSquare,
      href: '/customer/jtbd/dashboard',
      color: 'bg-purple-500'
    },
    {
      id: 'nps',
      title: 'Net Promoter Score',
      description: 'Measure customer loyalty and satisfaction',
      icon: Star,
      href: '/customer/nps/dashboard',
      color: 'bg-orange-500'
    }
  ]

  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        {/* Header */}
        <div className="px-4 lg:px-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Customer & Experience</h1>
            <p className="text-muted-foreground">
              Customer experience, journey mapping, and service design frameworks
            </p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 px-4 lg:px-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">NPS Score</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">72</div>
              <p className="text-xs text-muted-foreground">
                Excellent customer loyalty
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Customer Satisfaction</CardTitle>
              <Heart className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.8</div>
              <p className="text-xs text-muted-foreground">
                Out of 5.0 average rating
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Journey Maps</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">
                Across all touchpoints
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Feedback Collected</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,247</div>
              <p className="text-xs text-muted-foreground">
                This month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Customer Sections */}
        <div className="grid gap-6 px-4 lg:px-6 md:grid-cols-2">
          {customerSections.map((section) => (
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
