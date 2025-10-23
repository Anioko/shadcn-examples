"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  Play,
  Pause,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Settings,
  Database,
  Layers,
  Zap,
  Shield,
  Code,
  Download
} from "lucide-react";

const connectorTypes = [
  {
    id: "servicenow",
    name: "ServiceNow",
    logo: "🔧",
    category: "ITSM & CMDB",
    status: "connected",
    lastSync: "2 minutes ago",
    entities: ["Applications", "Infrastructure", "Services", "Changes"],
    capabilities: {
      import: true,
      export: false,
      sync: true,
      realtime: true,
      bidirectional: false,
      aiDiscovery: true
    }
  },
  {
    id: "jira",
    name: "Jira",
    logo: "📋",
    category: "Project Management",
    status: "connected",
    lastSync: "5 minutes ago",
    entities: ["Projects", "Epics", "Stories", "Tasks", "Bugs"],
    capabilities: {
      import: true,
      export: false,
      sync: true,
      realtime: false,
      bidirectional: false,
      aiDiscovery: true
    }
  },
  {
    id: "azure-ad",
    name: "Azure Active Directory",
    logo: "🔐",
    category: "Identity & Access",
    status: "warning",
    lastSync: "2 hours ago",
    entities: ["Users", "Groups", "Organizations", "Applications"],
    capabilities: {
      import: true,
      export: false,
      sync: true,
      realtime: false,
      bidirectional: false,
      aiDiscovery: false
    }
  }
];

const interfaceDemo = {
  connect: `// Universal connection interface
await connector.connect({
  organizationId: "org-123",
  name: "Production ServiceNow",
  authentication: {
    instance: "mycompany",
    authType: "oauth",
    clientId: "...",
    clientSecret: "..."
  },
  settings: {
    syncSchedule: "hourly",
    batchSize: 100
  }
});`,
  discover: `// Auto-discovery of available entities
const discovery = await connector.discover();

console.log(discovery);
// {
//   summary: {
//     totalEntities: 15847,
//     entitiesByType: {
//       "Applications": 1247,
//       "Servers": 3456,
//       "Services": 892
//     }
//   },
//   estimatedImportTime: "5-10 minutes"
// }`,
  fetch: `// Unified fetch interface across all connectors
const entities = await connector.fetchEntities(
  'APPLICATION_COMPONENT',
  {
    filters: { status: 'PRODUCTION' },
    limit: 1000,
    includeRelationships: true
  }
);

// Returns standardized Entity[] format`,
  transform: `// AI-powered field mapping
const mapping = connector.mappings.find(
  m => m.targetType === 'APPLICATION_COMPONENT'
);

// Automatic transformation from source to ReqArchitect format
const transformed = await mapToReqarchitectEntity(
  sourceRecord,
  mapping
);

// 95%+ accuracy across all connector types`
};

