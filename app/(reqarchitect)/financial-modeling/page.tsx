import { Metadata } from "next";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../dashboard/components/app-sidebar";
import { SiteHeader } from "../dashboard/components/site-header";
import { Separator } from "@/components/ui/separator";
import { FinancialModelingClient } from "./financial-modeling-client";

export const metadata: Metadata = {
  title: "Advanced Financial Modeling",
  description: "Dynamic financial projections, scenario analysis, and valuation modeling",
};

function FinancialModelingPageContent() {
  return (
    <div className="container mx-auto p-4 lg:p-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Advanced Financial Modeling</h3>
          <p className="text-sm text-muted-foreground">
            Create sophisticated financial models with dynamic projections, scenario analysis, 
            and AI-powered insights for investment decision making.
          </p>
        </div>
        <Separator />
        <FinancialModelingClient />
      </div>
    </div>
  );
}

export default function FinancialModelingPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SiteHeader />
        <FinancialModelingPageContent />
      </SidebarInset>
    </SidebarProvider>
  );
}