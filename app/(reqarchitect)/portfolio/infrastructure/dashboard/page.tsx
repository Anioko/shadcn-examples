'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Database, Server, HardDrive, Network } from 'lucide-react'
import Link from 'next/link'

export default function InfrastructureDashboard() {
  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        {/* Header */}
        <div className="px-4 lg:px-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Infrastructure Inventory</h1>
            <p className="text-muted-foreground">
              Servers, databases, networks, and infrastructure component management
            </p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 px-4 lg:px-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Servers</CardTitle>
              <Server className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Coming Soon</div>
              <p className="text-xs text-muted-foreground">
                Server inventory
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Databases</CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Coming Soon</div>
              <p className="text-xs text-muted-foreground">
                Database instances
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Storage</CardTitle>
              <HardDrive className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Coming Soon</div>
              <p className="text-xs text-muted-foreground">
                Storage volumes
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Networks</CardTitle>
              <Network className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Coming Soon</div>
              <p className="text-xs text-muted-foreground">
                Network components
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Coming Soon Message */}
        <div className="px-4 lg:px-6">
          <Card>
            <CardHeader>
              <CardTitle>Infrastructure Inventory</CardTitle>
              <CardDescription>This feature is under development</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                The Infrastructure Inventory dashboard will provide comprehensive tracking and management of your infrastructure components including servers, databases, storage, and network resources.
              </p>
              <div className="space-y-2">
                <h4 className="font-semibold">Planned Features:</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>Server inventory and lifecycle management</li>
                  <li>Database instance tracking and performance monitoring</li>
                  <li>Storage capacity planning and utilization</li>
                  <li>Network topology and connectivity mapping</li>
                  <li>Infrastructure health and compliance dashboards</li>
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
