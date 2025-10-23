"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  TrendingUp, 
  Network, 
  Target, 
  Users, 
  Crown, 
  Activity,
  ArrowUp,
  ArrowDown,
  Minus,
  Database,
  Server,
  GitBranch,
  Shield
} from "lucide-react";

const centralityData = [
  {
    id: "tech-1",
    name: "PostgreSQL Database",
    type: "technology",
    metrics: {
      degreeCentrality: { score: 95, rank: 1, change: 2 },
      betweennessCentrality: { score: 88, rank: 2, change: 0 },
      closenessCentrality: { score: 92, rank: 1, change: 1 },
      eigenvectorCentrality: { score: 89, rank: 3, change: -1 },
      pageRank: { score: 94, rank: 1, change: 0 },
      strategicValue: 93
    },
    connections: { inbound: 15, outbound: 8, total: 23 },
    description: "Core database system with highest connectivity"
  },
  {
    id: "app-2",
    name: "Order Management API",
    type: "application",
    metrics: {
      degreeCentrality: { score: 87, rank: 2, change: 1 },
      betweennessCentrality: { score: 91, rank: 1, change: 1 },
      closenessCentrality: { score: 85, rank: 3, change: 0 },
      eigenvectorCentrality: { score: 92, rank: 1, change: 2 },
      pageRank: { score: 88, rank: 2, change: 1 },
      strategicValue: 89
    },
    connections: { inbound: 12, outbound: 6, total: 18 },
    description: "Critical API with high betweenness centrality"
  },
  {
    id: "cap-1",
    name: "Customer Service",
    type: "capability",
    metrics: {
      degreeCentrality: { score: 78, rank: 5, change: 0 },
      betweennessCentrality: { score: 82, rank: 4, change: 1 },
      closenessCentrality: { score: 87, rank: 2, change: -1 },
      eigenvectorCentrality: { score: 85, rank: 4, change: 0 },
      pageRank: { score: 81, rank: 4, change: 0 },
      strategicValue: 83
    },
    connections: { inbound: 8, outbound: 7, total: 15 },
    description: "Strategic capability with high closeness centrality"
  },
  {
    id: "team-1",
    name: "Engineering Team",
    type: "team",
    metrics: {
      degreeCentrality: { score: 82, rank: 3, change: -1 },
      betweennessCentrality: { score: 75, rank: 6, change: -2 },
      closenessCentrality: { score: 79, rank: 5, change: 0 },
      eigenvectorCentrality: { score: 88, rank: 2, change: 1 },
      pageRank: { score: 83, rank: 3, change: 0 },
      strategicValue: 81
    },
    connections: { inbound: 5, outbound: 20, total: 25 },
    description: "Key team with high eigenvector centrality"
  },
  {
    id: "tech-4",
    name: "Kubernetes Platform",
    type: "technology",
    metrics: {
      degreeCentrality: { score: 79, rank: 4, change: 3 },
      betweennessCentrality: { score: 73, rank: 7, change: 1 },
      closenessCentrality: { score: 81, rank: 4, change: 2 },
      eigenvectorCentrality: { score: 76, rank: 6, change: 0 },
      pageRank: { score: 78, rank: 5, change: 2 },
      strategicValue: 77
    },
    connections: { inbound: 4, outbound: 12, total: 16 },
    description: "Infrastructure platform with growing importance"
  }
];

const entityTypeConfig = {
  capability: { color: "#3b82f6", icon: GitBranch, label: "Capability" },
  application: { color: "#10b981", icon: Server, label: "Application" },
  technology: { color: "#8b5cf6", icon: Database, label: "Technology" },
  team: { color: "#f59e0b", icon: Users, label: "Team" },
  security: { color: "#06b6d4", icon: Shield, label: "Security" },
};

const centralityTypes = [
  {
    key: "degreeCentrality",
    name: "Degree Centrality",
    description: "Measures direct connections. High degree = many direct relationships.",
    icon: Network
  },
  {
    key: "betweennessCentrality", 
    name: "Betweenness Centrality",
    description: "Measures how often an entity lies on shortest paths between others.",
    icon: Target
  },
  {
    key: "closenessCentrality",
    name: "Closeness Centrality", 
    description: "Measures average distance to all other entities in the graph.",
    icon: Activity
  },
  {
    key: "eigenvectorCentrality",
    name: "Eigenvector Centrality",
    description: "Measures influence based on connections to other important entities.",
    icon: Crown
  },
  {
    key: "pageRank",
    name: "PageRank",
    description: "Google's algorithm adapted for architecture - measures overall importance.",
    icon: TrendingUp
  }
];

