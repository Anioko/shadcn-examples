import { Metadata } from "next"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "../dashboard/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { ProductsServicesClient } from "./products-services-client"

export const metadata: Metadata = {
  title: "Products & Services",
  description: "Product catalog, pricing models, feature management, and product roadmap planning.",
}

export default function ProductsServicesPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex min-h-screen w-full flex-col">
        <SiteHeader />
        <ProductsServicesClient />
      </div>
    </SidebarProvider>
  )
}