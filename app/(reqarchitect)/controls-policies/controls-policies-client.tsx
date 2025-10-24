"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, FileCheck, AlertTriangle, Users, Calendar, TrendingUp } from "lucide-react"

export function ControlsPoliciesClient() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Risk Assessment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Critical Risks</span>
                <Badge variant="destructive">3</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">High Priority</span>
                <Badge className="bg-orange-100 text-orange-800">7</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Medium Priority</span>
                <Badge className="bg-yellow-100 text-yellow-800">12</Badge>
              </div>
              <Button className="w-full" size="sm">View Risk Matrix</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileCheck className="h-5 w-5" />
              Compliance Tracking
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">SOC 2 Type II</span>
                <Badge className="bg-green-100 text-green-800">Compliant</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">GDPR</span>
                <Badge className="bg-green-100 text-green-800">Compliant</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">ISO 27001</span>
                <Badge className="bg-yellow-100 text-yellow-800">In Progress</Badge>
              </div>
              <Button className="w-full" size="sm">Compliance Dashboard</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Policy Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Active Policies</span>
                <Badge variant="outline">24</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Pending Review</span>
                <Badge className="bg-orange-100 text-orange-800">5</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Expiring Soon</span>
                <Badge className="bg-red-100 text-red-800">2</Badge>
              </div>
              <Button className="w-full" size="sm">Policy Library</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Governance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">94%</div>
              <div className="text-sm text-muted-foreground">Compliance Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">18</div>
              <div className="text-sm text-muted-foreground">Active Controls</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">6</div>
              <div className="text-sm text-muted-foreground">Open Audits</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">12</div>
              <div className="text-sm text-muted-foreground">Days to Next Review</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center py-8">
        <h3 className="text-lg font-semibold mb-2">🚧 Full Implementation In Progress</h3>
        <p className="text-muted-foreground mb-4">
          Complete Controls & Policies module with detailed risk management, compliance tracking, 
          policy governance, and audit workflows coming soon.
        </p>
        <Button>Request Early Access</Button>
      </div>
    </div>
  )
}