"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Network, 
  Database, 
  GitBranch, 
  Search, 
  Filter,
  Target,
  AlertTriangle,
  TrendingUp,
  Eye,
  Settings,
  Download,
  Upload,
  Plus,
  Zap,
  Brain,
  BarChart3,
  Users,
  Building2,
  Code,
  Shield,
  Globe,
  Layers,
  Activity
} from "lucide-react"

interface GraphNode {
  id: string
  label: string
  type: "business" | "application" | "data" | "infrastructure" | "process" | "role"
  properties: Record<string, unknown>
  centrality: number
  connections: number
  criticality: "low" | "medium" | "high" | "critical"
}

interface GraphRelationship {
  id: string
  source: string
  target: string
  type: "depends_on" | "owns" | "uses" | "implements" | "manages" | "communicates_with"
  properties: Record<string, unknown>
  strength: number
  bidirectional: boolean
}

interface ImpactAnalysis {
  entityId: string
  changeType: "modify" | "remove" | "update" | "replace"
  impactRadius: string[]
  riskLevel: "low" | "medium" | "high" | "critical"
  estimatedEffort: number
  recommendations: string[]
}

export function ContextGraphClient() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  
  const [graphStats] = useState({
    totalNodes: 247,
    totalRelationships: 589,
    components: 12,
    criticality: {
      critical: 18,
      high: 45,
      medium: 126,
      low: 58
    },
    healthScore: 87
  })

  const [nodes] = useState<GraphNode[]>([
    {
      id: "customer-api",
      label: "Customer API",
      type: "application",
      properties: { version: "v2.1", status: "active", team: "Platform" },
      centrality: 0.94,
      connections: 23,
      criticality: "critical"
    },
    {
      id: "customer-database",
      label: "Customer Database",
      type: "data",
      properties: { type: "PostgreSQL", size: "2.4TB", encryption: true },
      centrality: 0.87,
      connections: 18,
      criticality: "critical"
    },
    {
      id: "auth-service",
      label: "Authentication Service",
      type: "application",
      properties: { type: "OAuth2", provider: "Auth0" },
      centrality: 0.92,
      connections: 31,
      criticality: "critical"
    },
    {
      id: "customer-onboarding",
      label: "Customer Onboarding Process",
      type: "process",
      properties: { duration: "3-5 days", automation: 78 },
      centrality: 0.65,
      connections: 12,
      criticality: "high"
    }
  ])

  const [relationships] = useState<GraphRelationship[]>([
    {
      id: "rel-1",
      source: "customer-api",
      target: "customer-database",
      type: "depends_on",
      properties: { latency: "12ms", frequency: "high" },
      strength: 0.95,
      bidirectional: false
    },
    {
      id: "rel-2",
      source: "customer-api",
      target: "auth-service",
      type: "uses",
      properties: { protocol: "OAuth2" },
      strength: 0.88,
      bidirectional: false
    }
  ])

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="graph" className="flex items-center gap-2">
            <Network className="h-4 w-4" />
            Graph View
          </TabsTrigger>
          <TabsTrigger value="analysis" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Impact Analysis
          </TabsTrigger>
          <TabsTrigger value="query" className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            Query Builder
          </TabsTrigger>
          <TabsTrigger value="insights" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            AI Insights
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <GraphOverview stats={graphStats} nodes={nodes} />
        </TabsContent>

        <TabsContent value="graph" className="space-y-6">
          <GraphVisualization nodes={nodes} relationships={relationships} />
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          <ImpactAnalysisView nodes={nodes} />
        </TabsContent>

        <TabsContent value="query" className="space-y-6">
          <GraphQueryBuilder />
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <GraphAiInsights />
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface GraphStats {
  totalNodes: number
  totalRelationships: number
  components: number
  criticality: {
    critical: number
    high: number
    medium: number
    low: number
  }
  healthScore: number
}

