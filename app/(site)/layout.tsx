import React from "react";
import { SiteHeader } from "./components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 60)",
          "--header-height": "calc(var(--spacing) * 12)"
        } as React.CSSProperties
      }>
      <AppSidebar variant="sidebar" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 md:gap-6">
              {children}
              <Card className="mx-auto mb-10 w-full max-w-2xl py-10 text-center">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">
                    Didn&#39;t find what you were looking for?
                  </CardTitle>
                  <CardDescription>
                    Share your ideas for new examples, components, and features
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild>
                    <Link
                      href="https://github.com/shadcn-examples/shadcn-examples/discussions/categories/suggestions"
                      target="_blank">
                      Make a suggestion
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        <SiteFooter />
      </SidebarInset>
    </SidebarProvider>
  );
}
