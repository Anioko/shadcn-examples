"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { 
  Search, 
  Plus,
  Settings,
  Trash2,
  Copy,
  Edit,
  Eye,
  EyeOff,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Clock,
  Activity,
  ExternalLink,
  Key,
  Shield,
  Database
} from "lucide-react";

interface Connection {
  id: string;
  name: string;
  connector: string;
  logo: string;
  status: string;
  environment: string;
  lastTested: string;
  created: string;
  createdBy: string;
  description: string;
  config: {
    endpoint: string;
    authType: string;
    timeout: number;
    rateLimitPerMinute: number;
  };
}

const connections = [
  {
    id: "conn-001",
    name: "Production ServiceNow",
    connector: "ServiceNow",
    logo: "🔧",
    status: "connected",
    environment: "production",
    lastTested: "2024-01-15T14:25:00Z",
    created: "2024-01-10T09:00:00Z",
    createdBy: "admin@company.com",
    description: "Primary ServiceNow instance for CMDB and ITSM data",
    config: {
      endpoint: "https://company.service-now.com",
      authType: "OAuth 2.0",
      timeout: 30,
      rateLimitPerMinute: 100
    },
    permissions: ["read", "write"],
    lastSync: "2024-01-15T14:20:00Z",
    recordCount: 15847,
    errorCount: 0,
    health: 98
  },
  {
    id: "conn-002",
    name: "Main Jira Instance",
    connector: "Jira",
    logo: "📋",
    status: "connected",
    environment: "production",
    lastTested: "2024-01-15T13:45:00Z",
    created: "2024-01-12T11:30:00Z",
    createdBy: "pm@company.com",
    description: "Primary Jira instance for project management and issue tracking",
    config: {
      endpoint: "https://company.atlassian.net",
      authType: "API Token",
      timeout: 45,
      rateLimitPerMinute: 60
    },
    permissions: ["read"],
    lastSync: "2024-01-15T13:40:00Z",
    recordCount: 8924,
    errorCount: 0,
    health: 100
  },
  {
    id: "conn-003",
    name: "Corporate Azure AD",
    connector: "Azure AD",
    logo: "🔐",
    status: "error",
    environment: "production",
    lastTested: "2024-01-15T12:30:00Z",
    created: "2024-01-08T16:20:00Z",
    createdBy: "it@company.com",
    description: "Azure Active Directory for user and group management",
    config: {
      endpoint: "https://graph.microsoft.com",
      authType: "App Registration",
      timeout: 30,
      rateLimitPerMinute: 200
    },
    permissions: ["read"],
    lastSync: "2024-01-14T12:30:00Z",
    recordCount: 3456,
    errorCount: 12,
    health: 67,
    error: "Authentication token expired"
  },
  {
    id: "conn-004",
    name: "Dev Environment AWS",
    connector: "AWS",
    logo: "☁️",
    status: "connected",
    environment: "development",
    lastTested: "2024-01-15T10:15:00Z",
    created: "2024-01-14T14:45:00Z",
    createdBy: "devops@company.com",
    description: "Development AWS account for testing infrastructure imports",
    config: {
      endpoint: "https://aws.amazon.com",
      authType: "IAM Role",
      timeout: 60,
      rateLimitPerMinute: 80
    },
    permissions: ["read"],
    lastSync: "2024-01-15T10:00:00Z",
    recordCount: 2134,
    errorCount: 0,
    health: 95
  },
  {
    id: "conn-005",
    name: "GitHub Organization",
    connector: "GitHub",
    logo: "🐙",
    status: "warning",
    environment: "production",
    lastTested: "2024-01-15T11:20:00Z",
    created: "2024-01-13T08:30:00Z",
    createdBy: "dev@company.com",
    description: "GitHub organization for repository and development workflow data",
    config: {
      endpoint: "https://api.github.com",
      authType: "Personal Access Token",
      timeout: 30,
      rateLimitPerMinute: 5000
    },
    permissions: ["read"],
    lastSync: "2024-01-15T11:15:00Z",
    recordCount: 567,
    errorCount: 2,
    health: 88,
    warning: "Rate limit approaching threshold"
  }
];

