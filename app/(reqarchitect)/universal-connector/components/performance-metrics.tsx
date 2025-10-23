"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  Users,
  Database,
  Zap,
  Target,
  Award
} from "lucide-react";

const performanceData = {
  connectionSuccessRate: 99.2,
  averageImportTime: 8.5, // minutes for 1K entities
  dataAccuracy: 98.7,
  connectorsInstalled: 1247,
  entitiesImported: 2847365,
  activeOrganizations: 89,
  userSatisfaction: 4.6,
  errorRate: 1.3,
  averageFieldMappingAccuracy: 95.8,
  totalConnectorsAvailable: 104
};

const connectorCategories = [
  { name: "ITSM & CMDB", count: 15, priority: "P0: 2, P1: 8, P2: 5" },
  { name: "Cloud Infrastructure", count: 18, priority: "P0: 3, P1: 7, P2: 8" },
  { name: "Identity & Access", count: 12, priority: "P0: 3, P1: 5, P2: 4" },
  { name: "Project Management", count: 16, priority: "P0: 2, P1: 9, P2: 5" },
  { name: "DevOps & CI/CD", count: 14, priority: "P0: 4, P1: 6, P2: 4" },
  { name: "Documentation", count: 11, priority: "P0: 2, P1: 4, P2: 5" },
  { name: "CRM & Sales", count: 10, priority: "P0: 2, P1: 4, P2: 4" },
  { name: "Communication", count: 8, priority: "P0: 2, P1: 2, P2: 4" }
];

const topPerformingConnectors = [
  { name: "ServiceNow", accuracy: 99.1, imports: 156823, rating: 4.8, category: "ITSM" },
  { name: "Azure AD", accuracy: 98.9, imports: 89234, rating: 4.7, category: "IAM" },
  { name: "Jira", accuracy: 98.5, imports: 124567, rating: 4.6, category: "PPM" },
  { name: "GitHub", accuracy: 97.8, imports: 78901, rating: 4.8, category: "DevOps" },
  { name: "AWS", accuracy: 96.2, imports: 45678, rating: 4.5, category: "Cloud" }
];

export function PerformanceMetrics() {
  return (
    <div className="space-y-6">
      {/* Key Performance Indicators */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Success Rate</p>
                <p className="text-2xl font-bold text-green-600">{performanceData.connectionSuccessRate}%</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div className="mt-2">
              <Progress value={performanceData.connectionSuccessRate} className="h-2" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">Target: 99%+</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Import Time</p>
                <p className="text-2xl font-bold">{performanceData.averageImportTime}m</p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
            <div className="mt-2">
              <Progress value={85} className="h-2" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">For 1K entities</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Data Accuracy</p>
                <p className="text-2xl font-bold text-purple-600">{performanceData.dataAccuracy}%</p>
              </div>
              <Target className="h-8 w-8 text-purple-600" />
            </div>
            <div className="mt-2">
              <Progress value={performanceData.dataAccuracy} className="h-2" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">Target: 98%+</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">User Rating</p>
                <p className="text-2xl font-bold text-yellow-600">{performanceData.userSatisfaction}/5</p>
              </div>
              <Award className="h-8 w-8 text-yellow-600" />
            </div>
            <div className="mt-2">
              <Progress value={performanceData.userSatisfaction * 20} className="h-2" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">Target: 4.5+</p>
          </CardContent>
        </Card>
      </div>

      {/* Adoption Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Connectors</p>
                <p className="text-3xl font-bold">{performanceData.connectorsInstalled.toLocaleString()}</p>
              </div>
              <Database className="h-10 w-10 text-blue-600" />
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Across {performanceData.activeOrganizations} organizations
            </p>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-xs text-green-600">+12% this month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Entities Imported</p>
                <p className="text-3xl font-bold">{(performanceData.entitiesImported / 1000000).toFixed(1)}M</p>
              </div>
              <Zap className="h-10 w-10 text-purple-600" />
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Total across all connectors
            </p>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-xs text-green-600">+156K this week</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Available Connectors</p>
                <p className="text-3xl font-bold">{performanceData.totalConnectorsAvailable}</p>
              </div>
              <Users className="h-10 w-10 text-green-600" />
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              P0: 20, P1: 44, P2: 40
            </p>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-xs text-green-600">+3 new this month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Connector Categories Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Connector Categories</CardTitle>
          <CardDescription>
            Distribution of 100+ connectors across enterprise system categories
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {connectorCategories.map((category, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-sm">{category.name}</h4>
                  <Badge variant="outline">{category.count}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">{category.priority}</p>
                <div className="mt-3">
                  <Progress 
                    value={(category.count / performanceData.totalConnectorsAvailable) * 100} 
                    className="h-2" 
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Performing Connectors */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Connectors</CardTitle>
          <CardDescription>
            Highest rated connectors by accuracy, usage, and customer satisfaction
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topPerformingConnectors.map((connector, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">#{index + 1}</span>
                  </div>
                  <div>
                    <h4 className="font-medium">{connector.name}</h4>
                    <p className="text-sm text-muted-foreground">{connector.category}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 text-sm">
                  <div className="text-center">
                    <p className="font-medium">{connector.accuracy}%</p>
                    <p className="text-muted-foreground">Accuracy</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium">{(connector.imports / 1000).toFixed(0)}K</p>
                    <p className="text-muted-foreground">Imports</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium">{connector.rating}/5</p>
                    <p className="text-muted-foreground">Rating</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Field Mapping Performance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              AI Field Mapping Accuracy
              <Badge className="bg-green-100 text-green-800">95.8%</Badge>
            </CardTitle>
            <CardDescription>
              Automated field mapping success rate across all connector types
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>ServiceNow → ReqArchitect</span>
                  <span>98.2%</span>
                </div>
                <Progress value={98.2} />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Jira → ReqArchitect</span>
                  <span>96.5%</span>
                </div>
                <Progress value={96.5} />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Azure AD → ReqArchitect</span>
                  <span>97.8%</span>
                </div>
                <Progress value={97.8} />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>AWS → ReqArchitect</span>
                  <span>92.4%</span>
                </div>
                <Progress value={92.4} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Import Pipeline Performance</CardTitle>
            <CardDescription>
              Processing time breakdown for standard 1K entity import
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Extract</span>
                <div className="flex items-center gap-2">
                  <Progress value={20} className="w-24 h-2" />
                  <span className="text-sm text-muted-foreground">2.1m</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Transform</span>
                <div className="flex items-center gap-2">
                  <Progress value={35} className="w-24 h-2" />
                  <span className="text-sm text-muted-foreground">3.0m</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Validate</span>
                <div className="flex items-center gap-2">
                  <Progress value={15} className="w-24 h-2" />
                  <span className="text-sm text-muted-foreground">1.3m</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Load</span>
                <div className="flex items-center gap-2">
                  <Progress value={25} className="w-24 h-2" />
                  <span className="text-sm text-muted-foreground">2.1m</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Relationships</span>
                <div className="flex items-center gap-2">
                  <Progress value={5} className="w-24 h-2" />
                  <span className="text-sm text-muted-foreground">0.5m</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}