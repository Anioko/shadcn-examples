"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { GitBranch, Users, Server, Database, Shield, Zap } from "lucide-react";

export function GraphStats() {
  const entityStats = [
    { type: "Capabilities", count: 42, icon: GitBranch, color: "text-blue-500" },
    { type: "Applications", count: 67, icon: Server, color: "text-green-500" },
    { type: "Technology", count: 89, icon: Database, color: "text-purple-500" },
    { type: "Users & Teams", count: 156, icon: Users, color: "text-orange-500" },
    { type: "Security Controls", count: 34, icon: Shield, color: "text-red-500" },
    { type: "Initiatives", count: 23, icon: Zap, color: "text-yellow-500" },
  ];

  const relationshipStats = [
    { type: "Depends On", count: 145, strength: 78 },
    { type: "Supports", count: 112, strength: 85 },
    { type: "Uses", count: 89, strength: 72 },
    { type: "Implements", count: 67, strength: 90 },
    { type: "Serves", count: 44, strength: 88 },
  ];

  const graphHealth = {
    connectivity: 92,
    coverage: 87,
    accuracy: 94,
    freshness: 89,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Entity Count Cards */}
      {entityStats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.type}>
            <CardContent className="flex items-center p-6">
              <Icon className={`h-8 w-8 ${stat.color}`} />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">{stat.type}</p>
                <p className="text-2xl font-bold">{stat.count}</p>
              </div>
            </CardContent>
          </Card>
        );
      })}
      
      {/* Graph Health Overview */}
      <Card className="md:col-span-2 lg:col-span-4">
        <CardHeader>
          <CardTitle>Graph Health & Quality Metrics</CardTitle>
          <CardDescription>
            Overall health indicators for your architecture graph
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="relationships" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="relationships">Relationships</TabsTrigger>
              <TabsTrigger value="health">Health Metrics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="relationships" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {relationshipStats.map((rel) => (
                  <div key={rel.type} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{rel.type}</span>
                      <Badge variant="secondary">{rel.count}</Badge>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Avg Strength</span>
                        <span>{rel.strength}%</span>
                      </div>
                      <Progress value={rel.strength} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="health" className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Connectivity</span>
                    <span className="font-medium">{graphHealth.connectivity}%</span>
                  </div>
                  <Progress value={graphHealth.connectivity} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    Percentage of entities with relationships
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Coverage</span>
                    <span className="font-medium">{graphHealth.coverage}%</span>
                  </div>
                  <Progress value={graphHealth.coverage} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    Architecture areas mapped
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Accuracy</span>
                    <span className="font-medium">{graphHealth.accuracy}%</span>
                  </div>
                  <Progress value={graphHealth.accuracy} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    Verified relationships
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Freshness</span>
                    <span className="font-medium">{graphHealth.freshness}%</span>
                  </div>
                  <Progress value={graphHealth.freshness} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    Recently updated data
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}