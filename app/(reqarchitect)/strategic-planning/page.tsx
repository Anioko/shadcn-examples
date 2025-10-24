import { Metadata } from "next";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../dashboard/components/app-sidebar";
import { SiteHeader } from "../dashboard/components/site-header";
import { Separator } from "@/components/ui/separator";
import { StrategicPlanningClient } from "./strategic-planning-client";

export const metadata: Metadata = {
  title: "Strategic Planning Enhancement",
  description: "Advanced strategic planning with OKR tracking, competitive analysis, and performance dashboards",
};

function StrategicPlanningPageContent() {
  return (
    <div className="container mx-auto p-4 lg:p-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Strategic Planning Enhancement</h3>
          <p className="text-sm text-muted-foreground">
            Comprehensive strategic planning with OKR tracking, competitive analysis, 
            market research integration, and performance dashboards.
          </p>
        </div>
        <Separator />
        <StrategicPlanningClient />
      </div>
    </div>
  );
}

export default function StrategicPlanningPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SiteHeader />
        <StrategicPlanningPageContent />
      </SidebarInset>
    </SidebarProvider>
  );
}