export function UniversalInterface() {
  const [selectedConnector, setSelectedConnector] = useState(connectorTypes[0]);
  const [selectedDemo, setSelectedDemo] = useState<keyof typeof interfaceDemo>("connect");
  const [isConnecting, setIsConnecting] = useState(false);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <RefreshCw className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "connected":
        return <Badge className="bg-green-100 text-green-800">Connected</Badge>;
      case "warning":
        return <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>;
      case "error":
        return <Badge className="bg-red-100 text-red-800">Error</Badge>;
      default:
        return <Badge variant="secondary">Disconnected</Badge>;
    }
  };

  const handleConnect = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Interface Demo */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layers className="h-5 w-5" />
              Live Interface Demo
            </CardTitle>
            <CardDescription>
              Interact with the universal connector interface
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Connector Selection */}
            <div>
              <Label className="text-sm font-medium">Select Connector</Label>
              <Select 
                value={selectedConnector.id} 
                onValueChange={(value) => setSelectedConnector(connectorTypes.find(c => c.id === value)!)}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {connectorTypes.map((connector) => (
                    <SelectItem key={connector.id} value={connector.id}>
                      <div className="flex items-center gap-2">
                        <span>{connector.logo}</span>
                        <span>{connector.name}</span>
                        <Badge variant="outline" className="text-xs">{connector.category}</Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Connection Configuration */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Connection Configuration</h4>
                {getStatusBadge(selectedConnector.status)}
              </div>

              <div className="space-y-3">
                <div>
                  <Label htmlFor="connectionName">Connection Name</Label>
                  <Input 
                    id="connectionName" 
                    defaultValue={`Production ${selectedConnector.name}`}
                    className="mt-1"
                  />
                </div>

                {selectedConnector.id === "servicenow" && (
                  <>
                    <div>
                      <Label htmlFor="instance">ServiceNow Instance</Label>
                      <Input 
                        id="instance" 
                        placeholder="mycompany.service-now.com" 
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="authType">Authentication Type</Label>
                      <Select defaultValue="oauth">
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="oauth">OAuth 2.0</SelectItem>
                          <SelectItem value="basic">Basic Auth</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}

                {selectedConnector.id === "jira" && (
                  <>
                    <div>
                      <Label htmlFor="jiraUrl">Jira URL</Label>
                      <Input 
                        id="jiraUrl" 
                        placeholder="https://mycompany.atlassian.net" 
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="apiToken">API Token</Label>
                      <Input 
                        id="apiToken" 
                        type="password" 
                        placeholder="Your Jira API token" 
                        className="mt-1"
                      />
                    </div>
                  </>
                )}

                {selectedConnector.id === "azure-ad" && (
                  <>
                    <div>
                      <Label htmlFor="tenantId">Tenant ID</Label>
                      <Input 
                        id="tenantId" 
                        placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" 
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="clientId">Client ID</Label>
                      <Input 
                        id="clientId" 
                        placeholder="Application (client) ID" 
                        className="mt-1"
                      />
                    </div>
                  </>
                )}
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={handleConnect}
                  disabled={isConnecting}
                  className="flex-1"
                >
                  {isConnecting ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Connect
                    </>
                  )}
                </Button>
                <Button variant="outline">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Connector Details
            </CardTitle>
            <CardDescription>
              {selectedConnector.name} configuration and capabilities
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Connector Info */}
            <div className="flex items-center gap-4">
              <div className="text-3xl">{selectedConnector.logo}</div>
              <div>
                <h3 className="font-medium">{selectedConnector.name}</h3>
                <p className="text-sm text-muted-foreground">{selectedConnector.category}</p>
                <div className="flex items-center gap-2 mt-1">
                  {getStatusIcon(selectedConnector.status)}
                  <span className="text-sm">Last sync: {selectedConnector.lastSync}</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Capabilities */}
            <div>
              <h4 className="font-medium mb-3">Capabilities</h4>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(selectedConnector.capabilities).map(([capability, supported]) => (
                  <div key={capability} className="flex items-center gap-2">
                    {supported ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <div className="h-4 w-4 rounded-full bg-muted" />
                    )}
                    <span className={`text-sm capitalize ${supported ? "" : "text-muted-foreground"}`}>
                      {capability.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Supported Entities */}
            <div>
              <h4 className="font-medium mb-3">Supported Entities</h4>
              <div className="flex flex-wrap gap-2">
                {selectedConnector.entities.map((entity, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {entity}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />

            {/* Quick Actions */}
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="flex-1">
                <Download className="h-3 w-3 mr-1" />
                Test Connection
              </Button>
              <Button size="sm" variant="outline" className="flex-1">
                <Zap className="h-3 w-3 mr-1" />
                Discover Data
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Code Examples */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            Universal Interface Code Examples
          </CardTitle>
          <CardDescription>
            All 100+ connectors implement the same standardized interface
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedDemo} onValueChange={(value) => setSelectedDemo(value as keyof typeof interfaceDemo)}>
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="connect">Connect</TabsTrigger>
              <TabsTrigger value="discover">Discovery</TabsTrigger>
              <TabsTrigger value="fetch">Fetch Data</TabsTrigger>
              <TabsTrigger value="transform">Transform</TabsTrigger>
            </TabsList>

            {Object.entries(interfaceDemo).map(([key, code]) => (
              <TabsContent key={key} value={key} className="mt-4">
                <div className="bg-muted rounded-lg p-4">
                  <pre className="text-sm overflow-x-auto">
                    <code>{code}</code>
                  </pre>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Key Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-4">
              <Layers className="h-8 w-8 text-blue-600" />
              <div>
                <h4 className="font-medium">Unified Interface</h4>
                <p className="text-sm text-muted-foreground">Same API across all connectors</p>
              </div>
            </div>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• Consistent authentication patterns</li>
              <li>• Standardized error handling</li>
              <li>• Uniform configuration schema</li>
              <li>• Common data transformation pipeline</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="h-8 w-8 text-green-600" />
              <div>
                <h4 className="font-medium">5-Minute Setup</h4>
                <p className="text-sm text-muted-foreground">From install to first import</p>
              </div>
            </div>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• Auto-discovery of available data</li>
              <li>• Pre-configured field mappings</li>
              <li>• One-click authentication</li>
              <li>• Intelligent default settings</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="h-8 w-8 text-purple-600" />
              <div>
                <h4 className="font-medium">Enterprise Grade</h4>
                <p className="text-sm text-muted-foreground">Production-ready reliability</p>
              </div>
            </div>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• 99%+ connection success rate</li>
              <li>• Automatic retry and recovery</li>
              <li>• Rate limiting and throttling</li>
              <li>• Comprehensive audit logging</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}