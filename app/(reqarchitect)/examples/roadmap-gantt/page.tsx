"use client";

import * as React from "react";
import {
  GanttProvider,
  GanttSidebar,
  GanttSidebarGroup,
  GanttSidebarItem,
  GanttTimeline,
  GanttHeader,
  GanttFeatureList,
  GanttFeatureListGroup,
  GanttFeatureItem,
  GanttToday,
  type GanttFeature,
} from "@/components/ui/gantt";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Mock roadmap data
const mockRoadmapData: Array<GanttFeature & { group: string; priority: string }> = [
  {
    id: "1",
    name: "Q1 Platform Infrastructure",
    startAt: new Date(2024, 0, 15),
    endAt: new Date(2024, 2, 30),
    status: { id: "in-progress", name: "In Progress", color: "#3B82F6" },
    group: "Infrastructure",
    priority: "High",
  },
  {
    id: "2",
    name: "API Gateway Implementation",
    startAt: new Date(2024, 1, 1),
    endAt: new Date(2024, 3, 15),
    status: { id: "planning", name: "Planning", color: "#F59E0B" },
    group: "Infrastructure",
    priority: "High",
  },
  {
    id: "3",
    name: "User Authentication System",
    startAt: new Date(2024, 0, 1),
    endAt: new Date(2024, 1, 28),
    status: { id: "completed", name: "Completed", color: "#10B981" },
    group: "Security",
    priority: "Critical",
  },
  {
    id: "4",
    name: "OAuth 2.0 Integration",
    startAt: new Date(2024, 2, 1),
    endAt: new Date(2024, 3, 30),
    status: { id: "in-progress", name: "In Progress", color: "#3B82F6" },
    group: "Security",
    priority: "High",
  },
  {
    id: "5",
    name: "Customer Portal v2",
    startAt: new Date(2024, 1, 15),
    endAt: new Date(2024, 4, 31),
    status: { id: "in-progress", name: "In Progress", color: "#3B82F6" },
    group: "Product Features",
    priority: "Medium",
  },
  {
    id: "6",
    name: "Mobile App Development",
    startAt: new Date(2024, 3, 1),
    endAt: new Date(2024, 7, 31),
    status: { id: "planning", name: "Planning", color: "#F59E0B" },
    group: "Product Features",
    priority: "Medium",
  },
  {
    id: "7",
    name: "Analytics Dashboard",
    startAt: new Date(2024, 2, 15),
    endAt: new Date(2024, 5, 30),
    status: { id: "in-progress", name: "In Progress", color: "#3B82F6" },
    group: "Product Features",
    priority: "Low",
  },
  {
    id: "8",
    name: "Performance Optimization",
    startAt: new Date(2024, 4, 1),
    endAt: new Date(2024, 6, 15),
    status: { id: "draft", name: "Draft", color: "#6B7280" },
    group: "Infrastructure",
    priority: "Medium",
  },
  {
    id: "9",
    name: "Data Migration to Cloud",
    startAt: new Date(2024, 5, 1),
    endAt: new Date(2024, 8, 30),
    status: { id: "draft", name: "Draft", color: "#6B7280" },
    group: "Infrastructure",
    priority: "High",
  },
  {
    id: "10",
    name: "AI-Powered Recommendations",
    startAt: new Date(2024, 6, 1),
    endAt: new Date(2024, 10, 30),
    status: { id: "draft", name: "Draft", color: "#6B7280" },
    group: "Product Features",
    priority: "Low",
  },
];

// Group features by category
const groupedFeatures = mockRoadmapData.reduce((acc, feature) => {
  if (!acc[feature.group]) {
    acc[feature.group] = [];
  }
  acc[feature.group].push(feature);
  return acc;
}, {} as Record<string, typeof mockRoadmapData>);

export default function RoadmapGanttPage() {
  const [selectedFeature, setSelectedFeature] = React.useState<string | null>(null);

  const handleViewFeature = (id: string) => {
    setSelectedFeature(id);
    const feature = mockRoadmapData.find((f) => f.id === id);
    if (feature) {
      console.log("View feature:", feature);
    }
  };

  const handleMoveFeature = (id: string, startAt: Date, endAt: Date | null) => {
    console.log(`Move feature ${id} from ${startAt} to ${endAt}`);
    // TODO: Implement API call to update feature dates
  };

  const handleAddFeature = (date: Date) => {
    console.log(`Add feature at ${date.toISOString()}`);
    // TODO: Implement create feature modal
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Product Roadmap</h1>
          <p className="text-muted-foreground">
            Strategic timeline view of product initiatives and milestones
          </p>
        </div>
        <Button>Add Initiative</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {mockRoadmapData.filter((f) => f.status.id === "in-progress").length}
            </div>
            <p className="text-xs text-muted-foreground">Active initiatives</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Planning</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {mockRoadmapData.filter((f) => f.status.id === "planning").length}
            </div>
            <p className="text-xs text-muted-foreground">Upcoming work</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {mockRoadmapData.filter((f) => f.status.id === "completed").length}
            </div>
            <p className="text-xs text-muted-foreground">Finished items</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>2024 Roadmap</CardTitle>
          <CardDescription>
            Drag items to adjust dates. Click to view details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full h-[600px] overflow-hidden">
            <GanttProvider
              className="rounded-lg border w-full h-full"
              onAddItem={handleAddFeature}
              range="monthly"
              zoom={100}
            >
              <GanttSidebar>
                {Object.entries(groupedFeatures).map(([group, features]) => (
                  <GanttSidebarGroup key={group} name={group}>
                    {features.map((feature) => (
                      <GanttSidebarItem
                        feature={feature}
                        key={feature.id}
                        onSelectItem={handleViewFeature}
                      />
                    ))}
                  </GanttSidebarGroup>
                ))}
              </GanttSidebar>

              <GanttTimeline>
                <GanttHeader />
                <GanttFeatureList>
                  {Object.entries(groupedFeatures).map(([group, features]) => (
                    <GanttFeatureListGroup key={group}>
                      {features.map((feature) => (
                        <div className="flex" key={feature.id}>
                          <GanttFeatureItem
                            {...feature}
                            onMove={handleMoveFeature}
                          >
                            <div className="flex w-full items-center gap-2 px-2">
                              <p className="flex-1 truncate text-left text-xs">
                                {feature.name}
                              </p>
                              <span className="shrink-0 rounded bg-white/20 px-1.5 py-0.5 text-[10px] font-medium">
                                {feature.priority}
                              </span>
                            </div>
                          </GanttFeatureItem>
                        </div>
                      ))}
                    </GanttFeatureListGroup>
                  ))}
                </GanttFeatureList>
                <GanttToday />
              </GanttTimeline>
            </GanttProvider>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
