"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
  Building2, 
  Network, 
  Database, 
  Workflow, 
  Users, 
  Shield, 
  GitBranch, 
  Target,
  MapPin,
  Settings,
  FileText,
  BarChart3,
  Layers,
  Grid3X3,
  TreePine,
  Zap,
  Cpu,
  Cloud,
  Lock,
  CheckCircle,
  AlertTriangle,
  Plus,
  Edit3,
  Trash2,
  Eye,
  Download,
  Upload
} from "lucide-react"

interface Capability {
  id: string
  name: string
  description: string
  level: "L0" | "L1" | "L2" | "L3"
  status: "current" | "target" | "gap"
  maturity: "initial" | "developing" | "defined" | "managed" | "optimized"
  businessValue: "low" | "medium" | "high" | "critical"
  technicalComplexity: "low" | "medium" | "high"
  children?: Capability[]
}

interface ValueStream {
  id: string
  name: string
  description: string
  trigger: string
  outcome: string
  stages: ValueStreamStage[]
  stakeholders: string[]
  kpis: string[]
  painPoints: string[]
}

interface ValueStreamStage {
  id: string
  name: string
  description: string
  duration: string
  capabilities: string[]
  systems: string[]
  roles: string[]
  artifacts: string[]
}

interface Service {
  id: string
  name: string
  description: string
  category: "business" | "application" | "infrastructure"
  provider: "internal" | "external" | "hybrid"
  criticality: "low" | "medium" | "high" | "critical"
  consumers: string[]
  dependencies: string[]
  sla: {
    availability: string
    responseTime: string
    throughput: string
  }
  status: "active" | "deprecated" | "planned" | "retired"
}

interface BusinessObject {
  id: string
  name: string
  description: string
  type: "entity" | "value-object" | "aggregate" | "event"
  attributes: Attribute[]
  relationships: Relationship[]
  lifecycle: string[]
  owner: string
  dataClassification: "public" | "internal" | "confidential" | "restricted"
}

interface Attribute {
  name: string
  type: string
  required: boolean
  description: string
}

interface Relationship {
  target: string
  type: "owns" | "uses" | "depends-on" | "composed-of" | "aggregates"
  cardinality: string
}

