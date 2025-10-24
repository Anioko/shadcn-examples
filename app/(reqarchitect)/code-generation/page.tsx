import { Metadata } from "next"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "../dashboard/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { CodeGenerationClient } from "./code-generation-client"

export const metadata: Metadata = {
  title: "Code Generation",
  description: "AI-powered code templates, generators, workflows, and documentation automation.",
}

export default function CodeGenerationPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex min-h-screen w-full flex-col">
        <SiteHeader />
        <CodeGenerationClient />
      </div>
    </SidebarProvider>
  )
}