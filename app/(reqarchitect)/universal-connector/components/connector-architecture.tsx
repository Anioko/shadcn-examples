"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Database, 
  Layers, 
  Zap,
  Shield,
  Cog,
  GitBranch,
  Code2,
  CheckCircle,
  AlertCircle,
  Settings
} from "lucide-react";

const connectorCategories = {
  P0: {
    priority: "Launch Blockers",
    count: 20,
    description: "Essential connectors required for enterprise launch",
    connectors: [
      { id: "servicenow", name: "ServiceNow", category: "ITSM", status: "implemented" },
      { id: "jira", name: "Jira", category: "PPM", status: "implemented" },
      { id: "azure-ad", name: "Azure AD", category: "IAM", status: "implemented" },
      { id: "aws", name: "AWS", category: "Cloud", status: "implemented" },
      { id: "github", name: "GitHub", category: "DevOps", status: "implemented" },
      { id: "confluence", name: "Confluence", category: "Docs", status: "implemented" },
      { id: "salesforce", name: "Salesforce", category: "CRM", status: "in-progress" },
      { id: "slack", name: "Slack", category: "Comm", status: "planned" }
    ]
  },
  P1: {
    priority: "High Demand",
    count: 44,
    description: "Popular enterprise connectors for broad market appeal",
    connectors: [
      { id: "gitlab", name: "GitLab", category: "DevOps", status: "implemented" },
      { id: "okta", name: "Okta", category: "IAM", status: "implemented" },
      { id: "jenkins", name: "Jenkins", category: "DevOps", status: "in-progress" },
      { id: "teams", name: "MS Teams", category: "Comm", status: "planned" },
      { id: "sharepoint", name: "SharePoint", category: "Docs", status: "planned" }
    ]
  },
  P2: {
    priority: "Long Tail",
    count: 40,
    description: "Niche and specialized connectors for specific use cases",
    connectors: [
      { id: "monday", name: "Monday.com", category: "PPM", status: "planned" },
      { id: "notion", name: "Notion", category: "Docs", status: "planned" },
      { id: "zoom", name: "Zoom", category: "Comm", status: "planned" }
    ]
  }
};

const architectureLayers = [
  {
    layer: "Connector Interface",
    description: "Unified UniversalConnector interface",
    components: ["Authentication", "Discovery", "Fetch", "Transform", "Validate"],
    icon: <Layers className="h-5 w-5" />
  },
  {
    layer: "Abstract Base Class",
    description: "Common functionality for all connectors",
    components: ["Rate Limiting", "Error Handling", "Logging", "Caching", "Retry Logic"],
    icon: <Code2 className="h-5 w-5" />
  },
  {
    layer: "Connector Implementations",
    description: "Specific connector implementations",
    components: ["ServiceNow", "Jira", "Azure AD", "AWS", "GitHub", "+99 more"],
    icon: <Database className="h-5 w-5" />
  },
  {
    layer: "Import Pipeline",
    description: "Universal data processing pipeline",
    components: ["Extract", "Transform", "Validate", "Deduplicate", "Load"],
    icon: <GitBranch className="h-5 w-5" />
  },
  {
    layer: "Security & Monitoring",
    description: "Enterprise security and observability",
    components: ["Credential Encryption", "Audit Logging", "Performance Metrics", "Error Tracking"],
    icon: <Shield className="h-5 w-5" />
  }
];

const connectorInterface = `interface UniversalConnector {
  // Metadata
  readonly id: string;
  readonly name: string;
  readonly category: ConnectorCategory;
  readonly vendor: string;
  readonly priority: 'P0' | 'P1' | 'P2';

  // Capabilities
  readonly capabilities: {
    import: boolean;
    export: boolean;
    sync: boolean;
    realtime: boolean;
    bidirectional: boolean;
    aiDiscovery: boolean;
  };

  // Authentication
  readonly authentication: AuthConfig;
  readonly mappings: EntityMapping[];

  // Lifecycle
  connect(config: ConnectorConfig): Promise<Connection>;
  testConnection(): Promise<TestResult>;
  discover(): Promise<DiscoveryResult>;
  fetchEntities(type: EntityType): Promise<Entity[]>;
}`;

const implementationExample = `export class ServiceNowConnector extends AbstractConnector {
  readonly id = 'servicenow';
  readonly name = 'ServiceNow';
  readonly category = ConnectorCategory.ITSM;
  readonly priority = 'P0' as const;

  readonly capabilities = {
    import: true,
    sync: true,
    realtime: true,
    aiDiscovery: true,
  };

  readonly mappings: EntityMapping[] = [
    {
      sourceType: 'cmdb_ci_appl',
      targetType: 'APPLICATION_COMPONENT',
      fieldMappings: [
        { source: 'name', target: 'name', required: true },
        { source: 'short_description', target: 'description' },
        { source: 'owned_by.email', target: 'ownerEmail' }
      ]
    }
  ];
  
  async connect(config: ConnectorConfig): Promise<Connection> {
    // ServiceNow specific connection logic
  }
}`;

