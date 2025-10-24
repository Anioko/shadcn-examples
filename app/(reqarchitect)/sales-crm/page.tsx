import { Metadata } from "next"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "../dashboard/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SalesCrmClient } from "./sales-crm-client"

export const metadata: Metadata = {
  title: "Sales & CRM",
  description: "Customer relationship management, sales pipeline, and opportunity tracking.",
}

export default function SalesCrmPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex min-h-screen w-full flex-col">
        <SiteHeader />
        <SalesCrmClient />
      </div>
    </SidebarProvider>
  )
}