export function ConnectionManager() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [environmentFilter, setEnvironmentFilter] = useState("all");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showConfigDialog, setShowConfigDialog] = useState(false);
  const [selectedConnection, setSelectedConnection] = useState<Connection | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "connected":
        return <Badge className="bg-green-100 text-green-800">Connected</Badge>;
      case "error":
        return <Badge className="bg-red-100 text-red-800">Error</Badge>;
      case "warning":
        return <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>;
      case "testing":
        return <Badge className="bg-blue-100 text-blue-800">Testing</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case "testing":
        return <RefreshCw className="h-4 w-4 text-blue-600 animate-spin" />;
      default:
        return <Activity className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getEnvironmentBadge = (environment: string) => {
    return (
      <Badge variant={environment === "production" ? "default" : "outline"}>
        {environment}
      </Badge>
    );
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffMs = now.getTime() - time.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  const filteredConnections = connections.filter(conn => {
    const matchesSearch = conn.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conn.connector.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conn.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || conn.status === statusFilter;
    const matchesEnvironment = environmentFilter === "all" || conn.environment === environmentFilter;
    return matchesSearch && matchesStatus && matchesEnvironment;
  });

  return (
    <div className="space-y-6">
      {/* Connection Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Connections</p>
                <p className="text-2xl font-bold">{connections.length}</p>
              </div>
              <Database className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Connected</p>
                <p className="text-2xl font-bold text-green-600">
                  {connections.filter(c => c.status === "connected").length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Issues</p>
                <p className="text-2xl font-bold text-red-600">
                  {connections.filter(c => c.status === "error" || c.status === "warning").length}
                </p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Health</p>
                <p className="text-2xl font-bold">
                  {Math.round(connections.reduce((sum, c) => sum + c.health, 0) / connections.length)}%
                </p>
              </div>
              <Activity className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Actions */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search connections..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="connected">Connected</SelectItem>
            <SelectItem value="error">Error</SelectItem>
            <SelectItem value="warning">Warning</SelectItem>
          </SelectContent>
        </Select>

        <Select value={environmentFilter} onValueChange={setEnvironmentFilter}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Environments</SelectItem>
            <SelectItem value="production">Production</SelectItem>
            <SelectItem value="development">Development</SelectItem>
            <SelectItem value="staging">Staging</SelectItem>
          </SelectContent>
        </Select>

        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Connection
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Connection</DialogTitle>
              <DialogDescription>
                Set up a new connection to import data from external systems.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Connector Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a connector" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="servicenow">ServiceNow</SelectItem>
                    <SelectItem value="jira">Jira</SelectItem>
                    <SelectItem value="azure-ad">Azure AD</SelectItem>
                    <SelectItem value="aws">AWS</SelectItem>
                    <SelectItem value="github">GitHub</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Connection Name</Label>
                <Input placeholder="My ServiceNow Instance" />
              </div>

              <div className="space-y-2">
                <Label>Environment</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select environment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="production">Production</SelectItem>
                    <SelectItem value="staging">Staging</SelectItem>
                    <SelectItem value="development">Development</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea placeholder="Describe this connection..." />
              </div>

              <div className="flex gap-2">
                <Button className="flex-1">Create Connection</Button>
                <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Connections List */}
      <Tabs defaultValue="list" className="space-y-4">
        <TabsList>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="grid">Grid View</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          {filteredConnections.map((connection) => (
            <Card key={connection.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{connection.logo}</div>
                    <div>
                      <h3 className="font-medium flex items-center gap-2">
                        {connection.name}
                        {getStatusIcon(connection.status)}
                      </h3>
                      <p className="text-sm text-muted-foreground">{connection.connector}</p>
                    </div>
                    {getStatusBadge(connection.status)}
                    {getEnvironmentBadge(connection.environment)}
                  </div>
                  
                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-3">
                            <span className="text-2xl">{connection.logo}</span>
                            {connection.name}
                          </DialogTitle>
                          <DialogDescription>{connection.description}</DialogDescription>
                        </DialogHeader>
                        
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label className="text-sm font-medium">Status</Label>
                              <div className="flex items-center gap-2 mt-1">
                                {getStatusIcon(connection.status)}
                                {getStatusBadge(connection.status)}
                              </div>
                            </div>
                            <div>
                              <Label className="text-sm font-medium">Environment</Label>
                              <div className="mt-1">{getEnvironmentBadge(connection.environment)}</div>
                            </div>
                            <div>
                              <Label className="text-sm font-medium">Health Score</Label>
                              <p className="text-lg font-bold mt-1">{connection.health}%</p>
                            </div>
                            <div>
                              <Label className="text-sm font-medium">Records</Label>
                              <p className="text-lg font-bold mt-1">{connection.recordCount.toLocaleString()}</p>
                            </div>
                          </div>

                          <Separator />

                          <div>
                            <Label className="text-sm font-medium">Configuration</Label>
                            <div className="mt-2 space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span>Endpoint:</span>
                                <span className="font-mono">{connection.config.endpoint}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Auth Type:</span>
                                <span>{connection.config.authType}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Timeout:</span>
                                <span>{connection.config.timeout}s</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Rate Limit:</span>
                                <span>{connection.config.rateLimitPerMinute}/min</span>
                              </div>
                            </div>
                          </div>

                          <Separator />

                          <div>
                            <Label className="text-sm font-medium">Activity</Label>
                            <div className="mt-2 space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span>Created:</span>
                                <span>{formatTimeAgo(connection.created)} by {connection.createdBy}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Last Tested:</span>
                                <span>{formatTimeAgo(connection.lastTested)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Last Sync:</span>
                                <span>{formatTimeAgo(connection.lastSync)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Button size="sm" variant="outline">
                      <Settings className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Copy className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-4">
                  {connection.description}
                </p>

                {/* Error/Warning Message */}
                {connection.error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center gap-2 text-red-800">
                      <AlertCircle className="h-4 w-4" />
                      <span className="text-sm font-medium">Connection Error</span>
                    </div>
                    <p className="text-sm text-red-700 mt-1">{connection.error}</p>
                  </div>
                )}

                {connection.warning && (
                  <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center gap-2 text-yellow-800">
                      <AlertCircle className="h-4 w-4" />
                      <span className="text-sm font-medium">Warning</span>
                    </div>
                    <p className="text-sm text-yellow-700 mt-1">{connection.warning}</p>
                  </div>
                )}

                {/* Connection Details */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-muted-foreground">Health Score</p>
                    <p className={`text-lg font-bold ${
                      connection.health >= 95 ? "text-green-600" : 
                      connection.health >= 80 ? "text-yellow-600" : "text-red-600"
                    }`}>
                      {connection.health}%
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-muted-foreground">Records Synced</p>
                    <p className="text-lg font-bold">{connection.recordCount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="font-medium text-muted-foreground">Last Tested</p>
                    <p>{formatTimeAgo(connection.lastTested)}</p>
                  </div>
                  <div>
                    <p className="font-medium text-muted-foreground">Created By</p>
                    <p>{connection.createdBy}</p>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex gap-2 mt-4 pt-4 border-t">
                  <Button size="sm">
                    <RefreshCw className="h-3 w-3 mr-1" />
                    Test Connection
                  </Button>
                  <Button size="sm" variant="outline">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    View Sync Jobs
                  </Button>
                  <Button size="sm" variant="outline">
                    <Key className="h-3 w-3 mr-1" />
                    Rotate Credentials
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="grid" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredConnections.map((connection) => (
              <Card key={connection.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{connection.logo}</div>
                      <div>
                        <CardTitle className="text-base">{connection.name}</CardTitle>
                        <CardDescription>{connection.connector}</CardDescription>
                      </div>
                    </div>
                    {getStatusBadge(connection.status)}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Health</span>
                    <span className={`font-bold ${
                      connection.health >= 95 ? "text-green-600" : 
                      connection.health >= 80 ? "text-yellow-600" : "text-red-600"
                    }`}>
                      {connection.health}%
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Records</span>
                    <span className="font-medium">{connection.recordCount.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Environment</span>
                    {getEnvironmentBadge(connection.environment)}
                  </div>

                  <div className="text-xs text-muted-foreground">
                    Last tested {formatTimeAgo(connection.lastTested)}
                  </div>

                  <div className="flex gap-1 pt-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Settings className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <RefreshCw className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Eye className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}