export function CentralityMetrics() {
  const [selectedMetric, setSelectedMetric] = useState("strategicValue");
  const [selectedEntityType, setSelectedEntityType] = useState("all");

  const getChangeIcon = (change: number) => {
    if (change > 0) return <ArrowUp className="h-3 w-3 text-green-500" />;
    if (change < 0) return <ArrowDown className="h-3 w-3 text-red-500" />;
    return <Minus className="h-3 w-3 text-gray-500" />;
  };

  const getChangeText = (change: number) => {
    if (change > 0) return `+${change}`;
    if (change < 0) return `${change}`;
    return "0";
  };

  const filteredData = selectedEntityType === "all" 
    ? centralityData 
    : centralityData.filter(item => item.type === selectedEntityType);

  const sortedData = [...filteredData].sort((a, b) => {
    if (selectedMetric === "strategicValue") {
      return b.metrics.strategicValue - a.metrics.strategicValue;
    }
    const metricKey = selectedMetric as keyof typeof a.metrics;
    const aMetric = a.metrics[metricKey] as { score: number };
    const bMetric = b.metrics[metricKey] as { score: number };
    return bMetric.score - aMetric.score;
  });

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {centralityTypes.map((type) => {
          const Icon = type.icon;
          const avgScore = Math.round(
            centralityData.reduce((acc, item) => {
              const metric = item.metrics[type.key as keyof typeof item.metrics] as { score: number };
              return acc + metric.score;
            }, 0) / centralityData.length
          );
          
          return (
            <Card key={type.key}>
              <CardContent className="flex items-center p-4">
                <Icon className="h-6 w-6 text-blue-500" />
                <div className="ml-3">
                  <p className="text-xs font-medium text-muted-foreground">{type.name}</p>
                  <p className="text-lg font-bold">{avgScore}%</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Graph Analytics & Centrality Metrics
          </CardTitle>
          <CardDescription>
            Analyze the strategic importance and influence of entities in your architecture graph
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="rankings" className="space-y-4">
            <TabsList>
              <TabsTrigger value="rankings">Entity Rankings</TabsTrigger>
              <TabsTrigger value="details">Detailed Metrics</TabsTrigger>
              <TabsTrigger value="trends">Trends & Changes</TabsTrigger>
            </TabsList>

            <TabsContent value="rankings" className="space-y-4">
              {/* Filters */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium">Metric:</label>
                  <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="strategicValue">Strategic Value (Combined)</SelectItem>
                      <SelectItem value="degreeCentrality">Degree Centrality</SelectItem>
                      <SelectItem value="betweennessCentrality">Betweenness Centrality</SelectItem>
                      <SelectItem value="closenessCentrality">Closeness Centrality</SelectItem>
                      <SelectItem value="eigenvectorCentrality">Eigenvector Centrality</SelectItem>
                      <SelectItem value="pageRank">PageRank</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium">Type:</label>
                  <Select value={selectedEntityType} onValueChange={setSelectedEntityType}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="capability">Capabilities</SelectItem>
                      <SelectItem value="application">Applications</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="team">Teams</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Rankings List */}
              <div className="space-y-3">
                {sortedData.map((entity, index) => {
                  const config = entityTypeConfig[entity.type as keyof typeof entityTypeConfig];
                  const Icon = config.icon;
                  
                  let score: number;
                  let rank: number;
                  let change: number;
                  
                  if (selectedMetric === "strategicValue") {
                    score = entity.metrics.strategicValue;
                    rank = index + 1;
                    change = 0; // Strategic value is computed, no historical change
                  } else {
                    const metric = entity.metrics[selectedMetric as keyof typeof entity.metrics] as { score: number; rank: number; change: number };
                    score = metric.score;
                    rank = metric.rank;
                    change = metric.change;
                  }

                  return (
                    <div key={entity.id} className="flex items-center gap-4 p-4 border rounded-lg bg-muted/30">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl font-bold text-muted-foreground w-8">
                          #{rank}
                        </div>
                        <Icon className="h-6 w-6" style={{ color: config.color }} />
                        <div>
                          <h4 className="font-medium">{entity.name}</h4>
                          <p className="text-sm text-muted-foreground">{entity.description}</p>
                        </div>
                      </div>

                      <div className="ml-auto flex items-center gap-4">
                        <div className="text-center">
                          <div className="text-sm text-muted-foreground">Connections</div>
                          <div className="font-medium">{entity.connections.total}</div>
                        </div>

                        <div className="text-center">
                          <div className="text-sm text-muted-foreground">Score</div>
                          <div className="font-medium">{score}%</div>
                        </div>

                        <div className="w-32">
                          <Progress value={score} className="h-2" />
                        </div>

                        {selectedMetric !== "strategicValue" && (
                          <div className="flex items-center gap-1 text-sm">
                            {getChangeIcon(change)}
                            <span className={change > 0 ? "text-green-600" : change < 0 ? "text-red-600" : "text-gray-600"}>
                              {getChangeText(change)}
                            </span>
                          </div>
                        )}

                        <Badge variant="outline" style={{ backgroundColor: `${config.color}20`, borderColor: config.color }}>
                          {config.label}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="details" className="space-y-4">
              {/* Detailed Metrics Table */}
              <div className="space-y-4">
                {centralityTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <Card key={type.key}>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <Icon className="h-5 w-5" />
                          {type.name}
                        </CardTitle>
                        <CardDescription>{type.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {centralityData
                            .sort((a, b) => {
                              const aMetric = a.metrics[type.key as keyof typeof a.metrics] as { score: number };
                              const bMetric = b.metrics[type.key as keyof typeof b.metrics] as { score: number };
                              return bMetric.score - aMetric.score;
                            })
                            .slice(0, 5)
                            .map((entity) => {
                              const config = entityTypeConfig[entity.type as keyof typeof entityTypeConfig];
                              const Icon = config.icon;
                              const metric = entity.metrics[type.key as keyof typeof entity.metrics] as { score: number; rank: number; change: number };
                              
                              return (
                                <div key={entity.id} className="flex items-center justify-between p-3 border rounded bg-background">
                                  <div className="flex items-center gap-3">
                                    <div className="text-lg font-bold text-muted-foreground">
                                      #{metric.rank}
                                    </div>
                                    <Icon className="h-5 w-5" style={{ color: config.color }} />
                                    <span className="font-medium">{entity.name}</span>
                                    <Badge variant="outline" className="text-xs">
                                      {config.label}
                                    </Badge>
                                  </div>
                                  <div className="flex items-center gap-4">
                                    <div className="w-24">
                                      <Progress value={metric.score} className="h-2" />
                                    </div>
                                    <div className="text-sm font-medium w-12 text-right">
                                      {metric.score}%
                                    </div>
                                    <div className="flex items-center gap-1 w-8">
                                      {getChangeIcon(metric.change)}
                                      <span className="text-xs">
                                        {getChangeText(metric.change)}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="trends" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Centrality Trends & Changes</CardTitle>
                  <CardDescription>
                    Track how entity importance has changed over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="flex items-center p-4">
                          <ArrowUp className="h-6 w-6 text-green-500" />
                          <div className="ml-3">
                            <p className="text-sm text-muted-foreground">Rising Stars</p>
                            <p className="text-lg font-bold">3</p>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="flex items-center p-4">
                          <ArrowDown className="h-6 w-6 text-red-500" />
                          <div className="ml-3">
                            <p className="text-sm text-muted-foreground">Declining</p>
                            <p className="text-lg font-bold">1</p>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="flex items-center p-4">
                          <Minus className="h-6 w-6 text-gray-500" />
                          <div className="ml-3">
                            <p className="text-sm text-muted-foreground">Stable</p>
                            <p className="text-lg font-bold">6</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="space-y-3">
                      {centralityData
                        .filter(entity => {
                          const hasChange = Object.values(entity.metrics).some(metric => 
                            typeof metric === 'object' && 'change' in metric && metric.change !== 0
                          );
                          return hasChange;
                        })
                        .map((entity) => {
                          const config = entityTypeConfig[entity.type as keyof typeof entityTypeConfig];
                          const Icon = config.icon;
                          
                          const changes = Object.entries(entity.metrics)
                            .filter(([key]) => key !== 'strategicValue')
                            .map(([key, metric]) => ({
                              metric: key,
                              change: (metric as { change: number }).change
                            }))
                            .filter(item => item.change !== 0);

                          return (
                            <div key={entity.id} className="flex items-center justify-between p-4 border rounded-lg">
                              <div className="flex items-center gap-3">
                                <Icon className="h-5 w-5" style={{ color: config.color }} />
                                <div>
                                  <div className="font-medium">{entity.name}</div>
                                  <div className="text-sm text-muted-foreground">{config.label}</div>
                                </div>
                              </div>
                              
                              <div className="flex gap-2">
                                {changes.map(item => (
                                  <div key={item.metric} className="flex items-center gap-1 text-sm px-2 py-1 rounded bg-muted">
                                    {getChangeIcon(item.change)}
                                    <span>{item.metric.replace('Centrality', '')}</span>
                                    <span className="font-medium">{getChangeText(item.change)}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}