"use client";

import * as React from "react";
import Link from "next/link";
import {
  BarChart3,
  Building2,
  Database,
  HelpCircle,
  LayoutDashboard,
  Network,
  Search,
  Settings,
  Users,
  GitBranch,
  Zap,
  Scale,
  TrendingUp,
  Shield
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";
import { NavDocuments } from "./nav-documents";
import { NavMain } from "./nav-main";
import { NavSecondary } from "./nav-secondary";
import { NavUser } from "./nav-user";

const data = {
  user: {
    name: "ReqArchitect",
    email: "admin@reqarchitect.com",
    avatar: "/avatars/shadcn.jpg"
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard
    },
    {
      title: "Business Model",
      url: "/business-model",
      icon: Building2
    },
    {
      title: "Capabilities",
      url: "/capabilities",
      icon: Network
    },
    {
      title: "Tech Stack",
      url: "/tech-stack",
      icon: Database
    },
    {
      title: "Context Graph",
      url: "/context-graph",
      icon: GitBranch
    },
    {
      title: "Enterprise Integrations",
      url: "/enterprise-integrations",
      icon: Zap
    },
    {
      title: "Universal Connector",
      url: "/universal-connector",
      icon: Network
    },
    {
      title: "Capability Maturity",
      url: "/capability-maturity",
      icon: TrendingUp
    },
    {
      title: "Options Analysis",
      url: "/options-analysis",
      icon: Scale
    },
    {
      title: "Analytics",
      url: "#",
      icon: BarChart3
    }
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: Settings
    },
    {
      title: "Get Help",
      url: "#",
      icon: HelpCircle
    },
    {
      title: "Search",
      url: "#",
      icon: Search
    }
  ],
  documents: [
    {
      name: "Architecture Docs",
      url: "#",
      icon: Database
    },
    {
      name: "Compliance Reports",
      url: "#",
      icon: BarChart3
    },
    {
      name: "Team Directory",
      url: "#",
      icon: Users
    }
  ]
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="none" className="h-auto border-r" {...props}>
      <SidebarHeader className="border-b">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <Link href="#">
                <Building2 className="!size-5" />
                <span className="text-base font-semibold">ReqArchitect</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}