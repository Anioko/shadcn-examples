"use client";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../dashboard/components/app-sidebar";
import { SiteHeader } from "../dashboard/components/site-header";
import { Save } from "lucide-react";
import { WorkflowCanvas, ReactFlowCanvas } from "./components";

export default function ArchitecturePage() {
  return (
    <SidebarProvider
      className="min-h-auto"
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 64)",
          "--header-height": "calc(var(--spacing) * 12 + 1px)"
        } as React.CSSProperties
      }>
      <AppSidebar variant="sidebar" />
      <SidebarInset>
        <SiteHeader 
          title="Enterprise Architecture Workflow" 
          buttonText="Save Diagram"
          buttonIcon={<Save />}
        />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col">
            <ReactFlowCanvas />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}