"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Search, 
  RefreshCw, 
  Play,
  Pause,
  AlertCircle,
  CheckCircle,
  Clock,
  Activity,
  TrendingUp,
  Filter,
  Download,
  Settings,
  ExternalLink
} from "lucide-react";

const syncJobs = [
  {
    id: "sync-001",
    name: "ServiceNow CMDB Sync",
    connector: "ServiceNow",
    logo: "🔧",
    status: "running",
    progress: 67,
    recordsProcessed: 1247,
    totalRecords: 1856,
    startTime: "2024-01-15T14:30:00Z",
    lastSync: "2024-01-15T14:28:00Z",
    nextSync: "2024-01-15T15:30:00Z",
    schedule: "Hourly",
    entityTypes: ["Applications", "Infrastructure", "Services"],
    errors: 0,
    warnings: 3,
    avgDuration: "4m 32s",
    successRate: 98.7
  },
  {
    id: "sync-002", 
    name: "Jira Projects Import",
    connector: "Jira",
    logo: "📋",
    status: "completed",
    progress: 100,
    recordsProcessed: 2456,
    totalRecords: 2456,
    startTime: "2024-01-15T13:00:00Z",
    lastSync: "2024-01-15T13:12:00Z",
    nextSync: "2024-01-16T13:00:00Z",
    schedule: "Daily",
    entityTypes: ["Projects", "Epics", "Stories"],
    errors: 0,
    warnings: 0,
    avgDuration: "12m 15s",
    successRate: 100
  },
  {
    id: "sync-003",
    name: "Azure AD Users Sync",
    connector: "Azure AD",
    logo: "🔐",
    status: "failed",
    progress: 23,
    recordsProcessed: 156,
    totalRecords: 678,
    startTime: "2024-01-15T12:45:00Z",
    lastSync: "2024-01-14T12:45:00Z",
    nextSync: "2024-01-15T16:45:00Z",
    schedule: "Every 4 hours",
    entityTypes: ["Users", "Groups"],
    errors: 1,
    warnings: 0,
    avgDuration: "2m 45s",
    successRate: 94.2,
    errorMessage: "Authentication failed: Token expired"
  },
  {
    id: "sync-004",
    name: "AWS Infrastructure Sync",
    connector: "AWS",
    logo: "☁️",
    status: "scheduled",
    progress: 0,
    recordsProcessed: 0,
    totalRecords: 1234,
    startTime: null,
    lastSync: "2024-01-15T10:00:00Z",
    nextSync: "2024-01-15T16:00:00Z",
    schedule: "Every 6 hours",
    entityTypes: ["EC2", "RDS", "Lambda"],
    errors: 0,
    warnings: 0,
    avgDuration: "8m 20s",
    successRate: 96.5
  },
  {
    id: "sync-005",
    name: "GitHub Repositories",
    connector: "GitHub",
    logo: "🐙",
    status: "paused",
    progress: 45,
    recordsProcessed: 89,
    totalRecords: 198,
    startTime: "2024-01-15T11:30:00Z",
    lastSync: "2024-01-15T11:25:00Z",
    nextSync: null,
    schedule: "Manual",
    entityTypes: ["Repositories", "Issues"],
    errors: 0,
    warnings: 1,
    avgDuration: "3m 10s",
    successRate: 99.1
  }
];

const syncMetrics = {
  totalJobs: 12,
  activeJobs: 8,
  successfulSyncs: 147,
  failedSyncs: 8,
  avgSuccessRate: 97.3,
  totalRecordsToday: 15847,
  recordsPerHour: 2456
};

