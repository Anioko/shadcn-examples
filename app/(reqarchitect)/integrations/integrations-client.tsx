"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Globe, 
  Webhook, 
  Database, 
  Cloud, 
  Zap, 
  Settings, 
  Monitor,
  AlertTriangle,
  CheckCircle,
  Clock,
  Key,
  FileJson,
  MessageSquare,
  RefreshCw,
  Activity,
  TrendingUp,
  AlertCircle,
  Play,
  Pause,
  RotateCcw,
  Eye,
  Edit3,
  Trash2,
  Plus,
  Download,
  Upload,
  Filter,
  Search,
  MoreHorizontal,
  ExternalLink,
  Code,
  Copy,
  Bug,
  Shield,
  Lock
} from "lucide-react"

interface ApiEndpoint {
  id: string
  name: string
  description: string
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
  path: string
  service: string
  version: string
  status: "active" | "deprecated" | "planned" | "maintenance"
  authentication: "api-key" | "oauth" | "jwt" | "basic" | "none"
  rateLimit: {
    requests: number
    window: string
  }
  usage: {
    daily: number
    weekly: number
    monthly: number
  }
  latency: {
    p50: number
    p95: number
    p99: number
  }
  errorRate: number
  consumers: string[]
  lastModified: string
}

interface Webhook {
  id: string
  name: string
  description: string
  url: string
  events: string[]
  status: "active" | "inactive" | "error"
  retryPolicy: {
    maxRetries: number
    backoffStrategy: "linear" | "exponential"
    timeout: number
  }
  authentication: {
    type: "hmac" | "bearer" | "basic" | "none"
    secretKey?: string
  }
  deliveryStats: {
    successful: number
    failed: number
    pending: number
  }
  lastDelivery: string
  createdAt: string
}

interface DataConnector {
  id: string
  name: string
  description: string
  type: "database" | "api" | "file" | "queue" | "stream"
  source: {
    system: string
    endpoint: string
    credentials: string
  }
  destination: {
    system: string
    endpoint: string
    credentials: string
  }
  mapping: FieldMapping[]
  schedule: {
    type: "realtime" | "batch" | "trigger"
    interval?: string
    cron?: string
  }
  status: "running" | "stopped" | "error" | "configuring"
  dataVolume: {
    recordsPerHour: number
    bytesPerHour: number
  }
  lastRun: string
  nextRun?: string
  errorCount: number
}

interface FieldMapping {
  source: string
  destination: string
  transformation?: string
  validation?: string
}

interface IntegrationLog {
  id: string
  timestamp: string
  level: "info" | "warn" | "error"
  service: string
  message: string
  metadata?: Record<string, unknown>
  duration?: number
  statusCode?: number
}

