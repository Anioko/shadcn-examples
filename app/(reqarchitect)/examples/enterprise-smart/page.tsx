"use client";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Plus, Filter, Download, TrendingUp, Users, Target } from "lucide-react";
import { useState, useMemo } from "react";

// Import admin dashboard components
import { DataTable } from "../../generators/dashboard-generator/components/data-table";
import { SectionCards } from "../../generators/dashboard-generator/components/section-cards";
import { ChartAreaInteractive } from "../../generators/dashboard-generator/components/chart-area-interactive";

// Smart Auto-Pagination Sidebar
import { SmartSidebar } from "./components/smart-sidebar";

// Mock data for large enterprise (1000+ items per category)
const generateLargeDataset = (type: string, count: number) => {
  return Array.from({ length: count }, (_, i) => {
    const categories = {
      capabilities: ['Core Business', 'Supporting', 'Strategic', 'Emerging'],
      goals: ['Revenue Growth', 'Operational Excellence', 'Customer Experience', 'Innovation'],
      kpis: ['Financial', 'Operational', 'Customer', 'Learning & Growth']
    };
    
    return {
      id: `${type}-${i + 1}`,
      name: `${type.charAt(0).toUpperCase() + type.slice(1)} ${i + 1}`,
      category: categories[type as keyof typeof categories][i % 4],
      status: ['Active', 'Planned', 'On Hold', 'Completed'][i % 4],
      priority: ['High', 'Medium', 'Low'][i % 3],
      owner: `Team ${Math.floor(i / 10) + 1}`,
      lastUpdated: new Date(2024, 0, 1 + (i % 365)).toISOString().split('T')[0],
      value: Math.floor(Math.random() * 1000),
      progress: Math.floor(Math.random() * 100)
    };
  });
};

const mockData = {
  capabilities: generateLargeDataset('capabilities', 247),
  goals: generateLargeDataset('goals', 156),  
  kpis: generateLargeDataset('kpis', 423)
};

export default function EnterpriseSmartPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Smart filtering with performance optimization
  const filteredData = useMemo(() => {
    const filterItems = (items: Array<Record<string, unknown>>, searchTerm: string, categories: string[]) => {
      return items.filter(item => {
        const matchesSearch = !searchTerm ||
          String(item.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
          String(item.category || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
          String(item.owner || '').toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory = categories.length === 0 || categories.includes(String(item.category || ''));

        return matchesSearch && matchesCategory;
      });
    };

    return {
      capabilities: filterItems(mockData.capabilities, searchTerm, selectedCategories),
      goals: filterItems(mockData.goals, searchTerm, selectedCategories),
      kpis: filterItems(mockData.kpis, searchTerm, selectedCategories)
    };
  }, [searchTerm, selectedCategories]);

  // Category statistics
  const categoryStats = useMemo(() => {
    const getStats = (items: Array<Record<string, unknown>>) => {
      const stats: Record<string, number> = {};
      items.forEach(item => {
        const category = String(item.category || '');
        stats[category] = (stats[category] || 0) + 1;
      });
      return stats;
    };

    return {
      capabilities: getStats(mockData.capabilities),
      goals: getStats(mockData.goals),
      kpis: getStats(mockData.kpis)
    };
  }, []);

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSearchTerm("");
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
      <SmartSidebar 
        data={mockData}
        categoryStats={categoryStats}
        selectedCategories={selectedCategories}
        onCategoryToggle={handleCategoryToggle}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      <SidebarInset>
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              
              {/* Page Header with Smart Actions */}
              <div className="px-4 lg:px-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h1 className="text-3xl font-bold tracking-tight">Enterprise Dashboard</h1>
                    <p className="text-muted-foreground">
                      Manage {mockData.capabilities.length + mockData.goals.length + mockData.kpis.length} 
                      {" "}enterprise data points with smart filtering
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {(searchTerm || selectedCategories.length > 0) && (
                      <Button variant="outline" size="sm" onClick={clearFilters}>
                        Clear Filters
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add New
                    </Button>
                  </div>
                </div>

                {/* Active Filters Display */}
                {(searchTerm || selectedCategories.length > 0) && (
                  <div className="flex items-center gap-2 mb-6 p-3 bg-muted/50 rounded-lg">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Active filters:</span>
                    {searchTerm && (
                      <Badge variant="secondary">
                        Search: &quot;{searchTerm}&quot;
                      </Badge>
                    )}
                    {selectedCategories.map(category => (
                      <Badge key={category} variant="secondary">
                        Category: {category}
                        <button 
                          className="ml-1 hover:bg-destructive/20 rounded-full p-0.5"
                          onClick={() => handleCategoryToggle(category)}
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Main Content Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="px-4 lg:px-6">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="capabilities" className="flex items-center gap-2">
                    Capabilities
                    <Badge variant="secondary">
                      {filteredData.capabilities.length}
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger value="goals" className="flex items-center gap-2">
                    Goals
                    <Badge variant="secondary">
                      {filteredData.goals.length}
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger value="kpis" className="flex items-center gap-2">
                    KPIs
                    <Badge variant="secondary">
                      {filteredData.kpis.length}
                    </Badge>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-6">
                  <div className="space-y-6">
                    <SectionCards />
                    
                    {/* Smart Overview Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">Total Capabilities</CardTitle>
                          <Target className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">{mockData.capabilities.length}</div>
                          <p className="text-xs text-muted-foreground">
                            Filtered: {filteredData.capabilities.length}
                          </p>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">Strategic Goals</CardTitle>
                          <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">{mockData.goals.length}</div>
                          <p className="text-xs text-muted-foreground">
                            Filtered: {filteredData.goals.length}
                          </p>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">Key Metrics</CardTitle>
                          <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">{mockData.kpis.length}</div>
                          <p className="text-xs text-muted-foreground">
                            Filtered: {filteredData.kpis.length}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <ChartAreaInteractive />
                  </div>
                </TabsContent>

                <TabsContent value="capabilities" className="mt-6">
                  <DataTable data={filteredData.capabilities as never[]} />
                </TabsContent>

                <TabsContent value="goals" className="mt-6">
                  <DataTable data={filteredData.goals as never[]} />
                </TabsContent>

                <TabsContent value="kpis" className="mt-6">
                  <DataTable data={filteredData.kpis as never[]} />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}