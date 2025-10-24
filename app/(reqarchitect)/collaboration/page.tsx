import { Metadata } from "next";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../dashboard/components/app-sidebar";
import { SiteHeader } from "../dashboard/components/site-header";
import { Separator } from "@/components/ui/separator";
import { CollaborationClient } from "./collaboration-client";

export const metadata: Metadata = {
  title: "Collaboration & Communication",
  description: "Real-time collaboration platform with integrated workflows and stakeholder dashboards",
};

function CollaborationPageContent() {
  return (
    <div className="container mx-auto p-4 lg:p-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Collaboration & Communication</h3>
          <p className="text-sm text-muted-foreground">
            Comprehensive collaboration platform with real-time co-editing, smart notifications, 
            stakeholder dashboards, and AI-powered presentation builders.
          </p>
        </div>
        <Separator />
        <CollaborationClient />
      </div>
    </div>
  );
}

export default function CollaborationPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SiteHeader />
        <CollaborationPageContent />
      </SidebarInset>
    </SidebarProvider>
  );
}