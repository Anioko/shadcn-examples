"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DollarSign, Users, Phone, Mail, Calendar, TrendingUp, MoreHorizontal } from "lucide-react"

interface Opportunity {
  id: string
  title: string
  company: string
  contact: string
  value: number
  stage: "lead" | "qualified" | "proposal" | "negotiation" | "closed-won" | "closed-lost"
  probability: number
  expectedCloseDate: string
  owner: string
  lastActivity: string
  source: string
  products: string[]
}

export function SalesPipeline() {
  const opportunities: Opportunity[] = [
    {
      id: "opp-1",
      title: "Enterprise Platform Implementation",
      company: "TechCorp Solutions",
      contact: "Sarah Johnson",
      value: 125000,
      stage: "proposal",
      probability: 75,
      expectedCloseDate: "2025-11-30",
      owner: "Alex Chen",
      lastActivity: "2025-10-22",
      source: "Inbound",
      products: ["Enterprise Platform", "Professional Services"]
    },
    {
      id: "opp-2",
      title: "AI Analytics Suite",
      company: "DataFlow Inc",
      contact: "Michael Brown",
      value: 45000,
      stage: "negotiation",
      probability: 85,
      expectedCloseDate: "2025-11-15",
      owner: "Sarah Kim",
      lastActivity: "2025-10-23",
      source: "Referral",
      products: ["AI Analytics", "Core Platform"]
    },
    {
      id: "opp-3",
      title: "Compliance Management System",
      company: "FinServ Global",
      contact: "Jennifer Lee",
      value: 89000,
      stage: "qualified",
      probability: 60,
      expectedCloseDate: "2025-12-15",
      owner: "David Wilson",
      lastActivity: "2025-10-21",
      source: "Cold Outreach",
      products: ["Compliance Manager", "Enterprise Integration"]
    },
    {
      id: "opp-4",
      title: "Strategic Planning Platform",
      company: "GrowthCo",
      contact: "Robert Taylor",
      value: 32000,
      stage: "lead",
      probability: 25,
      expectedCloseDate: "2026-01-31",
      owner: "Emma Davis",
      lastActivity: "2025-10-20",
      source: "Website",
      products: ["Core Platform"]
    },
    {
      id: "opp-5",
      title: "Multi-Product Enterprise Deal",
      company: "MegaCorp Industries",
      contact: "Lisa Wang",
      value: 285000,
      stage: "proposal",
      probability: 70,
      expectedCloseDate: "2025-12-31",
      owner: "Alex Chen",
      lastActivity: "2025-10-23",
      source: "Partner",
      products: ["Enterprise Platform", "AI Analytics", "Compliance Manager"]
    },
    {
      id: "opp-6",
      title: "Integration Services",
      company: "CloudTech Systems",
      contact: "Mark Johnson",
      value: 67000,
      stage: "negotiation",
      probability: 90,
      expectedCloseDate: "2025-11-10",
      owner: "Sarah Kim",
      lastActivity: "2025-10-23",
      source: "Inbound",
      products: ["Enterprise Integration", "Professional Services"]
    }
  ]

  const pipelineStages = [
    { name: "Lead", key: "lead", color: "bg-gray-500" },
    { name: "Qualified", key: "qualified", color: "bg-blue-500" },
    { name: "Proposal", key: "proposal", color: "bg-yellow-500" },
    { name: "Negotiation", key: "negotiation", color: "bg-orange-500" },
    { name: "Closed Won", key: "closed-won", color: "bg-green-500" },
    { name: "Closed Lost", key: "closed-lost", color: "bg-red-500" }
  ]

  const getStageOpportunities = (stage: string) => {
    return opportunities.filter(opp => opp.stage === stage)
  }

  const getStageValue = (stage: string) => {
    return getStageOpportunities(stage).reduce((sum, opp) => sum + opp.value, 0)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const getProbabilityColor = (probability: number) => {
    if (probability >= 80) return 'text-green-600'
    if (probability >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Sales Pipeline</h2>
          <p className="text-sm text-muted-foreground">
            Track opportunities through the sales process
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Pipeline Report</Button>
          <Button>New Opportunity</Button>
        </div>
      </div>

      {/* Pipeline Overview */}
      <div className="grid gap-4 md:grid-cols-6">
        {pipelineStages.map((stage) => {
          const stageOpportunities = getStageOpportunities(stage.key)
          const stageValue = getStageValue(stage.key)
          
          return (
            <Card key={stage.key}>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${stage.color}`} />
                  <CardTitle className="text-sm">{stage.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold">{stageOpportunities.length}</div>
                <div className="text-sm text-muted-foreground">
                  {formatCurrency(stageValue)}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Pipeline Kanban View */}
      <div className="grid gap-4 lg:grid-cols-4">
        {pipelineStages.slice(0, 4).map((stage) => {
          const stageOpportunities = getStageOpportunities(stage.key)
          
          return (
            <div key={stage.key} className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${stage.color}`} />
                  <h3 className="font-semibold">{stage.name}</h3>
                  <Badge variant="outline">{stageOpportunities.length}</Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  {formatCurrency(getStageValue(stage.key))}
                </div>
              </div>
              
              <div className="space-y-3">
                {stageOpportunities.map((opportunity) => (
                  <Card key={opportunity.id} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-sm">{opportunity.title}</CardTitle>
                          <p className="text-xs text-muted-foreground mt-1">
                            {opportunity.company}
                          </p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="text-lg font-bold text-green-600">
                          {formatCurrency(opportunity.value)}
                        </div>
                        <div className={`text-sm font-medium ${getProbabilityColor(opportunity.probability)}`}>
                          {opportunity.probability}%
                        </div>
                      </div>
                      
                      <div className="space-y-2 text-xs">
                        <div className="flex items-center gap-2">
                          <Users className="h-3 w-3 text-muted-foreground" />
                          <span>{opportunity.contact}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span>{new Date(opportunity.expectedCloseDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-3 w-3 text-muted-foreground" />
                          <span>{opportunity.owner}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {opportunity.products.slice(0, 2).map((product, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {product}
                          </Badge>
                        ))}
                        {opportunity.products.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{opportunity.products.length - 2}
                          </Badge>
                        )}
                      </div>

                      <div className="text-xs text-muted-foreground">
                        Last activity: {new Date(opportunity.lastActivity).toLocaleDateString()}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function ContactsCompanies() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contacts & Companies</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Contact management, company profiles, and relationship tracking</p>
      </CardContent>
    </Card>
  )
}

export function OpportunityManagement() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Opportunity Management</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Detailed opportunity tracking, forecasting, and win/loss analysis</p>
      </CardContent>
    </Card>
  )
}

export function ActivityTracking() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity Tracking</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Sales activities, call logs, meetings, and communication history</p>
      </CardContent>
    </Card>
  )
}

export function SalesAnalytics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales Analytics</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Sales performance analytics, forecasting, and team metrics</p>
      </CardContent>
    </Card>
  )
}