export function EnterpriseArchitectureClient() {
  const [activeTab, setActiveTab] = useState("capabilities")
  
  const [capabilities] = useState<Capability[]>([
    {
      id: "cap-1",
      name: "Customer Management",
      description: "Manage customer relationships and data",
      level: "L0",
      status: "current",
      maturity: "managed",
      businessValue: "critical",
      technicalComplexity: "medium",
      children: [
        {
          id: "cap-1-1",
          name: "Customer Onboarding",
          description: "Process for adding new customers",
          level: "L1",
          status: "current",
          maturity: "defined",
          businessValue: "high",
          technicalComplexity: "medium"
        },
        {
          id: "cap-1-2", 
          name: "Customer Support",
          description: "Provide customer service and support",
          level: "L1",
          status: "gap",
          maturity: "developing",
          businessValue: "high",
          technicalComplexity: "low"
        }
      ]
    },
    {
      id: "cap-2",
      name: "Product Development",
      description: "Design and develop products/services",
      level: "L0",
      status: "target",
      maturity: "developing",
      businessValue: "critical",
      technicalComplexity: "high",
      children: [
        {
          id: "cap-2-1",
          name: "Requirements Management",
          description: "Capture and manage requirements",
          level: "L1", 
          status: "current",
          maturity: "defined",
          businessValue: "high",
          technicalComplexity: "medium"
        }
      ]
    }
  ])

  const [valueStreams] = useState<ValueStream[]>([
    {
      id: "vs-1",
      name: "Customer Acquisition",
      description: "End-to-end process for acquiring new customers",
      trigger: "Marketing lead generated",
      outcome: "Active paying customer",
      stakeholders: ["Marketing", "Sales", "Customer Success", "Product"],
      kpis: ["Lead conversion rate", "Time to close", "Customer lifetime value"],
      painPoints: ["Long qualification process", "Manual handoffs", "Inconsistent data"],
      stages: [
        {
          id: "stage-1",
          name: "Lead Qualification",
          description: "Assess and qualify incoming leads",
          duration: "2-3 days",
          capabilities: ["Lead Management", "Customer Scoring"],
          systems: ["CRM", "Marketing Automation"],
          roles: ["Sales Representative", "Marketing Qualified Lead"],
          artifacts: ["Lead Score", "Qualification Report"]
        },
        {
          id: "stage-2",
          name: "Sales Process",
          description: "Convert qualified lead to customer",
          duration: "2-4 weeks",
          capabilities: ["Opportunity Management", "Proposal Generation"],
          systems: ["CRM", "CPQ", "Contract Management"],
          roles: ["Account Executive", "Sales Engineer"],
          artifacts: ["Proposal", "Contract", "Statement of Work"]
        }
      ]
    }
  ])

  const [services] = useState<Service[]>([
    {
      id: "svc-1",
      name: "Customer API",
      description: "RESTful API for customer data access",
      category: "application",
      provider: "internal",
      criticality: "critical",
      consumers: ["Web App", "Mobile App", "Partner Systems"],
      dependencies: ["Customer Database", "Authentication Service"],
      sla: {
        availability: "99.9%",
        responseTime: "<200ms",
        throughput: "1000 rps"
      },
      status: "active"
    },
    {
      id: "svc-2",
      name: "Payment Processing",
      description: "Payment processing and billing service",
      category: "business",
      provider: "hybrid",
      criticality: "critical",
      consumers: ["E-commerce Platform", "Subscription Management"],
      dependencies: ["Payment Gateway", "Fraud Detection"],
      sla: {
        availability: "99.99%",
        responseTime: "<500ms",
        throughput: "500 rps"
      },
      status: "active"
    }
  ])

  const [businessObjects] = useState<BusinessObject[]>([
    {
      id: "bo-1",
      name: "Customer",
      description: "Core customer entity",
      type: "entity",
      owner: "Customer Success",
      dataClassification: "confidential",
      lifecycle: ["prospect", "active", "churned", "reactivated"],
      attributes: [
        { name: "customerId", type: "string", required: true, description: "Unique customer identifier" },
        { name: "email", type: "string", required: true, description: "Primary email address" },
        { name: "companyName", type: "string", required: false, description: "Company name" },
        { name: "subscriptionTier", type: "enum", required: true, description: "Subscription level" }
      ],
      relationships: [
        { target: "Subscription", type: "owns", cardinality: "1:many" },
        { target: "SupportTicket", type: "owns", cardinality: "1:many" }
      ]
    }
  ])

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="capabilities" className="flex items-center gap-2">
            <Grid3X3 className="h-4 w-4" />
            Capabilities
          </TabsTrigger>
          <TabsTrigger value="value-streams" className="flex items-center gap-2">
            <Workflow className="h-4 w-4" />
            Value Streams
          </TabsTrigger>
          <TabsTrigger value="services" className="flex items-center gap-2">
            <Network className="h-4 w-4" />
            Service Catalog
          </TabsTrigger>
          <TabsTrigger value="business-objects" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            Business Objects
          </TabsTrigger>
          <TabsTrigger value="governance" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Governance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="capabilities" className="space-y-6">
          <CapabilityMap capabilities={capabilities} />
        </TabsContent>

        <TabsContent value="value-streams" className="space-y-6">
          <ValueStreamMapping valueStreams={valueStreams} />
        </TabsContent>

        <TabsContent value="services" className="space-y-6">
          <ServiceCatalog services={services} />
        </TabsContent>

        <TabsContent value="business-objects" className="space-y-6">
          <BusinessObjectModel businessObjects={businessObjects} />
        </TabsContent>

        <TabsContent value="governance" className="space-y-6">
          <ArchitectureGovernance />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function CapabilityMap({ capabilities }: { capabilities: Capability[] }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "current": return "bg-green-100 text-green-800 border-green-200"
      case "target": return "bg-blue-100 text-blue-800 border-blue-200"
      case "gap": return "bg-red-100 text-red-800 border-red-200"
      default: return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getMaturityColor = (maturity: string) => {
    switch (maturity) {
      case "initial": return "bg-red-50"
      case "developing": return "bg-orange-50"
      case "defined": return "bg-yellow-50"
      case "managed": return "bg-blue-50"
      case "optimized": return "bg-green-50"
      default: return "bg-gray-50"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Capability Map</h2>
          <p className="text-muted-foreground">Hierarchical view of business and technical capabilities</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Capability
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {capabilities.map((capability) => (
          <Card key={capability.id} className={`${getMaturityColor(capability.maturity)}`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="text-xs">
                    {capability.level}
                  </Badge>
                  <CardTitle className="text-lg">{capability.name}</CardTitle>
                  <Badge className={getStatusColor(capability.status)}>
                    {capability.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {capability.maturity}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Value: {capability.businessValue}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Complexity: {capability.technicalComplexity}
                  </Badge>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{capability.description}</p>
            </CardHeader>
            
            {capability.children && capability.children.length > 0 && (
              <CardContent>
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Sub-capabilities:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-4">
                    {capability.children.map((child) => (
                      <div 
                        key={child.id} 
                        className={`p-3 rounded-lg border ${getMaturityColor(child.maturity)}`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {child.level}
                            </Badge>
                            <span className="font-medium text-sm">{child.name}</span>
                          </div>
                          <Badge className={getStatusColor(child.status)}>
                            {child.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{child.description}</p>
                        <div className="flex gap-1 mt-2">
                          <Badge variant="outline" className="text-xs">
                            {child.maturity}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {child.businessValue}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}

function ValueStreamMapping({ valueStreams }: { valueStreams: ValueStream[] }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Value Stream Mapping</h2>
          <p className="text-muted-foreground">End-to-end business processes and customer journeys</p>
        </div>
        <Button variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Add Value Stream
        </Button>
      </div>

      <div className="space-y-6">
        {valueStreams.map((stream) => (
          <Card key={stream.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">{stream.name}</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit3 className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </div>
              </div>
              <p className="text-muted-foreground">{stream.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <h4 className="font-medium text-sm mb-2">Trigger</h4>
                  <p className="text-sm bg-blue-50 p-2 rounded">{stream.trigger}</p>
                </div>
                <div>
                  <h4 className="font-medium text-sm mb-2">Outcome</h4>
                  <p className="text-sm bg-green-50 p-2 rounded">{stream.outcome}</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Stages */}
              <div>
                <h4 className="font-medium mb-3">Process Stages</h4>
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {stream.stages.map((stage, index) => (
                    <div key={stage.id} className="flex items-center gap-2 min-w-0">
                      <Card className="min-w-[280px] bg-blue-50">
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-sm">{stage.name}</CardTitle>
                            <Badge variant="outline" className="text-xs">
                              {stage.duration}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">{stage.description}</p>
                        </CardHeader>
                        <CardContent className="pt-0 space-y-2">
                          <div>
                            <h5 className="text-xs font-medium">Capabilities</h5>
                            <div className="flex flex-wrap gap-1">
                              {stage.capabilities.map((cap, i) => (
                                <Badge key={i} variant="secondary" className="text-xs">
                                  {cap}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h5 className="text-xs font-medium">Systems</h5>
                            <div className="flex flex-wrap gap-1">
                              {stage.systems.map((sys, i) => (
                                <Badge key={i} variant="outline" className="text-xs">
                                  {sys}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      {index < stream.stages.length - 1 && (
                        <div className="flex items-center">
                          <div className="h-px w-8 bg-border"></div>
                          <div className="h-2 w-2 rounded-full bg-border"></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* KPIs and Pain Points */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-medium text-sm mb-2">Stakeholders</h4>
                  <div className="space-y-1">
                    {stream.stakeholders.map((stakeholder, i) => (
                      <Badge key={i} variant="outline" className="mr-1 mb-1">
                        <Users className="h-3 w-3 mr-1" />
                        {stakeholder}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-sm mb-2">Key Performance Indicators</h4>
                  <div className="space-y-1">
                    {stream.kpis.map((kpi, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <BarChart3 className="h-3 w-3 text-green-600" />
                        {kpi}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-sm mb-2">Pain Points</h4>
                  <div className="space-y-1">
                    {stream.painPoints.map((pain, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <AlertTriangle className="h-3 w-3 text-red-600" />
                        {pain}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function ServiceCatalog({ services }: { services: Service[] }) {
  const getCriticalityColor = (criticality: string) => {
    switch (criticality) {
      case "critical": return "bg-red-100 text-red-800 border-red-200"
      case "high": return "bg-orange-100 text-orange-800 border-orange-200"
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low": return "bg-green-100 text-green-800 border-green-200"
      default: return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "business": return Building2
      case "application": return Cpu
      case "infrastructure": return Cloud
      default: return Network
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Service Catalog</h2>
          <p className="text-muted-foreground">Catalog of business, application, and infrastructure services</p>
        </div>
        <Button variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Add Service
        </Button>
      </div>

      <div className="grid gap-4">
        {services.map((service) => {
          const CategoryIcon = getCategoryIcon(service.category)
          
          return (
            <Card key={service.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CategoryIcon className="h-5 w-5" />
                    <CardTitle className="text-lg">{service.name}</CardTitle>
                    <Badge className={getCriticalityColor(service.criticality)}>
                      {service.criticality}
                    </Badge>
                    <Badge variant="outline">
                      {service.category}
                    </Badge>
                    <Badge variant="outline">
                      {service.provider}
                    </Badge>
                  </div>
                  <Badge 
                    variant={service.status === "active" ? "default" : "secondary"}
                    className={service.status === "active" ? "bg-green-100 text-green-800" : ""}
                  >
                    {service.status}
                  </Badge>
                </div>
                <p className="text-muted-foreground">{service.description}</p>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-medium text-sm mb-2">Service Level Agreement</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Availability:</span>
                        <span className="font-medium">{service.sla.availability}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Response Time:</span>
                        <span className="font-medium">{service.sla.responseTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Throughput:</span>
                        <span className="font-medium">{service.sla.throughput}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm mb-2">Consumers</h4>
                    <div className="space-y-1">
                      {service.consumers.map((consumer, i) => (
                        <Badge key={i} variant="outline" className="mr-1 mb-1 text-xs">
                          {consumer}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm mb-2">Dependencies</h4>
                    <div className="space-y-1">
                      {service.dependencies.map((dep, i) => (
                        <Badge key={i} variant="secondary" className="mr-1 mb-1 text-xs">
                          {dep}
                        </Badge>
                      ))}
                    </div>
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

function BusinessObjectModel({ businessObjects }: { businessObjects: BusinessObject[] }) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "entity": return Database
      case "value-object": return Target
      case "aggregate": return Grid3X3
      case "event": return Zap
      default: return FileText
    }
  }

  const getClassificationColor = (classification: string) => {
    switch (classification) {
      case "public": return "bg-green-100 text-green-800 border-green-200"
      case "internal": return "bg-blue-100 text-blue-800 border-blue-200"
      case "confidential": return "bg-orange-100 text-orange-800 border-orange-200"
      case "restricted": return "bg-red-100 text-red-800 border-red-200"
      default: return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Business Object Model</h2>
          <p className="text-muted-foreground">Core business entities, their attributes and relationships</p>
        </div>
        <Button variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Add Business Object
        </Button>
      </div>

      <div className="grid gap-6">
        {businessObjects.map((obj) => {
          const TypeIcon = getTypeIcon(obj.type)
          
          return (
            <Card key={obj.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <TypeIcon className="h-5 w-5" />
                    <CardTitle className="text-lg">{obj.name}</CardTitle>
                    <Badge variant="outline">{obj.type}</Badge>
                    <Badge className={getClassificationColor(obj.dataClassification)}>
                      <Lock className="h-3 w-3 mr-1" />
                      {obj.dataClassification}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Owner: {obj.owner}
                  </div>
                </div>
                <p className="text-muted-foreground">{obj.description}</p>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Attributes</h4>
                    <div className="space-y-2">
                      {obj.attributes.map((attr, i) => (
                        <div key={i} className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-sm">{attr.name}</span>
                            <div className="flex gap-1">
                              <Badge variant="outline" className="text-xs">{attr.type}</Badge>
                              {attr.required && (
                                <Badge variant="destructive" className="text-xs">Required</Badge>
                              )}
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground">{attr.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Relationships</h4>
                    <div className="space-y-2">
                      {obj.relationships.map((rel, i) => (
                        <div key={i} className="p-3 bg-blue-50 rounded-lg">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-sm">{rel.target}</span>
                            <div className="flex gap-1">
                              <Badge variant="outline" className="text-xs">{rel.type}</Badge>
                              <Badge variant="secondary" className="text-xs">{rel.cardinality}</Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Lifecycle States</h4>
                  <div className="flex gap-2">
                    {obj.lifecycle.map((state, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {state}
                      </Badge>
                    ))}
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

function ArchitectureGovernance() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Architecture Governance</h2>
        <p className="text-muted-foreground">Governance frameworks, standards, and decision records</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Architecture Decision Records
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">ADR-001: Database Selection</span>
                  <Badge variant="outline">Accepted</Badge>
                </div>
                <p className="text-sm text-muted-foreground">PostgreSQL for primary database</p>
              </div>
              <div className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">ADR-002: API Architecture</span>
                  <Badge variant="outline">Accepted</Badge>
                </div>
                <p className="text-sm text-muted-foreground">RESTful API with GraphQL for complex queries</p>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">
              <Plus className="h-4 w-4 mr-2" />
              Add Decision Record
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Standards & Policies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Security Standards</span>
                  <Badge variant="outline">Active</Badge>
                </div>
                <p className="text-sm text-muted-foreground">OWASP Top 10 compliance</p>
              </div>
              <div className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Data Governance</span>
                  <Badge variant="outline">Active</Badge>
                </div>
                <p className="text-sm text-muted-foreground">GDPR compliance framework</p>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">
              <Plus className="h-4 w-4 mr-2" />
              Add Standard
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Compliance Tracking
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">SOC 2 Type II</span>
                  <Badge className="bg-green-100 text-green-800">Compliant</Badge>
                </div>
                <p className="text-sm text-muted-foreground">Next audit: Q2 2024</p>
              </div>
              <div className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">ISO 27001</span>
                  <Badge className="bg-yellow-100 text-yellow-800">In Progress</Badge>
                </div>
                <p className="text-sm text-muted-foreground">Certification expected: Q3 2024</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Architecture Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Capability Maturity</span>
                <span className="font-medium">3.2/5.0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Architecture Debt</span>
                <span className="font-medium text-orange-600">Medium</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Standards Compliance</span>
                <span className="font-medium text-green-600">87%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Documentation Coverage</span>
                <span className="font-medium">78%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}