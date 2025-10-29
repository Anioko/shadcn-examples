"use client";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Filter, Download } from "lucide-react";
import { useState } from "react";

// Import admin dashboard components
import { DataTable } from "../../generators/dashboard-generator/components/data-table";
import { SectionCards } from "../../generators/dashboard-generator/components/section-cards";
import { ChartAreaInteractive } from "../../generators/dashboard-generator/components/chart-area-interactive";

// Enterprise Sidebar with Dynamic Counts
import { EnterpriseSidebar } from "./components/enterprise-sidebar";

// Mock data representing large enterprise datasets
const mockCapabilities = Array.from({ length: 150 }, (_, i) => ({
  id: `cap-${i + 1}`,
  name: `Capability ${i + 1}`,
  category: ["Core", "Supporting", "Strategic"][i % 3],
  maturity: ["Initial", "Repeatable", "Defined", "Managed", "Optimizing"][i % 5],
  owner: `Team ${Math.floor(i / 10) + 1}`,
  status: ["Active", "Planned", "Deprecated"][i % 3],
  lastUpdated: new Date(2024, 0, 1 + (i % 365)).toISOString().split('T')[0]
}));

const mockGoals = Array.from({ length: 85 }, (_, i) => ({
  id: `goal-${i + 1}`,
  title: `Strategic Goal ${i + 1}`,
  category: ["Revenue", "Operational", "Innovation", "Customer"][i % 4],
  progress: Math.floor(Math.random() * 100),
  priority: ["High", "Medium", "Low"][i % 3],
  deadline: new Date(2024, 11, 31 - (i % 30)).toISOString().split('T')[0]
}));

const mockKPIs = Array.from({ length: 200 }, (_, i) => ({
  id: `kpi-${i + 1}`,
  name: `KPI ${i + 1}`,
  value: Math.floor(Math.random() * 1000),
  target: Math.floor(Math.random() * 1000) + 500,
  unit: ["$", "%", "Count", "Days"][i % 4],
  trend: ["Up", "Down", "Stable"][i % 3],
  category: ["Financial", "Operational", "Customer", "Learning"][i % 4]
}));

export default function EnterpriseHybridPage() {
  const [activeTab, setActiveTab] = useState("capabilities");
  const [searchTerm, setSearchTerm] = useState("");

  // Filter data based on search
  const filteredCapabilities = mockCapabilities.filter(cap => 
    cap.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cap.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredGoals = mockGoals.filter(goal => 
    goal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    goal.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredKPIs = mockKPIs.filter(kpi => 
    kpi.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    kpi.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <SidebarProvider
      className="min-h-auto"
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 64)",
          "--header-height": "calc(var(--spacing) * 12 + 1px)"
        } as React.CSSProperties
      }>
      <EnterpriseSidebar 
        capabilities={mockCapabilities.length}
        goals={mockGoals.length}
        kpis={mockKPIs.length}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      <SidebarInset>
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              
              {/* Section Cards showing overview */}
              <SectionCards />
              
              {/* Search and Filter Bar */}
              <div className="px-4 lg:px-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search across all data..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New
                  </Button>
                </div>

                {/* Chart Overview */}
                <ChartAreaInteractive />
              </div>

              {/* Tabbed Data Tables */}
              <div className="px-4 lg:px-6">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="capabilities" className="flex items-center gap-2">
                      Capabilities
                      <Badge variant="secondary" className="ml-1">
                        {filteredCapabilities.length}
                      </Badge>
                    </TabsTrigger>
                    <TabsTrigger value="goals" className="flex items-center gap-2">
                      Strategic Goals
                      <Badge variant="secondary" className="ml-1">
                        {filteredGoals.length}
                      </Badge>
                    </TabsTrigger>
                    <TabsTrigger value="kpis" className="flex items-center gap-2">
                      KPIs
                      <Badge variant="secondary" className="ml-1">
                        {filteredKPIs.length}
                      </Badge>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="capabilities" className="mt-6">
                    <DataTable data={filteredCapabilities as never[]} />
                  </TabsContent>

                  <TabsContent value="goals" className="mt-6">
                    <DataTable data={filteredGoals as never[]} />
                  </TabsContent>

                  <TabsContent value="kpis" className="mt-6">
                    <DataTable data={filteredKPIs as never[]} />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}