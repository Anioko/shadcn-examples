"use client";

import * as React from "react";
import Link from "next/link";
import {
  IconChartBar,
  IconDashboard,
  IconTarget,
  IconBulb,
  IconTrendingUp,
  IconInnerShadowTop,
  IconSettings,
  IconHelp,
  IconSearch,
  IconFilter,
  IconX
} from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";

interface SmartSidebarProps extends React.ComponentProps<typeof Sidebar> {
  data: {
    capabilities: Array<Record<string, unknown>>;
    goals: Array<Record<string, unknown>>;
    kpis: Array<Record<string, unknown>>;
  };
  categoryStats: {
    capabilities: Record<string, number>;
    goals: Record<string, number>;
    kpis: Record<string, number>;
  };
  selectedCategories: string[];
  onCategoryToggle: (category: string) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export function SmartSidebar({ 
  data,
  categoryStats,
  selectedCategories,
  onCategoryToggle,
  activeTab,
  onTabChange,
  searchTerm,
  onSearchChange,
  ...props 
}: SmartSidebarProps) {
  const [showFilters, setShowFilters] = React.useState(true);

  // Get all unique categories across all data types
  const allCategories = React.useMemo(() => {
    const categories = new Set<string>();
    Object.values(categoryStats).forEach(stats => {
      Object.keys(stats).forEach(category => categories.add(category));
    });
    return Array.from(categories).sort();
  }, [categoryStats]);

  const totalItems = data.capabilities.length + data.goals.length + data.kpis.length;

  return (
    <Sidebar collapsible="none" className="h-auto border-r" {...props}>
      <SidebarHeader className="border-b">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <Link href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Smart Enterprise</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      
      <SidebarContent>
        <ScrollArea className="flex-1">
          {/* Smart Search */}
          <div className="px-2 py-3">
            <div className="relative">
              <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Smart search..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 h-8"
              />
              {searchTerm && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                  onClick={() => onSearchChange("")}
                >
                  <IconX className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>

          {/* Navigation */}
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton 
                isActive={activeTab === "overview"}
                onClick={() => onTabChange("overview")}
              >
                <IconDashboard className="size-4" />
                <span>Overview</span>
                <Badge variant="secondary" className="ml-auto">
                  {totalItems}
                </Badge>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton 
                isActive={activeTab === "capabilities"}
                onClick={() => onTabChange("capabilities")}
              >
                <IconBulb className="size-4" />
                <span>Capabilities</span>
                <Badge 
                  variant={data.capabilities.length > 200 ? "destructive" : "secondary"} 
                  className="ml-auto"
                >
                  {data.capabilities.length}
                </Badge>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton 
                isActive={activeTab === "goals"}
                onClick={() => onTabChange("goals")}
              >
                <IconTarget className="size-4" />
                <span>Goals</span>
                <Badge 
                  variant={data.goals.length > 100 ? "destructive" : "secondary"} 
                  className="ml-auto"
                >
                  {data.goals.length}
                </Badge>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton 
                isActive={activeTab === "kpis"}
                onClick={() => onTabChange("kpis")}
              >
                <IconTrendingUp className="size-4" />
                <span>KPIs</span>
                <Badge 
                  variant={data.kpis.length > 300 ? "destructive" : "secondary"} 
                  className="ml-auto"
                >
                  {data.kpis.length}
                </Badge>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>

          <Separator className="my-2" />

          {/* Smart Filters */}
          <div className="px-2">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start h-8 px-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <IconFilter className="size-4" />
              <span>Smart Filters</span>
              {selectedCategories.length > 0 && (
                <Badge variant="default" className="ml-auto">
                  {selectedCategories.length}
                </Badge>
              )}
            </Button>

            {showFilters && (
              <div className="mt-2 space-y-2">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2">
                  Categories
                </div>
                
                <div className="space-y-1">
                  {allCategories.map((category) => {
                    const totalCount = (categoryStats.capabilities[category] || 0) + 
                                     (categoryStats.goals[category] || 0) + 
                                     (categoryStats.kpis[category] || 0);
                    
                    if (totalCount === 0) return null;
                    
                    return (
                      <div key={category} className="flex items-center space-x-2 px-2 py-1">
                        <Checkbox
                          id={category}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={() => onCategoryToggle(category)}
                        />
                        <label
                          htmlFor={category}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1 cursor-pointer"
                        >
                          {category}
                        </label>
                        <Badge variant="outline" className="text-xs">
                          {totalCount}
                        </Badge>
                      </div>
                    );
                  })}
                </div>

                {selectedCategories.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full h-7 text-xs"
                    onClick={() => selectedCategories.forEach(onCategoryToggle)}
                  >
                    Clear All
                  </Button>
                )}
              </div>
            )}
          </div>

          <Separator className="my-4" />

          {/* Analytics */}
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="#">
                  <IconChartBar className="size-4" />
                  <span>Analytics</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </ScrollArea>

        {/* Footer */}
        <SidebarMenu className="border-t pt-2">
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="#">
                <IconSettings className="size-4" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="#">
                <IconHelp className="size-4" />
                <span>Help</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}