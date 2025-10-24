import { Metadata } from "next"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "../dashboard/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { ProjectManagementClient } from "./project-management-client"

export const metadata: Metadata = {
  title: "Project Management",
  description: "Agile project management, task tracking, resource allocation, and team capacity planning.",
}

export default function ProjectManagementPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex min-h-screen w-full flex-col">
        <SiteHeader />
        <ProjectManagementClient />
      </div>
    </SidebarProvider>
  )
}