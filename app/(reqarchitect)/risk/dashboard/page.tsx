'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, Shield, Lock, AlertTriangle, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function RiskDashboard() {
  const riskSections = [
    {
      id: 'iso-27001',
      title: 'ISO/IEC 27001:2022',
      description: 'Information security management system standards',
      icon: Shield,
      href: '/frameworks/iso-27001/dashboard',
      color: 'bg-blue-500'
    },
    {
      id: 'nist-csf',
      title: 'NIST Cybersecurity Framework',
      description: 'Cybersecurity risk management framework',
      icon: Lock,
      href: '/frameworks/nist-csf/dashboard',
      color: 'bg-green-500'
    },
    {
      id: 'cobit-2019',
      title: 'COBIT 2019',
      description: 'Governance and management of enterprise IT',
      icon: CheckCircle,
      href: '/frameworks/cobit-2019/dashboard',
      color: 'bg-purple-500'
    },
    {
      id: 'sabsa',
      title: 'SABSA Security Architecture',
      description: 'Enterprise security architecture framework',
      icon: Shield,
      href: '/frameworks/sabsa/dashboard',
      color: 'bg-orange-500'
    }
  ]

  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        {/* Header */}
        <div className="px-4 lg:px-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Risk, Security & Assurance</h1>
            <p className="text-muted-foreground">
              Security, compliance, risk management, and governance frameworks
            </p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 px-4 lg:px-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Frameworks</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">11</div>
              <p className="text-xs text-muted-foreground">
                Security and compliance frameworks
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Open Risks</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <p className="text-xs text-muted-foreground">
                3 high, 8 medium, 7 low severity
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94%</div>
              <p className="text-xs text-muted-foreground">
                Across all frameworks
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Security Controls</CardTitle>
              <Lock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">247</div>
              <p className="text-xs text-muted-foreground">
                Implemented and monitored
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Risk Sections */}
        <div className="grid gap-6 px-4 lg:px-6 md:grid-cols-2">
          {riskSections.map((section) => (
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