export function ConnectorArchitecture() {
  const [selectedPriority, setSelectedPriority] = useState<"P0" | "P1" | "P2">("P0");
  const [selectedLayer, setSelectedLayer] = useState(0);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "implemented":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "in-progress":
        return <Settings className="h-4 w-4 text-blue-600 animate-spin" />;
      case "planned":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "implemented":
        return <Badge className="bg-green-100 text-green-800">Implemented</Badge>;
      case "in-progress":
        return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>;
      case "planned":
        return <Badge className="bg-yellow-100 text-yellow-800">Planned</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Architecture Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layers className="h-5 w-5" />
              Architecture Layers
            </CardTitle>
            <CardDescription>
              Hierarchical architecture ensuring consistency across all 100+ connectors
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {architectureLayers.map((layer, index) => (
                <div 
                  key={index}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedLayer === index ? "border-primary bg-primary/5" : "hover:bg-muted/50"
                  }`}
                  onClick={() => setSelectedLayer(index)}
                >
                  <div className="flex items-center gap-3 mb-2">
                    {layer.icon}
                    <h4 className="font-medium">{layer.layer}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{layer.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {layer.components.slice(0, 3).map((component, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {component}
                      </Badge>
                    ))}
                    {layer.components.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{layer.components.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Selected Layer Details</CardTitle>
            <CardDescription>
              {architectureLayers[selectedLayer].layer}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm">{architectureLayers[selectedLayer].description}</p>
              
              <div>
                <h4 className="font-medium mb-2">Components:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {architectureLayers[selectedLayer].components.map((component, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-muted/50 rounded text-sm">
                      <Cog className="h-3 w-3 text-muted-foreground" />
                      {component}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Connector Priority Matrix */}
      <Card>
        <CardHeader>
          <CardTitle>Connector Priority Matrix</CardTitle>
          <CardDescription>
            100+ connectors organized by development priority and market demand
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedPriority} onValueChange={(value) => setSelectedPriority(value as "P0" | "P1" | "P2")}>
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="P0" className="flex items-center gap-2">
                P0 - Launch Blockers
                <Badge variant="destructive">{connectorCategories.P0.count}</Badge>
              </TabsTrigger>
              <TabsTrigger value="P1" className="flex items-center gap-2">
                P1 - High Demand
                <Badge variant="default">{connectorCategories.P1.count}</Badge>
              </TabsTrigger>
              <TabsTrigger value="P2" className="flex items-center gap-2">
                P2 - Long Tail
                <Badge variant="secondary">{connectorCategories.P2.count}</Badge>
              </TabsTrigger>
            </TabsList>

            {Object.entries(connectorCategories).map(([priority, data]) => (
              <TabsContent key={priority} value={priority} className="space-y-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium mb-2">{data.priority}</h4>
                  <p className="text-sm text-muted-foreground">{data.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  {data.connectors.map((connector, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                      <CardContent className="pt-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-sm">{connector.name}</h4>
                          {getStatusIcon(connector.status)}
                        </div>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs">
                            {connector.category}
                          </Badge>
                          {getStatusBadge(connector.status)}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  {data.connectors.length < data.count && (
                    <Card className="border-dashed">
                      <CardContent className="pt-4 text-center">
                        <p className="text-sm text-muted-foreground">
                          +{data.count - data.connectors.length} more connectors
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          In development
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Code Examples */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code2 className="h-5 w-5" />
              Universal Interface
            </CardTitle>
            <CardDescription>
              All 100+ connectors implement this standardized interface
            </CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="text-xs bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{connectorInterface}</code>
            </pre>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Implementation Example
            </CardTitle>
            <CardDescription>
              ServiceNow connector implementation following the pattern
            </CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="text-xs bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{implementationExample}</code>
            </pre>
          </CardContent>
        </Card>
      </div>

      {/* Key Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3 mb-3">
              <Zap className="h-8 w-8 text-blue-600" />
              <div>
                <h4 className="font-medium">5-Minute Setup</h4>
                <p className="text-sm text-muted-foreground">From install to first import</p>
              </div>
            </div>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• Auto-discovery of available entities</li>
              <li>• Pre-configured field mappings</li>
              <li>• One-click authentication setup</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3 mb-3">
              <Shield className="h-8 w-8 text-green-600" />
              <div>
                <h4 className="font-medium">Enterprise Security</h4>
                <p className="text-sm text-muted-foreground">Bank-grade data protection</p>
              </div>
            </div>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• AES-256 credential encryption</li>
              <li>• OAuth 2.0 / SAML support</li>
              <li>• Complete audit logging</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3 mb-3">
              <Cog className="h-8 w-8 text-purple-600" />
              <div>
                <h4 className="font-medium">AI-Powered</h4>
                <p className="text-sm text-muted-foreground">95%+ mapping accuracy</p>
              </div>
            </div>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• Intelligent field mapping</li>
              <li>• Automatic relationship discovery</li>
              <li>• Data quality validation</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}