function GraphOverview({ stats, nodes }: { stats: GraphStats, nodes: GraphNode[] }) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "business": return Building2
      case "application": return Code
      case "data": return Database
      case "infrastructure": return Globe
      case "process": return GitBranch
      case "role": return Users
      default: return Network
    }
  }

  const getCriticalityColor = (criticality: string) => {
    switch (criticality) {
      case "critical": return "text-red-600 bg-red-50"
      case "high": return "text-orange-600 bg-orange-50"
      case "medium": return "text-yellow-600 bg-yellow-50"
      case "low": return "text-green-600 bg-green-50"
      default: return "text-gray-600 bg-gray-50"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Context Graph Overview</h2>
          <p className="text-muted-foreground">Enterprise-wide relationship mapping and dependency analysis</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Import Data
          </Button>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Configure
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Entities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalNodes}</div>
            <p className="text-xs text-muted-foreground">Across all domains</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Relationships</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalRelationships}</div>
            <p className="text-xs text-muted-foreground">Active connections</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Components</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.components}</div>
            <p className="text-xs text-muted-foreground">Connected clusters</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Health Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.healthScore}%</div>
            <p className="text-xs text-muted-foreground">Graph connectivity</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Criticality Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(stats.criticality).map(([level, count]) => (
                <div key={level} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded ${getCriticalityColor(level).split(' ')[1]}`} />
                    <span className="text-sm capitalize">{level}</span>
                  </div>
                  <span className="font-medium">{count as number}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>High-Centrality Nodes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {nodes.slice(0, 4).map((node) => {
                const IconComponent = getTypeIcon(node.type)
                return (
                  <div key={node.id} className="flex items-center justify-between p-2 border rounded">
                    <div className="flex items-center gap-3">
                      <IconComponent className="h-4 w-4" />
                      <div>
                        <div className="font-medium text-sm">{node.label}</div>
                        <div className="text-xs text-muted-foreground">{node.connections} connections</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{Math.round(node.centrality * 100)}%</div>
                      <Badge variant="outline" className={getCriticalityColor(node.criticality)}>
                        {node.criticality}
                      </Badge>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="text-center py-8">
        <h3 className="text-lg font-semibold mb-2">🚧 Neo4j Integration In Progress</h3>
        <p className="text-muted-foreground mb-4">
          Full Neo4j graph database integration with advanced relationship mapping, 
          dependency tracking, and impact analysis coming soon.
        </p>
        <Button>Request Early Access</Button>
      </div>
    </div>
  )
}

function GraphVisualization({ nodes, relationships }: { nodes: GraphNode[], relationships: GraphRelationship[] }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Interactive Graph Visualization</h2>
          <p className="text-muted-foreground">Explore entity relationships and dependencies</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="business">Business</SelectItem>
              <SelectItem value="application">Applications</SelectItem>
              <SelectItem value="data">Data</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="h-[500px] bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Network className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">3D Graph Visualization</h3>
              <p className="text-muted-foreground mb-4">
                Interactive D3.js/Three.js visualization showing {nodes.length} entities and {relationships.length} relationships
              </p>
              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                <div className="p-3 border rounded">
                  <div className="font-medium">Entities</div>
                  <div className="text-2xl font-bold text-blue-600">{nodes.length}</div>
                </div>
                <div className="p-3 border rounded">
                  <div className="font-medium">Relationships</div>
                  <div className="text-2xl font-bold text-green-600">{relationships.length}</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function ImpactAnalysisView({ nodes }: { nodes: GraphNode[] }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Impact Analysis</h2>
          <p className="text-muted-foreground">Analyze change impact and dependency chains</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Change Scenario</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Entity</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select entity" />
                </SelectTrigger>
                <SelectContent>
                  {nodes.map((node) => (
                    <SelectItem key={node.id} value={node.id}>
                      {node.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Change Type</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select change type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="modify">Modify</SelectItem>
                  <SelectItem value="remove">Remove</SelectItem>
                  <SelectItem value="replace">Replace</SelectItem>
                  <SelectItem value="update">Update</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full">
              <Target className="h-4 w-4 mr-2" />
              Analyze Impact
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Impact Radius</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">23</div>
                <div className="text-sm text-muted-foreground">Affected entities</div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Direct dependencies</span>
                  <span className="font-medium">8</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Indirect dependencies</span>
                  <span className="font-medium">15</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Critical path nodes</span>
                  <span className="font-medium">5</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Risk Assessment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <Badge className="bg-red-100 text-red-800 text-lg px-3 py-1">
                  HIGH RISK
                </Badge>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Estimated effort</span>
                  <span className="font-medium">32 hours</span>
                </div>
                <div className="flex justify-between">
                  <span>Risk score</span>
                  <span className="font-medium">8.5/10</span>
                </div>
                <div className="flex justify-between">
                  <span>Complexity</span>
                  <span className="font-medium">High</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function GraphQueryBuilder() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Graph Query Builder</h2>
          <p className="text-muted-foreground">Build and execute Cypher queries against the graph database</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Query Builder</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Find nodes where</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select property" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="type">Type</SelectItem>
                  <SelectItem value="criticality">Criticality</SelectItem>
                  <SelectItem value="connections">Connections</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Relationship type</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select relationship" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="depends_on">Depends on</SelectItem>
                  <SelectItem value="uses">Uses</SelectItem>
                  <SelectItem value="owns">Owns</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full">Execute Query</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Raw Cypher Query</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-gray-900 text-green-400 rounded font-mono text-sm">
                MATCH (n:Entity)-[r:DEPENDS_ON]-&gt;(m:Entity)<br/>
                WHERE n.criticality = &apos;critical&apos;<br/>
                RETURN n, r, m<br/>
                LIMIT 25
              </div>
              <Button className="w-full">
                <Search className="h-4 w-4 mr-2" />
                Run Query
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function GraphAiInsights() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">AI-Powered Graph Insights</h2>
          <p className="text-muted-foreground">Machine learning analysis of graph patterns and anomalies</p>
        </div>
        <Button variant="outline">
          <Brain className="h-4 w-4 mr-2" />
          Generate Insights
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              Architectural Hotspots Detected
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              AI analysis has identified 3 critical architectural hotspots that require attention:
            </p>
            <div className="space-y-3">
              <div className="p-3 border rounded">
                <div className="font-medium text-sm">Customer API Overcentricity</div>
                <div className="text-xs text-muted-foreground">
                  Customer API has excessive centrality (94%), creating single point of failure. 
                  Consider implementing circuit breakers and load balancing.
                </div>
              </div>
              <div className="p-3 border rounded">
                <div className="font-medium text-sm">Authentication Bottleneck</div>
                <div className="text-xs text-muted-foreground">
                  Authentication Service shows high coupling (31 connections). 
                  Review authorization patterns and consider distributed auth.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Optimization Opportunities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 border rounded">
                <div className="font-medium text-sm mb-2">Microservice Decomposition</div>
                <div className="text-xs text-muted-foreground">
                  Customer API could be split into 3 domain-specific services, reducing complexity by 40%.
                </div>
              </div>
              <div className="p-3 border rounded">
                <div className="font-medium text-sm mb-2">Data Flow Optimization</div>
                <div className="text-xs text-muted-foreground">
                  Implementing event sourcing could reduce database coupling by 60%.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}