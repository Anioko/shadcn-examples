"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Database, 
  Download, 
  RefreshCw, 
  AlertCircle, 
  CheckCircle2, 
  Clock,
  TrendingUp,
  Users,
  Zap
} from "lucide-react";

export function IntegrationStats() {
  const stats = {
    totalConnectors: 12,
    activeConnections: 8,
    entitiesImported: 2847,
    lastSyncSuccess: 95,
    syncFrequency: "Every 4 hours",
    dataFreshness: 98
  };

  const recentImports = [
    { source: "ServiceNow", entities: 156, type: "Applications", status: "success", time: "2 hours ago" },
    { source: "Jira", entities: 89, type: "Initiatives", status: "success", time: "4 hours ago" },
    { source: "Azure AD", entities: 234, type: "Users & Teams", status: "success", time: "6 hours ago" },
    { source: "AWS", entities: 67, type: "Infrastructure", status: "warning", time: "8 hours ago" },
  ];

  const connectorHealth = [
    { name: "ServiceNow", status: "healthy", uptime: 99.8, lastSync: "2h ago" },
    { name: "Jira", status: "healthy", uptime: 99.5, lastSync: "4h ago" },
    { name: "Azure AD", status: "healthy", uptime: 100, lastSync: "6h ago" },
    { name: "GitHub", status: "warning", uptime: 97.2, lastSync: "12h ago" },
    { name: "AWS", status: "healthy", uptime: 99.9, lastSync: "8h ago" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Main Stats Cards */}
      <Card>
        <CardContent className="flex items-center p-6">
          <Database className="h-8 w-8 text-blue-500" />
          <div className="ml-4">
            <p className="text-sm font-medium text-muted-foreground">Active Connectors</p>
            <p className="text-2xl font-bold">{stats.activeConnections}/{stats.totalConnectors}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-center p-6">
          <Download className="h-8 w-8 text-green-500" />
          <div className="ml-4">
            <p className="text-sm font-medium text-muted-foreground">Entities Imported</p>
            <p className="text-2xl font-bold">{stats.entitiesImported.toLocaleString()}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-center p-6">
          <RefreshCw className="h-8 w-8 text-purple-500" />
          <div className="ml-4">
            <p className="text-sm font-medium text-muted-foreground">Sync Success Rate</p>
            <p className="text-2xl font-bold">{stats.lastSyncSuccess}%</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-center p-6">
          <TrendingUp className="h-8 w-8 text-orange-500" />
          <div className="ml-4">
            <p className="text-sm font-medium text-muted-foreground">Data Freshness</p>
            <p className="text-2xl font-bold">{stats.dataFreshness}%</p>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="text-base">Recent Import Activity</CardTitle>
          <CardDescription>Latest data imports from connected systems</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentImports.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  {item.status === "success" ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-yellow-500" />
                  )}
                  <div>
                    <p className="font-medium text-sm">{item.source}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.entities} {item.type.toLowerCase()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge 
                    variant={item.status === "success" ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {item.status}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Connector Health */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="text-base">Connector Health</CardTitle>
          <CardDescription>Status and performance of active integrations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {connectorHealth.map((connector, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {connector.status === "healthy" ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-yellow-500" />
                  )}
                  <span className="font-medium text-sm">{connector.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm font-medium">{connector.uptime}%</div>
                    <div className="text-xs text-muted-foreground">uptime</div>
                  </div>
                  <div className="w-20">
                    <Progress value={connector.uptime} className="h-2" />
                  </div>
                  <div className="text-xs text-muted-foreground w-16 text-right">
                    {connector.lastSync}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}