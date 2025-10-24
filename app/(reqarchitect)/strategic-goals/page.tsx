import { Metadata } from "next"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "../dashboard/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { StrategicGoalsClient } from "./strategic-goals-client"

export const metadata: Metadata = {
  title: "Strategic Goals & OKRs",
  description: "Hierarchical goal setting, progress tracking, and strategic alignment management.",
}

export default function StrategicGoalsPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex min-h-screen w-full flex-col">
        <SiteHeader />
        <StrategicGoalsClient />
      </div>
    </SidebarProvider>
  )
}