export function IntegrationsClient() {
  const [activeTab, setActiveTab] = useState("apis")
  
  const [apiEndpoints] = useState<ApiEndpoint[]>([
    {
      id: "api-1",
      name: "Customer API",
      description: "Core customer management API",
      method: "GET",
      path: "/api/v1/customers",
      service: "Customer Service",
      version: "v1.2.0",
      status: "active",
      authentication: "jwt",
      rateLimit: {
        requests: 1000,
        window: "1 hour"
      },
      usage: {
        daily: 15420,
        weekly: 98650,
        monthly: 426800
      },
      latency: {
        p50: 89,
        p95: 230,
        p99: 450
      },
      errorRate: 0.02,
      consumers: ["Web App", "Mobile App", "Analytics Service"],
      lastModified: "2024-10-20T14:30:00Z"
    },
    {
      id: "api-2", 
      name: "Payment Processing",
      description: "Payment gateway integration",
      method: "POST",
      path: "/api/v2/payments",
      service: "Payment Service",
      version: "v2.0.1",
      status: "active",
      authentication: "api-key",
      rateLimit: {
        requests: 500,
        window: "1 hour"
      },
      usage: {
        daily: 8750,
        weekly: 52300,
        monthly: 234900
      },
      latency: {
        p50: 340,
        p95: 890,
        p99: 1200
      },
      errorRate: 0.008,
      consumers: ["E-commerce", "Subscription Service"],
      lastModified: "2024-10-18T09:15:00Z"
    }
  ])

  const [webhooks] = useState<Webhook[]>([
    {
      id: "webhook-1",
      name: "Customer Created",
      description: "Triggered when a new customer is created",
      url: "https://api.partner.com/webhooks/customer-created",
      events: ["customer.created", "customer.updated"],
      status: "active",
      retryPolicy: {
        maxRetries: 3,
        backoffStrategy: "exponential",
        timeout: 30
      },
      authentication: {
        type: "hmac",
        secretKey: "***"
      },
      deliveryStats: {
        successful: 2847,
        failed: 12,
        pending: 3
      },
      lastDelivery: "2024-10-24T08:42:00Z",
      createdAt: "2024-09-15T10:00:00Z"
    },
    {
      id: "webhook-2",
      name: "Payment Processed",
      description: "Notification for completed payments",
      url: "https://accounting.company.com/webhooks/payment",
      events: ["payment.completed", "payment.failed"],
      status: "active",
      retryPolicy: {
        maxRetries: 5,
        backoffStrategy: "linear",
        timeout: 60
      },
      authentication: {
        type: "bearer"
      },
      deliveryStats: {
        successful: 5692,
        failed: 8,
        pending: 1
      },
      lastDelivery: "2024-10-24T10:15:00Z",
      createdAt: "2024-08-20T14:30:00Z"
    }
  ])

  const [dataConnectors] = useState<DataConnector[]>([
    {
      id: "connector-1",
      name: "CRM to Data Warehouse",
      description: "Sync customer data from CRM to analytics warehouse",
      type: "database",
      source: {
        system: "Salesforce",
        endpoint: "salesforce.api.com",
        credentials: "sf-prod-creds"
      },
      destination: {
        system: "Snowflake",
        endpoint: "company.snowflakecomputing.com",
        credentials: "sf-dwh-creds"
      },
      mapping: [
        { source: "Account.Name", destination: "customers.company_name" },
        { source: "Contact.Email", destination: "customers.email" },
        { source: "Account.Industry", destination: "customers.industry" }
      ],
      schedule: {
        type: "batch",
        interval: "4 hours"
      },
      status: "running",
      dataVolume: {
        recordsPerHour: 2500,
        bytesPerHour: 1250000
      },
      lastRun: "2024-10-24T08:00:00Z",
      nextRun: "2024-10-24T12:00:00Z",
      errorCount: 0
    },
    {
      id: "connector-2",
      name: "Order Stream Processing",
      description: "Real-time order processing from e-commerce to fulfillment",
      type: "stream",
      source: {
        system: "E-commerce Platform",
        endpoint: "kafka.orders.topic",
        credentials: "kafka-prod-creds"
      },
      destination: {
        system: "Fulfillment API",
        endpoint: "fulfillment.company.com/api",
        credentials: "fulfillment-api-key"
      },
      mapping: [
        { source: "order.id", destination: "fulfillment_order.external_id" },
        { source: "order.items", destination: "fulfillment_order.line_items", transformation: "array_to_json" },
        { source: "order.shipping_address", destination: "fulfillment_order.shipping_address" }
      ],
      schedule: {
        type: "realtime"
      },
      status: "running",
      dataVolume: {
        recordsPerHour: 850,
        bytesPerHour: 425000
      },
      lastRun: "2024-10-24T10:29:45Z",
      errorCount: 2
    }
  ])

  const [integrationLogs] = useState<IntegrationLog[]>([
    {
      id: "log-1",
      timestamp: "2024-10-24T10:29:45Z",
      level: "info",
      service: "Order Stream Processing",
      message: "Successfully processed order batch",
      metadata: { orders_processed: 23, duration_ms: 340 },
      duration: 340,
      statusCode: 200
    },
    {
      id: "log-2",
      timestamp: "2024-10-24T10:28:12Z",
      level: "error",
      service: "Customer API",
      message: "Rate limit exceeded for client web-app-prod",
      metadata: { client_id: "web-app-prod", requests_per_hour: 1050 },
      statusCode: 429
    },
    {
      id: "log-3",
      timestamp: "2024-10-24T10:25:33Z",
      level: "warn",
      service: "Payment Processing",
      message: "High latency detected in payment gateway",
      metadata: { avg_latency_ms: 1250, threshold_ms: 1000 },
      duration: 1250,
      statusCode: 200
    }
  ])

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="apis" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            APIs
          </TabsTrigger>
          <TabsTrigger value="webhooks" className="flex items-center gap-2">
            <Webhook className="h-4 w-4" />
            Webhooks
          </TabsTrigger>
          <TabsTrigger value="connectors" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            Data Connectors
          </TabsTrigger>
          <TabsTrigger value="monitoring" className="flex items-center gap-2">
            <Monitor className="h-4 w-4" />
            Monitoring
          </TabsTrigger>
          <TabsTrigger value="logs" className="flex items-center gap-2">
            <FileJson className="h-4 w-4" />
            Logs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="apis" className="space-y-6">
          <ApiManagement endpoints={apiEndpoints} />
        </TabsContent>

        <TabsContent value="webhooks" className="space-y-6">
          <WebhookManagement webhooks={webhooks} />
        </TabsContent>

        <TabsContent value="connectors" className="space-y-6">
          <DataConnectorManagement connectors={dataConnectors} />
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-6">
          <IntegrationMonitoring />
        </TabsContent>

        <TabsContent value="logs" className="space-y-6">
          <IntegrationLogs logs={integrationLogs} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ApiManagement({ endpoints }: { endpoints: ApiEndpoint[] }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800 border-green-200"
      case "deprecated": return "bg-orange-100 text-orange-800 border-orange-200"
      case "planned": return "bg-blue-100 text-blue-800 border-blue-200"
      case "maintenance": return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default: return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getMethodColor = (method: string) => {
    switch (method) {
      case "GET": return "bg-blue-100 text-blue-800"
      case "POST": return "bg-green-100 text-green-800"
      case "PUT": return "bg-orange-100 text-orange-800"
      case "DELETE": return "bg-red-100 text-red-800"
      case "PATCH": return "bg-purple-100 text-purple-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">API Management</h2>
          <p className="text-muted-foreground">Manage and monitor your API endpoints</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            New API
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export OpenAPI
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {endpoints.map((endpoint) => (
          <Card key={endpoint.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Badge className={getMethodColor(endpoint.method)}>
                    {endpoint.method}
                  </Badge>
                  <CardTitle className="text-lg">{endpoint.name}</CardTitle>
                  <Badge className={getStatusColor(endpoint.status)}>
                    {endpoint.status}
                  </Badge>
                  <Badge variant="outline">
                    {endpoint.version}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    Test
                  </Button>
                  <Button variant="outline" size="sm">
                    <Code className="h-4 w-4 mr-2" />
                    Docs
                  </Button>
                  <Button variant="outline" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="font-mono bg-gray-100 px-2 py-1 rounded">{endpoint.path}</span>
                <span>Service: {endpoint.service}</span>
                <span>Auth: {endpoint.authentication}</span>
              </div>
              <p className="text-muted-foreground">{endpoint.description}</p>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Rate Limit</h4>
                  <p className="text-sm">
                    {endpoint.rateLimit.requests} requests per {endpoint.rateLimit.window}
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Error Rate</h4>
                  <p className="text-sm text-green-600">{(endpoint.errorRate * 100).toFixed(2)}%</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">P95 Latency</h4>
                  <p className="text-sm">{endpoint.latency.p95}ms</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Daily Usage</h4>
                  <p className="text-sm">{endpoint.usage.daily.toLocaleString()} requests</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-sm mb-2">Consumers</h4>
                <div className="flex gap-2">
                  {endpoint.consumers.map((consumer, i) => (
                    <Badge key={i} variant="outline">
                      {consumer}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground border-t pt-4">
                <span>Last modified: {new Date(endpoint.lastModified).toLocaleString()}</span>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Edit3 className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Copy className="h-3 w-3 mr-1" />
                    Clone
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function WebhookManagement({ webhooks }: { webhooks: Webhook[] }) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <CheckCircle className="h-4 w-4 text-green-600" />
      case "inactive": return <Pause className="h-4 w-4 text-gray-600" />
      case "error": return <AlertTriangle className="h-4 w-4 text-red-600" />
      default: return <Clock className="h-4 w-4 text-yellow-600" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Webhook Management</h2>
          <p className="text-muted-foreground">Configure and monitor webhook deliveries</p>
        </div>
        <Button variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          New Webhook
        </Button>
      </div>

      <div className="grid gap-4">
        {webhooks.map((webhook) => (
          <Card key={webhook.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getStatusIcon(webhook.status)}
                  <CardTitle className="text-lg">{webhook.name}</CardTitle>
                  <Badge variant="outline">{webhook.authentication.type}</Badge>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Play className="h-4 w-4 mr-2" />
                    Test
                  </Button>
                  <Button variant="outline" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <p className="text-muted-foreground">{webhook.description}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="font-mono bg-gray-100 px-2 py-1 rounded text-xs">{webhook.url}</span>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-medium text-sm mb-2">Events</h4>
                  <div className="space-y-1">
                    {webhook.events.map((event, i) => (
                      <Badge key={i} variant="secondary" className="mr-1 mb-1 text-xs">
                        {event}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-sm mb-2">Delivery Stats</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Successful:</span>
                      <span className="text-green-600 font-medium">{webhook.deliveryStats.successful}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Failed:</span>
                      <span className="text-red-600 font-medium">{webhook.deliveryStats.failed}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pending:</span>
                      <span className="text-yellow-600 font-medium">{webhook.deliveryStats.pending}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-sm mb-2">Retry Policy</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Max Retries:</span>
                      <span className="font-medium">{webhook.retryPolicy.maxRetries}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Strategy:</span>
                      <span className="font-medium">{webhook.retryPolicy.backoffStrategy}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Timeout:</span>
                      <span className="font-medium">{webhook.retryPolicy.timeout}s</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground border-t pt-4">
                <span>Last delivery: {new Date(webhook.lastDelivery).toLocaleString()}</span>
                <span>Created: {new Date(webhook.createdAt).toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function DataConnectorManagement({ connectors }: { connectors: DataConnector[] }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "running": return "bg-green-100 text-green-800 border-green-200"
      case "stopped": return "bg-gray-100 text-gray-800 border-gray-200"
      case "error": return "bg-red-100 text-red-800 border-red-200"
      case "configuring": return "bg-blue-100 text-blue-800 border-blue-200"
      default: return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "database": return Database
      case "api": return Globe
      case "file": return FileJson
      case "queue": return MessageSquare
      case "stream": return Activity
      default: return Cloud
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Data Connectors</h2>
          <p className="text-muted-foreground">Configure data pipelines and synchronization</p>
        </div>
        <Button variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          New Connector
        </Button>
      </div>

      <div className="grid gap-4">
        {connectors.map((connector) => {
          const TypeIcon = getTypeIcon(connector.type)
          
          return (
            <Card key={connector.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <TypeIcon className="h-5 w-5" />
                    <CardTitle className="text-lg">{connector.name}</CardTitle>
                    <Badge className={getStatusColor(connector.status)}>
                      {connector.status}
                    </Badge>
                    <Badge variant="outline">{connector.type}</Badge>
                    <Badge variant="outline">{connector.schedule.type}</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Play className="h-4 w-4 mr-2" />
                      Run Now
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4 mr-2" />
                      Configure
                    </Button>
                  </div>
                </div>
                <p className="text-muted-foreground">{connector.description}</p>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-sm mb-3">Data Flow</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <div className="font-medium text-sm mb-1">Source</div>
                        <div className="text-sm">{connector.source.system}</div>
                        <div className="text-xs text-muted-foreground font-mono">{connector.source.endpoint}</div>
                      </div>
                      <div className="flex justify-center">
                        <div className="h-px w-12 bg-border flex items-center justify-center">
                          <div className="h-2 w-2 rounded-full bg-border"></div>
                        </div>
                      </div>
                      <div className="p-3 bg-green-50 rounded-lg">
                        <div className="font-medium text-sm mb-1">Destination</div>
                        <div className="text-sm">{connector.destination.system}</div>
                        <div className="text-xs text-muted-foreground font-mono">{connector.destination.endpoint}</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm mb-3">Performance Metrics</h4>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 border rounded-lg">
                          <div className="text-xs text-muted-foreground">Records/Hour</div>
                          <div className="font-medium">{connector.dataVolume.recordsPerHour.toLocaleString()}</div>
                        </div>
                        <div className="p-3 border rounded-lg">
                          <div className="text-xs text-muted-foreground">Bytes/Hour</div>
                          <div className="font-medium">{(connector.dataVolume.bytesPerHour / 1024 / 1024).toFixed(1)}MB</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 border rounded-lg">
                          <div className="text-xs text-muted-foreground">Error Count</div>
                          <div className={`font-medium ${connector.errorCount > 0 ? 'text-red-600' : 'text-green-600'}`}>
                            {connector.errorCount}
                          </div>
                        </div>
                        <div className="p-3 border rounded-lg">
                          <div className="text-xs text-muted-foreground">Schedule</div>
                          <div className="font-medium text-sm">
                            {connector.schedule.interval || connector.schedule.cron || 'Real-time'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-sm mb-3">Field Mappings</h4>
                  <div className="space-y-2">
                    {connector.mapping.slice(0, 3).map((mapping, i) => (
                      <div key={i} className="p-2 bg-gray-50 rounded flex items-center gap-3 text-sm">
                        <span className="font-mono text-blue-600">{mapping.source}</span>
                        <span className="text-muted-foreground">→</span>
                        <span className="font-mono text-green-600">{mapping.destination}</span>
                        {mapping.transformation && (
                          <Badge variant="outline" className="text-xs">
                            {mapping.transformation}
                          </Badge>
                        )}
                      </div>
                    ))}
                    {connector.mapping.length > 3 && (
                      <div className="text-xs text-muted-foreground">
                        +{connector.mapping.length - 3} more mappings
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground border-t pt-4">
                  <div className="flex gap-4">
                    <span>Last run: {new Date(connector.lastRun).toLocaleString()}</span>
                    {connector.nextRun && (
                      <span>Next run: {new Date(connector.nextRun).toLocaleString()}</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

function IntegrationMonitoring() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Integration Monitoring</h2>
        <p className="text-muted-foreground">Real-time monitoring and alerts for all integrations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Active APIs</CardTitle>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">247</div>
            <p className="text-xs text-muted-foreground">+12 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4M</div>
            <p className="text-xs text-muted-foreground">+15.2% from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">0.04%</div>
            <p className="text-xs text-muted-foreground">-0.01% from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Avg Latency</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142ms</div>
            <p className="text-xs text-muted-foreground">+8ms from yesterday</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Active Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 border border-red-200 bg-red-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm">High Error Rate</span>
                  <Badge variant="destructive">Critical</Badge>
                </div>
                <p className="text-sm text-muted-foreground">Payment API error rate above 5%</p>
                <p className="text-xs text-muted-foreground mt-1">5 minutes ago</p>
              </div>
              <div className="p-3 border border-yellow-200 bg-yellow-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm">Latency Spike</span>
                  <Badge variant="outline" className="bg-yellow-100">Warning</Badge>
                </div>
                <p className="text-sm text-muted-foreground">Customer API P95 above 1000ms</p>
                <p className="text-xs text-muted-foreground mt-1">12 minutes ago</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              System Health
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">API Gateway</span>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span className="text-sm text-green-600">Healthy</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Database Connectors</span>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span className="text-sm text-green-600">Healthy</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Message Queue</span>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                  <span className="text-sm text-yellow-600">Degraded</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Webhook Delivery</span>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span className="text-sm text-green-600">Healthy</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function IntegrationLogs({ logs }: { logs: IntegrationLog[] }) {
  const getLevelColor = (level: string) => {
    switch (level) {
      case "error": return "text-red-600 bg-red-50"
      case "warn": return "text-yellow-600 bg-yellow-50"
      case "info": return "text-blue-600 bg-blue-50"
      default: return "text-gray-600 bg-gray-50"
    }
  }

  const getLevelIcon = (level: string) => {
    switch (level) {
      case "error": return <AlertTriangle className="h-4 w-4" />
      case "warn": return <AlertCircle className="h-4 w-4" />
      case "info": return <CheckCircle className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Integration Logs</h2>
          <p className="text-muted-foreground">Monitor integration events and troubleshoot issues</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        {logs.map((log) => (
          <Card key={log.id} className="hover:shadow-sm transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className={`p-1 rounded ${getLevelColor(log.level)}`}>
                  {getLevelIcon(log.level)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-medium text-sm">{log.service}</span>
                    <Badge variant="outline" className="text-xs">
                      {log.level.toUpperCase()}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(log.timestamp).toLocaleString()}
                    </span>
                    {log.duration && (
                      <span className="text-xs text-muted-foreground">
                        {log.duration}ms
                      </span>
                    )}
                    {log.statusCode && (
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          log.statusCode >= 200 && log.statusCode < 300 
                            ? 'text-green-600' 
                            : log.statusCode >= 400 
                            ? 'text-red-600' 
                            : 'text-yellow-600'
                        }`}
                      >
                        {log.statusCode}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm mb-2">{log.message}</p>
                  {log.metadata && (
                    <div className="text-xs font-mono bg-gray-50 p-2 rounded">
                      {JSON.stringify(log.metadata, null, 2)}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center">
        <Button variant="outline">
          Load More Logs
        </Button>
      </div>
    </div>
  )
}