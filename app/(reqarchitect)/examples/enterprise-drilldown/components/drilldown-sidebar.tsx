"use client";

import * as React from "react";
import Link from "next/link";
import {
  IconChartBar,
  IconDashboard,
  IconTarget,
  IconBulb,
  IconInnerShadowTop,
  IconChevronRight,
  IconArrowLeft,
  IconSettings,
  IconHelp
} from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";

interface DrillDownSidebarProps extends React.ComponentProps<typeof Sidebar> {
  data: Record<string, unknown>;
  currentView: {
    type: 'overview' | 'category' | 'items';
    category?: string;
    dataType?: 'capabilities' | 'goals';
    subcategory?: string;
  };
  onCategorySelect: (dataType: 'capabilities' | 'goals', category: string) => void;
  onBackToOverview: () => void;
}

export function DrillDownSidebar({ 
  data, 
  currentView, 
  onCategorySelect, 
  onBackToOverview,
  ...props 
}: DrillDownSidebarProps) {
  
  const getTotalCount = (dataType: 'capabilities' | 'goals') => {
    return Object.values(data[dataType] as Record<string, { count: number }>).reduce((sum: number, item: { count: number }) => sum + item.count, 0);
  };

  return (
    <Sidebar collapsible="none" className="h-auto border-r" {...props}>
      <SidebarHeader className="border-b">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <Link href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Enterprise Drill-Down</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      
      <SidebarContent>
        <ScrollArea className="flex-1">
          {/* Navigation State */}
          {currentView.type === 'items' && (
            <SidebarMenu className="px-2 py-2">
              <SidebarMenuItem>
                <SidebarMenuButton onClick={onBackToOverview} className="w-full">
                  <IconArrowLeft className="size-4" />
                  <span>Back to Overview</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          )}

          {/* Overview Navigation */}
          {currentView.type === 'overview' && (
            <>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive>
                    <Link href="#">
                      <IconDashboard className="size-4" />
                      <span>Overview</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>

              {/* Capabilities Section */}
              <div className="px-2 py-2">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 py-1">
                  Capabilities ({getTotalCount('capabilities')})
                </div>
                <SidebarMenu>
                  {Object.entries(data.capabilities as Record<string, { count: number }>).map(([category, categoryData]: [string, { count: number }]) => (
                    <SidebarMenuItem key={category}>
                      <SidebarMenuButton 
                        onClick={() => onCategorySelect('capabilities', category)}
                        className="group cursor-pointer"
                      >
                        <IconBulb className="size-4" />
                        <span className="flex-1">{category}</span>
                        <Badge variant="secondary" className="mr-2">
                          {categoryData.count}
                        </Badge>
                        <IconChevronRight className="size-4 opacity-50 group-hover:opacity-100" />
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </div>

              {/* Goals Section */}
              <div className="px-2 py-2">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 py-1">
                  Strategic Goals ({getTotalCount('goals')})
                </div>
                <SidebarMenu>
                  {Object.entries(data.goals as Record<string, { count: number }>).map(([category, categoryData]: [string, { count: number }]) => (
                    <SidebarMenuItem key={category}>
                      <SidebarMenuButton 
                        onClick={() => onCategorySelect('goals', category)}
                        className="group cursor-pointer"
                      >
                        <IconTarget className="size-4" />
                        <span className="flex-1">{category}</span>
                        <Badge variant="secondary" className="mr-2">
                          {categoryData.count}
                        </Badge>
                        <IconChevronRight className="size-4 opacity-50 group-hover:opacity-100" />
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </div>
            </>
          )}

          {/* Drill-Down View */}
          {currentView.type === 'items' && currentView.category && currentView.dataType && (
            <div className="px-2 py-2">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 py-1">
                {currentView.category} ({(data[currentView.dataType] as Record<string, { count: number }>)[currentView.category]?.count || 0})
              </div>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive>
                    <Link href="#">
                      {currentView.dataType === 'capabilities' ? 
                        <IconBulb className="size-4" /> : 
                        <IconTarget className="size-4" />
                      }
                      <span>View All</span>
                      <Badge variant="default" className="ml-auto">
                        {(data[currentView.dataType] as Record<string, { count: number }>)[currentView.category]?.count || 0}
                      </Badge>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>

              {/* Sub-category breakdown if available */}
              {currentView.dataType === 'capabilities' && (
                <div className="mt-4">
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 py-1">
                    By Subcategory
                  </div>
                  <SidebarMenu>
                    {['Customer Management', 'Product Development', 'Operations'].map((subcategory) => {
                      const count = (data[currentView.dataType!] as Record<string, { items?: Array<{ subcategory: string }> }>)[currentView.category!]?.items?.filter(
                        (item: { subcategory: string }) => item.subcategory === subcategory
                      ).length || 0;
                      
                      if (count === 0) return null;
                      
                      return (
                        <SidebarMenuItem key={subcategory}>
                          <SidebarMenuButton>
                            <span className="flex-1 text-sm">{subcategory}</span>
                            <Badge variant="outline" className="ml-auto">
                              {count}
                            </Badge>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })}
                  </SidebarMenu>
                </div>
              )}
            </div>
          )}

          {/* Analytics */}
          <SidebarMenu className="mt-auto">
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
        <SidebarMenu className="mt-auto border-t pt-2">
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