"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Star, 
  Download, 
  Check, 
  Plus,
  Settings,
  AlertCircle,
  ExternalLink,
  Filter
} from "lucide-react";

const connectorCategories = [
  { value: "all", label: "All Categories" },
  { value: "itsm", label: "ITSM & CMDB" },
  { value: "cloud", label: "Cloud Platforms" },
  { value: "devops", label: "DevOps & CI/CD" },
  { value: "iam", label: "Identity & Access" },
  { value: "ppm", label: "Project Management" },
  { value: "crm", label: "CRM & Sales" },
  { value: "documentation", label: "Documentation" },
  { value: "communication", label: "Communication" },
];

const connectors = [
  {
    id: "servicenow",
    name: "ServiceNow",
    vendor: "ServiceNow",
    category: "itsm",
    description: "Import applications, infrastructure, and services from ServiceNow CMDB",
    logo: "🔧",
    rating: 4.8,
    installs: 1247,
    status: "installed",
    lastUpdate: "2 days ago",
    capabilities: ["Import", "Sync", "Real-time", "Bidirectional"],
    entities: ["Applications", "Infrastructure", "Services", "Changes"],
    pricing: "Free",
    documentation: "https://docs.reqarchitect.com/connectors/servicenow"
  },
  {
    id: "azure-ad",
    name: "Azure Active Directory",
    vendor: "Microsoft",
    category: "iam",
    description: "Import users, groups, and organizational structure from Azure AD",
    logo: "🔐",
    rating: 4.9,
    installs: 2156,
    status: "available",
    lastUpdate: "1 week ago",
    capabilities: ["Import", "Sync"],
    entities: ["Users", "Groups", "Organizations"],
    pricing: "Free",
    documentation: "https://docs.reqarchitect.com/connectors/azure-ad"
  },
  {
    id: "jira",
    name: "Jira",
    vendor: "Atlassian",
    category: "ppm",
    description: "Import projects, epics, stories, and work items from Jira",
    logo: "📋",
    rating: 4.7,
    installs: 1893,
    status: "installed",
    lastUpdate: "3 days ago",
    capabilities: ["Import", "Sync", "AI Discovery"],
    entities: ["Epics", "Stories", "Projects", "Sprints"],
    pricing: "Free",
    documentation: "https://docs.reqarchitect.com/connectors/jira"
  },
  {
    id: "aws",
    name: "Amazon Web Services",
    vendor: "Amazon",
    category: "cloud",
    description: "Import cloud infrastructure from AWS including EC2, RDS, Lambda, and more",
    logo: "☁️",
    rating: 4.6,
    installs: 987,
    status: "available",
    lastUpdate: "1 week ago",
    capabilities: ["Import", "Sync", "Real-time"],
    entities: ["EC2 Instances", "Databases", "Lambda Functions", "VPCs"],
    pricing: "Premium",
    documentation: "https://docs.reqarchitect.com/connectors/aws"
  },
  {
    id: "github",
    name: "GitHub",
    vendor: "GitHub",
    category: "devops",
    description: "Import repositories, issues, and development workflow from GitHub",
    logo: "🐙",
    rating: 4.8,
    installs: 1567,
    status: "available",
    lastUpdate: "2 days ago",
    capabilities: ["Import", "Sync", "AI Discovery"],
    entities: ["Repositories", "Issues", "Pull Requests", "Teams"],
    pricing: "Free",
    documentation: "https://docs.reqarchitect.com/connectors/github"
  },
  {
    id: "salesforce",
    name: "Salesforce",
    vendor: "Salesforce",
    category: "crm",
    description: "Import customer data, opportunities, and business processes",
    logo: "☁️",
    rating: 4.5,
    installs: 734,
    status: "beta",
    lastUpdate: "1 week ago",
    capabilities: ["Import", "Sync"],
    entities: ["Accounts", "Opportunities", "Contacts", "Workflows"],
    pricing: "Premium",
    documentation: "https://docs.reqarchitect.com/connectors/salesforce"
  },
  {
    id: "confluence",
    name: "Confluence",
    vendor: "Atlassian",
    category: "documentation",
    description: "Import documentation, process flows, and knowledge from Confluence",
    logo: "📚",
    rating: 4.4,
    installs: 892,
    status: "available",
    lastUpdate: "4 days ago",
    capabilities: ["Import", "AI Discovery"],
    entities: ["Pages", "Spaces", "Attachments", "Comments"],
    pricing: "Free",
    documentation: "https://docs.reqarchitect.com/connectors/confluence"
  },
  {
    id: "slack",
    name: "Slack",
    vendor: "Slack",
    category: "communication",
    description: "Import team structure and communication patterns from Slack",
    logo: "💬",
    rating: 4.3,
    installs: 456,
    status: "available",
    lastUpdate: "1 week ago",
    capabilities: ["Import"],
    entities: ["Channels", "Users", "Teams", "Integrations"],
    pricing: "Free",
    documentation: "https://docs.reqarchitect.com/connectors/slack"
  },
];

