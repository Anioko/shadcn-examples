"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Package, DollarSign, Users, TrendingUp, Calendar, MoreHorizontal } from "lucide-react"

interface Product {
  id: string
  name: string
  description: string
  category: "core" | "addon" | "enterprise" | "integration"
  status: "active" | "beta" | "planned" | "deprecated"
  tier: "free" | "pro" | "enterprise"
  pricing: {
    monthly: number
    annual: number
    usage?: string
  }
  features: Feature[]
  metrics: {
    activeUsers: number
    revenue: number
    adoption: number
    satisfaction: number
  }
  lifecycle: {
    launched: string
    lastUpdate: string
    endOfLife?: string
  }
}

interface Feature {
  id: string
  name: string
  description: string
  status: "active" | "beta" | "planned" | "deprecated"
  usage: number
  satisfaction: number
}

export function ProductCatalog() {
  const products: Product[] = [
    {
      id: "prod-1",
      name: "ReqArchitect Core Platform",
      description: "AI-powered business architecture and requirements management platform",
      category: "core",
      status: "active",
      tier: "pro",
      pricing: {
        monthly: 99,
        annual: 999,
        usage: "per user"
      },
      features: [
        { id: "f1", name: "Business Model Canvas", description: "Interactive BMC editor", status: "active", usage: 89, satisfaction: 4.5 },
        { id: "f2", name: "Capability Mapping", description: "Enterprise capability management", status: "active", usage: 76, satisfaction: 4.3 },
        { id: "f3", name: "AI Assistant", description: "Intelligent guidance and recommendations", status: "beta", usage: 62, satisfaction: 4.1 },
        { id: "f4", name: "Strategic Planning", description: "Goal setting and OKR tracking", status: "active", usage: 84, satisfaction: 4.4 }
      ],
      metrics: {
        activeUsers: 2847,
        revenue: 283200,
        adoption: 89,
        satisfaction: 4.3
      },
      lifecycle: {
        launched: "2025-01-15",
        lastUpdate: "2025-10-01"
      }
    },
    {
      id: "prod-2",
      name: "Enterprise Integrations",
      description: "Pre-built connectors for enterprise systems",
      category: "enterprise",
      status: "active",
      tier: "enterprise",
      pricing: {
        monthly: 299,
        annual: 2999,
        usage: "per integration"
      },
      features: [
        { id: "f5", name: "SAP Connector", description: "Native SAP integration", status: "active", usage: 45, satisfaction: 4.2 },
        { id: "f6", name: "Salesforce Sync", description: "Bi-directional CRM sync", status: "active", usage: 67, satisfaction: 4.4 },
        { id: "f7", name: "Microsoft 365", description: "Teams and SharePoint integration", status: "beta", usage: 34, satisfaction: 3.9 },
        { id: "f8", name: "Custom APIs", description: "Build custom integrations", status: "planned", usage: 0, satisfaction: 0 }
      ],
      metrics: {
        activeUsers: 456,
        revenue: 136400,
        adoption: 67,
        satisfaction: 4.2
      },
      lifecycle: {
        launched: "2025-06-01",
        lastUpdate: "2025-09-15"
      }
    },
    {
      id: "prod-3",
      name: "AI Analytics Suite",
      description: "Advanced analytics and insights powered by machine learning",
      category: "addon",
      status: "beta",
      tier: "pro",
      pricing: {
        monthly: 149,
        annual: 1499,
        usage: "per workspace"
      },
      features: [
        { id: "f9", name: "Predictive Analytics", description: "ML-powered predictions", status: "beta", usage: 23, satisfaction: 4.0 },
        { id: "f10", name: "Custom Dashboards", description: "Build custom analytics views", status: "active", usage: 78, satisfaction: 4.3 },
        { id: "f11", name: "Automated Insights", description: "AI-generated insights", status: "beta", usage: 34, satisfaction: 3.8 },
        { id: "f12", name: "Benchmark Comparison", description: "Industry benchmarking", status: "planned", usage: 0, satisfaction: 0 }
      ],
      metrics: {
        activeUsers: 234,
        revenue: 34866,
        adoption: 45,
        satisfaction: 4.0
      },
      lifecycle: {
        launched: "2025-08-01",
        lastUpdate: "2025-10-10"
      }
    },
    {
      id: "prod-4",
      name: "Mobile Companion",
      description: "Native mobile app for iOS and Android",
      category: "addon",
      status: "planned",
      tier: "free",
      pricing: {
        monthly: 0,
        annual: 0,
        usage: "included with Pro plan"
      },
      features: [
        { id: "f13", name: "Offline Access", description: "Work without internet", status: "planned", usage: 0, satisfaction: 0 },
        { id: "f14", name: "Push Notifications", description: "Real-time updates", status: "planned", usage: 0, satisfaction: 0 },
        { id: "f15", name: "Quick Actions", description: "Common tasks on mobile", status: "planned", usage: 0, satisfaction: 0 }
      ],
      metrics: {
        activeUsers: 0,
        revenue: 0,
        adoption: 0,
        satisfaction: 0
      },
      lifecycle: {
        launched: "2026-03-01",
        lastUpdate: "2025-10-01"
      }
    },
    {
      id: "prod-5",
      name: "Compliance Manager",
      description: "SOC 2, ISO 27001, and GDPR compliance management",
      category: "enterprise",
      status: "active",
      tier: "enterprise",
      pricing: {
        monthly: 199,
        annual: 1999,
        usage: "per framework"
      },
      features: [
        { id: "f16", name: "SOC 2 Framework", description: "SOC 2 compliance tracking", status: "active", usage: 89, satisfaction: 4.5 },
        { id: "f17", name: "ISO 27001", description: "Information security management", status: "active", usage: 67, satisfaction: 4.3 },
        { id: "f18", name: "GDPR Tools", description: "Data protection compliance", status: "active", usage: 78, satisfaction: 4.2 },
        { id: "f19", name: "Custom Frameworks", description: "Build custom compliance frameworks", status: "beta", usage: 23, satisfaction: 3.9 }
      ],
      metrics: {
        activeUsers: 189,
        revenue: 37611,
        adoption: 76,
        satisfaction: 4.3
      },
      lifecycle: {
        launched: "2025-04-01",
        lastUpdate: "2025-09-20"
      }
    }
  ]

  const getStatusColor = (status: Product['status']) => {
    switch (status) {
      case 'active': return 'bg-green-500'
      case 'beta': return 'bg-blue-500'
      case 'planned': return 'bg-yellow-500'
      case 'deprecated': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusVariant = (status: Product['status']) => {
    switch (status) {
      case 'active': return 'default'
      case 'beta': return 'secondary'
      case 'planned': return 'secondary'
      case 'deprecated': return 'destructive'
      default: return 'outline'
    }
  }

  const getCategoryIcon = (category: Product['category']) => {
    switch (category) {
      case 'core': return <Package className="h-4 w-4" />
      case 'addon': return <TrendingUp className="h-4 w-4" />
      case 'enterprise': return <Users className="h-4 w-4" />
      case 'integration': return <Package className="h-4 w-4" />
      default: return <Package className="h-4 w-4" />
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Product Catalog</h2>
          <p className="text-sm text-muted-foreground">
            Manage products, features, and track performance metrics
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Export Catalog</Button>
          <Button>Add Product</Button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Card key={product.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  {getCategoryIcon(product.category)}
                  <div>
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {product.description}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge variant={getStatusVariant(product.status)}>
                    {product.status.toUpperCase()}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Pricing */}
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <div className="text-2xl font-bold">
                    {product.pricing.monthly > 0 ? formatCurrency(product.pricing.monthly) : 'Free'}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {product.pricing.monthly > 0 ? `${product.pricing.usage}/month` : product.pricing.usage}
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  {product.tier.toUpperCase()}
                </Badge>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">Active Users</div>
                  <div className="font-medium">{product.metrics.activeUsers.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Monthly Revenue</div>
                  <div className="font-medium">{formatCurrency(product.metrics.revenue)}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Adoption Rate</div>
                  <div className="font-medium">{product.metrics.adoption}%</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Satisfaction</div>
                  <div className="font-medium">{product.metrics.satisfaction}/5.0</div>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-2">
                <div className="text-sm font-medium">Key Features ({product.features.length})</div>
                <div className="space-y-1">
                  {product.features.slice(0, 3).map((feature) => (
                    <div key={feature.id} className="flex items-center justify-between text-sm">
                      <span>{feature.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">{feature.usage}%</span>
                        <Badge 
                          variant={feature.status === 'active' ? 'default' : 'secondary'} 
                          className="text-xs"
                        >
                          {feature.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                  {product.features.length > 3 && (
                    <div className="text-xs text-muted-foreground">
                      +{product.features.length - 3} more features
                    </div>
                  )}
                </div>
              </div>

              {/* Lifecycle */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>
                  Launched: {new Date(product.lifecycle.launched).toLocaleDateString()}
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm">View Details</Button>
                <Button variant="outline" size="sm">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  Analytics
                </Button>
                <Button variant="outline" size="sm">
                  <DollarSign className="h-4 w-4 mr-1" />
                  Pricing
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export function PricingModels() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pricing Models & Strategy</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Pricing strategy management, A/B testing, and revenue optimization</p>
      </CardContent>
    </Card>
  )
}

export function ProductRoadmap() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Roadmap</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Strategic product roadmap with timeline, priorities, and customer impact</p>
      </CardContent>
    </Card>
  )
}

export function FeatureRequests() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Feature Requests</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Customer feature requests, voting, prioritization, and implementation tracking</p>
      </CardContent>
    </Card>
  )
}

export function ProductAnalytics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Analytics</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Product usage analytics, feature adoption, and performance metrics</p>
      </CardContent>
    </Card>
  )
}