export function SyncMonitoring() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "running":
        return <Badge className="bg-blue-100 text-blue-800">Running</Badge>;
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case "failed":
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>;
      case "paused":
        return <Badge className="bg-yellow-100 text-yellow-800">Paused</Badge>;
      case "scheduled":
        return <Badge className="bg-gray-100 text-gray-800">Scheduled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "running":
        return <RefreshCw className="h-4 w-4 text-blue-600 animate-spin" />;
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "failed":
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      case "paused":
        return <Pause className="h-4 w-4 text-yellow-600" />;
      case "scheduled":
        return <Clock className="h-4 w-4 text-gray-600" />;
      default:
        return <Activity className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const formatTimeAgo = (timestamp: string | null) => {
    if (!timestamp) return "Never";
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

  const formatNextSync = (timestamp: string | null) => {
    if (!timestamp) return "Manual";
    const time = new Date(timestamp);
    const now = new Date();
    const diffMs = time.getTime() - now.getTime();
    
    if (diffMs < 0) return "Overdue";
    
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 60) return `In ${diffMins}m`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `In ${diffHours}h`;
    const diffDays = Math.floor(diffHours / 24);
    return `In ${diffDays}d`;
  };

  const filteredJobs = syncJobs.filter(job => {
    const matchesSearch = job.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.connector.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Sync Overview Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Jobs</p>
                <p className="text-2xl font-bold">{syncMetrics.activeJobs}</p>
              </div>
              <Activity className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              of {syncMetrics.totalJobs} total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Success Rate</p>
                <p className="text-2xl font-bold">{syncMetrics.avgSuccessRate}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Last 24 hours
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Records Today</p>
                <p className="text-2xl font-bold">{syncMetrics.totalRecordsToday.toLocaleString()}</p>
              </div>
              <Download className="h-8 w-8 text-purple-600" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {syncMetrics.recordsPerHour}/hour avg
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Failed Jobs</p>
                <p className="text-2xl font-bold text-red-600">{syncMetrics.failedSyncs}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Need attention
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search sync jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="running">Running</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
            <SelectItem value="paused">Paused</SelectItem>
            <SelectItem value="scheduled">Scheduled</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Sync Jobs */}
      <Tabs defaultValue="list" className="space-y-4">
        <TabsList>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="grid">Grid View</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          {filteredJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{job.logo}</div>
                    <div>
                      <h3 className="font-medium">{job.name}</h3>
                      <p className="text-sm text-muted-foreground">{job.connector}</p>
                    </div>
                    {getStatusIcon(job.status)}
                    {getStatusBadge(job.status)}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Settings className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                {/* Progress Bar for Running Jobs */}
                {job.status === "running" && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Processing records...</span>
                      <span>{job.recordsProcessed} / {job.totalRecords}</span>
                    </div>
                    <Progress value={job.progress} />
                  </div>
                )}

                {/* Error Message for Failed Jobs */}
                {job.status === "failed" && job.errorMessage && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center gap-2 text-red-800">
                      <AlertCircle className="h-4 w-4" />
                      <span className="text-sm font-medium">Error</span>
                    </div>
                    <p className="text-sm text-red-700 mt-1">{job.errorMessage}</p>
                  </div>
                )}

                {/* Job Details Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-muted-foreground">Last Sync</p>
                    <p>{formatTimeAgo(job.lastSync)}</p>
                  </div>
                  <div>
                    <p className="font-medium text-muted-foreground">Next Sync</p>
                    <p>{formatNextSync(job.nextSync)}</p>
                  </div>
                  <div>
                    <p className="font-medium text-muted-foreground">Schedule</p>
                    <p>{job.schedule}</p>
                  </div>
                  <div>
                    <p className="font-medium text-muted-foreground">Success Rate</p>
                    <p className={job.successRate >= 95 ? "text-green-600" : job.successRate >= 90 ? "text-yellow-600" : "text-red-600"}>
                      {job.successRate}%
                    </p>
                  </div>
                </div>

                {/* Entity Types */}
                <div className="mt-4">
                  <p className="text-xs font-medium text-muted-foreground mb-2">ENTITY TYPES</p>
                  <div className="flex flex-wrap gap-1">
                    {job.entityTypes.map((entity, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {entity}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Issues Summary */}
                {(job.errors > 0 || job.warnings > 0) && (
                  <div className="mt-4 flex gap-4 text-sm">
                    {job.errors > 0 && (
                      <div className="flex items-center gap-1 text-red-600">
                        <AlertCircle className="h-4 w-4" />
                        <span>{job.errors} error{job.errors !== 1 ? "s" : ""}</span>
                      </div>
                    )}
                    {job.warnings > 0 && (
                      <div className="flex items-center gap-1 text-yellow-600">
                        <AlertCircle className="h-4 w-4" />
                        <span>{job.warnings} warning{job.warnings !== 1 ? "s" : ""}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2 mt-4 pt-4 border-t">
                  {job.status === "running" && (
                    <Button size="sm" variant="outline">
                      <Pause className="h-3 w-3 mr-1" />
                      Pause
                    </Button>
                  )}
                  {job.status === "paused" && (
                    <Button size="sm">
                      <Play className="h-3 w-3 mr-1" />
                      Resume
                    </Button>
                  )}
                  {job.status === "failed" && (
                    <Button size="sm">
                      <RefreshCw className="h-3 w-3 mr-1" />
                      Retry
                    </Button>
                  )}
                  {(job.status === "completed" || job.status === "scheduled") && (
                    <Button size="sm" variant="outline">
                      <Play className="h-3 w-3 mr-1" />
                      Run Now
                    </Button>
                  )}
                  <Button size="sm" variant="outline">
                    View Logs
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="grid" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{job.logo}</div>
                      <div>
                        <CardTitle className="text-base">{job.name}</CardTitle>
                        <CardDescription>{job.connector}</CardDescription>
                      </div>
                    </div>
                    {getStatusBadge(job.status)}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  {job.status === "running" && (
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{job.progress}%</span>
                      </div>
                      <Progress value={job.progress} />
                    </div>
                  )}

                  <div className="text-sm">
                    <p><span className="font-medium">Last sync:</span> {formatTimeAgo(job.lastSync)}</p>
                    <p><span className="font-medium">Next sync:</span> {formatNextSync(job.nextSync)}</p>
                    <p><span className="font-medium">Success rate:</span> {job.successRate}%</p>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {job.entityTypes.map((entity, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {entity}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-4">
          <div className="text-center py-8">
            <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Timeline View</h3>
            <p className="text-muted-foreground">
              Timeline visualization coming soon. View sync jobs chronologically.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}