export function ConnectorMarketplace() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [installedConnectors, setInstalledConnectors] = useState<Set<string>>(
    new Set(connectors.filter(c => c.status === "installed").map(c => c.id))
  );

  const handleInstall = (connectorId: string) => {
    setInstalledConnectors(prev => new Set([...prev, connectorId]));
  };

  const handleUninstall = (connectorId: string) => {
    setInstalledConnectors(prev => {
      const newSet = new Set(prev);
      newSet.delete(connectorId);
      return newSet;
    });
  };

  const filteredConnectors = connectors.filter(connector => {
    const matchesSearch = connector.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         connector.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         connector.vendor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || connector.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "installed":
        return <Badge className="bg-green-100 text-green-800">Installed</Badge>;
      case "available":
        return <Badge variant="outline">Available</Badge>;
      case "beta":
        return <Badge className="bg-orange-100 text-orange-800">Beta</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPricingBadge = (pricing: string) => {
    return (
      <Badge variant={pricing === "Free" ? "secondary" : "default"}>
        {pricing}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search connectors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {connectorCategories.map(category => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Connector Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Connectors ({filteredConnectors.length})</TabsTrigger>
          <TabsTrigger value="installed">
            Installed ({Array.from(installedConnectors).length})
          </TabsTrigger>
          <TabsTrigger value="popular">Popular</TabsTrigger>
          <TabsTrigger value="newest">Newest</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredConnectors.map((connector) => (
              <Card key={connector.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{connector.logo}</div>
                      <div>
                        <CardTitle className="text-base">{connector.name}</CardTitle>
                        <CardDescription className="text-sm">by {connector.vendor}</CardDescription>
                      </div>
                    </div>
                    {getStatusBadge(connector.status)}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {connector.description}
                  </p>

                  {/* Rating and Stats */}
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{connector.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="h-4 w-4 text-muted-foreground" />
                      <span>{connector.installs.toLocaleString()}</span>
                    </div>
                    {getPricingBadge(connector.pricing)}
                  </div>

                  {/* Capabilities */}
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-2">CAPABILITIES</p>
                    <div className="flex flex-wrap gap-1">
                      {connector.capabilities.map((capability, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {capability}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Supported Entities */}
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-2">IMPORTS</p>
                    <div className="flex flex-wrap gap-1">
                      {connector.entities.slice(0, 3).map((entity, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {entity}
                        </Badge>
                      ))}
                      {connector.entities.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{connector.entities.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    {installedConnectors.has(connector.id) ? (
                      <>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Settings className="h-3 w-3 mr-1" />
                          Configure
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleUninstall(connector.id)}
                        >
                          Uninstall
                        </Button>
                      </>
                    ) : (
                      <Button 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleInstall(connector.id)}
                        disabled={connector.status === "beta"}
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        Install
                      </Button>
                    )}
                    <Button size="sm" variant="outline">
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>

                  {/* Last Update */}
                  <div className="text-xs text-muted-foreground pt-2 border-t">
                    Updated {connector.lastUpdate}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="installed" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredConnectors
              .filter(connector => installedConnectors.has(connector.id))
              .map((connector) => (
                <Card key={connector.id} className="border-green-200 bg-green-50/50">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{connector.logo}</div>
                        <div>
                          <CardTitle className="text-base flex items-center gap-2">
                            {connector.name}
                            <Check className="h-4 w-4 text-green-600" />
                          </CardTitle>
                          <CardDescription className="text-sm">by {connector.vendor}</CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      {connector.description}
                    </p>

                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        <Settings className="h-3 w-3 mr-1" />
                        Configure
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleUninstall(connector.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="popular" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredConnectors
              .sort((a, b) => b.installs - a.installs)
              .slice(0, 6)
              .map((connector) => (
                <Card key={connector.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{connector.logo}</div>
                        <div>
                          <CardTitle className="text-base">{connector.name}</CardTitle>
                          <CardDescription className="text-sm">by {connector.vendor}</CardDescription>
                        </div>
                      </div>
                      <Badge className="bg-orange-100 text-orange-800">Popular</Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {connector.description}
                    </p>

                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Download className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{connector.installs.toLocaleString()} installs</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{connector.rating}</span>
                      </div>
                    </div>

                    <Button size="sm" className="w-full">
                      <Plus className="h-3 w-3 mr-1" />
                      Install
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="newest" className="space-y-4">
          <div className="text-center py-8">
            <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">New connectors coming soon!</h3>
            <p className="text-muted-foreground">
              We&apos;re working on adding more connectors. Check back regularly for updates.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}