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
  Shield,
  ShoppingCart,
  DollarSign,
  Calculator,
  Compass,
  Code,
  Activity,
  FileCheck,
  Target,
  CheckSquare,
  Brain
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
      title: "Strategic Goals",
      url: "/strategic-goals",
      icon: Target
    },
    {
      title: "Business Model",
      url: "/business-model",
      icon: Building2
    },
    {
      title: "Enterprise Architecture",
      url: "/enterprise-architecture",
      icon: Network
    },
    {
      title: "Integrations",
      url: "/integrations", 
      icon: GitBranch
    },
    {
      title: "AI Capabilities",
      url: "/ai-capabilities",
      icon: Brain
    },
    {
      title: "Controls & Policies",
      url: "/controls-policies",
      icon: Shield
    },
    {
      title: "Capabilities",
      url: "/capabilities",
      icon: Zap
    },
    {
      title: "Tech Stack",
      url: "/tech-stack",
      icon: Database
    },
    {
      title: "Context Graph",
      url: "/context-graph",
      icon: Activity
    },
    {
      title: "Financial Modeling",
      url: "/financial-modeling",
      icon: Calculator
    },
    {
      title: "Strategic Planning",
      url: "/strategic-planning",
      icon: Compass
    },
    {
      title: "Collaboration",
      url: "/collaboration",
      icon: Users
    },
    {
      title: "Project Management",
      url: "/project-management",
      icon: CheckSquare
    },
    {
      title: "Products & Services",
      url: "/products-services",
      icon: ShoppingCart
    },
    {
      title: "Sales & CRM",
      url: "/sales-crm",
      icon: DollarSign
    },
    {
      title: "Enterprise Integrations",
      url: "/enterprise-integrations",
      icon: Database
    },
    {
      title: "Universal Connector",
      url: "/universal-connector",
      icon: Network
    },
    {
      title: "Code Generation",
      url: "/code-generation",
      icon: Code
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
      title: "Performance Analytics",
      url: "/performance-analytics",
      icon: BarChart3
    },
    {
      title: "Governance & Risk",
      url: "/governance-risk",
      icon: FileCheck
    }
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/settings",
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