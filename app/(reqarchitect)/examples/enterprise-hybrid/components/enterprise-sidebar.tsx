"use client";

import * as React from "react";
import Link from "next/link";
import {
  IconChartBar,
  IconDashboard,
  IconTarget,
  IconBulb,
  IconTrendingUp,
  IconSettings,
  IconHelp,
  IconSearch,
  IconInnerShadowTop,
  IconChevronRight,
  IconUsers,
  IconFolder
} from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem
} from "@/components/ui/sidebar";

interface EnterpriseSidebarProps extends React.ComponentProps<typeof Sidebar> {
  capabilities: number;
  goals: number;
  kpis: number;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function EnterpriseSidebar({ 
  capabilities, 
  goals, 
  kpis, 
  activeTab, 
  onTabChange,
  ...props 
}: EnterpriseSidebarProps) {
  const [expandedSections, setExpandedSections] = React.useState<string[]>(["data"]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  return (
    <Sidebar collapsible="none" className="h-auto border-r" {...props}>
      <SidebarHeader className="border-b">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <Link href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Enterprise SaaS</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      
      <SidebarContent>
        {/* Main Navigation */}
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={activeTab === "dashboard"}>
              <Link href="#" onClick={() => onTabChange("dashboard")}>
                <IconDashboard className="size-4" />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        {/* Data Management Section - Collapsible with Smart Counts */}
        <Collapsible 
          open={expandedSections.includes("data")} 
          onOpenChange={() => toggleSection("data")}
        >
          <SidebarMenu>
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton className="group">
                  <IconFolder className="size-4" />
                  <span>Data Management</span>
                  <Badge variant="secondary" className="ml-auto">
                    {capabilities + goals + kpis}
                  </Badge>
                  <IconChevronRight className="size-4 ml-1 transition-transform group-data-[state=open]:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton 
                      asChild 
                      isActive={activeTab === "capabilities"}
                    >
                      <Link href="#" onClick={() => onTabChange("capabilities")}>
                        <IconBulb className="size-4" />
                        <span>Capabilities</span>
                        <Badge variant={capabilities > 100 ? "destructive" : "secondary"} className="ml-auto">
                          {capabilities}
                        </Badge>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton 
                      asChild 
                      isActive={activeTab === "goals"}
                    >
                      <Link href="#" onClick={() => onTabChange("goals")}>
                        <IconTarget className="size-4" />
                        <span>Strategic Goals</span>
                        <Badge variant={goals > 50 ? "destructive" : "secondary"} className="ml-auto">
                          {goals}
                        </Badge>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton 
                      asChild 
                      isActive={activeTab === "kpis"}
                    >
                      <Link href="#" onClick={() => onTabChange("kpis")}>
                        <IconTrendingUp className="size-4" />
                        <span>KPIs</span>
                        <Badge variant={kpis > 150 ? "destructive" : "secondary"} className="ml-auto">
                          {kpis}
                        </Badge>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </SidebarMenu>
        </Collapsible>

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

        {/* Team */}
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="#">
                <IconUsers className="size-4" />
                <span>Team</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        {/* Footer Navigation */}
        <SidebarMenu className="mt-auto">
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