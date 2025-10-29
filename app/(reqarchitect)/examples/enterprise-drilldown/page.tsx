"use client";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Plus, ArrowLeft, Filter, MoreHorizontal } from "lucide-react";
import { useState } from "react";

// Import admin dashboard components
import { DataTable } from "../../generators/dashboard-generator/components/data-table";
import { SectionCards } from "../../generators/dashboard-generator/components/section-cards";

// Dynamic Drill-Down Sidebar
import { DrillDownSidebar } from "./components/drilldown-sidebar";

// Mock hierarchical data
const mockData = {
  capabilities: {
    "Core Business": {
      count: 45,
      items: Array.from({ length: 45 }, (_, i) => ({
        id: `core-${i + 1}`,
        name: `Core Capability ${i + 1}`,
        maturity: ["Initial", "Repeatable", "Defined", "Managed", "Optimizing"][i % 5],
        owner: `Team ${Math.floor(i / 5) + 1}`,
        subcategory: ["Customer Management", "Product Development", "Operations"][i % 3]
      }))
    },
    "Supporting": {
      count: 32,
      items: Array.from({ length: 32 }, (_, i) => ({
        id: `support-${i + 1}`,
        name: `Supporting Capability ${i + 1}`,
        maturity: ["Initial", "Repeatable", "Defined", "Managed", "Optimizing"][i % 5],
        owner: `Team ${Math.floor(i / 4) + 1}`,
        subcategory: ["HR", "IT", "Finance"][i % 3]
      }))
    },
    "Strategic": {
      count: 28,
      items: Array.from({ length: 28 }, (_, i) => ({
        id: `strategic-${i + 1}`,
        name: `Strategic Capability ${i + 1}`,
        maturity: ["Initial", "Repeatable", "Defined", "Managed", "Optimizing"][i % 5],
        owner: `Team ${Math.floor(i / 3) + 1}`,
        subcategory: ["Innovation", "Market Research", "Strategic Planning"][i % 3]
      }))
    }
  },
  goals: {
    "Revenue Growth": {
      count: 25,
      items: Array.from({ length: 25 }, (_, i) => ({
        id: `revenue-${i + 1}`,
        title: `Revenue Goal ${i + 1}`,
        progress: Math.floor(Math.random() * 100),
        priority: ["High", "Medium", "Low"][i % 3]
      }))
    },
    "Operational Excellence": {
      count: 35,
      items: Array.from({ length: 35 }, (_, i) => ({
        id: `ops-${i + 1}`,
        title: `Operations Goal ${i + 1}`,
        progress: Math.floor(Math.random() * 100),
        priority: ["High", "Medium", "Low"][i % 3]
      }))
    },
    "Customer Experience": {
      count: 18,
      items: Array.from({ length: 18 }, (_, i) => ({
        id: `cx-${i + 1}`,
        title: `Customer Goal ${i + 1}`,
        progress: Math.floor(Math.random() * 100),
        priority: ["High", "Medium", "Low"][i % 3]
      }))
    }
  }
};

export default function EnterpriseDrillDownPage() {
  const [currentView, setCurrentView] = useState<{
    type: 'overview' | 'category' | 'items';
    category?: string;
    dataType?: 'capabilities' | 'goals';
    subcategory?: string;
  }>({ type: 'overview' });
  
  const [searchTerm, setSearchTerm] = useState("");

  const handleCategorySelect = (dataType: 'capabilities' | 'goals', category: string) => {
    setCurrentView({ type: 'items', dataType, category });
  };

  const handleBackToOverview = () => {
    setCurrentView({ type: 'overview' });
  };

  const getCurrentData = () => {
    if (currentView.type === 'items' && currentView.dataType && currentView.category) {
      const categoryData = mockData[currentView.dataType] as Record<string, { items: unknown[] }>;
      return categoryData[currentView.category]?.items || [];
    }
    return [];
  };

  const getCurrentTitle = () => {
    if (currentView.type === 'items') {
      return `${currentView.category} - ${currentView.dataType}`;
    }
    return "Enterprise Overview";
  };

  return (
    <SidebarProvider
      className="min-h-auto"
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 64)",
          "--header-height": "calc(var(--spacing) * 12 + 1px)"
        } as React.CSSProperties
      }>
      <DrillDownSidebar 
        data={mockData}
        currentView={currentView}
        onCategorySelect={handleCategorySelect}
        onBackToOverview={handleBackToOverview}
      />
      <SidebarInset>
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              
              {/* Breadcrumb and Actions */}
              <div className="px-4 lg:px-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    {currentView.type === 'items' && (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={handleBackToOverview}
                      >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Overview
                      </Button>
                    )}
                    <h1 className="text-2xl font-bold">{getCurrentTitle()}</h1>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add New
                    </Button>
                  </div>
                </div>

                {/* Search Bar */}
                <div className="relative max-w-md mb-6">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={`Search ${getCurrentTitle().toLowerCase()}...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Content based on current view */}
              {currentView.type === 'overview' && (
                <>
                  <SectionCards />
                  
                  {/* Category Overview Cards */}
                  <div className="px-4 lg:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {Object.entries(mockData.capabilities).map(([category, data]) => (
                        <Card 
                          key={category} 
                          className="cursor-pointer hover:shadow-md transition-shadow"
                          onClick={() => handleCategorySelect('capabilities', category)}
                        >
                          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                              {category} Capabilities
                            </CardTitle>
                            <Badge variant="secondary">{data.count}</Badge>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">{data.count}</div>
                            <p className="text-xs text-muted-foreground">
                              Click to view details
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                      
                      {Object.entries(mockData.goals).map(([category, data]) => (
                        <Card 
                          key={category} 
                          className="cursor-pointer hover:shadow-md transition-shadow"
                          onClick={() => handleCategorySelect('goals', category)}
                        >
                          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                              {category} Goals
                            </CardTitle>
                            <Badge variant="secondary">{data.count}</Badge>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">{data.count}</div>
                            <p className="text-xs text-muted-foreground">
                              Click to view details
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {currentView.type === 'items' && (
                <div className="px-4 lg:px-6">
                  <h2 className="text-2xl font-bold mb-4">{getCurrentTitle()}</h2>
                  <p className="text-muted-foreground mb-6">Detailed view of {currentView.category} items</p>
                  <DataTable data={getCurrentData() as never[]} />
                </div>
              )}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}